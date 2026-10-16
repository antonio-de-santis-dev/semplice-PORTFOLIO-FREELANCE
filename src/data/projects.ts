import type { Project, ProjectImage } from "./types";

/*
 * I cinque lavori. Fonti: screenshot di mokup.zip (mapping in docs/assets-mapping.md) e lettura,
 * in sola lettura, dei sorgenti dei progetti. Nessun link ai repository, nessun cliente,
 * metrica o funzionalità inventati.
 */

const COVER = { width: 1600, height: 1050, widths: [800, 1600] };
const DESKTOP = { width: 1600, height: 1000, widths: [800, 1600] };
const SHEET = { width: 1600, height: 1200, widths: [800, 1600] };

function img(src: string, alt: string, caption: string, size: Omit<ProjectImage, "src" | "alt" | "caption">): ProjectImage {
  return { src, alt, caption, ...size };
}

export const projects: Project[] = [
  {
    slug: "la-moro",
    title: "Agriturismo La Morò",
    kind: "Progetto personale",
    sentence:
      "Sito vetrina one-page per un agriturismo con ristorante: hero fotografica, menù sfogliabile, piatti su prenotazione, prodotti e contatti.",
    tags: ["HTML", "CSS", "JavaScript"],
    images: [
      img("la-moro/cover", "Home del sito Agriturismo La Morò su desktop e smartphone: foto serale del giardino tra gli ulivi, logo e pulsanti Scopri il menù e Vieni a trovarci.", "Hero su desktop e smartphone.", COVER),
      img("la-moro/prenotazione-desktop", "Sezione Piatti su prenotazione: foto dell'agnello con prezzo a porzione e l'elenco dei piatti selezionabili.", "Piatti su prenotazione con prezzo a porzione.", DESKTOP),
      img("la-moro/hero-mobile", "Smartphone con il menù a coverflow sul piatto Involtini e bombette, accanto alla versione desktop.", "Su smartphone il menù si scorre col dito.", COVER),
    ],
  },
  {
    slug: "menu-digitale",
    title: "MenuDigitale",
    kind: "Progetto personale",
    sentence:
      "Menù web per ristorante da consultare al tavolo: categorie che si aprono con un tocco, prezzi e descrizioni in italiano e inglese.",
    tags: ["HTML", "CSS", "JavaScript"],
    images: [
      img("menu-digitale/piatti-desktop", "Menù su desktop con il coperto, le categorie Antipasti e Primi piatti e tre primi con la descrizione in inglese.", "Categorie e piatti con traduzione inglese.", { width: 885, height: 780, widths: [800] }),
      img("menu-digitale/piatti-mobile", "Menù su smartphone: Antipasto casereccio a 11 euro, Frittini misti a 9 euro e Formaggi misti a 9,50 euro, con descrizioni in due lingue.", "Antipasti su smartphone, con prezzi.", { width: 265, height: 520, widths: [265] }),
    ],
  },
  {
    slug: "gymplanner",
    title: "GymPlanner",
    kind: "Progetto personale",
    sentence:
      "Web app per palestre: l'istruttore crea le schede, chi si allena le segue serie per serie con timer di recupero e consulta lo storico.",
    tags: ["React", "TypeScript", "Java Spring Boot", "PostgreSQL"],
    images: [
      img("gymplanner/cover", "Sessione di allenamento su desktop e smartphone: Panca piana bilanciere, serie 3 di 4, timer di recupero a 20 secondi.", "Sessione guidata con timer di recupero.", COVER),
      img("gymplanner/editor-schede", "Editor della scheda Push, petto e spalle: esercizi per sezione con serie, ripetizioni e recupero.", "Editor delle schede per l'istruttore.", COVER),
      img("gymplanner/progressi-desktop", "Grafico dei progressi mensili con il volume registrato per mese e la sezione dei record.", "Storico e progressi mensili.", DESKTOP),
    ],
  },
  {
    slug: "bollettalab",
    title: "BollettaLAB",
    kind: "Progetto personale",
    sentence:
      "Simulatore per confrontare offerte di luce e gas sugli stessi consumi, con storico dei confronti e proposta scaricabile in PDF.",
    tags: ["React", "TypeScript", "Java Spring Boot", "MySQL"],
    images: [
      img("bollettalab/cover", "Confronto su desktop e smartphone: bolletta attuale 912,70 euro, offerta proposta 670,01 euro, risparmio nel periodo 242,69 euro.", "Confronto tra bolletta attuale e offerta proposta.", COVER),
      img("bollettalab/confronto-desktop", "Workspace desktop con menu laterale, riepilogo dei costi e grafico delle due offerte.", "Workspace di confronto su desktop.", { width: 1160, height: 936, widths: [800] }),
      img("bollettalab/mobile", "Smartphone con il confronto di un cliente demo e il pulsante Scarica PDF.", "Riepilogo e PDF su smartphone.", { width: 298, height: 648, widths: [298] }),
    ],
    note: "Dati dimostrativi; pagamenti solo simulati.",
  },
  {
    slug: "boardroom",
    title: "BoardRoom",
    kind: "Progetto personale collaborativo",
    sentence:
      "Piattaforma per prenotare sale riunioni ed eventi: disponibilità, eventi pubblici e privati, calendario e statistiche per l'amministrazione.",
    tags: ["Angular", "TypeScript", "Spring Boot"],
    images: [
      img("boardroom/cover", "Dashboard di BoardRoom su desktop con prenotazioni totali, confermate e tasso di occupazione; su smartphone un evento pubblico.", "Dashboard e bacheca eventi.", COVER),
      img("boardroom/funzionalita-1", "Quattro schermate: ricerca sale disponibili, calendario delle prenotazioni, Le tue prenotazioni e creazione evento su smartphone.", "Ricerca sale, calendario e prenotazioni.", SHEET),
      img("boardroom/mobile", "Due smartphone: la pagina Le tue prenotazioni con i filtri e la dashboard con le statistiche.", "Versione mobile.", { width: 1200, height: 1500, widths: [800] }),
    ],
    note: "Realizzato in un team di due persone.",
  },
];
