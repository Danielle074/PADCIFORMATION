import { test, expect } from '@playwright/test'

test('visits the app root url', async ({ page }) => {
  await page.goto('/')
  // L'écran racine est la connexion (route '/'). Le starter attendait
  // "You did it!" — l'application réelle affiche l'en-tête de connexion.
  await expect(page.locator('h1')).toHaveText('Bienvenue')
})
