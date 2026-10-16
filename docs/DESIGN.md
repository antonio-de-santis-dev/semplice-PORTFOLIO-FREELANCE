# DESIGN.md — Landing personale · Versione A (dark premium)

## 1. Scopo e scena d'uso

Una sola pagina da incollare nelle email di presentazione a ristoranti, palestre, aziende e
professionisti. Chi la apre (spesso dal telefono) deve capire in 5–10 secondi **chi è Antonio,
cosa fa e quali lavori ha realizzato**. Nessun funnel da agenzia: niente form, preventivi,
servizi o pagine di dettaglio.

- **Modalità (Impeccable):** *Experience*: la persona e i lavori guidano, l'interfaccia arretra.
- **Personalità:** diretta, umana, precisa. Foto vera e screenshot veri come protagonisti.

## 2. Struttura (una route `/`)

| Ancora | Sezione | Contenuto |
|---|---|---|
| `#top` | Hero | «Ciao, sono Antonio De Santis.», ruolo, 2–3 frasi, foto, 2 CTA (lavori, LinkedIn) |
| `#chi-sono` | Chi sono | 2 paragrafi in prima persona |
| `#progetti` | I miei lavori | 5 card grandi alternate: screenshot principale, nome, tipo, una frase, tag, miniature con lightbox |
| `#esperienze` | Esperienze e formazione | timeline di 3 voci + una riga sulle esperienze precedenti |
| `#competenze` | Competenze | 4 righe raggruppate |
| — | Footer | nome, ruolo, LinkedIn, «CV disponibile su richiesta» |

Navbar sticky (68 px, non copre i contenuti grazie a `scroll-padding-top`) con logo testuale,
3 ancore e un solo link esterno (LinkedIn). Su mobile: pulsante «Menu» con pannello a tendina,
Esc per chiudere, chiusura al tocco su un link.

## 3. Colore (token in `src/styles/tokens.css`, invariati dalla Versione A)

| Token | HEX | Uso | Contrasto su `--bg` |
|---|---|---|---|
| `--bg` | `#0D0E0C` | fondo | — |
| `--surface-1` | `#151714` | sezioni alternate, footer | — |
| `--surface-2` | `#1E211D` | tag, pulsanti icona | — |
| `--surface-3` | `#2A2E28` | separatori decorativi | — |
| `--line-strong` | `#6E7267` | bordi di controlli | 3.9 : 1 |
| `--ink` | `#EEEEE6` | testo | 16.6 : 1 |
| `--ink-muted` | `#A9AC9F` | testo secondario | 8.4 : 1 |
| `--ink-subtle` | `#868A7E` | note | 5.5 : 1 |
| `--accent` | `#C8F26D` | unico accento: CTA primaria, focus, tipo di progetto, date | 15.1 : 1 |
| `--plate` | `#ECE8DF` | passe-partout chiaro dietro gli screenshot | — |

## 4. Tipografia

Bricolage Grotesque Variable (titoli) e Figtree Variable (testo), self-hosted con `@fontsource`,
licenza SIL OFL 1.1. Fallback: `"Arial Narrow", system-ui` / `system-ui, -apple-system, "Segoe UI", Roboto`.
Display `clamp(2.6rem … 5.6rem)`, tracking −0.035em, `text-wrap: balance`; corpo 17 px / 1.65.

## 5. Foto profilo

Il file originale allegato (400×400) è solo ridimensionato e compresso (AVIF/WebP/JPEG).
Il ritaglio 4:5 avviene via CSS con `object-position: 58% 30%`, così volto e testa restano interi.
Desktop: 400 px a destra del testo. Tablet e mobile: 200/136 px sopra il titolo, così nome,
foto, ruolo e pulsante stanno nella prima schermata a 390×844.

## 6. Spaziatura, griglia, forme

Contenitore 1240 px, gutter `clamp(16px, 4vw, 40px)`; scala 4/8/12/16/24/32/48/64/96/128;
card lavori 7/5 alternate da 1000 px; raggi 6/12/20 px; un'ombra sola con offset e blur.

## 7. Motion

`--ease-out: cubic-bezier(0.23, 1, 0.32, 1)`; pulsanti `scale(.97)` in 160 ms; lightbox 240 ms;
reveal leggero (opacity + 12 px) solo sotto la piega e solo con JS. Niente intro, loader, parallax
o 3D. `prefers-reduced-motion: reduce` toglie tutti i movimenti.

## 8. Accessibilità

Un `h1`; sezioni con `aria-labelledby`; skip link; focus 2 px accento con offset; target ≥ 44 px;
alt descrittivi; lightbox su `<dialog>` nativo (Esc, frecce, pulsanti etichettati, contatore
«1 di 3»); LinkedIn con `target="_blank" rel="noopener noreferrer"` e avviso per screen reader.

## 9. Cosa è stato tolto rispetto alla versione multipagina (resta sul branch `main`)

Pagine Servizi, Progetti con filtri, 5 pagine di dettaglio, Chi sono, Contatti con form;
React Router; CTA di preventivo; pila animata di screenshot nell'hero (sostituita dalla foto).
