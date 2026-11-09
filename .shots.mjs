import { chromium } from '@playwright/test'
import { execSync } from 'node:child_process'

const OUT = process.argv[2]
const BASE = 'http://localhost:5173'
const API = 'http://localhost:8070/api/v1'

execSync('docker exec padci_app php artisan cache:clear -q', { stdio: 'ignore' })

const email = `shots-${Date.now()}@padci.test`
const reg = await (await fetch(`${API}/auth/register`, {
  method: 'POST', headers: { 'Content-Type': 'application/json' },
  body: JSON.stringify({ name: 'Shots Review', email, password: 'S3cret!Pass', password_confirmation: 'S3cret!Pass' }),
})).json()
const verifyUrl = reg?.data?.verification_url
if (verifyUrl) await fetch(verifyUrl, { headers: { Accept: 'application/json' } })
const login = await (await fetch(`${API}/auth/login`, {
  method: 'POST', headers: { 'Content-Type': 'application/json' },
  body: JSON.stringify({ email, password: 'S3cret!Pass' }),
})).json()
const token = login?.data?.token

execSync('docker exec padci_app php artisan cache:clear -q', { stdio: 'ignore' })

const browser = await chromium.launch()
const pages = [
  ['login', '/'],
  ['inscription', '/inscription'],
  ['oubli', '/mot-de-passe-oublie'],
  ['accueil', '/accueil'],
  ['nouvelle-demande', '/nouvelle-demande'],
  ['dashboard_apprenant', '/formations/dashboard'],
]

for (const [name, path] of pages) {
  const p = await browser.newPage({ viewport: { width: 1440, height: 900 } })
  if (token) {
    await p.addInitScript(([t]) => {
      sessionStorage.setItem('padci.session_token', t)
    }, [token])
  }
  await p.goto(BASE + path)
  await p.waitForTimeout(2500)
  await p.screenshot({ path: `${OUT}/${name}.png`, fullPage: false })
  console.log(name, 'ok', p.url())
  await p.close()
}
await browser.close()
