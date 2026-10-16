"""Ottimizza la foto profilo senza ritocchi: solo ridimensionamento e compressione (mai ingrandita).

Uso: python3 -I scripts/build-photo.py <foto originale> public/profile
"""

import sys
from pathlib import Path

from PIL import Image, ImageOps


def main(src: Path, out: Path) -> None:
    im = ImageOps.exif_transpose(Image.open(src)).convert("RGB")
    out.mkdir(parents=True, exist_ok=True)
    widths = sorted({w for w in (320, 480, 640, im.width) if w <= im.width})
    for w in widths:
        r = im if w == im.width else im.resize((w, round(im.height * w / im.width)), Image.LANCZOS)
        r.save(out / f"antonio-de-santis-{w}.avif", quality=70)
        r.save(out / f"antonio-de-santis-{w}.webp", quality=86, method=6)
    im.save(out / "antonio-de-santis.jpg", quality=88, optimize=True, progressive=True)
    print("larghezze:", widths, "originale:", im.size)


if __name__ == "__main__":
    main(Path(sys.argv[1]), Path(sys.argv[2]))
