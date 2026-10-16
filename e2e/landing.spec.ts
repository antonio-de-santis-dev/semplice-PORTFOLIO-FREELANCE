import AxeBuilder from "@axe-core/playwright";
import { expect, test, type Page } from "@playwright/test";

const LINKEDIN = "https://www.linkedin.com/in/antonio-de-santis-740a27359/";
const isNarrow = (page: Page) => (page.viewportSize()?.width ?? 1440) < 760;

function trackConsole(page: Page) {
  const problems: string[] = [];
  page.on("console", (m) => {
    if (m.type() === "error" || m.type() === "warning") problems.push(`${m.type()}: ${m.text()}`);
  });
  page.on("pageerror", (e) => problems.push(`pageerror: ${e.message}`));
  page.on("response", (r) => {
    if (r.status() >= 400) problems.push(`${r.status()} ${r.url()}`);
  });
  return problems;
}

test("landing: contenuti, immagini, nessun errore, nessun overflow, nessun GitHub", async ({ page }) => {
  const problems = trackConsole(page);
  await page.goto("/");

  // Sopra la piega: nome, ruolo, foto e pulsante per i lavori.
  await expect(page.getByRole("heading", { level: 1 })).toHaveText("Ciao, sono Antonio De Santis.");
  await expect(page.getByText("Full Stack Web Developer Junior. Realizzo landing page")).toBeInViewport();
  const photo = page.getByRole("img", { name: /^Antonio De Santis: ritratto/ });
  await expect(photo).toBeInViewport();
  await expect(page.getByRole("link", { name: "Guarda i miei lavori" })).toBeInViewport();

  // Ordine delle sezioni e cinque lavori.
  const ids = await page.$$eval("main section[id]", (s) => s.map((x) => x.id));
  expect(ids).toEqual(["top", "chi-sono", "progetti", "esperienze", "competenze"]);
  await expect(page.locator("#progetti article h3")).toHaveText([
    "Agriturismo La Morò",
    "MenuDigitale",
    "GymPlanner",
    "BollettaLAB",
    "BoardRoom",
  ]);
  await expect(page.locator("#progetti article").last()).toContainText("Progetto personale collaborativo");

  // Nessun form, nessuna pagina separata: solo ancore interne e LinkedIn.
  await expect(page.locator("form")).toHaveCount(0);
  const hrefs = await page.$$eval("a[href]", (as) => as.map((a) => a.getAttribute("href")!));
  for (const h of hrefs) expect(h.startsWith("#") || h === LINKEDIN, h).toBe(true);
  for (const a of await page.locator(`a[href="${LINKEDIN}"]`).all()) {
    await expect(a).toHaveAttribute("target", "_blank");
    await expect(a).toHaveAttribute("rel", "noopener noreferrer");
  }

  // Tutte le immagini (anche lazy) si decodificano.
  const broken = await page.$$eval("img", async (imgs) => {
    const failed: string[] = [];
    await Promise.all(
      imgs.map(async (i) => {
        i.loading = "eager";
        try {
          await i.decode();
        } catch {
          failed.push(i.currentSrc || i.src);
        }
      }),
    );
    return failed;
  });
  expect(broken).toEqual([]);
  const overflow = await page.evaluate(() => document.documentElement.scrollWidth - document.documentElement.clientWidth);
  expect(overflow).toBeLessThanOrEqual(0);
  expect(await page.content()).not.toMatch(/github/i);
  await page.waitForLoadState("networkidle");
  expect(problems).toEqual([]);
});

test("navigazione per ancore e menu mobile", async ({ page }) => {
  await page.goto("/");
  if (isNarrow(page)) {
    const toggle = page.getByRole("button", { name: "Menu", exact: true });
    await toggle.click();
    await expect(toggle).toHaveAttribute("aria-expanded", "true");
    await page.keyboard.press("Escape");
    await expect(toggle).toHaveAttribute("aria-expanded", "false");
    await expect(toggle).toBeFocused();
    await toggle.click();
    await page.locator("#mobile-menu").getByRole("link", { name: "Esperienze" }).click();
    await expect(page.locator("#mobile-menu")).toBeHidden();
  } else {
    await page.locator(".primary-nav").getByRole("link", { name: "Esperienze" }).click();
  }
  await expect(page).toHaveURL(/#esperienze$/);
  await expect(page.getByRole("heading", { name: "Esperienze e formazione" })).toBeInViewport();

  await page.goto("/");
  await page.getByRole("link", { name: "Guarda i miei lavori" }).click();
  await expect(page).toHaveURL(/#progetti$/);
  await expect(page.getByRole("heading", { name: "I miei lavori" })).toBeInViewport();
});

test("galleria dei lavori: lightbox con frecce ed Esc", async ({ page }) => {
  await page.goto("/");
  const card = page.locator("#progetti article").filter({ hasText: "GymPlanner" });
  await card.getByRole("button", { name: /^Ingrandisci/ }).first().click();
  const dialog = page.getByRole("dialog", { name: /GymPlanner/ });
  await expect(dialog).toBeVisible();
  await expect(dialog).toContainText("1 di 3");
  await dialog.getByRole("button", { name: "Schermata successiva" }).click();
  await expect(dialog).toContainText("2 di 3");
  await page.keyboard.press("ArrowLeft");
  await expect(dialog).toContainText("1 di 3");
  await page.keyboard.press("Escape");
  await expect(dialog).toBeHidden();
});

test("tastiera: skip link e focus visibile", async ({ page }) => {
  await page.goto("/");
  await page.keyboard.press("Tab");
  const skip = page.getByRole("link", { name: "Vai al contenuto" });
  await expect(skip).toBeFocused();
  await expect(skip).toBeInViewport();
  await page.keyboard.press("Tab");
  const outline = await page.evaluate(() => getComputedStyle(document.activeElement!).outlineStyle);
  expect(outline).not.toBe("none");
});

test("accessibilità: nessuna violazione axe WCAG 2.2 AA", async ({ page }) => {
  await page.emulateMedia({ reducedMotion: "reduce" });
  await page.goto("/");
  const results = await new AxeBuilder({ page }).withTags(["wcag2a", "wcag2aa", "wcag21a", "wcag21aa", "wcag22aa"]).analyze();
  expect(results.violations.map((v) => `${v.id}: ${v.nodes.map((n) => n.target.join(" ")).join(", ")}`)).toEqual([]);
});
