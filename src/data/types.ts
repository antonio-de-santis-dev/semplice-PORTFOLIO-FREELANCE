export type ProjectKind = "Progetto personale" | "Progetto personale collaborativo";

export interface ProjectImage {
  /** Percorso base senza estensione, relativo a /projects (es. "la-moro/cover"). */
  src: string;
  alt: string;
  caption: string;
  width: number;
  height: number;
  /** Larghezze disponibili per srcset. */
  widths: number[];
}

export interface Project {
  slug: string;
  title: string;
  kind: ProjectKind;
  /** Cosa è, in una frase. */
  sentence: string;
  /** Pochi tag tecnici. */
  tags: string[];
  /** Fino a 3 immagini: la prima è quella principale della card. */
  images: ProjectImage[];
  /** Nota breve e verificabile, solo se serve (es. lavoro in team). */
  note?: string;
}
