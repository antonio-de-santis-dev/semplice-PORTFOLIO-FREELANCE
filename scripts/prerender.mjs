// Prerender della landing (unica route "/") con metadati SEO, sitemap e robots.
// SITE_URL=https://dominio.it imposta canonical/OG; NOINDEX=1 per le anteprime.
import { readFileSync, rmSync, writeFileSync } from "node:fs";
import { dirname, join } from "node:path";
import { fileURLToPath, pathToFileURL } from "node:url";

const root = join(dirname(fileURLToPath(import.meta.url)), "..");
const dist = join(root, "dist");
const { render, site } = await import(pathToFileURL(join(root, "dist-ssr", "entry-server.js")).href);
const noindex = process.env.NOINDEX === "1";
const siteUrl = process.env.SITE_URL?.replace(/\/$/, "");
if (!siteUrl) console.warn("⚠ SITE_URL non impostato: canonical, og:url e sitemap vengono omessi (impostalo per la produzione).");

const escape = (s) => s.replace(/&/g, "&amp;").replace(/"/g, "&quot;").replace(/</g, "&lt;");

const jsonLd = {
  "@context": "https://schema.org",
  "@type": "Person",
  name: site.name,
  jobTitle: site.role,
  sameAs: [site.linkedin],
  ...(siteUrl ? { url: siteUrl + "/" } : {}),
  knowsAbout: ["Sviluppo web", "React", "TypeScript", "Java", "Spring Boot"],
};

const head = [
  siteUrl && `<link rel="canonical" href="${siteUrl}/" />`,
  `<meta property="og:type" content="profile" />`,
  `<meta property="og:locale" content="it_IT" />`,
  `<meta property="og:title" content="${escape(site.title)}" />`,
  `<meta property="og:description" content="${escape(site.description)}" />`,
  siteUrl && `<meta property="og:url" content="${siteUrl}/" />`,
  siteUrl && `<meta property="og:image" content="${siteUrl}/og-image.jpg" />`,
  `<meta name="twitter:card" content="summary_large_image" />`,
  noindex && `<meta name="robots" content="noindex" />`,
  `<script type="application/ld+json">${JSON.stringify(jsonLd)}</script>`,
]
  .filter(Boolean)
  .join("\n    ");

const html = readFileSync(join(dist, "index.html"), "utf8")
  .replace(/<title>.*?<\/title>/, `<title>${escape(site.title)}</title>`)
  .replace(/<meta name="description" content=".*?" \/>/, `<meta name="description" content="${escape(site.description)}" />`)
  .replace("<!--head-meta-->", head)
  .replace("<!--app-html-->", render());
writeFileSync(join(dist, "index.html"), html);

writeFileSync(
  join(dist, "robots.txt"),
  noindex ? "User-agent: *\nDisallow: /\n" : `User-agent: *\nAllow: /\n${siteUrl ? `\nSitemap: ${siteUrl}/sitemap.xml\n` : ""}`,
);
if (siteUrl) {
  writeFileSync(
    join(dist, "sitemap.xml"),
    `<?xml version="1.0" encoding="UTF-8"?>\n<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">\n  <url><loc>${siteUrl}/</loc></url>\n</urlset>\n`,
  );
}
rmSync(join(root, "dist-ssr"), { recursive: true, force: true });
console.log("prerender / completato");
