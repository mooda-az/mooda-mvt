#!/usr/bin/env bash
# MVT-ni mooda-mvt-1-ə yayımlayır: ARM64 image-i burada qurur, ssh ilə göndərir, compose-u yeniləyir.
# İlk dəfə: serverdə /opt/mooda-mvt/.env olmalıdır (DATABASE_URL=...).
set -euo pipefail

HOST="${HOST:-mooda-mvt-1}"
DIR=/opt/mooda-mvt
HERE="$(cd "$(dirname "$0")" && pwd)"
REPO="$(dirname "$HERE")"
DOCKERFILE="${DOCKERFILE:-$REPO/../mooda-local-runnable-env/docker/mvt.Dockerfile}"

docker buildx build --platform linux/arm64 -f "$DOCKERFILE" --build-arg PORT=3200 \
  -t mooda/mooda-mvt:prod --load "$REPO"
docker save mooda/mooda-mvt:prod | gzip | ssh "$HOST" 'gunzip | docker load'

ssh "$HOST" "mkdir -p $DIR"
scp -q "$HERE/compose.yaml" "$HERE/Caddyfile" "$HOST:$DIR/"
ssh "$HOST" "test -s $DIR/.env || { echo '$DIR/.env yoxdur'; exit 1; }; cd $DIR && docker compose up -d && docker image prune -f >/dev/null && docker compose ps"
