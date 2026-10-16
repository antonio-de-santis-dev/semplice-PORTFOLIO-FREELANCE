/**
 * Configurazione pubblica della landing.
 * L'email resta `null` finché Antonio non approva esplicitamente di pubblicarla.
 */
export const site = {
  name: "Antonio De Santis",
  role: "Full Stack Web Developer Junior",
  linkedin: "https://www.linkedin.com/in/antonio-de-santis-740a27359/",
  email: null as string | null, // TODO(approvazione): es. "nome@dominio.it"
  title: "Antonio De Santis · Full Stack Web Developer Junior",
  description:
    "Sono Antonio De Santis, Full Stack Web Developer Junior. Realizzo landing page, siti web e applicazioni digitali su misura: ecco chi sono e i lavori che ho realizzato.",
};

export const nav = [
  { href: "#chi-sono", label: "Chi sono" },
  { href: "#progetti", label: "Lavori" },
  { href: "#esperienze", label: "Esperienze" },
];
