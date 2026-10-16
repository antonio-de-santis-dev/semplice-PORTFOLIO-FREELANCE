# Antonio De Santis — landing personale (Versione A, dark premium)

Una sola pagina (`/`) da condividere nelle email di presentazione: hero con foto, chi sono,
5 lavori con screenshot reali e lightbox, esperienze, competenze, LinkedIn.
React 18 + TypeScript + Vite, prerenderizzata in HTML statico.

> **Stato:** in revisione sul branch `landing-page-semplificata`. La versione multipagina
> precedente è intatta su `main`. Nessun deploy, nessun merge senza approvazione.

## Comandi

```bash
npm install
npm run dev        # http://localhost:5173
npm run build      # typecheck + build + prerender in dist/
npm run preview    # http://localhost:4173
npm run lint
npm test           # Vitest
npm run test:e2e   # Playwright 390/768/1440/1920 px + axe
```

Produzione: `SITE_URL=https://tuodominio.it npm run build` (canonical, Open Graph, sitemap).
Anteprima non indicizzabile: `NOINDEX=1 npm run build`.

## Dove modificare
| Cosa | File |
|---|---|
| Testi della pagina | `src/App.tsx` |
| Lavori (ordine, frasi, tag, immagini) | `src/data/projects.ts` |
| Timeline e competenze | `src/data/profile.ts` |
| LinkedIn, email (solo se approvata), titolo e descrizione SEO | `src/data/site.ts` |
| Colori, font, spazi | `src/styles/tokens.css` · `docs/DESIGN.md` |

## Asset
- Screenshot: `npm run images -- "<cartella mok up>" public/projects` (mapping: `docs/assets-mapping.md`).
- Foto: `python3 -I scripts/build-photo.py <foto> public/profile` (solo ridimensionamento/compressione).
- Anteprima social e icona: `node scripts/brand-assets.mjs`.

## Da confermare prima della pubblicazione
1. Email pubblica (oggi non mostrata).
2. Dati ITS (1.800 ore, 101/110) e stato attuale del tirocinio Zerodd.
3. Screenshot nuovo di MenuDigitale; foto profilo in risoluzione più alta, se disponibile.
4. Dominio/hosting e `SITE_URL`.

Documentazione: `docs/DESIGN.md`, `docs/qa-report.md`, `docs/assets-mapping.md`,
`docs/content-sources.md`, `docs/skill-audit.md`. Nessun cookie, tracker o backend.
