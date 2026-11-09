import fs from 'node:fs'
import { execSync } from 'node:child_process'
import path from 'node:path'
import { fileURLToPath } from 'node:url'

const ROOT = path.resolve(path.dirname(fileURLToPath(import.meta.url)), '..')

/** Boxicons → lucide, canonical names (每种已验证存在于 @lucide/vue exports). */
const MAP = {
  'right-arrow-alt': 'ArrowRight',
  'left-arrow-alt': 'ArrowLeft',
  'arrow-back': 'ArrowLeft',
  'chevron-right': 'ChevronRight',
  'chevron-left': 'ChevronLeft',
  'chevron-down': 'ChevronDown',
  'chevron-up': 'ChevronUp',
  'book-open': 'BookOpen',
  'book-content': 'BookOpenText',
  'book-reader': 'BookOpenText',
  check: 'Check',
  'check-circle': 'CircleCheck',
  certification: 'Award',
  'lock-alt': 'Lock',
  laptop: 'Laptop',
  'info-circle': 'Info',
  'error-circle': 'CircleAlert',
  show: 'Eye',
  'shield-quarter': 'ShieldHalf',
  refresh: 'RefreshCw',
  reset: 'RotateCcw',
  'network-chart': 'Network',
  bulb: 'Lightbulb',
  'x-circle': 'CircleX',
  trophy: 'Trophy',
  'time-five': 'Clock',
  time: 'Clock',
  server: 'Server',
  'question-mark': 'CircleQuestionMark',
  map: 'Map',
  layer: 'Layers',
  'git-branch': 'GitBranch',
  exit: 'LogOut',
  'edit-alt': 'SquarePen',
  'check-shield': 'ShieldCheck',
  bot: 'Bot',
  bell: 'Bell',
  'user-plus': 'UserPlus',
  'user-circle': 'CircleUser',
  trash: 'Trash2',
  'traffic-cone': 'TrafficCone',
  'target-lock': 'Target',
  summary: 'ClipboardList',
  'slider-alt': 'SlidersHorizontal',
  'signal-5': 'Signal',
  signal: 'Signal',
  shield: 'Shield',
  search: 'Search',
  save: 'Save',
  'plus-circle': 'CirclePlus',
  'play-circle': 'CirclePlay',
  phone: 'Phone',
  'log-out': 'LogOut',
  'log-in': 'LogIn',
  'line-chart': 'ChartLine',
  chart: 'ChartLine',
  history: 'History',
  'happy-beaming': 'Smile',
  'grid-alt': 'LayoutGrid',
  gift: 'Gift',
  envelope: 'Mail',
  calendar: 'Calendar',
  'calendar-star': 'CalendarDays',
  brain: 'Brain',
  'male-female': 'Users',
  'bxs-graduation': 'GraduationCap',
  'bxs-trophy': 'Trophy',
  'bxs-error-circle': 'CircleAlert',
  'bxs-user': 'User',
  'bxs-cog': 'Settings',
  'bxs-file-pdf': 'FileText',
  'bxs-video': 'Video',
  'bxs-certificate': 'Certificate',
  'bxs-construction': 'HardHat',
  'bxs-dashboard': 'LayoutDashboard',
  'bxs-motorcycle': 'Bike',
  'bxs-first-aid': 'BriefcaseMedical',
  'bxs-pencil': 'Pencil',
  'bxs-bar-chart-alt-2': 'BarChart2',
}

const files = execSync(`grep -rl "bx" ${ROOT}/src/features --include="*.vue"`, { encoding: 'utf8' })
  .trim().split('\n')

let totalRepl = 0
const touched = []

for (const file of files) {
  let src = fs.readFileSync(file, 'utf8')
  const used = new Set()
  let count = 0

  // Matches every <i …> whose class mentions the boxicons root `bx`.
  // Replace with a lucide component, preserving v-if/@click/classes:
  // the class `bx-<name>` stays as a marker so scoped CSS selectors
  // (.bx-chevron-down transitions…) keep working.
  src = src.replace(/<i\s+([^>]*?)>/g, (whole, attrs) => {
    const classMatch = attrs.match(/class\s*=\s*(["'])((?:(?!\1).)*)\1/)
    if (!classMatch) return whole
    const classes = classMatch[2].split(/\s+/)
    if (!classes.includes('bx')) return whole
    const solidToken = classes.find((c) => /^bx(s)?-/.test(c)) ?? ''
    if (!solidToken) return whole
    const solid = solidToken.startsWith('bxs-')
    const name = (solid ? solidToken.slice(4) : solidToken.slice(3)).trim()
    const mapped = MAP[name] ?? MAP[solid ? 'bxs-' + name : name]
    if (!mapped) {
      console.error(`UNMAPPED ${path.basename(file)}: bx${solid ? 's' : ''}-${name}`)
      return whole
    }
    used.add(mapped)
    count++

    // Size from the tailwind font-size class (svg ignores font-size).
    const sizeFor = { 'text-xs': 12, 'text-sm': 14, 'text-base': 16, 'text-lg': 18, 'text-xl': 20, 'text-2xl': 24, 'text-3xl': 30 }
    let size = null
    const kept = []
    for (const c of classes) {
      if (c === 'bx' || c === solidToken) continue
      if (sizeFor[c] !== undefined && size === null) { size = sizeFor[c]; continue }
      kept.push(c)
    }

    const otherAttrs = attrs
      .replace(/class\s*=\s*(["'])(?:(?!\1).)*\1\s*/, '')
      .trim()
    const cls = kept.length ? ` class="${kept.join(' ')}"` : ''
    const sz = size ? ` :size="${size}"` : ''
    return `<${mapped}Icon${cls}${sz}${otherAttrs ? ' ' + otherAttrs : ''} />`
  })

  if (count > 0) {
    // Add / merge the lucide import in the script setup block.
    const importLine = `import { ${[...used].sort().join(', ')} } from '@lucide/vue'`
    const re = /<script\s+setup(\s+lang="ts")?>([\s\S]*?)(<\/script>)/
    const m = src.match(re)
    if (m) {
      const head = m[2]
      const lucideImportRe = /import\s*\{[^}]*\}\s*from\s*'@lucide\/vue'(\s*;)?\n/
      if (lucideImportRe.test(head)) {
        src = src.replace(lucideImportRe, (imp) => {
          const names = [...imp.matchAll(/([A-Za-z0-9]+)/g)].map((x) => x[1])
            .filter((n) => n !== 'import' && n !== 'from' && n !== '@lucide')
          const all = [...new Set([...names, ...used])].sort()
          return `import { ${all.join(', ')} } from '@lucide/vue'\n`
        })
      } else if (/<script\s+setup(\s+lang="ts")?>\s*\n/.test(src)) {
        src = src.replace(/(<script\s+setup(?:\s+lang="ts")?>\s*\n)/, `$1${importLine}\n`)
      }
    }
    fs.writeFileSync(file, src)
    totalRepl += count
    touched.push(`${path.relative(ROOT, file)} (${count})`)
  }
}

console.log(`files touched: ${touched.length}, replacements: ${totalRepl}`)
console.log(touched.join('\n'))
