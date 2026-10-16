import { useEffect, useRef, useState } from "react";
import { nav, site } from "../data/site";
import { Icon } from "./Icon";

export function Header() {
  const [open, setOpen] = useState(false);
  const toggleRef = useRef<HTMLButtonElement>(null);
  const panelRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (!open) return;
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") {
        setOpen(false);
        toggleRef.current?.focus();
      }
    };
    const onClick = (e: MouseEvent) => {
      const target = e.target as Node;
      if (!panelRef.current?.contains(target) && !toggleRef.current?.contains(target)) setOpen(false);
    };
    document.addEventListener("keydown", onKey);
    document.addEventListener("click", onClick);
    return () => {
      document.removeEventListener("keydown", onKey);
      document.removeEventListener("click", onClick);
    };
  }, [open]);

  const links = (
    <>
      {nav.map((item) => (
        <li key={item.href}>
          <a href={item.href} onClick={() => setOpen(false)}>
            {item.label}
          </a>
        </li>
      ))}
      <li>
        <a href={site.linkedin} target="_blank" rel="noopener noreferrer" className="nav-external">
          LinkedIn <Icon name="arrow-up-right" size={16} />
          <span className="visually-hidden"> (si apre in una nuova scheda)</span>
        </a>
      </li>
    </>
  );

  return (
    <header className="site-header">
      <div className="container site-header__inner">
        <a href="#top" className="brand">
          Antonio De Santis
        </a>
        <nav className="primary-nav" aria-label="Sezioni">
          <ul>{links}</ul>
        </nav>
        <button
          ref={toggleRef}
          type="button"
          className="menu-toggle"
          aria-expanded={open}
          aria-controls="mobile-menu"
          onClick={() => setOpen((o) => !o)}
        >
          <Icon name={open ? "close" : "menu"} />
          Menu
        </button>
      </div>
      <div id="mobile-menu" ref={panelRef} className="mobile-menu" hidden={!open}>
        <nav aria-label="Sezioni" className="container">
          <ul>{links}</ul>
        </nav>
      </div>
    </header>
  );
}
