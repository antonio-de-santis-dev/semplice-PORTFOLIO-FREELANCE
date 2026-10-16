import { useEffect, useRef, useState } from "react";
import type { Project } from "../data/types";
import { Icon } from "./Icon";
import { Picture } from "./Picture";

interface Props {
  project: Project;
  flip?: boolean;
  priority?: boolean;
}

export function ProjectCard({ project, flip = false, priority = false }: Props) {
  const dialogRef = useRef<HTMLDialogElement>(null);
  const [index, setIndex] = useState<number | null>(null);
  const [main, ...others] = project.images;
  const count = project.images.length;

  const open = (i: number) => {
    setIndex(i);
    dialogRef.current?.showModal();
  };
  const close = () => dialogRef.current?.close();
  const step = (delta: number) => setIndex((i) => (i === null ? i : (i + delta + count) % count));

  useEffect(() => {
    if (index === null) return;
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "ArrowRight") step(1);
      if (e.key === "ArrowLeft") step(-1);
    };
    document.addEventListener("keydown", onKey);
    return () => document.removeEventListener("keydown", onKey);
  });

  const active = index === null ? null : project.images[index];
  const titleId = `${project.slug}-title`;

  return (
    <article className={`work${flip ? " work--flip" : ""}`} aria-labelledby={titleId} data-reveal="">
      <button type="button" className="work__media zoom-btn" onClick={() => open(0)} aria-label={`Ingrandisci: ${main.caption}`}>
        <span className="plate">
          <Picture image={main} sizes="(min-width: 1000px) 720px, 100vw" priority={priority} />
        </span>
      </button>

      <div className="work__body">
        <p className="tag tag--kind">{project.kind}</p>
        <h3 id={titleId}>{project.title}</h3>
        <p className="muted">{project.sentence}</p>
        <ul className="tag-list" aria-label="Tecnologie">
          {project.tags.map((t) => (
            <li key={t} className="tag">
              {t}
            </li>
          ))}
        </ul>
        {project.note && <p className="work__note">{project.note}</p>}
        {others.length > 0 && (
          <div className="work__thumbs">
            <p className="work__thumbs-label">Altre schermate</p>
            <ul>
              {others.map((image, i) => (
                <li key={image.src}>
                  <button type="button" className="thumb zoom-btn" onClick={() => open(i + 1)} aria-label={`Ingrandisci: ${image.caption}`}>
                    <span className="plate">
                      <Picture image={image} sizes="160px" />
                    </span>
                  </button>
                </li>
              ))}
            </ul>
          </div>
        )}
      </div>

      <dialog
        ref={dialogRef}
        className="lightbox"
        aria-label={`${project.title}: schermate`}
        onClose={() => setIndex(null)}
        onClick={(e) => {
          if (e.target === e.currentTarget) close();
        }}
      >
        {active && index !== null && (
          <>
            <div className="lightbox__bar">
              <p aria-live="polite">
                {active.caption}{" "}
                <span className="lightbox__count">
                  {index + 1} di {count}
                </span>
              </p>
              <div className="lightbox__controls">
                {count > 1 && (
                  <>
                    <button type="button" className="icon-btn" onClick={() => step(-1)} aria-label="Schermata precedente">
                      <Icon name="arrow-left" />
                    </button>
                    <button type="button" className="icon-btn" onClick={() => step(1)} aria-label="Schermata successiva">
                      <Icon name="arrow-right" />
                    </button>
                  </>
                )}
                <button type="button" className="icon-btn" onClick={close} aria-label="Chiudi" autoFocus>
                  <Icon name="close" />
                </button>
              </div>
            </div>
            <div className="lightbox__image">
              <Picture image={active} sizes="100vw" />
            </div>
          </>
        )}
      </dialog>
    </article>
  );
}
