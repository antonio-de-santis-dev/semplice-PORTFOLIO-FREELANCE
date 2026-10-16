import { useEffect } from "react";
import { Header } from "./components/Header";
import { Icon } from "./components/Icon";
import { ProjectCard } from "./components/ProjectCard";
import { before, skills, timeline } from "./data/profile";
import { projects } from "./data/projects";
import { site } from "./data/site";

const linkedinProps = { href: site.linkedin, target: "_blank", rel: "noopener noreferrer" } as const;

function NewTab() {
  return <span className="visually-hidden"> (si apre in una nuova scheda)</span>;
}

function useReveal() {
  // Reveal leggero solo sotto la piega e solo con JS: senza JS il contenuto è visibile.
  useEffect(() => {
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches || !("IntersectionObserver" in window)) return;
    const observer = new IntersectionObserver(
      (entries) => {
        for (const entry of entries) {
          if (entry.isIntersecting) {
            (entry.target as HTMLElement).dataset.reveal = "shown";
            observer.unobserve(entry.target);
          }
        }
      },
      { rootMargin: "0px 0px -8% 0px" },
    );
    for (const el of document.querySelectorAll<HTMLElement>("[data-reveal]")) {
      if (el.getBoundingClientRect().top > window.innerHeight) {
        el.dataset.reveal = "hidden";
        observer.observe(el);
      }
    }
    return () => observer.disconnect();
  }, []);
}

export function App() {
  useReveal();
  return (
    <>
      <a className="skip-link" href="#contenuto">
        Vai al contenuto
      </a>
      <Header />
      <main id="contenuto" tabIndex={-1}>
        <section id="top" className="hero" aria-labelledby="hero-title">
          <div className="container hero__grid">
            <div className="hero__text">
              <h1 id="hero-title">Ciao, sono Antonio De Santis.</h1>
              <p className="hero__subtitle">
                Full Stack Web Developer Junior. Realizzo landing page, siti web e applicazioni digitali su misura.
              </p>
              <p className="lead">
                Mi piace costruire cose semplici da usare: pagine chiare per far conoscere un'attività e strumenti che tolgono
                lavoro ripetitivo. Qui sotto trovi i progetti che ho realizzato, con le schermate vere.
              </p>
              <div className="actions">
                <a href="#progetti" className="btn btn--primary">
                  Guarda i miei lavori <Icon name="arrow-down" size={18} />
                </a>
                <a {...linkedinProps} className="btn btn--secondary">
                  Il mio LinkedIn <Icon name="arrow-up-right" size={18} />
                  <NewTab />
                </a>
              </div>
            </div>
            <figure className="hero__photo">
              <picture>
                <source type="image/avif" srcSet="/profile/antonio-de-santis-320.avif 320w, /profile/antonio-de-santis-400.avif 400w" sizes="(min-width: 1000px) 400px, 200px" />
                <source type="image/webp" srcSet="/profile/antonio-de-santis-320.webp 320w, /profile/antonio-de-santis-400.webp 400w" sizes="(min-width: 1000px) 400px, 200px" />
                <img
                  src="/profile/antonio-de-santis.jpg"
                  alt="Antonio De Santis: ritratto all'aperto, occhiali e maglietta nera, seduto in una piazza."
                  width={400}
                  height={400}
                  decoding="async"
                  {...{ fetchpriority: "high" }}
                />
              </picture>
            </figure>
          </div>
        </section>

        <section id="chi-sono" className="section section--tone" aria-labelledby="about-title">
          <div className="container split">
            <h2 id="about-title">Chi sono</h2>
            <div className="prose" data-reveal="">
              <p>
                Sono uno sviluppatore junior italiano. Ho concluso un percorso ITS in sviluppo software e sto facendo un tirocinio
                come developer. Nel frattempo ho realizzato da solo, e in un caso in team, i progetti che vedi qui sotto: dal sito
                di un agriturismo a web app con front-end React e back-end Java.
              </p>
              <p>
                Cerco soluzioni chiare, responsive e funzionali, senza effetti inutili. Gli anni passati a lavorare in sala mi
                aiutano a capire di cosa ha bisogno un'attività locale: risposte rapide per i clienti e strumenti facili da
                aggiornare.
              </p>
            </div>
          </div>
        </section>

        <section id="progetti" className="section" aria-labelledby="work-title">
          <div className="container">
            <div className="section-head">
              <h2 id="work-title">I miei lavori</h2>
              <p className="lead">
                Cinque progetti personali, uno dei quali sviluppato in team. Tocca un'immagine per vedere le schermate più grandi.
              </p>
            </div>
            <div className="work-list">
              {projects.map((p, i) => (
                <ProjectCard key={p.slug} project={p} flip={i % 2 === 1} />
              ))}
            </div>
          </div>
        </section>

        <section id="esperienze" className="section section--tone" aria-labelledby="exp-title">
          <div className="container split">
            <h2 id="exp-title">Esperienze e formazione</h2>
            <div>
              <ol className="timeline">
                {timeline.map((t) => (
                  <li key={t.title} data-reveal="">
                    <span className="timeline__period">{t.period}</span>
                    <h3>{t.title}</h3>
                    <p>{t.text}</p>
                  </li>
                ))}
              </ol>
              <p className="before">{before}</p>
            </div>
          </div>
        </section>

        <section id="competenze" className="section" aria-labelledby="skills-title">
          <div className="container split">
            <h2 id="skills-title">Competenze</h2>
            <dl className="skills">
              {skills.map((g) => (
                <div key={g.group}>
                  <dt>{g.group}</dt>
                  <dd>{g.items.join(" · ")}</dd>
                </div>
              ))}
            </dl>
          </div>
        </section>
      </main>

      <footer className="site-footer">
        <div className="container site-footer__inner">
          <div>
            <p className="site-footer__name">{site.name}</p>
            <p className="muted">{site.role}</p>
          </div>
          <div className="site-footer__actions">
            <a {...linkedinProps} className="btn btn--primary">
              LinkedIn <Icon name="arrow-up-right" size={18} />
              <NewTab />
            </a>
            {site.email && (
              <a href={`mailto:${site.email}`} className="btn btn--secondary">
                {site.email}
              </a>
            )}
          </div>
          <p className="site-footer__note">CV disponibile su richiesta. Nessun cookie o tracciamento su questa pagina.</p>
        </div>
      </footer>
    </>
  );
}
