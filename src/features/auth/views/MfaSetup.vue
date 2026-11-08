<script setup lang="ts">
import { ref, onMounted } from 'vue'
import { useRouter } from 'vue-router'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import { Badge } from '@/components/ui/badge'
import { ApiError } from '@/api/http'
import { useMfaSetup, useMfaConfirm } from '../composables/useMfaSetup'

// FR-006/ADR-006: super_admin/admin cannot use anything beyond their own
// profile until TOTP is confirmed (enforced server-side by
// EnsureMfaIsEnabled). This is where the 428 AUTH_MFA_SETUP_REQUIRED
// redirect (see api/http.ts) lands.

const router = useRouter()
const setup = useMfaSetup()
const confirm = useMfaConfirm()

const secret = ref<string | null>(null)
const provisioningUri = ref<string | null>(null)
const code = ref('')
const recoveryCodes = ref<string[] | null>(null)
const errorMessage = ref<string | null>(null)

onMounted(async () => {
  try {
    const data = await setup.mutateAsync()
    secret.value = data.secret
    provisioningUri.value = data.provisioning_uri
  } catch (error) {
    errorMessage.value = error instanceof ApiError ? error.message : 'Impossible de démarrer la configuration.'
  }
})

async function submitConfirm(): Promise<void> {
  if (secret.value === null) return
  errorMessage.value = null

  try {
    const data = await confirm.mutateAsync({ secret: secret.value, code: code.value })
    recoveryCodes.value = data.recovery_codes
  } catch (error) {
    errorMessage.value = error instanceof ApiError ? error.message : 'Code invalide.'
  }
}

async function finishAndContinue(): Promise<void> {
  await router.push('/formations/dashboard')
}
</script>

<template>
  <div class="flex min-h-screen items-center justify-center bg-neutral-50 p-6">
    <Card class="w-full max-w-lg">
      <CardHeader>
        <CardTitle>Double authentification obligatoire</CardTitle>
        <CardDescription>
          Votre rôle exige la double authentification (TOTP) avant de continuer.
        </CardDescription>
      </CardHeader>
      <CardContent class="space-y-5">
        <p v-if="errorMessage" role="alert" class="text-sm text-red-600">{{ errorMessage }}</p>

        <!-- Codes de récupération : affichés une seule fois, après confirmation -->
        <div v-if="recoveryCodes" class="space-y-4">
          <Badge class="bg-green-600 text-white">Activée</Badge>
          <p class="text-sm text-neutral-700">
            Conservez ces codes de récupération en lieu sûr — ils ne seront plus jamais affichés.
          </p>
          <div class="grid grid-cols-2 gap-2 rounded-lg bg-neutral-100 p-4 font-mono text-sm">
            <span v-for="rc in recoveryCodes" :key="rc">{{ rc }}</span>
          </div>
          <Button class="w-full" @click="finishAndContinue">J'ai noté mes codes, continuer</Button>
        </div>

        <!-- Étape 1 : scanner / saisir le secret -->
        <div v-else-if="secret" class="space-y-4">
          <p class="text-sm text-neutral-600">
            Ajoutez ce secret dans votre application d'authentification
            (Google Authenticator, Authy…), puis saisissez le code généré.
          </p>
          <div class="rounded-lg bg-neutral-100 p-3 font-mono text-sm break-all">{{ secret }}</div>
          <form class="space-y-3" @submit.prevent="submitConfirm">
            <div>
              <Label for="mfa-setup-code">Code à 6 chiffres</Label>
              <Input id="mfa-setup-code" v-model="code" inputmode="numeric" autocomplete="one-time-code" required />
            </div>
            <Button type="submit" class="w-full" :disabled="confirm.isPending.value">
              {{ confirm.isPending.value ? 'Vérification…' : 'Activer' }}
            </Button>
          </form>
        </div>

        <p v-else class="text-sm text-neutral-500">Préparation…</p>
      </CardContent>
    </Card>
  </div>
</template>
