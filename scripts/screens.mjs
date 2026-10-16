// Screenshot di revisione della landing: node scripts/screens.mjs <outdir> [baseUrl]
import { chromium } from "@playwright/test";
const out = process.argv[2] ?? "qa-screens";
const base = process.argv[3] ?? "http://localhost:4173";
const viewports = { "390": [390, 844], "768": [768, 1024], "1440": [1440, 900], "1920": [1920, 1080] };
const browser = await chromium.launch();
for (const [name, [width, height]] of Object.entries(viewports)) {
  const page = await browser.newPage({ viewport: { width, height }, reducedMotion: "reduce" });
  await page.goto(base + "/", { waitUntil: "networkidle" });
  await page.evaluate(async () => {
    for (let y = 0; y < document.body.scrollHeight; y += 600) {
      window.scrollTo(0, y);
      await new Promise((r) => setTimeout(r, 60));
    }
    window.scrollTo(0, 0);
  });
  await page.waitForTimeout(300);
  await page.screenshot({ path: `${out}/landing-${name}-viewport.png` });
  await page.screenshot({ path: `${out}/landing-${name}-full.png`, fullPage: true });
  console.log(name);
  await page.close();
}
await browser.close();
