#!/usr/bin/env bash
# Re-encode the site's media into web-friendly formats.
#
# Requires ffmpeg on PATH (Windows: `choco install ffmpeg` or `winget install ffmpeg`).
# Run from the repository root:   bash scripts/optimize-media.sh
#
# Originals are never modified or deleted: every output is written next to its
# source with a new extension. After checking the results, update the paths in
# src/projectManager.js, src/Utils/assets.js and index.html, then delete the
# originals you no longer need.

set -euo pipefail
shopt -s nullglob  # skip patterns with no matches

if ! command -v ffmpeg >/dev/null 2>&1; then
  echo "ffmpeg not found. Install it first (e.g. 'choco install ffmpeg')." >&2
  exit 1
fi

FF=(ffmpeg -hide_banner -loglevel error -y)
cd "$(dirname "$0")/.."

size() { du -h "$1" | cut -f1; }

# 1. GIF screen recordings -> looping MP4 (H.264, plays everywhere) ----------
for gif in public/pictures/*/*.gif; do
  out="${gif%.gif}.mp4"
  "${FF[@]}" -i "$gif" -an -movflags +faststart -pix_fmt yuv420p \
    -vf "scale=trunc(iw/2)*2:trunc(ih/2)*2" -c:v libx264 -preset slow -crf 26 "$out"
  echo "GIF   $gif ($(size "$gif")) -> $out ($(size "$out"))"
done

# 2. 3D-room screen videos -> small, silent MP4 + poster frame ---------------
# They only cover a few hundred pixels on screen, so 640px wide is plenty.
for video in public/textures/rampage.mp4 public/textures/messenger.mp4; do
  [ -f "$video" ] || continue
  base="${video%.mp4}"
  "${FF[@]}" -i "$video" -an -movflags +faststart -pix_fmt yuv420p \
    -vf "scale=640:-2" -c:v libx264 -preset slow -crf 28 "${base}.min.mp4"
  "${FF[@]}" -i "${base}.min.mp4" -frames:v 1 -q:v 3 "${base}.jpg"
  echo "VIDEO $video ($(size "$video")) -> ${base}.min.mp4 ($(size "${base}.min.mp4")) + ${base}.jpg"
done

# 3. Large screenshots/photos -> WebP, max 1600px wide ------------------------
for img in public/pictures/spaceera/blender.png public/pictures/spaceera/moon.png \
           public/pictures/spaceera/home_view.png public/pictures/room/blender.png \
           public/pictures/room/irl.jpg; do
  [ -f "$img" ] || continue
  out="${img%.*}.webp"
  "${FF[@]}" -i "$img" -vf "scale='min(1600,iw)':-2" -c:v libwebp -quality 80 "$out"
  echo "IMAGE $img ($(size "$img")) -> $out ($(size "$out"))"
done

# 4. Profile photo -> 480x480 square WebP (shown at 240x240, 2x for retina) ---
photo=public/pictures/personal/aside.jpg
if [ -f "$photo" ]; then
"${FF[@]}" -i "$photo" -vf "crop='min(iw,ih)':'min(iw,ih)',scale=480:480" \
  -c:v libwebp -quality 82 public/pictures/personal/aside.webp
echo "PHOTO $photo ($(size "$photo")) -> public/pictures/personal/aside.webp ($(size public/pictures/personal/aside.webp))"
fi

# 5. Favicons from the profile picture ----------------------------------------
if [ -f public/screenshots/pfp.png ]; then
  "${FF[@]}" -i public/screenshots/pfp.png -vf "scale=32:32" public/favicon-32.png
  "${FF[@]}" -i public/screenshots/pfp.png -vf "scale=180:180" public/apple-touch-icon.png
  echo "ICONS public/favicon-32.png, public/apple-touch-icon.png"
fi

echo
echo "Done. Next: point the code at the new files (see the comment at the top of this script)."
