<template>
  <div class="space-y-6 pb-10">

    <!-- ================= 1. EN-TÊTE DE BIENVENUE ================= -->
    <div class="bg-gradient-to-r from-[#1E3A8A] to-[#2563EB] rounded-2xl p-6 sm:p-8 text-white shadow-lg relative overflow-hidden">
      <!-- Éléments décoratifs -->
      <div class="absolute -right-10 -top-10 w-40 h-40 bg-white opacity-10 rounded-full blur-2xl"></div>
      <div class="absolute right-20 bottom-0 w-20 h-20 bg-orange-500 opacity-20 rounded-full blur-xl"></div>

      <div class="relative z-10 flex flex-col md:flex-row md:items-center justify-between gap-6">
        <div>
          <span class="bg-white/20 text-white text-xs font-bold px-3 py-1 rounded-full uppercase tracking-wider border border-white/20 mb-3 inline-block">
            Parcours Network Specialist
          </span>
          <!-- REMPLACEMENT DE L'EMOJI PAR UNE ICÔNE -->
          <h1 class="text-2xl sm:text-3xl font-extrabold mb-2 flex items-center gap-2">
            Bonjour, {{ auth.user?.name }}
            <SmileIcon class="text-yellow-400" :size="30" />
          </h1>
          <p class="text-blue-100 text-sm max-w-lg">
            Prêt à devenir un expert réseau ? Continuez votre préparation pour la certification Cisco CCNA 200-301.
          </p>
        </div>

        <!-- Progression Globale -->
        <div class="bg-white/10 backdrop-blur-sm rounded-xl p-4 border border-white/20 shrink-0 w-full md:w-64">
          <div class="flex justify-between items-center mb-2">
            <span class="text-xs font-semibold text-blue-100 uppercase">Progression Globale</span>
            <span class="text-lg font-bold text-white">15%</span>
          </div>
          <div class="w-full bg-black/30 rounded-full h-2.5">
            <div class="bg-orange-400 h-2.5 rounded-full" style="width: 15%"></div>
          </div>
          <p class="text-[10px] text-blue-100 mt-2 text-right">1 chapitre sur 8 terminé</p>
        </div>
      </div>
    </div>

    <!-- ================= 2. STATISTIQUES (KPIs) ================= -->
    <div class="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
      <div class="bg-white rounded-xl shadow-sm border border-gray-100 p-5 flex items-center gap-4">
        <div class="w-12 h-12 rounded-lg bg-blue-50 text-blue-600 flex items-center justify-center shrink-0">
          <BookOpenTextIcon :size="24" />
        </div>
        <div>
          <p class="text-xs text-gray-500 font-medium">Chapitres lus</p>
          <p class="text-2xl font-bold text-gray-800">1 <span class="text-sm text-gray-400 font-normal">/ 6</span></p>
        </div>
      </div>
      <div class="bg-white rounded-xl shadow-sm border border-gray-100 p-5 flex items-center gap-4">
        <div class="w-12 h-12 rounded-lg bg-orange-50 text-orange-500 flex items-center justify-center shrink-0">
          <LaptopIcon :size="24" />
        </div>
        <div>
          <p class="text-xs text-gray-500 font-medium">TP réalisés</p>
          <p class="text-2xl font-bold text-gray-800">0 <span class="text-sm text-gray-400 font-normal">/ 7</span></p>
        </div>
      </div>
      <div class="bg-white rounded-xl shadow-sm border border-gray-100 p-5 flex items-center gap-4">
        <div class="w-12 h-12 rounded-lg bg-green-50 text-green-600 flex items-center justify-center shrink-0">
          <ClockIcon :size="24" />
        </div>
        <div>
          <p class="text-xs text-gray-500 font-medium">Temps d'étude</p>
          <p class="text-2xl font-bold text-gray-800">4h30</p>
        </div>
      </div>
      <div class="bg-white rounded-xl shadow-sm border border-gray-100 p-5 flex items-center gap-4">
        <div class="w-12 h-12 rounded-lg bg-purple-50 text-purple-600 flex items-center justify-center shrink-0">
          <TrophyIcon :size="24" />
        </div>
        <div>
          <p class="text-xs text-gray-500 font-medium">Score moyen</p>
          <p class="text-2xl font-bold text-gray-800">-<span class="text-sm text-gray-400 font-normal"> / 100</span></p>
        </div>
      </div>
    </div>

    <!-- ================= 3. PROCHAIN OBJECTIF (Reprendre) ================= -->
    <div class="bg-white rounded-xl shadow-sm border border-blue-100 overflow-hidden relative">
      <div class="absolute left-0 top-0 bottom-0 w-1.5 bg-blue-600"></div>
      <div class="p-6 flex flex-col sm:flex-row items-center justify-between gap-4">
        <div class="flex items-center gap-4">
          <div class="w-14 h-14 rounded-full bg-blue-50 flex items-center justify-center shrink-0">
            <CirclePlayIcon class="text-blue-600" :size="30" />
          </div>
          <div>
            <p class="text-xs font-bold text-blue-600 uppercase tracking-wide mb-1">Reprendre la lecture</p>
            <h3 class="text-lg font-bold text-gray-800">Chapitre 2 : Accès réseau (VLAN)</h3>
            <p class="text-sm text-gray-500">PDF · 12 pages restantes</p>
          </div>
        </div>
        <router-link
          to="/formations/network/chapitre2"
          class="bg-blue-600 hover:bg-blue-700 text-white px-6 py-2.5 rounded-lg font-semibold transition-colors shadow-md w-full sm:w-auto text-center shrink-0"
        >
          Continuer
        </router-link>
      </div>
    </div>

    <!-- ================= 4. GRILLE DES MODULES (Programme CCNA) ================= -->
    <div>
      <div class="flex items-center justify-between mb-4">
        <h2 class="text-lg font-bold text-gray-800 flex items-center gap-2">
          <LayoutGridIcon class="text-blue-600" :size="20" /> Programme du cours
        </h2>
      </div>

      <div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">

        <!-- AJOUT DE LA CARTE INTRODUCTION ICI -->
        <router-link to="/formations/network/introduction" class="bg-gradient-to-br from-gray-800 to-gray-900 rounded-xl shadow-md border border-gray-700 p-5 hover:shadow-lg transition group relative overflow-hidden text-white md:col-span-2 lg:col-span-3">
          <div class="absolute right-0 top-0 opacity-10 group-hover:scale-110 transition-transform">
          
          </div>
          <div class="flex flex-col md:flex-row md:items-center justify-between gap-4 relative z-10">
            <div class="flex items-start gap-4">
              <div class="w-12 h-12 rounded-lg bg-white/10 flex items-center justify-center shrink-0">
                <InfoIcon class="text-blue-400" :size="24" />
              </div>
              <div>
                <h3 class="text-lg font-bold mb-1 group-hover:text-blue-300 transition">Introduction au CCNA</h3>
                <p class="text-sm text-gray-300 max-w-2xl">
                  Découvrez le programme, les objectifs de la certification, la méthode de travail et l'examen en bref. Commencez votre parcours ici.
                </p>
              </div>
            </div>
            <span class="inline-flex items-center gap-2 bg-white/10 hover:bg-white/20 px-5 py-2.5 rounded-lg text-sm font-bold transition-colors shrink-0">
              Commencer <ArrowRightIcon class="arrow-nudge" :size="18" />
            </span>
          </div>
        </router-link>

        <!-- Carte Chapitre 1 -->
        <router-link to="/formations/network/chapitre1" class="bg-white rounded-xl shadow-sm border border-gray-100 p-5 hover:border-blue-400 hover:shadow-md transition group">
          <div class="flex justify-between items-start mb-3">
            <div class="w-10 h-10 rounded-lg bg-gray-50 flex items-center justify-center text-gray-600 group-hover:bg-blue-50 group-hover:text-blue-600 transition">
              <LayersIcon :size="20" />
            </div>
            <span class="bg-green-100 text-green-700 text-[10px] font-bold px-2 py-1 rounded">Terminé</span>
          </div>
          <h3 class="font-bold text-gray-800 mb-1 group-hover:text-blue-600 transition">1. Fondamentaux des réseaux</h3>
          <p class="text-xs text-gray-500">Modèles OSI, TCP/IP, adressage IP.</p>
          <div class="mt-4 flex items-center justify-between text-xs text-gray-400">
            <span>20% de l'examen</span>
            <CircleCheckIcon class="text-green-500" :size="18" />
          </div>
        </router-link>

        <!-- Carte Chapitre 2 -->
        <router-link to="/formations/network/chapitre2" class="bg-white rounded-xl shadow-sm border border-blue-200 p-5 hover:border-blue-400 hover:shadow-md transition group relative overflow-hidden">
          <div class="absolute top-0 right-0 w-16 h-16 bg-blue-50 rounded-bl-full -mr-8 -mt-8"></div>
          <div class="flex justify-between items-start mb-3 relative z-10">
            <div class="w-10 h-10 rounded-lg bg-blue-50 flex items-center justify-center text-blue-600 transition">
              <GitBranchIcon :size="20" />
            </div>
            <span class="bg-blue-100 text-blue-700 text-[10px] font-bold px-2 py-1 rounded">En cours</span>
          </div>
          <h3 class="font-bold text-gray-800 mb-1 group-hover:text-blue-600 transition relative z-10">2. Accès réseau</h3>
          <p class="text-xs text-gray-500 relative z-10">VLAN, Trunks, Spanning Tree.</p>
          <div class="mt-4 flex items-center justify-between text-xs text-gray-400 relative z-10">
            <span>20% de l'examen</span>
            <ArrowRightIcon class="arrow-nudge text-blue-500" :size="18" />
          </div>
        </router-link>

        <!-- Carte Chapitre 3 -->
        <router-link to="/formations/network/chapitre3" class="bg-white rounded-xl shadow-sm border border-gray-100 p-5 hover:border-orange-400 hover:shadow-md transition group">
          <div class="flex justify-between items-start mb-3">
            <div class="w-10 h-10 rounded-lg bg-orange-50 flex items-center justify-center text-orange-500 transition">
              <NetworkIcon :size="20" />
            </div>
            <span class="bg-orange-100 text-orange-700 text-[10px] font-bold px-2 py-1 rounded">Priorité</span>
          </div>
          <h3 class="font-bold text-gray-800 mb-1 group-hover:text-orange-600 transition">3. Connectivité IP</h3>
          <p class="text-xs text-gray-500">Routage statique, OSPF, HSRP.</p>
          <div class="mt-4 flex items-center justify-between text-xs text-gray-400">
            <span>25% de l'examen</span>
            <LockIcon class="text-gray-300" :size="18" />
          </div>
        </router-link>

        <!-- Carte Chapitre 4 -->
        <router-link to="/formations/network/chapitre4" class="bg-white rounded-xl shadow-sm border border-gray-100 p-5 hover:border-emerald-400 hover:shadow-md transition group">
          <div class="flex justify-between items-start mb-3">
            <div class="w-10 h-10 rounded-lg bg-gray-50 flex items-center justify-center text-gray-600 group-hover:bg-emerald-50 group-hover:text-emerald-600 transition">
              <ServerIcon :size="20" />
            </div>
            <span class="bg-gray-100 text-gray-500 text-[10px] font-bold px-2 py-1 rounded">À venir</span>
          </div>
          <h3 class="font-bold text-gray-800 mb-1 group-hover:text-emerald-600 transition">4. Services IP</h3>
          <p class="text-xs text-gray-500">DHCP, DNS, NAT, NTP.</p>
          <div class="mt-4 flex items-center justify-between text-xs text-gray-400">
            <span>10% de l'examen</span>
            <LockIcon class="text-gray-300" :size="18" />
          </div>
        </router-link>

        <!-- Carte Chapitre 5 -->
        <router-link to="/formations/network/chapitre5" class="bg-white rounded-xl shadow-sm border border-gray-100 p-5 hover:border-red-400 hover:shadow-md transition group">
          <div class="flex justify-between items-start mb-3">
            <div class="w-10 h-10 rounded-lg bg-gray-50 flex items-center justify-center text-gray-600 group-hover:bg-red-50 group-hover:text-red-600 transition">
              <ShieldHalfIcon :size="20" />
            </div>
            <span class="bg-gray-100 text-gray-500 text-[10px] font-bold px-2 py-1 rounded">À venir</span>
          </div>
          <h3 class="font-bold text-gray-800 mb-1 group-hover:text-red-600 transition">5. Sécurité</h3>
          <p class="text-xs text-gray-500">Triade CIA, ACL, VPN, WPA3.</p>
          <div class="mt-4 flex items-center justify-between text-xs text-gray-400">
            <span>15% de l'examen</span>
            <LockIcon class="text-gray-300" :size="18" />
          </div>
        </router-link>

        <!-- Carte Chapitre 6 -->
        <router-link to="/formations/network/chapitre6" class="bg-white rounded-xl shadow-sm border border-gray-100 p-5 hover:border-indigo-400 hover:shadow-md transition group">
          <div class="flex justify-between items-start mb-3">
            <div class="w-10 h-10 rounded-lg bg-gray-50 flex items-center justify-center text-gray-600 group-hover:bg-indigo-50 group-hover:text-indigo-600 transition">
              <BotIcon :size="20" />
            </div>
            <span class="bg-gray-100 text-gray-500 text-[10px] font-bold px-2 py-1 rounded">À venir</span>
          </div>
          <h3 class="font-bold text-gray-800 mb-1 group-hover:text-indigo-600 transition">6. Automatisation</h3>
          <p class="text-xs text-gray-500">SDN, API REST, JSON, Ansible.</p>
          <div class="mt-4 flex items-center justify-between text-xs text-gray-400">
            <span>10% de l'examen</span>
            <LockIcon class="text-gray-300" :size="18" />
          </div>
        </router-link>

      </div>
    </div>

    <!-- ================= 5. EXAMEN & ANNEXES ================= -->
    <div class="grid grid-cols-1 md:grid-cols-2 gap-4">
      <!-- Carte Examen -->
      <router-link to="/formations/network/examen" class="bg-gradient-to-br from-amber-400 to-orange-500 rounded-xl p-6 text-white shadow-md hover:shadow-lg transition group relative overflow-hidden">
        <div class="absolute right-0 bottom-0 opacity-20 group-hover:scale-110 transition-transform">
          <AwardIcon class=""  :size="96" />
        </div>
        <div class="relative z-10">
          <h3 class="text-xl font-bold mb-2">Préparation à l'examen</h3>
          <p class="text-orange-100 text-sm mb-4">Testez vos connaissances avec des examens blancs et des exercices corrigés.</p>
          <span class="inline-flex items-center gap-2 bg-white/20 px-4 py-2 rounded-lg text-sm font-semibold">
            Commencer l'entraînement <ArrowRightIcon class="arrow-nudge" />
          </span>
        </div>
      </router-link>

      <!-- Carte Annexes -->
      <router-link to="/formations/network/annexes" class="bg-gradient-to-br from-teal-500 to-emerald-600 rounded-xl p-6 text-white shadow-md hover:shadow-lg transition group relative overflow-hidden">
        <div class="absolute right-0 bottom-0 opacity-20 group-hover:scale-110 transition-transform">
          <BookOpenTextIcon class=""  :size="96" />
        </div>
        <div class="relative z-10">
          <h3 class="text-xl font-bold mb-2">Annexes & Glossaire</h3>
          <p class="text-teal-100 text-sm mb-4">Retrouvez toutes les commandes Cisco et le vocabulaire technique.</p>
          <span class="inline-flex items-center gap-2 bg-white/20 px-4 py-2 rounded-lg text-sm font-semibold">
            Consulter <ArrowRightIcon class="arrow-nudge" />
          </span>
        </div>
      </router-link>
    </div>

  </div>
</template>

<script setup lang="ts">
import { ArrowRightIcon, AwardIcon, BookOpenTextIcon, BotIcon, CircleCheckIcon, CirclePlayIcon, ClockIcon, GitBranchIcon, InfoIcon, LaptopIcon, LayersIcon, LayoutGridIcon, LockIcon, NetworkIcon, ServerIcon, ShieldHalfIcon, SmileIcon, TrophyIcon } from '@lucide/vue'
import { useAuthStore } from '@/stores/auth'

const auth = useAuthStore()
</script>

<style scoped>
/* Animations fluides au survol */
.group:hover .arrow-nudge {
  transform: translateX(4px);
  transition: transform 0.2s ease;
}
</style>
