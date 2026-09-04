#!/usr/bin/env python3
"""Convert + rename trip media into images/YYYYMMDD/ per a plan.json.

Usage:
    python3 build_trip_images.py plan.json

plan.json:
{
  "source_dirs": ["/abs/path/to/unzipped/photos"],   // searched recursively for stems
  "out_root": "images",                               // relative to repo root or absolute
  "max_edge": 2560,                                   // 0 disables resizing
  "webp_quality": 80,
  "groups": {
    "20260625": {                                     // -> images/20260625/
      "IMG_3082": "moro_rock_1",                      // stem (no ext) -> new base name
      "IMG_3305": "mist_falls_4"                      // a .MOV stem is copied as .mov
    }
  }
}

HEIC/JPEG -> WebP (quality, long edge capped at max_edge, EXIF orientation
applied). MOV/MP4 -> copied unchanged as lowercase .mov. Never upscales.
"""
import json
import shutil
import sys
from pathlib import Path

try:
    from PIL import Image, ImageOps
    import pillow_heif
except ImportError:
    import subprocess
    print("Installing Pillow + pillow-heif...", file=sys.stderr)
    subprocess.check_call([sys.executable, "-m", "pip", "install", "-q", "Pillow", "pillow-heif"])
    from PIL import Image, ImageOps
    import pillow_heif

pillow_heif.register_heif_opener()

VIDEO_EXT = {".mov", ".mp4", ".m4v"}


def find_src(dirs, stem):
    for d in dirs:
        for p in Path(d).rglob("*"):
            if p.is_file() and p.stem == stem and not p.name.startswith("._"):
                return p
    raise FileNotFoundError(f"no file with stem {stem!r} under {', '.join(map(str, dirs))}")


def main(plan_path):
    plan = json.loads(Path(plan_path).read_text())
    source_dirs = [Path(d) for d in plan["source_dirs"]]
    out_root = Path(plan.get("out_root", "images"))
    max_edge = int(plan.get("max_edge", 2560))
    quality = int(plan.get("webp_quality", 80))

    total = 0
    for datestr, mapping in plan["groups"].items():
        dest_dir = out_root / datestr
        dest_dir.mkdir(parents=True, exist_ok=True)
        for stem, newname in mapping.items():
            src = find_src(source_dirs, stem)
            if src.suffix.lower() in VIDEO_EXT:
                dst = dest_dir / f"{newname}.mov"
                shutil.copy2(src, dst)
                print(f"  copy  {src.name} -> {datestr}/{dst.name}")
            else:
                dst = dest_dir / f"{newname}.webp"
                img = ImageOps.exif_transpose(Image.open(src)).convert("RGB")
                if max_edge and max(img.size) > max_edge:
                    img.thumbnail((max_edge, max_edge), Image.LANCZOS)
                img.save(dst, "WEBP", quality=quality, method=6)
                print(f"  webp  {src.name} -> {datestr}/{dst.name}  {img.size[0]}x{img.size[1]}")
            total += 1

    print(f"\nDone. {total} files written under {out_root}/")


if __name__ == "__main__":
    if len(sys.argv) != 2:
        print(__doc__)
        sys.exit(1)
    main(sys.argv[1])
