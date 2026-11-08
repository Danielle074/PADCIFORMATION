<script setup lang="ts">
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import { Badge } from '@/components/ui/badge'
import { Button } from '@/components/ui/button'
import { useApiPing } from '../composables/useApiPing'

// First real proof that the dockerized frontend talks to the dockerized
// backend (VITE_API_BASE_URL) over the actual network, Axios interceptors,
// Vue Query and the whole stack together — not just that each piece boots
// on its own. Demonstrates all four required states (FE-005): loading,
// error, empty is N/A here, success.
const { data, isPending, isError, error, refetch, isFetching } = useApiPing()
const apiBaseUrl = import.meta.env.VITE_API_BASE_URL
</script>

<template>
  <div class="flex min-h-screen items-center justify-center bg-neutral-50 p-6">
    <Card class="w-full max-w-md">
      <CardHeader>
        <CardTitle>Connectivité API</CardTitle>
        <CardDescription>
          Vérifie que ce frontend atteint bien PADCI-API
          ({{ apiBaseUrl }}).
        </CardDescription>
      </CardHeader>
      <CardContent class="space-y-4">
        <div v-if="isPending" class="text-sm text-neutral-500">Connexion à l'API…</div>

        <div v-else-if="isError" class="space-y-2">
          <Badge variant="destructive">Échec</Badge>
          <p class="text-sm text-neutral-700">{{ (error as Error)?.message }}</p>
        </div>

        <div v-else-if="data" class="space-y-2">
          <Badge class="bg-green-600 text-white">API en ligne</Badge>
          <p class="text-sm text-neutral-700">Aller-retour : {{ data.latencyMs }} ms</p>
        </div>

        <Button :disabled="isFetching" @click="() => refetch()">
          {{ isFetching ? 'Vérification…' : 'Revérifier' }}
        </Button>
      </CardContent>
    </Card>
  </div>
</template>
