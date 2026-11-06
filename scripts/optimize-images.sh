#!/usr/bin/env bash
# Make web-sized WebP copies of every JPEG/PNG in site/images/.
#
#   scripts/optimize-images.sh            # all photos
#   scripts/optimize-images.sh veg.jpg    # just one
#
# For each photo it writes <name>-640.webp and <name>-1280.webp next to the
# original. index.html points at those via srcset; the browser picks the
# smallest one that still looks sharp on that screen. Originals stay (used
# for og:image and as the source for next time).
#
# Needs cwebp (brew install webp). Re-run after dropping in Mac's photos,
# then update the <img> tags in index.html (see docs/runbook.md §8).
set -euo pipefail

cd "$(dirname "$0")/../site/images"

command -v cwebp >/dev/null || { echo "cwebp not found: brew install webp" >&2; exit 1; }

QUALITY=72
WIDTHS=(640 1280)

if [ $# -gt 0 ]; then
  files=("$@")
else
  shopt -s nullglob
  files=(*.jpg *.jpeg *.png)
fi

for src in "${files[@]}"; do
  name="${src%.*}"
  for w in "${WIDTHS[@]}"; do
    out="${name}-${w}.webp"
    # -resize W 0 keeps the aspect ratio; never upscale past the original.
    orig_w=$(sips -g pixelWidth "$src" | awk '/pixelWidth/{print $2}')
    target=$(( w < orig_w ? w : orig_w ))
    cwebp -quiet -q "$QUALITY" -m 6 -metadata none -resize "$target" 0 "$src" -o "$out"
    printf '%-24s %6s KB\n' "$out" "$(( $(stat -f%z "$out") / 1024 ))"
  done
done
