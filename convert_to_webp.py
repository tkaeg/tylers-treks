#!/usr/bin/env python3
"""
Batch JPG → WebP converter. Converts all JPG/JPEG files in a folder
(and subfolders) to WebP at 80% quality. Originals are deleted after
successful conversion.

Usage:
    python convert_to_webp.py /path/to/your/images/folder
"""

import sys
from pathlib import Path

try:
    from PIL import Image
except ImportError:
    import subprocess
    print("Installing Pillow...")
    subprocess.check_call([sys.executable, "-m", "pip", "install", "Pillow", "-q"])
    from PIL import Image

def convert_folder(folder_path: str):
    folder = Path(folder_path)
    if not folder.exists():
        print(f"Error: '{folder_path}' does not exist.")
        sys.exit(1)

    jpg_files = [f for f in folder.rglob("*") if f.suffix.lower() in ('.jpg', '.jpeg')]

    if not jpg_files:
        print("No JPG files found.")
        return

    print(f"Found {len(jpg_files)} JPG files. Converting to WebP at 80% quality...\n")

    ok, fail = 0, 0
    saved_kb = 0

    for jpg_path in sorted(jpg_files):
        webp_path = jpg_path.with_suffix(".webp")
        try:
            original_size = jpg_path.stat().st_size
            Image.open(jpg_path).convert("RGB").save(webp_path, "WEBP", quality=80)
            new_size = webp_path.stat().st_size
            saved_kb += (original_size - new_size) // 1024
            jpg_path.unlink()
            print(f"  ✓  {jpg_path.relative_to(folder)}")
            ok += 1
        except Exception as e:
            print(f"  ✗  {jpg_path.relative_to(folder)} — {e}")
            fail += 1

    print(f"\nDone. {ok} converted, {fail} failed. ~{saved_kb:,} KB saved.")

if __name__ == "__main__":
    if len(sys.argv) < 2:
        print("Usage: python convert_to_webp.py /path/to/folder")
        sys.exit(1)
    convert_folder(sys.argv[1])
