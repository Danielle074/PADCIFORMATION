# syntax=docker/dockerfile:1.7
# =============================================================================
# Dockerfile — PADCI-WEB (build Vite + service Nginx)
#
# Build une fois, sert une SPA statique. Aucun Node ni aucun secret ne
# survit dans l'image finale : seuls les fichiers statiques générés par
# `npm run build` sont copiés dans le stage Nginx.
#
#   docker build -t padci-web:<sha> \
#     --build-arg VITE_API_BASE_URL=https://api.padci.example/api/v1 .
#   docker run -p 8060:80 padci-web:<sha>
# =============================================================================

# ── Stage 1: Builder ────────────────────────────────────────────────────────
FROM node:22-alpine AS builder

WORKDIR /app

# Dépendances (couche cache tant que package*.json ne bouge pas)
COPY package.json package-lock.json ./
RUN --mount=type=cache,target=/root/.npm \
    npm ci --no-audit --no-fund

COPY . .

# Vite inline les variables VITE_* au build : il n'y a pas de "configuration
# au runtime" pour une SPA statique. Une valeur différente par environnement
# (staging/prod) exige une image buildée avec le bon --build-arg.
ARG VITE_API_BASE_URL=http://localhost:8070/api/v1
ENV VITE_API_BASE_URL=${VITE_API_BASE_URL}

RUN npm run build-only


# ── Stage 2: Runner ──────────────────────────────────────────────────────────
FROM nginx:1.27-alpine AS runner

RUN apk add --no-cache curl \
    && rm -rf /var/cache/apk/*

COPY docker/nginx/default.conf /etc/nginx/conf.d/default.conf
COPY --from=builder /app/dist /usr/share/nginx/html

RUN chown -R nginx:nginx /usr/share/nginx/html /var/cache/nginx /var/run \
    && touch /var/run/nginx.pid \
    && chown nginx:nginx /var/run/nginx.pid

# Non-root: nginx can't bind port 80 (privileged) without root, so it
# listens on 8080 (see docker/nginx/default.conf) — map the host port in
# docker-compose instead of changing this.
USER nginx

EXPOSE 8080

HEALTHCHECK --interval=30s --timeout=3s --start-period=5s \
    CMD curl -fsS http://127.0.0.1:8080/healthz || exit 1

CMD ["nginx", "-g", "daemon off;"]
