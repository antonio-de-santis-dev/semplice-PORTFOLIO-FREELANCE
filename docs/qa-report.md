# QA report — landing semplificata (16 ottobre 2026)

Ambiente: container Linux, Node 22, Chromium (Playwright 1.56), build servita con `vite preview`.

| Controllo | Risultato |
|---|---|
| `tsc -b` strict, ESLint | ✅ nessun errore |
| Vitest | ✅ 7/7: 5 progetti nell'ordine giusto, etichette personale/collaborativo, immagini presenti, screenshot rotto di MenuDigitale escluso, nessun «github», nessun dato del CV, email non pubblicata |
| Playwright | ✅ 20/20 (5 test × 390, 768, 1440, 1920 px), stabile su 2 esecuzioni consecutive |
| axe-core WCAG 2.2 A/AA | ✅ 0 violazioni ai 4 viewport |
| Scansione `dist/` | ✅ nessun «github», dato personale, URL fittizio o source map |

Gli E2E verificano: titolo, ruolo, foto e CTA visibili senza scorrere; ordine delle sezioni;
5 card con titoli corretti e BoardRoom «collaborativo»; nessun form; nessun link oltre alle
ancore e a LinkedIn (`target="_blank"`, `rel="noopener noreferrer"`); immagini decodificate;
nessun overflow orizzontale; console senza errori/warning e nessuna risorsa in errore; menu
mobile (apertura, Esc con ritorno del focus, chiusura al tocco); ancore; lightbox con frecce,
contatore ed Esc; skip link e focus visibile.

## Lighthouse 12 (locale)

| Profilo | Performance | Accessibilità | Best practice | SEO | LCP | CLS | Peso |
|---|---|---|---|---|---|---|---|
| mobile | 99 | 100 | 100 | 100 | 1,8 s | 0 | 173 KiB |
| desktop | 100 | 100 | 100 | 100 | 0,4 s | 0 | 228 KiB |

JS 159 kB (51 kB gzip, prima 221 kB), CSS 13 kB (4 kB gzip).

## Revisione visiva
Screenshot reali in `docs/screenshots/` (390, 768, 1440, 1920 px: prima schermata e pagina intera).
Corretto durante la revisione: su mobile la foto era sotto i pulsanti → spostata sopra il titolo e
ridotta, così nome, foto, ruolo e pulsante stanno nella prima schermata a 390×844.

## Non verificato / da fare
- Firefox e WebKit non installati nell'ambiente (configurabili con `PW_ALL_BROWSERS=1`).
- `SITE_URL` di produzione non ancora definito: senza, canonical, `og:url`, `og:image` e sitemap
  vengono omessi di proposito (niente URL fittizi). Va impostato al momento del deploy.
- La foto originale è 400×400: su schermi retina appare leggermente morbida; un originale ≥ 800 px
  migliorerebbe la resa.
- MenuDigitale: serve uno screenshot nuovo (vedi `docs/assets-mapping.md`).
