/*
 * Dati biografici pubblicabili, dal CV e dalle informazioni fornite.
 * Esclusi: documento d'identità, indirizzo, data e luogo di nascita, numeri di telefono,
 * nomi dei datori di lavoro non informatici.
 */

export const timeline = [
  {
    period: "Dal 2026",
    title: "Tirocinio come developer · Zerodd",
    text: "Tirocinio di inserimento lavorativo come sviluppatore, dentro un team che lavora su progetti reali.",
  },
  {
    period: "2024 – 2026",
    title: "ITS Academy Apulia Digital · Tecnico Superiore Sviluppo Software",
    text: "Percorso di 1.800 ore tra aula, laboratori e progetti: Java e Spring Boot, database, front-end, lavoro in team. Concluso con 101/110.",
  },
  {
    period: "2016 – 2021",
    title: "Diploma tecnico, indirizzo Sistemi Informativi Aziendali",
    text: "Le prime basi di informatica applicata all'azienda.",
  },
];

/** Esperienze non informatiche: una riga, senza nomi dei datori di lavoro. */
export const before =
  "Prima dello sviluppo (2021 – 2025): stagioni in sala nella ristorazione e un'esperienza come rappresentante tecnico-commerciale nelle telecomunicazioni.";

export const skills = [
  { group: "Frontend", items: ["React", "TypeScript", "HTML", "CSS", "JavaScript"] },
  { group: "Backend", items: ["Java", "Spring Boot", "REST API"] },
  { group: "Database", items: ["MySQL", "PostgreSQL"] },
  { group: "Strumenti", items: ["Git", "Docker"] },
];
