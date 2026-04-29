<template>
  <div style="max-width:600px">
    <h2 style="margin:0 0 20px;color:#1e1b4b">🔐 Base64 Encoder / Decoder</h2>

    <div style="display:flex;gap:8px;margin-bottom:16px">
      <button
        v-for="m in modes"
        :key="m.value"
        @click="mode = m.value"
        :style="`padding:8px 18px;border:none;border-radius:6px;cursor:pointer;font-size:13px;font-weight:600;
                 background:${mode === m.value ? '#6366f1' : '#e5e7eb'};
                 color:${mode === m.value ? '#fff' : '#374151'}`"
      >
        {{ m.label }}
      </button>
    </div>

    <label style="display:block;font-size:13px;font-weight:600;color:#374151;margin-bottom:6px">Input</label>
    <textarea
      v-model="input"
      :placeholder="mode === 'encode' ? 'Plain text to encode…' : 'Base64 string to decode…'"
      style="width:100%;height:140px;font-family:monospace;font-size:13px;padding:12px;border:1px solid #d1d5db;border-radius:6px;resize:vertical;outline:none"
    />

    <div style="display:flex;gap:8px;margin:12px 0">
      <button @click="convert" style="padding:8px 20px;background:#6366f1;color:#fff;border:none;border-radius:6px;cursor:pointer;font-size:13px;font-weight:600">
        {{ mode === 'encode' ? 'Encode →' : '← Decode' }}
      </button>
      <button @click="input='';output='';error=''" style="padding:8px 16px;background:#fee2e2;color:#ef4444;border:none;border-radius:6px;cursor:pointer;font-size:13px">Clear</button>
    </div>

    <label style="display:block;font-size:13px;font-weight:600;color:#374151;margin-bottom:6px">Output</label>
    <textarea
      v-model="output"
      readonly
      style="width:100%;height:140px;font-family:monospace;font-size:13px;padding:12px;border:1px solid #d1d5db;border-radius:6px;resize:vertical;background:#f9fafb;outline:none"
    />
    <p v-if="error" style="color:#ef4444;font-size:13px;margin-top:6px">⚠️ {{ error }}</p>

    <button v-if="output && !error" @click="copy"
      style="margin-top:10px;padding:8px 16px;background:#10b981;color:#fff;border:none;border-radius:6px;cursor:pointer;font-size:13px">
      {{ copied ? '✅ Copied!' : 'Copy Output' }}
    </button>
  </div>
</template>

<script setup>
import { ref } from 'vue'

const mode = ref('encode')
const input = ref('')
const output = ref('')
const error = ref('')
const copied = ref(false)

const modes = [
  { label: 'Encode', value: 'encode' },
  { label: 'Decode', value: 'decode' },
]

function convert() {
  error.value = ''
  output.value = ''
  if (!input.value.trim()) return

  try {
    if (mode.value === 'encode') {
      output.value = btoa(unescape(encodeURIComponent(input.value)))
    } else {
      output.value = decodeURIComponent(escape(atob(input.value.trim())))
    }
  } catch {
    error.value = mode.value === 'decode'
      ? 'Invalid Base64 string – check your input.'
      : 'Encoding failed – input may contain unsupported characters.'
  }
}

async function copy() {
  await navigator.clipboard.writeText(output.value)
  copied.value = true
  setTimeout(() => (copied.value = false), 2000)
}
</script>
