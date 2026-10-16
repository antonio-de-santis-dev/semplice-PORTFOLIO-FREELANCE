// Genera public/og-image.jpg (1200×630) e public/apple-touch-icon.png (180×180) con Playwright.
// Uso: node scripts/brand-assets.mjs   (dopo `npm run images` e scripts/build-photo.py)
import { chromium } from "@playwright/test";
import { mkdtempSync, writeFileSync } from "node:fs";
import { tmpdir } from "node:os";
import { dirname, join } from "node:path";
import { fileURLToPath, pathToFileURL } from "node:url";

const root = join(dirname(fileURLToPath(import.meta.url)), "..");
const font = (pkg, file) => pathToFileURL(join(root, "node_modules/@fontsource-variable", pkg, "files", file)).href;
const photo = pathToFileURL(join(root, "public/profile/antonio-de-santis-400.webp")).href;

const css = `
@font-face { font-family: Display; src: url(${font("bricolage-grotesque", "bricolage-grotesque-latin-wght-normal.woff2")}); font-weight: 200 800; }
@font-face { font-family: Body; src: url(${font("figtree", "figtree-latin-wght-normal.woff2")}); font-weight: 300 900; }
* { margin: 0; box-sizing: border-box; }
body { background: #0d0e0c; color: #eeeee6; font-family: Body; }
.mark { display: grid; place-items: center; background: #c8f26d; color: #0d0e0c; font-family: Display; font-weight: 760; letter-spacing: -0.04em; }
`;

const og = `<!doctype html><style>${css}
.og { width: 1200px; height: 630px; padding: 72px; display: grid; grid-template-columns: 1fr 360px; gap: 64px; align-items: center; }
h1 { font-family: Display; font-weight: 640; font-size: 78px; line-height: .98; letter-spacing: -0.035em; }
p { margin-top: 28px; font-size: 30px; line-height: 1.3; color: #a9ac9f; max-width: 560px; }
p strong { color: #c8f26d; font-weight: 600; }
.photo { width: 360px; height: 450px; border-radius: 22px; overflow: hidden; }
.photo img { width: 100%; height: 100%; object-fit: cover; object-position: 58% 30%; }
</style>
<div class="og">
  <div>
    <h1>Ciao, sono Antonio De Santis.</h1>
    <p><strong>Full Stack Web Developer Junior.</strong> Landing page, siti web e applicazioni digitali su misura.</p>
  </div>
  <div class="photo"><img src="${photo}"></div>
</div>`;

const icon = `<!doctype html><style>${css} body{background:#c8f26d}</style>
<div class="mark" style="width:180px;height:180px;font-size:84px">AD</div>`;

const dir = mkdtempSync(join(tmpdir(), "brand-"));
const browser = await chromium.launch();
const page = await browser.newPage({ viewport: { width: 1200, height: 630 } });

writeFileSync(join(dir, "og.html"), og);
await page.goto(pathToFileURL(join(dir, "og.html")).href, { waitUntil: "networkidle" });
await page.evaluate(() => document.fonts.ready);
await page.screenshot({ path: join(root, "public/og-image.jpg"), type: "jpeg", quality: 82 });

await page.setViewportSize({ width: 180, height: 180 });
writeFileSync(join(dir, "icon.html"), icon);
await page.goto(pathToFileURL(join(dir, "icon.html")).href, { waitUntil: "networkidle" });
await page.evaluate(() => document.fonts.ready);
await page.screenshot({ path: join(root, "public/apple-touch-icon.png") });

await browser.close();
console.log("og-image.jpg e apple-touch-icon.png generati");
