import Foundation
import WebKit
import UniformTypeIdentifiers

/// Custom URL scheme handler for loading local assets from the app bundle
/// This solves the WKWebView CORS issues with file:// protocol
class LocalAssetHandler: NSObject, WKURLSchemeHandler {

    private var wwwFolderPath: String?

    override init() {
        super.init()
        wwwFolderPath = findWWWFolder()
    }

    private func findWWWFolder() -> String? {
        let bundle = Bundle.main

        // Try different ways to find the www folder
        let directPath = bundle.bundlePath + "/www"
        if FileManager.default.fileExists(atPath: directPath) {
            return directPath
        }

        if let wwwURL = bundle.url(forResource: "www", withExtension: nil) {
            return wwwURL.path
        }

        if let wwwPath = bundle.path(forResource: "www", ofType: nil) {
            return wwwPath
        }

        if let resourcePath = bundle.resourcePath {
            let resourceWWW = resourcePath + "/www"
            if FileManager.default.fileExists(atPath: resourceWWW) {
                return resourceWWW
            }
        }

        return nil
    }

    func webView(_ webView: WKWebView, start urlSchemeTask: WKURLSchemeTask) {
        guard let url = urlSchemeTask.request.url else {
            urlSchemeTask.didFailWithError(NSError(domain: "LocalAssetHandler", code: -1, userInfo: [NSLocalizedDescriptionKey: "Invalid URL"]))
            return
        }

        var filePath = url.path

        if filePath.hasPrefix("/") {
            filePath = String(filePath.dropFirst())
        }

        if filePath.isEmpty {
            filePath = "index.html"
        }

        guard let wwwPath = wwwFolderPath else {
            urlSchemeTask.didFailWithError(NSError(domain: "LocalAssetHandler", code: -3, userInfo: [NSLocalizedDescriptionKey: "www folder not found"]))
            return
        }

        let fullPath = wwwPath + "/" + filePath

        guard FileManager.default.fileExists(atPath: fullPath) else {
            urlSchemeTask.didFailWithError(NSError(domain: "LocalAssetHandler", code: -2, userInfo: [NSLocalizedDescriptionKey: "File not found: \(filePath)"]))
            return
        }

        do {
            let fileURL = URL(fileURLWithPath: fullPath)
            let data = try Data(contentsOf: fileURL)
            let mimeType = getMimeType(forFileAt: fileURL)

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
            urlSchemeTask.didFailWithError(error)
        }
    }

    func webView(_ webView: WKWebView, stop urlSchemeTask: WKURLSchemeTask) {
        // Handle request cancellation
    }

    private func getMimeType(forFileAt url: URL) -> String {
        let pathExtension = url.pathExtension.lowercased()

        if #available(iOS 14.0, *) {
            if let utType = UTType(filenameExtension: pathExtension),
               let mimeType = utType.preferredMIMEType {
                return mimeType
            }
        }

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
