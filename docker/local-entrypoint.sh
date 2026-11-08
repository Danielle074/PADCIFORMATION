#!/bin/sh
# =============================================================================
# local-entrypoint.sh — préparation du conteneur de dev PADCI-WEB
#
# node_modules est un volume nommé (voir docker-compose.local.yml) : il
# survit aux restarts. On ne réinstalle que si package-lock.json a changé
# depuis la dernière install (empreinte stockée dans le volume lui-même).
# =============================================================================
set -e

log()  { printf '\033[0;32m[%s]\033[0m ✅ %s\n' "$(date '+%H:%M:%S')" "$1"; }

cd /app

LOCKFILE_HASH_FILE="node_modules/.lockfile-hash"
CURRENT_HASH="$(md5sum package-lock.json 2>/dev/null | cut -d' ' -f1)"
PREVIOUS_HASH="$(cat "$LOCKFILE_HASH_FILE" 2>/dev/null || echo '')"

if [ ! -d node_modules ] || [ ! -f node_modules/.bin/vite ] || [ "$CURRENT_HASH" != "$PREVIOUS_HASH" ]; then
    log "Dépendances absentes ou package-lock.json modifié → npm ci..."
    npm ci --no-audit --no-fund
    echo "$CURRENT_HASH" > "$LOCKFILE_HASH_FILE"
fi

if [ ! -f .env ] && [ -f .env.example ]; then
    log ".env absent → copie depuis .env.example"
    cp .env.example .env
fi

log "Démarrage : $*"
exec "$@"
