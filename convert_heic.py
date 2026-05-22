#!/usr/bin/env python3
"""
Batch HEIC to JPG converter.
Converts all HEIC files in a folder (and subfolders) to JPG.
Original HEIC files are deleted after successful conversion.

Usage:
    python convert_heic.py /path/to/your/folder
"""

import sys
import os
from pathlib import Path

def install_deps():
    import subprocess
    print("Installing pillow-heif and Pillow...")
    subprocess.check_call([sys.executable, "-m", "pip", "install", "pillow-heif", "Pillow", "-q"])

try:
    from pillow_heif import register_heif_opener
    from PIL import Image
except ImportError:
    install_deps()
    from pillow_heif import register_heif_opener
    from PIL import Image

register_heif_opener()

def convert_folder(folder_path: str):
    folder = Path(folder_path)
    if not folder.exists():
        print(f"Error: folder '{folder_path}' does not exist.")
        sys.exit(1)

    heic_files = list(folder.rglob("*.HEIC")) + list(folder.rglob("*.heic"))

    if not heic_files:
        print("No HEIC files found.")
        return

    print(f"Found {len(heic_files)} HEIC files. Converting...\n")

    ok, fail = 0, 0
    for heic_path in heic_files:
        jpg_path = heic_path.with_suffix(".jpg")
        try:
            img = Image.open(heic_path)
            img.convert("RGB").save(jpg_path, "JPEG", quality=95)
            heic_path.unlink()  # delete original HEIC
            print(f"  ✓  {heic_path.relative_to(folder)}")
            ok += 1
        except Exception as e:
            print(f"  ✗  {heic_path.relative_to(folder)} — {e}")
            fail += 1

    print(f"\nDone. {ok} converted, {fail} failed.")

if __name__ == "__main__":
    if len(sys.argv) < 2:
        print("Usage: python convert_heic.py /path/to/folder")
        sys.exit(1)
    convert_folder(sys.argv[1])
