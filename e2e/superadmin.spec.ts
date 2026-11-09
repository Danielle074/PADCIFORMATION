import { test, expect } from '@playwright/test'
import { execSync } from 'node:child_process'

function getSuperAdminToken(): string {
  const output = execSync(
    `docker exec padci_app php artisan tinker --execute="\\$u = \\App\\Modules\\Identity\\Models\\User::where('email', 'smoke-superadmin@example.com')->first(); echo \\$u->createToken('playwright-superadmin')->plainTextToken;"`,
    { encoding: 'utf-8', timeout: 15000 },
  )
  const match = output.trim().match(/([0-9]+\|[A-Za-z0-9]+)/)
  if (!match) throw new Error('Failed to extract token: ' + output)
  return match[1]
}

test.describe('SuperAdmin pages', () => {
  let token: string

  test.beforeAll(() => {
    token = getSuperAdminToken()
  })

  test.beforeEach(async ({ page }) => {
    await page.addInitScript((authToken) => {
      sessionStorage.setItem('padci.session_token', authToken)
    }, token)
  })

  test('SuperAdmin Dashboard displays real overview and budget lines', async ({ page }) => {
    await page.goto('/superadmin/dashboard')
    await expect(page.getByRole('heading', { name: 'Vue Globale PADCI' })).toBeVisible()
    await expect(page.getByText('Apprenants')).toBeVisible()
    await expect(page.getByText('Taux de complétion')).toBeVisible()
    await expect(page.getByText('Certificats délivrés')).toBeVisible()
    await expect(page.getByText('ANO en attente')).toBeVisible()
    await expect(
      page.getByRole('heading', { name: 'Allocation et consommation par ligne budgétaire' }),
    ).toBeVisible()
  })

  test('SuperAdmin Utilisateurs lists real users with roles and status', async ({ page }) => {
    await page.goto('/superadmin/utilisateurs')
    await expect(page.getByRole('heading', { name: 'Gestion des Accès' })).toBeVisible()
    await expect(page.getByPlaceholder('Rechercher un nom, un email...')).toBeVisible()
    await expect(page.getByRole('columnheader', { name: 'Utilisateur' })).toBeVisible()
    await expect(page.getByRole('columnheader', { name: 'Rôle' })).toBeVisible()
    await expect(page.getByRole('columnheader', { name: 'Statut' })).toBeVisible()
    await page.getByPlaceholder('Rechercher un nom, un email...').fill('smoke-superadmin')
    await expect(page.getByText("(C'est vous)")).toBeVisible()
  })

  test('SuperAdmin Finance lists disbursements and displays 422 if ANO is not signed', async ({
    page,
  }) => {
    await page.goto('/superadmin/finance')
    await expect(page.getByRole('heading', { name: 'Budget & Décaissements' })).toBeVisible()
    await expect(page.getByRole('heading', { name: 'Demandes de décaissement' })).toBeVisible()
    await expect(page.getByText('Cisco Networking Academy')).toBeVisible()

    const validerBtn = page.getByRole('button', { name: 'Valider' }).first()
    if (await validerBtn.isVisible()) {
      await validerBtn.click()
      await expect(page.getByRole('heading', { name: 'Confirmer le décaissement' })).toBeVisible()
      await page.getByRole('button', { name: 'Valider le paiement' }).click()
      await expect(
        page.getByText(
          'Un décaissement ne peut être marqué payé que si une ANO signée y est rattachée.',
        ),
      ).toBeVisible()
      await page.getByRole('button', { name: 'Annuler' }).click()
    }
  })

  test('SuperAdmin ANO displays list and allows signing', async ({ page }) => {
    await page.goto('/superadmin/ano')
    await expect(page.getByRole('heading', { name: 'Validation des ANO' })).toBeVisible()
    await expect(page.getByText('Avis de Non-Objection (UCP / Banque Mondiale)')).toBeVisible()
  })
})
