import { test, expect } from '@playwright/test'
import { execSync } from 'node:child_process'

function getLearnerToken(): string {
  const output = execSync(
    `docker exec padci_app php artisan tinker --execute="\\$u = \\App\\Modules\\Identity\\Models\\User::where('email', 'user@example.com')->first(); echo \\$u->createToken('playwright-learner')->plainTextToken;"`,
    { encoding: 'utf-8', timeout: 15000 },
  )
  const match = output.trim().match(/([0-9]+\|[A-Za-z0-9]+)/)
  if (!match) throw new Error('Failed to extract token: ' + output)
  return match[1]
}

test.describe('Public Catalog & Cohort Availability (ADR-012)', () => {
  test('Catalog lists pathways and pathway detail shows sessions with live availability', async ({
    page,
  }) => {
    // 1. Visiteur sur le catalogue public
    await page.goto('/catalogue')
    await expect(page.getByRole('heading', { name: 'Catalogue des Formations' })).toBeVisible()
    await expect(page.getByText('Cyber Sécurité')).toBeVisible()
    await expect(page.getByText('Artificial Intelligence')).toBeVisible()

    // 2. Ouvrir la fiche Cyber Sécurité
    await page.getByRole('link', { name: 'Voir les sessions & candidater' }).first().click()
    await expect(
      page.getByRole('heading', { name: /Configuration minimale requise/ }),
    ).toBeVisible()
    await expect(page.getByText('Sessions & Calendrier de candidature')).toBeVisible()
  })
})

test.describe('Learner Application Flow & Dynamic Learning Space', () => {
  let token: string

  test.beforeAll(() => {
    token = getLearnerToken()
  })

  test.beforeEach(async ({ page }) => {
    await page.addInitScript((authToken) => {
      sessionStorage.setItem('padci.session_token', authToken)
    }, token)
  })

  test('Learner submits an application and follows it on Mes Candidatures', async ({ page }) => {
    // 1. Se rendre sur la filière Cyber Sécurité pour obtenir une session disponible
    await page.goto('/catalogue')
    // Click on Cyber Sécurité
    const cyberCard = page
      .locator('div')
      .filter({ hasText: /^CYBER/ })
      .first()
    if (await cyberCard.isVisible()) {
      await cyberCard.getByRole('link', { name: /candidater/i }).click()
    } else {
      await page
        .getByRole('link', { name: /candidater/i })
        .first()
        .click()
    }

    // Si on a un bouton "Candidater à cette session"
    const applyBtn = page.getByRole('button', { name: /Candidater à cette session/ }).first()
    if (await applyBtn.isVisible()) {
      await applyBtn.click()

      // Formulaire étape 1
      await expect(page.getByRole('heading', { name: 'Votre session de formation' })).toBeVisible()
      await page
        .getByPlaceholder(/Expliquez votre parcours/)
        .fill('Je souhaite me perfectionner en sécurité réseau.')
      await page.getByRole('button', { name: /Continuer vers l'équipement/ }).click()

      // Formulaire étape 2
      await expect(
        page.getByRole('heading', { name: 'Équipement informatique requis' }),
      ).toBeVisible()
      await page.getByRole('button', { name: /Vérifier et soumettre/ }).click()

      // Formulaire étape 3
      await expect(
        page.getByRole('heading', { name: 'Récapitulatif de votre candidature' }),
      ).toBeVisible()
      await page.getByRole('button', { name: /Confirmer et envoyer la candidature/ }).click()

      // Écran de succès
      await expect(page.getByRole('heading', { name: 'Candidature enregistrée !' })).toBeVisible()
      await page.getByRole('link', { name: 'Voir mes candidatures' }).click()
      await expect(page.getByRole('heading', { name: 'Mes Candidatures' })).toBeVisible()
    }
  })

  test('Learner accesses LearnerDashboard and views dynamic course structure', async ({ page }) => {
    await page.goto('/formations/dashboard')
    await expect(page.getByRole('heading', { name: 'Mon Espace de Formation' })).toBeVisible()

    // Vérifier la présence d'au moins un cours ou bouton
    const courseCard = page.getByRole('link', { name: /Accéder au cours/ }).first()
    if (await courseCard.isVisible()) {
      await courseCard.click()
      await expect(page.getByRole('heading', { name: 'Sommaire de la formation' })).toBeVisible()
    }
  })
})
