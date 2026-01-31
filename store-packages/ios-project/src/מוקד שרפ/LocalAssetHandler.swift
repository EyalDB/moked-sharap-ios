import Foundation
import WebKit
import UniformTypeIdentifiers

/// Custom URL scheme handler for loading local assets from the app bundle
/// This solves the WKWebView CORS issues with file:// protocol
class LocalAssetHandler: NSObject, WKURLSchemeHandler {

    private var wwwFolderPath: String?

    override init() {
        super.init()
        // Find the www folder on initialization
        wwwFolderPath = findWWWFolder()
        print("LocalAssetHandler: Initialized with www path: \(wwwFolderPath ?? "NOT FOUND")")
    }

    private func findWWWFolder() -> String? {
        let bundle = Bundle.main

        print("LocalAssetHandler: Bundle path: \(bundle.bundlePath)")

        // Try different ways to find the www folder

        // Method 1: Direct path in bundle
        let directPath = bundle.bundlePath + "/www"
        if FileManager.default.fileExists(atPath: directPath) {
            print("LocalAssetHandler: Found www at direct path: \(directPath)")
            return directPath
        }

        // Method 2: Using Bundle.main.url
        if let wwwURL = bundle.url(forResource: "www", withExtension: nil) {
            print("LocalAssetHandler: Found www via Bundle.url: \(wwwURL.path)")
            return wwwURL.path
        }

        // Method 3: Using Bundle.main.path
        if let wwwPath = bundle.path(forResource: "www", ofType: nil) {
            print("LocalAssetHandler: Found www via Bundle.path: \(wwwPath)")
            return wwwPath
        }

        // Method 4: Search in bundle resource path
        if let resourcePath = bundle.resourcePath {
            let resourceWWW = resourcePath + "/www"
            if FileManager.default.fileExists(atPath: resourceWWW) {
                print("LocalAssetHandler: Found www in resourcePath: \(resourceWWW)")
                return resourceWWW
            }
        }

        // Debug: List bundle contents
        print("LocalAssetHandler: www folder NOT FOUND. Listing bundle contents:")
        do {
            let contents = try FileManager.default.contentsOfDirectory(atPath: bundle.bundlePath)
            for item in contents {
                print("  - \(item)")
            }
        } catch {
            print("LocalAssetHandler: Error listing bundle: \(error)")
        }

        return nil
    }

    func webView(_ webView: WKWebView, start urlSchemeTask: WKURLSchemeTask) {
        guard let url = urlSchemeTask.request.url else {
            print("LocalAssetHandler: Invalid URL in request")
            urlSchemeTask.didFailWithError(NSError(domain: "LocalAssetHandler", code: -1, userInfo: [NSLocalizedDescriptionKey: "Invalid URL"]))
            return
        }

        print("LocalAssetHandler: Request for URL: \(url.absoluteString)")

        // Get the file path from the custom scheme
        var filePath = url.path

        // Remove leading slash
        if filePath.hasPrefix("/") {
            filePath = String(filePath.dropFirst())
        }

        // Default to index.html for root
        if filePath.isEmpty {
            filePath = "index.html"
        }

        print("LocalAssetHandler: Resolved file path: \(filePath)")

        // Check if we have a valid www folder
        guard let wwwPath = wwwFolderPath else {
            print("LocalAssetHandler: ERROR - www folder not found in bundle!")
            urlSchemeTask.didFailWithError(NSError(domain: "LocalAssetHandler", code: -3, userInfo: [NSLocalizedDescriptionKey: "www folder not found in bundle"]))
            return
        }

        // Build full file path
        let fullPath = wwwPath + "/" + filePath

        print("LocalAssetHandler: Full path: \(fullPath)")

        // Check if file exists
        guard FileManager.default.fileExists(atPath: fullPath) else {
            print("LocalAssetHandler: File NOT FOUND at: \(fullPath)")

            // List www folder contents for debugging
            do {
                let contents = try FileManager.default.contentsOfDirectory(atPath: wwwPath)
                print("LocalAssetHandler: Contents of www folder:")
                for item in contents {
                    print("  - \(item)")
                }
            } catch {
                print("LocalAssetHandler: Error listing www: \(error)")
            }

            urlSchemeTask.didFailWithError(NSError(domain: "LocalAssetHandler", code: -2, userInfo: [NSLocalizedDescriptionKey: "File not found: \(filePath)"]))
            return
        }

        do {
            let fileURL = URL(fileURLWithPath: fullPath)
            let data = try Data(contentsOf: fileURL)
            let mimeType = getMimeType(forFileAt: fileURL)

            print("LocalAssetHandler: Serving \(filePath) (\(data.count) bytes, \(mimeType))")

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
