# Skill audit (landing semplificata)

Le risorse sono state lette (sola lettura, nessuno script d'installazione eseguito) durante la
prima versione; per questa revisione ho riapplicato le stesse regole alla pagina singola.

| Risorsa | Letta | Applicata nella landing |
|---|---|---|
| Impeccable (`SKILL.md`, `craft-floor.md`) | ✅ | Modalità *Experience*; niente eyebrow/kicker sopra i titoli; niente card icona+titolo+testo; ombra con offset; focus e selezione a tema; verifica sul render reale ai 4 breakpoint |
| Taste Skill (`references/tells.md`) | ✅ | Niente gradient text, glow, glass, badge «available», numerazione decorativa, mono come costume |
| Emil Kowalski (`improve-animations`, `AUDIT.md`) | ✅ | Curve forti come token, UI < 300 ms, press `scale(.97)`, niente `ease-in`, reduced-motion |
| UI UX Pro Max, Awesome DESIGN.md | ✅ (clonati) | Gerarchia e scala fluida; struttura di `docs/DESIGN.md` |
| Skill `ui-ux-design` e `Skill-programmazione-` (personali) | ✅ | Semantica link/button, un h1, alt, target ≥ 44 px, focus 2 px, link comprensibili fuori contesto, colore mai unico indicatore |
| Formazione (personale) | ✅ (clonato) | Solo contesto; non citato |
| Playwright | ✅ usato | 20 test E2E + axe ai 4 viewport; screenshot con `scripts/screens.mjs` |
| Playwright Agent CLI | ⚠️ non usato | Sostituito da script Playwright equivalenti |
