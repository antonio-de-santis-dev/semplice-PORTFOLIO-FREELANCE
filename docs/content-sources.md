# Fonti dei contenuti e dati personali

## Repository analizzati (sola lettura, mai linkati)

Clonati in una cartella temporanea esterna al progetto, senza commit né push. Nessun URL, nome
repository o username compare nel sito (verificato da test automatici su sorgenti e HTML generato).

| Progetto | Cosa è stato verificato | Fonte principale |
|---|---|---|
| Agriturismo La Morò | One-page HTML/CSS/JS vanilla; sezioni hero, chi siamo, menù, prodotti, ambiente, contatti (mappa, link telefonico); menu mobile, parallax, reveal; foto in parte segnaposto | README, `index.html` |
| MenuDigitale | HTML/CSS/JS; 9 categorie a fisarmonica + coperto; descrizioni IT/EN; **nessun** pannello admin né generatore QR; immagini `Logo.png`/`FreccaMenu.png` mancanti | `index.html`, `MenuJS.js` |
| GymPlanner | Java 21, Spring Boot 4, PostgreSQL 16, Flyway, React 19, TS, Vite, Playwright; ruoli ADMIN/USER; schede, sessioni in rotazione, timer, storico, musica | README, `frontend/src` |
| BollettaLAB | 5 microservizi Spring Boot, MySQL per servizio, React, Nginx, Docker; luce/gas/business; titolare + 2 agenti; PDF; storico; admin. **Pagamenti simulati**, nessun addebito reale | README, `docs/CONSEGNA.md` |
| BoardRoom | JHipster 8, Spring Boot, Angular; sale, prenotazioni con stati, eventi pubblici/privati, lista d'attesa | README, JDL, cronologia git |

### Attribuzione BoardRoom
La cronologia di tutti i branch mostra **due persone** (circa 159 commit di Antonio, 97 dell'altra
persona). I commit di Antonio riguardano soprattutto backend: user story di prenotazione,
autorizzazioni (`SecurityConfig`, eliminazione prenotazioni), capienza e sovrapposizioni, email di
conferma, collegamento frontend-backend, test, immagine Docker, refactoring. Quelli dell'altra persona
riguardano soprattutto le pagine dell'interfaccia (prenota sala, le mie prenotazioni, storico,
dettaglio evento, amministrazione). Il sito usa **«Progetto personale collaborativo»** e una
formulazione prudente del ruolo. **Da confermare con Antonio** prima della pubblicazione.

## PDF ricevuti

Ricevuto solo `CV_antonio_de_santis.pdf`. L'attestato ITS non era tra gli allegati.

| Dato | Stato | Note |
|---|---|---|
| Nome, ruolo «Developer», competenze tecniche, lingue (IT madrelingua, EN B2) | **Pubblicato** | |
| Diploma tecnico economico, articolazione SIA (2016–2021) | **Pubblicato** | senza nome della scuola né città |
| ITS Academy 2024–2026 | **Pubblicato** | il CV dice «frequentante» con fine 08/07/2026; il brief indica certificazione conclusa, 1.800 ore, 101/110 → usato il brief, **da verificare** sull'attestato |
| Tirocinio developer presso Zerodd, dal 01/2026 | **Pubblicato** | presentato come tirocinio |
| Esperienze da cameriere e rappresentante commerciale | **Pubblicato in forma sintetica** | senza nomi dei datori di lavoro (dati di terzi) |
| Email, telefono, WhatsApp | **Da approvare** | `site.email` in `src/data/site.ts` è `null` |
| Profilo LinkedIn | **Pubblicato** | approvato nel brief della landing |
| Carta d'identità, indirizzo, luogo di nascita, CAP | **Vietato pubblicare** | assenti da sorgenti, bundle e build (test automatico) |
| CV originale | **Vietato pubblicare** | non copiato nel progetto; la bozza redatta resta solo sul branch `main`; nella landing «CV disponibile su richiesta» |

## Profili pubblici
Upwork e LinkedIn non sono stati consultati (richiedono login per i dettagli): tutti i contenuti
derivano da CV, brief e repository. Nessun link Upwork nel sito.
