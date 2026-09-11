#!/usr/bin/env bash
# Syncs static/images/film (raw camera-roll dump, gitignored) into
# content/film (the site's page bundle) so it matches what's on /film/:
# new photos are resized/copied in, and photos removed from the staging
# folder are deleted from content/film. Safe to re-run.
#
# Requires macOS `sips` (built in). Run from the repo root:
#   ./scripts/import-film-photos.sh
set -euo pipefail

SRC_DIR="static/images/film"
DEST_DIR="content/film"
MAX_DIM=1400
QUALITY=72

if [ ! -d "$SRC_DIR" ]; then
  echo "No $SRC_DIR directory found - nothing to import." >&2
  exit 1
fi

mkdir -p "$DEST_DIR"

added=0
skipped=0

shopt -s nullglob nocaseglob
for f in "$SRC_DIR"/*.jpeg "$SRC_DIR"/*.jpg "$SRC_DIR"/*.heic; do
  base="$(basename "$f")"
  name="${base%.*}.jpeg"
  dest="$DEST_DIR/$name"

  if [ -e "$dest" ]; then
    skipped=$((skipped + 1))
    continue
  fi

  if [[ "$f" == *.heic || "$f" == *.HEIC ]]; then
    sips -s format jpeg "$f" --out "$dest" >/dev/null
  else
    cp "$f" "$dest"
  fi

  width=$(sips -g pixelWidth "$dest" | awk '/pixelWidth/{print $2}')
  height=$(sips -g pixelHeight "$dest" | awk '/pixelHeight/{print $2}')
  if [ "$width" -gt "$MAX_DIM" ] || [ "$height" -gt "$MAX_DIM" ]; then
    sips -Z "$MAX_DIM" --setProperty formatOptions "$QUALITY" "$dest" >/dev/null
  fi

  added=$((added + 1))
done

tmp_expected=$(mktemp)
tmp_actual=$(mktemp)
trap 'rm -f "$tmp_expected" "$tmp_actual"' EXIT

for f in "$SRC_DIR"/*.jpeg "$SRC_DIR"/*.jpg "$SRC_DIR"/*.heic; do
  base="$(basename "$f")"
  echo "${base%.*}.jpeg"
done | sort -u > "$tmp_expected"

for f in "$DEST_DIR"/*.jpeg; do
  basename "$f"
done | sort -u > "$tmp_actual"

removed=0
while IFS= read -r name; do
  [ -z "$name" ] && continue
  rm -f "$DEST_DIR/$name"
  removed=$((removed + 1))
done < <(comm -23 "$tmp_actual" "$tmp_expected")

echo "Imported $added new photo(s), skipped $skipped already-imported, removed $removed no-longer-present photo(s)."
