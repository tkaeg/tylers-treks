#!/usr/bin/env python3
"""Print DateTimeOriginal + GPS for photos, to sort them into trip sub-stops.

Usage:
    python3 read_exif.py PHOTO [PHOTO ...]

Output (tab-separated, one line per file):
    IMG_1234.HEIC <TAB> 2026:06:25 09:16:50 <TAB> (36.55251, -118.76141, 2008.1)

GPS is (lat, lon, altitude_m) or None. HEIC needs `pillow-heif`; the script
installs it and Pillow on first run if missing.
"""
import os
import sys

try:
    from PIL import Image, ExifTags
    import pillow_heif
except ImportError:
    import subprocess
    print("Installing Pillow + pillow-heif...", file=sys.stderr)
    subprocess.check_call([sys.executable, "-m", "pip", "install", "-q", "Pillow", "pillow-heif"])
    from PIL import Image, ExifTags
    import pillow_heif

pillow_heif.register_heif_opener()


def dms_to_deg(dms, ref):
    d, m, s = (float(x) for x in dms)
    deg = d + m / 60 + s / 3600
    return -deg if ref in ("S", "W") else deg


def get_gps(exif):
    try:
        gps = exif.get_ifd(ExifTags.IFD.GPSInfo)
    except Exception:
        return None
    if not gps:
        return None
    lat, latref = gps.get(2), gps.get(1)
    lon, lonref = gps.get(4), gps.get(3)
    alt = gps.get(6)
    if lat is None or lon is None:
        return None
    return (
        round(dms_to_deg(lat, latref), 5),
        round(dms_to_deg(lon, lonref), 5),
        round(float(alt), 1) if alt is not None else None,
    )


def main(paths):
    for f in sorted(paths):
        base = os.path.basename(f)
        try:
            exif = Image.open(f).getexif()
            dt = None
            try:
                ex = exif.get_ifd(ExifTags.IFD.Exif)
                dt = ex.get(0x9003) or ex.get(0x9004)  # DateTimeOriginal / Digitized
            except Exception:
                pass
            dt = dt or exif.get(0x0132)  # DateTime
            print(f"{base}\t{dt}\t{get_gps(exif)}")
        except Exception as e:
            print(f"{base}\tERR\t{e}")


if __name__ == "__main__":
    if len(sys.argv) < 2:
        print(__doc__)
        sys.exit(1)
    main(sys.argv[1:])
