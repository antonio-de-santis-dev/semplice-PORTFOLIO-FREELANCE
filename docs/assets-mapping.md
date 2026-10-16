# Mapping immagini `mokup.zip` → progetto

> Landing semplificata: per ogni card si usano 2–3 immagini (vedi `src/data/projects.ts`).
> Foto profilo: file allegato da Antonio (400×400 px), solo ridimensionata e compressa con
> `scripts/build-photo.py` in `public/profile/`. Nessun ritocco; ritaglio 4:5 solo via CSS
> (`object-position: 58% 30%`). Un originale più grande (≥ 800 px) renderebbe meglio su schermi retina.

Tutte le 15 PNG della cartella `mok up/` sono state aperte e ispezionate una per una: il progetto è
stato attribuito dal **contenuto visivo** (titolo nella composizione, interfaccia, logo), non dal nome
del file. Gli originali non sono nel repository: `scripts/build-images.py` produce AVIF + WebP
(800/1600 px) e un JPEG di fallback in `public/projects/<slug>/`.

| # | File originale | Dimensioni | Progetto | Tipo | Contenuto verificato | Output | Uso |
|---|---|---|---|---|---|---|---|
| 1 | `COVER (1).png` | 1600×1200 | BollettaLAB | cover | Confronto «Anna Esempio» desktop + telefono | `bollettalab/cover`, ritagli `confronto-desktop`, `mobile` | cover + galleria |
| 2 | `COVER (2).png` | 1600×1200 | Agriturismo La Morò | cover | Hero con logo, desktop + telefono | `la-moro/cover` | cover, hero Home, OG |
| 3 | `COVER (4).png` | 1600×1200 | MenuDigitale | cover | Menù con categorie aperte, desktop + telefono | solo ritagli `menu-digitale/piatti-desktop`, `piatti-mobile` (senza logo e icone rotte) | card |
| 4 | `COVER (5).png` | 1600×1200 | BoardRoom | cover | Dashboard statistiche + evento su telefono | `boardroom/cover` | cover, hero Home |
| 5 | `COVER (6).png` | 1600×1200 | GymPlanner | cover | Sessione guidata con timer, desktop + telefono | `gymplanner/cover` | cover, hero Home, OG |
| 6 | `COVER (7).png` | 1600×1200 | Agriturismo La Morò | cover (variante) | Hero desktop + coverflow menù su telefono | `la-moro/hero-mobile` | galleria |
| 7 | `COVER.png` | 1600×1200 | GymPlanner | cover (variante) | Editor schede admin + sessione su telefono | `gymplanner/editor-schede` | galleria |
| 8 | `DESKTOP (1).png` | 1600×1000 | GymPlanner | desktop | Progressi mensili e record | `gymplanner/progressi-desktop` | galleria |
| 9 | `DESKTOP (2).png` | 1600×1000 | Agriturismo La Morò | desktop | Piatti su prenotazione (agnello) | `la-moro/prenotazione-desktop` | galleria |
| 10 | `DESKTOP.png` | 1600×1000 | BoardRoom | desktop | Bacheca evento pubblico | `boardroom/bacheca-desktop` | galleria |
| 11 | `FEATURES (1).png` | 1600×1200 | Agriturismo La Morò | features | Coverflow, ambiente, chi siamo, piatti su prenotazione mobile | — | **esclusa**: non generata né pubblicata (vedi sotto) |
| 12 | `FEATURES-2 (1).png` | 1600×1200 | GymPlanner | features | Catalogo esercizi, dettaglio utente, storico, musica | `gymplanner/funzionalita` | galleria |
| 13 | `FEATURES-2.png` | 1600×1200 | BoardRoom | features | Tipo evento, gestione prenotazioni, storico, bacheca mobile | `boardroom/funzionalita-2` | galleria |
| 14 | `FEATURES.png` | 1600×1200 | BoardRoom | features | Ricerca sale, calendario, prenotazioni, creazione evento | `boardroom/funzionalita-1` | galleria |
| 15 | `MOBILE.png` | 1200×1500 | BoardRoom | mobile | Due telefoni 390×844: prenotazioni e dashboard | `boardroom/mobile` | galleria |

Le "cover" sono ritagliate (`y = 150 → 1200`) per togliere la didascalia in inglese stampata nella
composizione: resta solo browser + telefono, senza alterare l'interfaccia.

## Problemi visibili negli screenshot (da sostituire)

1. **MenuDigitale (`COVER (4).png`)** — logo e icone freccia non caricati: si vedono il testo
   alternativo «Logo Agriturismo La Moró» e icone d'immagine rotta. Causa verificata nel sorgente:
   `Logo.png` e `FreccaMenu.png` sono referenziati ma non presenti nella cartella del progetto.
   È l'unica immagine del progetto: nella landing si usano **solo due ritagli** che escludono logo e
   icone rotte (`piatti-desktop` taglia il bordo destro delle card). **Serve un nuovo screenshot**.
2. **La Morò (`FEATURES (1).png`)** — nel coverflow compare la foto di un gatto come segnaposto e
   nella sezione Ambiente è visibile il testo «foto — sostituisci mantenendo questo nome file».
   Per questo la composizione **non è pubblicata** nella galleria. Va rifatta con le foto definitive.
3. **BollettaLAB** — una sola composizione disponibile (1 su 15): la galleria usa due ritagli della
   stessa immagine. Consigliati 2–3 screenshot aggiuntivi (storico, area impresa, PDF generato).
4. Tutte le composizioni hanno sfondo chiaro: nel sito sono presentate su un "passe-partout" chiaro
   (`--plate`) per non creare bordi casuali sul fondo scuro.

## Asset non ricevuti

- `Logo.png` (logo La Morò) e `DE SANTIS ANTONIO (1).pdf` (attestato ITS) **non erano presenti**
  tra i file caricati. Il logo non serve al sito (è già visibile negli screenshot); i dati ITS
  (1.800 ore, 101/110, 2026) sono presi dal brief e restano **da verificare** sull'attestato.
- Nessuna foto personale fornita: nessun ritratto inserito né generato.
