<template>
  <div style="max-width:480px">
    <h2 style="margin:0 0 20px;color:#1e1b4b">🔑 Password Generator</h2>

    <div style="background:#fff;border:1px solid #e2e8f0;border-radius:10px;padding:24px">
      <!-- Options -->
      <div style="display:grid;grid-template-columns:1fr 1fr;gap:12px;margin-bottom:20px">
        <label style="font-size:13px;color:#374151">
          Length: <strong>{{ length }}</strong>
          <input type="range" v-model.number="length" min="8" max="64" style="display:block;width:100%;margin-top:4px" />
        </label>
        <div style="display:flex;flex-direction:column;gap:8px;font-size:13px;color:#374151">
          <label><input type="checkbox" v-model="useUpper" /> Uppercase (A–Z)</label>
          <label><input type="checkbox" v-model="useLower" /> Lowercase (a–z)</label>
          <label><input type="checkbox" v-model="useDigits" /> Digits (0–9)</label>
          <label><input type="checkbox" v-model="useSymbols" /> Symbols (!@#…)</label>
        </div>
      </div>

      <!-- Output -->
      <div style="background:#f8fafc;border:1px solid #e2e8f0;border-radius:6px;padding:12px 16px;font-family:monospace;font-size:15px;word-break:break-all;min-height:48px;color:#1e293b">
        {{ password || '—' }}
      </div>

      <!-- Strength indicator -->
      <div v-if="password" style="margin-top:10px">
        <div style="height:6px;border-radius:3px;background:#e5e7eb;overflow:hidden">
          <div :style="`width:${strengthPct}%;background:${strengthColor};height:100%;transition:width .3s`" />
        </div>
        <span style="font-size:12px;color:#64748b;margin-top:4px;display:block">Strength: {{ strengthLabel }}</span>
      </div>

      <div style="display:flex;gap:8px;margin-top:16px">
        <button @click="generate" style="flex:1;padding:10px;background:#6366f1;color:#fff;border:none;border-radius:6px;cursor:pointer;font-size:14px;font-weight:600">
          Generate
        </button>
        <button @click="copy" :disabled="!password" style="padding:10px 16px;background:#e5e7eb;color:#374151;border:none;border-radius:6px;cursor:pointer;font-size:14px">
          {{ copied ? '✅' : 'Copy' }}
        </button>
      </div>

      <p v-if="warn" style="color:#f59e0b;font-size:12px;margin-top:8px">⚠️ Select at least one character type.</p>
    </div>
  </div>
</template>

<script setup>
import { ref, computed } from 'vue'

const length = ref(20)
const useUpper = ref(true)
const useLower = ref(true)
const useDigits = ref(true)
const useSymbols = ref(true)
const password = ref('')
const copied = ref(false)
const warn = ref(false)

const UPPER = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ'
const LOWER = 'abcdefghijklmnopqrstuvwxyz'
const DIGITS = '0123456789'
const SYMBOLS = '!@#$%^&*()-_=+[]{}|;:,.<>?'

function generate() {
  warn.value = false
  let charset = ''
  if (useUpper.value) charset += UPPER
  if (useLower.value) charset += LOWER
  if (useDigits.value) charset += DIGITS
  if (useSymbols.value) charset += SYMBOLS

  if (!charset) { warn.value = true; return }

  const arr = new Uint32Array(length.value)
  crypto.getRandomValues(arr)
  password.value = Array.from(arr, n => charset[n % charset.length]).join('')
}

async function copy() {
  if (!password.value) return
  await navigator.clipboard.writeText(password.value)
  copied.value = true
  setTimeout(() => (copied.value = false), 2000)
}

const strengthPct = computed(() => {
  const p = password.value
  if (!p) return 0
  let score = 0
  if (p.length >= 12) score++
  if (p.length >= 20) score++
  if (/[A-Z]/.test(p)) score++
  if (/[a-z]/.test(p)) score++
  if (/[0-9]/.test(p)) score++
  if (/[^A-Za-z0-9]/.test(p)) score++
  return Math.min(100, Math.round((score / 6) * 100))
})

const strengthColor = computed(() => {
  const pct = strengthPct.value
  if (pct < 40) return '#ef4444'
  if (pct < 70) return '#f59e0b'
  return '#10b981'
})

const strengthLabel = computed(() => {
  const pct = strengthPct.value
  if (pct < 40) return 'Weak'
  if (pct < 70) return 'Moderate'
  return 'Strong'
})
</script>
