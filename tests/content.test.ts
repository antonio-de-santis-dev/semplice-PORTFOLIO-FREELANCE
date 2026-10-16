import { existsSync, readdirSync, readFileSync, statSync } from "node:fs";
import { join } from "node:path";
import { describe, expect, it } from "vitest";
import { projects } from "../src/data/projects";
import { site } from "../src/data/site";

const root = join(__dirname, "..");

function walk(dir: string): string[] {
  return readdirSync(dir).flatMap((name) => {
    const p = join(dir, name);
    return statSync(p).isDirectory() ? walk(p) : [p];
  });
}

describe("lavori", () => {
  it("contiene i 5 progetti nell'ordine richiesto", () => {
    expect(projects.map((p) => p.slug)).toEqual(["la-moro", "menu-digitale", "gymplanner", "bollettalab", "boardroom"]);
  });

  it("etichetta correttamente progetti personali e collaborativi", () => {
    for (const p of projects) {
      expect(p.kind).toBe(p.slug === "boardroom" ? "Progetto personale collaborativo" : "Progetto personale");
    }
  });

  it("ha da 2 a 3 immagini per progetto, tutte presenti in AVIF, WebP e JPEG", () => {
    for (const p of projects) {
      expect(p.images.length).toBeGreaterThanOrEqual(2);
      expect(p.images.length).toBeLessThanOrEqual(3);
      for (const img of p.images) {
        expect(img.alt.length).toBeGreaterThan(20);
        expect(existsSync(join(root, "public/projects", `${img.src}.jpg`))).toBe(true);
        for (const w of img.widths) {
          expect(existsSync(join(root, "public/projects", `${img.src}-${w}.avif`)), `${img.src}-${w}.avif`).toBe(true);
          expect(existsSync(join(root, "public/projects", `${img.src}-${w}.webp`))).toBe(true);
        }
      }
    }
  });

  it("non usa lo screenshot di MenuDigitale con immagini rotte", () => {
    const srcs = projects.flatMap((p) => p.images.map((i) => i.src));
    expect(srcs).not.toContain("menu-digitale/cover");
    expect(existsSync(join(root, "public/projects/menu-digitale/cover.jpg"))).toBe(false);
  });
});

describe("vincoli di pubblicazione", () => {
  const files = [...walk(join(root, "src")), ...walk(join(root, "public")), join(root, "index.html")].filter((f) =>
    /\.(tsx?|css|html|svg|json|txt|xml)$/.test(f),
  );

  it("nessun riferimento a GitHub nei sorgenti pubblici", () => {
    for (const f of files) expect(readFileSync(f, "utf8"), f).not.toMatch(/github/i);
  });

  it("nessun dato personale sensibile del CV nei sorgenti", () => {
    // Frammenti volutamente parziali, per non riscrivere i dati nel test stesso.
    const forbidden = [/CA939/i, /388\s?904/, /Via Calimera/i, /desantisantonio/i, /73025/];
    for (const f of files) for (const re of forbidden) expect(readFileSync(f, "utf8"), `${f} ${re}`).not.toMatch(re);
  });

  it("LinkedIn approvato, email non pubblicata senza consenso", () => {
    expect(site.linkedin).toBe("https://www.linkedin.com/in/antonio-de-santis-740a27359/");
    expect(site.email).toBeNull();
  });
});
