"""Genera le immagini ottimizzate dei case study a partire dalle PNG originali di mokup.zip.

Uso: python3 -I scripts/build-images.py "<cartella mok up>" public/projects

Il mapping file -> progetto e' stato fatto ispezionando visivamente ogni immagine
(vedi docs/assets-mapping.md), non dal nome del file. Gli originali non vengono copiati
nel repository: si pubblicano solo le versioni AVIF/WebP/JPEG ridimensionate.
"""

import sys
from pathlib import Path

from PIL import Image

# (sorgente, slug progetto, nome output, crop opzionale (l, t, r, b) in px sull'originale)
# Le "cover" eliminano la didascalia in inglese in alto e lasciano solo browser + telefono.
STAGE = (0, 150, 1600, 1200)
MAPPING = [
    ("COVER (2).png", "la-moro", "cover", STAGE),
    ("COVER (7).png", "la-moro", "hero-mobile", STAGE),
    ("DESKTOP (2).png", "la-moro", "prenotazione-desktop", None),
    # ("FEATURES (1).png", "la-moro", "sezioni", None),  # escluso: contiene foto segnaposto (vedi docs/assets-mapping.md)
    # MenuDigitale: lo screenshot originale mostra logo e icone non caricati. Si pubblicano solo
    # ritagli che li escludono (piatti su desktop, lista piatti su mobile) finché non arriva uno nuovo.
    ("COVER (4).png", "menu-digitale", "piatti-desktop", (315, 310, 1200, 1090)),
    ("COVER (4).png", "menu-digitale", "piatti-mobile", (1250, 615, 1515, 1135)),
    ("COVER (6).png", "gymplanner", "cover", STAGE),
    ("COVER.png", "gymplanner", "editor-schede", STAGE),
    ("DESKTOP (1).png", "gymplanner", "progressi-desktop", None),
    ("FEATURES-2 (1).png", "gymplanner", "funzionalita", None),
    ("COVER (1).png", "bollettalab", "cover", STAGE),
    ("COVER (1).png", "bollettalab", "confronto-desktop", (80, 168, 1240, 1104)),
    ("COVER (1).png", "bollettalab", "mobile", (1236, 512, 1534, 1160)),
    ("COVER (5).png", "boardroom", "cover", STAGE),
    ("DESKTOP.png", "boardroom", "bacheca-desktop", None),
    ("FEATURES.png", "boardroom", "funzionalita-1", None),
    ("FEATURES-2.png", "boardroom", "funzionalita-2", None),
    ("MOBILE.png", "boardroom", "mobile", None),
]

WIDTHS = [800, 1600]


def main(src_dir: Path, out_dir: Path) -> None:
    for name, slug, out_name, crop in MAPPING:
        im = Image.open(src_dir / name).convert("RGB")
        if crop:
            im = im.crop(crop)
        target = out_dir / slug
        target.mkdir(parents=True, exist_ok=True)
        widths = [w for w in WIDTHS if w <= im.width] or [im.width]
        for w in widths:
            h = round(im.height * w / im.width)
            resized = im.resize((w, h), Image.LANCZOS)
            resized.save(target / f"{out_name}-{w}.avif", quality=58)
            resized.save(target / f"{out_name}-{w}.webp", quality=80, method=6)
        largest = widths[-1]
        fallback = im.resize((largest, round(im.height * largest / im.width)), Image.LANCZOS)
        fallback.save(target / f"{out_name}.jpg", quality=80, optimize=True, progressive=True)
        print(f"{name:22} -> {slug}/{out_name} {im.size}")


if __name__ == "__main__":
    main(Path(sys.argv[1]), Path(sys.argv[2]))
