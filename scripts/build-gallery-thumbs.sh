#!/usr/bin/env bash
# Generate ~800px web thumbnails for the photo gallery.
#
#   images/wedding-gallery/<Category>/<name>.jpg
#     -> images/wedding-gallery/thumbs/<Category>/<name>.jpg
#
# Idempotent: skips any thumbnail that already exists. To rebuild, delete the
# thumbs/ tree (or a category subfolder) and re-run. Requires macOS `sips`.
set -euo pipefail

ROOT="images/wedding-gallery"
THUMBS="$ROOT/thumbs"
MAX_EDGE=800
QUALITY=60

if ! command -v sips >/dev/null 2>&1; then
  echo "error: sips not found (macOS only)" >&2
  exit 1
fi

generated=0
skipped=0

while IFS= read -r -d '' src; do
  rel="${src#"$ROOT"/}"          # e.g. "Ceremony/foo.jpg"
  dest="$THUMBS/$rel"
  mkdir -p "$(dirname "$dest")"
  if [ -f "$dest" ]; then
    skipped=$((skipped + 1))
    continue
  fi
  sips -Z "$MAX_EDGE" -s formatOptions "$QUALITY" "$src" --out "$dest" >/dev/null
  generated=$((generated + 1))
  echo "  thumb: $rel"
done < <(find "$ROOT" -mindepth 2 -maxdepth 2 -type f -iname '*.jpg' -not -path "$THUMBS/*" -print0)

echo "Done. Generated: $generated, up-to-date (skipped): $skipped"
