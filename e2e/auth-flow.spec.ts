import { test, expect } from '@playwright/test'
import { execSync } from 'node:child_process'

// Le limiter "register" (3 / 60 min / IP) survit aux relances de tests via le
// cache Laravel (Redis) : on le purge avant la suite, sinon le 2e run est
// bloqué à 429 "Trop de requêtes" pour une raison de tests, pas d'usage.
test.beforeAll(() => {
  execSync('docker exec padci_app php artisan cache:clear', {
    stdio: 'inherit',
    timeout: 15000,
  })
})

/**
 * Cycle d'authentification complet, en conditions réelles : le backend est
 * le conteneur `padci_app` (docker compose, env local → le register renvoie
 * un `verification_url` signé), et les emails sont lus via l'API REST de
 * Mailpit (`padci_mailpit`), jamais mockés.
 */
const MAILPIT_API = 'http://localhost:8071/api/v1'

const password = 'E2eSecret!2026'

function uniqueEmail(prefix: string): string {
  return `e2e-${prefix}-${Date.now()}@padci.test`
}

async function mailpitMessagesTo(email: string): Promise<Array<{ ID: string }>> {
  const res = await fetch(`${MAILPIT_API}/search?query=to:${email}`)
  const body = (await res.json()) as { messages?: Array<{ ID: string }> }
  return body.messages ?? []
}

async function mailpitMessage(id: string): Promise<{ Text?: string; HTML?: string }> {
  const res = await fetch(`${MAILPIT_API}/message/${id}`)
  return (await res.json()) as { Text?: string; HTML?: string }
}

/**
 * Le SMTP de Mailpit ingère le message quelques instants APRÈS la réponse HTTP
 * du endpoint : une lecture immédiate de la boîte peut ne renvoyer que les
 * messages précédents (email de vérification) et manquer le mail de reset.
 * On attend poll-able qu'un message contenant `?token=` apparaisse.
 */
async function waitForResetToken(email: string, timeoutMs = 10000): Promise<string> {
  const deadline = Date.now() + timeoutMs
  while (Date.now() < deadline) {
    const messages = await mailpitMessagesTo(email)
    for (const { ID } of messages) {
      const message = await mailpitMessage(ID)
      const raw = `${message.Text ?? ''}${message.HTML ?? ''}`
      const match = raw.match(/token=([A-Za-z0-9_-]+)/)
      if (match) return match[1]
    }
    await new Promise((resolve) => setTimeout(resolve, 500))
  }
  throw new Error(`aucun email de réinitialisation avec ?token= pour ${email} après ${timeoutMs}ms`)
}

test('inscription → email non vérifié → vérification → connexion', async ({ page }) => {
  const email = uniqueEmail('verify')

  // 1. Inscription (état : formulaire)
  await page.goto('/inscription')
  await page.getByPlaceholder('Nom complet *').fill('E2E Vérification')
  await page.getByPlaceholder('Email *').fill(email)
  await page.getByPlaceholder('Mot de passe *', { exact: true }).fill(password)
  await page.getByPlaceholder('Confirmer le mot de passe *').fill(password)
  await page.getByRole('button', { name: 'Créer mon compte' }).click()

  // État honnête : compte créé, PAS de "connexion possible" mentie —
  // et en local le backend renvoie le lien signé, affiché comme lien dev.
  await expect(page.getByText('Compte créé !')).toBeVisible()
  const devLink = page.getByRole('link', { name: /\[dev\] Vérifier l'adresse maintenant/ })
  await expect(devLink).toBeVisible()

  // Le lien signé est lu MAINTENANT : dès la navigation suivante l'écran
  // succès n'existe plus côté SPA.
  const href = await devLink.getAttribute('href')
  expect(href, 'verification_url doit être renvoyé en local').toBeTruthy()

  // 2. Connexion refusée tant que l'email n'est pas vérifié :
  //    le 403 AUTH_EMAIL_NOT_VERIFIED ouvre l'état "non vérifié", pas une
  //    erreur générique d'identification.
  await page.getByRole('link', { name: 'Aller à la connexion' }).click()
  await expect(page).toHaveURL('/')
  await page.getByPlaceholder('Email professionnel').fill(email)
  await page.locator('input[placeholder="Mot de passe"]').fill(password)
  await page.getByRole('button', { name: /Se connecter/ }).click()
  await expect(page.getByText('Adresse email non vérifiée', { exact: false })).toBeVisible()
  await expect(page.getByRole('button', { name: /Renvoyer l'e-mail/ })).toBeVisible()

  // 3. Vérification via le lien signé (le navigateur est renvoyé sur
  //    /connexion?verified=1 par l'API — le redirect backend doit tomber sur
  //    un chemin SPA qui existe).
  await page.goto(href as string)
  await expect(page).toHaveURL(/\/connexion\?verified=1/)
  await expect(page.getByText('Adresse vérifiée ✓', { exact: false })).toBeVisible()

  // 4. Connexion cette fois acceptée → dashboard apprenant.
  await page.getByPlaceholder('Email professionnel').fill(email)
  await page.locator('input[placeholder="Mot de passe"]').fill(password)
  await page.getByRole('button', { name: /Se connecter/ }).click()
  await expect(page).toHaveURL(/\/formations\/dashboard/)
})

test('règles serveur : confirmation ≠ mot de passe et mot de passe faible', async ({ page }) => {
  const email = uniqueEmail('validation')
  await page.goto('/inscription')
  await page.getByPlaceholder('Nom complet *').fill('E2E Validation')
  await page.getByPlaceholder('Email *').fill(email)
  await page.getByPlaceholder('Mot de passe *', { exact: true }).fill('E2eSecret!2026')
  await page.getByPlaceholder('Confirmer le mot de passe *').fill('AutreChose!2026')
  await page.getByRole('button', { name: 'Créer mon compte' }).click()
  await expect(page.getByText('Les mots de passe ne correspondent pas.')).toBeVisible()

  // Mot de passe trop court : rejet du serveur, message champ par champ
  // (le formulaire est novalidate — la règle vient du backend).
  await page.getByPlaceholder('Mot de passe *', { exact: true }).fill('court')
  await page.getByPlaceholder('Confirmer le mot de passe *').fill('court')
  await page.getByRole('button', { name: 'Créer mon compte' }).click()
  await expect(page.locator('p.text-red-600').first()).toBeVisible()
  // Toujours sur l'écran d'inscription — pas de faux succès.
  await expect(page.getByText('Créer un compte')).toBeVisible()
  await expect(page.getByText('Compte créé !')).toHaveCount(0)
})

test('mot de passe oublié → email (Mailpit) → réinitialisation → connexion avec le nouveau', async ({ page }) => {
  const email = uniqueEmail('reset')

  // Pré-requis : un compte vérifié. Créé via le flow UI (test 1) puis la
  // vérification via le lien dev — même parcours qu'un nouvel utilisateur.
  await page.goto('/inscription')
  await page.getByPlaceholder('Nom complet *').fill('E2E Reset')
  await page.getByPlaceholder('Email *').fill(email)
  await page.getByPlaceholder('Mot de passe *', { exact: true }).fill(password)
  await page.getByPlaceholder('Confirmer le mot de passe *').fill(password)
  await page.getByRole('button', { name: 'Créer mon compte' }).click()
  await expect(page.getByText('Compte créé !')).toBeVisible()
  const devLink = page.getByRole('link', { name: /\[dev\] Vérifier l'adresse maintenant/ })
  const verifyHref = await devLink.getAttribute('href')
  expect(verifyHref).toBeTruthy()
  await page.goto(verifyHref as string)
  await expect(page.getByText('Adresse vérifiée ✓', { exact: false })).toBeVisible()

  // 1. Mot de passe oublié
  await page.goto('/mot-de-passe-oublie')
  await page.getByPlaceholder('Email professionnel').fill(email)
  await page.getByRole('button', { name: 'Envoyer le lien' }).click()
  await expect(page.getByText('Email envoyé !')).toBeVisible()

  // 2. Lire le vrai email dans Mailpit et extraire le jeton du lien (poll :
  //    l'ingestion SMTP suit la réponse HTTP de quelques instants).
  const token = await waitForResetToken(email)

  // 3. Réinitialisation sur le chemin consommé par l'email.
  await page.goto(`/reset-password?token=${token}&email=${encodeURIComponent(email)}`)
  const newPassword = 'E2eNewPass!2027'
  await page.locator('input[placeholder="Nouveau mot de passe"]').fill(newPassword)
  await page.locator('input[placeholder="Confirmer le mot de passe"]').fill(newPassword)
  await page.getByRole('button', { name: 'Réinitialiser le mot de passe' }).click()
  await expect(page.getByText('Mot de passe modifié !')).toBeVisible()

  // 4. Connexion avec le nouveau mot de passe (l'ancien est révoqué côté
  //    backend).
  await page.goto('/connexion')
  await page.getByPlaceholder('Email professionnel').fill(email)
  await page.locator('input[placeholder="Mot de passe"]').fill(newPassword)
  await page.getByRole('button', { name: /Se connecter/ }).click()
  await expect(page).toHaveURL(/\/formations\/dashboard/)
})
