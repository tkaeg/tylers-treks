#!/usr/bin/env python3
"""
Batch JPG → WebP converter. Converts all JPG/JPEG files in a folder
(and subfolders) to WebP at 80% quality, downscaling anything whose
longest edge exceeds MAX_EDGE px. Originals are deleted after
successful conversion.

Usage:
    python convert_to_webp.py /path/to/your/images/folder [max_edge]

    max_edge defaults to 2560. Pass 0 to disable resizing.
"""

import sys
from pathlib import Path

try:
    from PIL import Image, ImageOps
except ImportError:
    import subprocess
    print("Installing Pillow...")
    subprocess.check_call([sys.executable, "-m", "pip", "install", "Pillow", "-q"])
    from PIL import Image, ImageOps

MAX_EDGE = 2560  # cap the longest side; only downscales, never upscales

def convert_folder(folder_path: str, max_edge: int = MAX_EDGE):
    folder = Path(folder_path)
    if not folder.exists():
        print(f"Error: '{folder_path}' does not exist.")
        sys.exit(1)

    jpg_files = [f for f in folder.rglob("*") if f.suffix.lower() in ('.jpg', '.jpeg')]

    if not jpg_files:
        print("No JPG files found.")
        return

    cap = f", capping the long edge at {max_edge}px" if max_edge else ""
    print(f"Found {len(jpg_files)} JPG files. Converting to WebP at 80% quality{cap}...\n")

    ok, fail = 0, 0
    saved_kb = 0

    for jpg_path in sorted(jpg_files):
        webp_path = jpg_path.with_suffix(".webp")
        try:
            original_size = jpg_path.stat().st_size
            img = ImageOps.exif_transpose(Image.open(jpg_path)).convert("RGB")
            if max_edge and max(img.size) > max_edge:
                img.thumbnail((max_edge, max_edge), Image.LANCZOS)
            img.save(webp_path, "WEBP", quality=80, method=6)
            new_size = webp_path.stat().st_size
            saved_kb += (original_size - new_size) // 1024
            jpg_path.unlink()
            print(f"  ✓  {jpg_path.relative_to(folder)}  ({img.size[0]}x{img.size[1]})")
            ok += 1
        except Exception as e:
            print(f"  ✗  {jpg_path.relative_to(folder)} — {e}")
            fail += 1

    print(f"\nDone. {ok} converted, {fail} failed. ~{saved_kb:,} KB saved.")

if __name__ == "__main__":
    if len(sys.argv) < 2:
        print("Usage: python convert_to_webp.py /path/to/folder [max_edge]")
        sys.exit(1)
    edge = int(sys.argv[2]) if len(sys.argv) > 2 else MAX_EDGE
    convert_folder(sys.argv[1], edge)
