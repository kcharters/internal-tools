<template>
  <div>
    <h2 style="margin:0 0 20px;color:#1e1b4b">📄 JSON Formatter</h2>
    <div style="display:grid;grid-template-columns:1fr 1fr;gap:16px">
      <div>
        <label style="display:block;font-size:13px;font-weight:600;color:#374151;margin-bottom:6px">Input JSON</label>
        <textarea
          v-model="input"
          placeholder='{"key": "value"}'
          style="width:100%;height:360px;font-family:monospace;font-size:13px;padding:12px;border:1px solid #d1d5db;border-radius:6px;resize:vertical;outline:none"
        />
        <div style="margin-top:8px;display:flex;gap:8px">
          <button @click="format" style="padding:8px 16px;background:#6366f1;color:#fff;border:none;border-radius:6px;cursor:pointer;font-size:13px">Format</button>
          <button @click="minify" style="padding:8px 16px;background:#e5e7eb;color:#374151;border:none;border-radius:6px;cursor:pointer;font-size:13px">Minify</button>
          <button @click="input='';output='';error=''" style="padding:8px 16px;background:#fee2e2;color:#ef4444;border:none;border-radius:6px;cursor:pointer;font-size:13px">Clear</button>
        </div>
      </div>
      <div>
        <label style="display:block;font-size:13px;font-weight:600;color:#374151;margin-bottom:6px">Output</label>
        <textarea
          v-model="output"
          readonly
          style="width:100%;height:360px;font-family:monospace;font-size:13px;padding:12px;border:1px solid #d1d5db;border-radius:6px;resize:vertical;background:#f9fafb;outline:none"
        />
        <p v-if="error" style="color:#ef4444;font-size:13px;margin-top:8px">⚠️ {{ error }}</p>
        <button v-if="output && !error" @click="copy" style="margin-top:8px;padding:8px 16px;background:#10b981;color:#fff;border:none;border-radius:6px;cursor:pointer;font-size:13px">
          {{ copied ? '✅ Copied!' : 'Copy' }}
        </button>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref } from 'vue'

const input = ref('')
const output = ref('')
const error = ref('')
const copied = ref(false)

function parse() {
  error.value = ''
  try {
    return JSON.parse(input.value)
  } catch (e) {
    error.value = e.message
    return null
  }
}

function format() {
  const parsed = parse()
  if (parsed !== null) output.value = JSON.stringify(parsed, null, 2)
}

function minify() {
  const parsed = parse()
  if (parsed !== null) output.value = JSON.stringify(parsed)
}

async function copy() {
  await navigator.clipboard.writeText(output.value)
  copied.value = true
  setTimeout(() => (copied.value = false), 2000)
}
</script>
