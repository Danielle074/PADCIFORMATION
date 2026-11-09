import { defineConfig, devices } from '@playwright/test'

/**
 * Config locale pour les tests e2e "auth réels" (backend dockerisé + Mailpit) :
 * le CORS du backend n'autorise que http://localhost:5173 (config/cors.php),
 * pas le port de preview 4173 — les tests passent donc par le dev-server.
 * Après validation, exécuter : npx playwright test --config playwright.e2e.ts
 */
export default defineConfig({
  testDir: './e2e',
  timeout: 30000,
  expect: { timeout: 5000 },
  // Séquentiel : le backend limite `register` à 3 requêtes / 60 min / IP
  // (config/rate-limits.php) et `auth` à 10 / min — des tests parallèles
  // (ou plus de 3 inscriptions par heure) déclencheraient 429 légitimes.
  workers: 1,
  reporter: [['line']],
  use: {
    headless: true,
    baseURL: 'http://localhost:5173',
    ...devices['Desktop Chrome'],
  },
  projects: [{ name: 'chromium', use: { ...devices['Desktop Chrome'] } }],
  webServer: {
    command: 'npm run dev',
    port: 5173,
    reuseExistingServer: true,
    timeout: 60000,
  },
})
