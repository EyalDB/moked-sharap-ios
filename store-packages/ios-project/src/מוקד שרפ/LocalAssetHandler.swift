import Foundation
import WebKit
import UniformTypeIdentifiers

/// Custom URL scheme handler for loading local assets from the app bundle
/// This solves the WKWebView CORS issues with file:// protocol
class LocalAssetHandler: NSObject, WKURLSchemeHandler {

    func webView(_ webView: WKWebView, start urlSchemeTask: WKURLSchemeTask) {
        guard let url = urlSchemeTask.request.url else {
            urlSchemeTask.didFailWithError(NSError(domain: "LocalAssetHandler", code: -1, userInfo: [NSLocalizedDescriptionKey: "Invalid URL"]))
            return
        }

        // Get the file path from the custom scheme
        // "app://localhost/index.html" -> "index.html"
        // "app://localhost/assets/index.js" -> "assets/index.js"
        var filePath = url.path

        // Remove leading slash
        if filePath.hasPrefix("/") {
            filePath = String(filePath.dropFirst())
        }

        // Default to index.html for root
        if filePath.isEmpty {
            filePath = "index.html"
        }

        // Find the file in the www subdirectory of the bundle
        let wwwPath = Bundle.main.bundlePath + "/www/" + filePath
        let fileURL = URL(fileURLWithPath: wwwPath)

        // Check if file exists
        guard FileManager.default.fileExists(atPath: wwwPath) else {
            print("LocalAssetHandler: File not found - \(wwwPath)")
            urlSchemeTask.didFailWithError(NSError(domain: "LocalAssetHandler", code: -2, userInfo: [NSLocalizedDescriptionKey: "File not found: \(filePath)"]))
            return
        }

        do {
            let data = try Data(contentsOf: fileURL)
            let mimeType = getMimeType(forFileAt: fileURL)

            // Create response with proper headers
            let response = HTTPURLResponse(
                url: url,
                statusCode: 200,
                httpVersion: "HTTP/1.1",
                headerFields: [
                    "Content-Type": mimeType,
                    "Content-Length": "\(data.count)",
                    "Cache-Control": "no-cache",
                    "Access-Control-Allow-Origin": "*"
                ]
            )

            urlSchemeTask.didReceive(response!)
            urlSchemeTask.didReceive(data)
            urlSchemeTask.didFinish()

        } catch {
            print("LocalAssetHandler: Error loading file - \(error)")
            urlSchemeTask.didFailWithError(error)
        }
    }

    func webView(_ webView: WKWebView, stop urlSchemeTask: WKURLSchemeTask) {
        // Handle request cancellation if needed
    }

    private func getMimeType(forFileAt url: URL) -> String {
        let pathExtension = url.pathExtension.lowercased()

        // Try to get MIME type from UTType (iOS 14+)
        if #available(iOS 14.0, *) {
            if let utType = UTType(filenameExtension: pathExtension),
               let mimeType = utType.preferredMIMEType {
                return mimeType
            }
        }

        // Fallback MIME types for common web assets
        let mimeTypes: [String: String] = [
            "html": "text/html; charset=utf-8",
            "htm": "text/html; charset=utf-8",
            "js": "application/javascript; charset=utf-8",
            "mjs": "application/javascript; charset=utf-8",
            "css": "text/css; charset=utf-8",
            "json": "application/json; charset=utf-8",
            "svg": "image/svg+xml",
            "png": "image/png",
            "jpg": "image/jpeg",
            "jpeg": "image/jpeg",
            "gif": "image/gif",
            "webp": "image/webp",
            "ico": "image/x-icon",
            "woff": "font/woff",
            "woff2": "font/woff2",
            "ttf": "font/ttf",
            "otf": "font/otf",
            "eot": "application/vnd.ms-fontobject",
            "xml": "application/xml",
            "txt": "text/plain; charset=utf-8",
            "webmanifest": "application/manifest+json"
        ]

        return mimeTypes[pathExtension] ?? "application/octet-stream"
    }
}
