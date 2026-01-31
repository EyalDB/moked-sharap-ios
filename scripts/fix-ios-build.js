/**
 * Post-build script to fix iOS build for WKWebView compatibility
 *
 * WKWebView cannot load ES modules from file:// URLs due to CORS restrictions.
 * This script:
 * 1. Removes type="module" from script tags (IIFE doesn't need it)
 * 2. Removes crossorigin attribute (not needed for local files)
 * 3. Removes Google Fonts import (not available offline)
 */

import { readFileSync, writeFileSync } from "fs";
import { join } from "path";

const distDir = join(process.cwd(), "dist-ios");

// Fix index.html
const htmlPath = join(distDir, "index.html");
let html = readFileSync(htmlPath, "utf-8");

// Remove type="module" and crossorigin from script tags
html = html.replace(/<script type="module" crossorigin/g, "<script");
html = html.replace(/<script type="module"/g, "<script");
html = html.replace(/ crossorigin/g, "");

writeFileSync(htmlPath, html);
console.log("✓ Fixed index.html - removed module type and crossorigin");

// Fix JS bundle - remove Google Fonts import
const assetsDir = join(distDir, "assets");
import { readdirSync } from "fs";
const jsFiles = readdirSync(assetsDir).filter((f) => f.endsWith(".js"));

for (const jsFile of jsFiles) {
  const jsPath = join(assetsDir, jsFile);
  let js = readFileSync(jsPath, "utf-8");

  // Remove Google Fonts import - replace with system fonts
  js = js.replace(
    /@import"https:\/\/fonts\.googleapis\.com\/css2\?[^"]*"/g,
    "",
  );
  js = js.replace(
    /@import url\(['"]*https:\/\/fonts\.googleapis\.com\/css2\?[^)]*\)['"]*;?/g,
    "",
  );

  // Update font-family to use system fonts as primary
  js = js.replace(
    /font-family:\s*Inter/g,
    'font-family:-apple-system,BlinkMacSystemFont,"Segoe UI",Roboto,Inter',
  );

  writeFileSync(jsPath, js);
  console.log(`✓ Fixed ${jsFile} - removed Google Fonts import`);
}

console.log("\n✅ iOS build fixed for offline WKWebView loading");
