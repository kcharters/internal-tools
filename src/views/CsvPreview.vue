<template>
  <div>
    <h2 style="margin:0 0 20px;color:#1e1b4b">📊 CSV Preview</h2>

    <div style="margin-bottom:16px;display:flex;gap:12px;align-items:center">
      <label style="padding:8px 16px;background:#6366f1;color:#fff;border-radius:6px;cursor:pointer;font-size:13px;font-weight:600">
        Upload CSV
        <input type="file" accept=".csv" @change="loadFile" style="display:none" />
      </label>
      <span style="font-size:13px;color:#64748b">{{ fileName || 'No file selected' }}</span>
      <button v-if="rows.length" @click="reset" style="margin-left:auto;padding:6px 14px;background:#fee2e2;color:#ef4444;border:none;border-radius:6px;cursor:pointer;font-size:13px">
        Clear
      </button>
    </div>

    <!-- Stats -->
    <div v-if="rows.length" style="display:flex;gap:16px;margin-bottom:16px">
      <span style="font-size:13px;color:#64748b">📋 {{ rows.length }} rows</span>
      <span style="font-size:13px;color:#64748b">📐 {{ headers.length }} columns</span>
    </div>

    <!-- Table -->
    <div v-if="rows.length" style="overflow:auto;border:1px solid #e2e8f0;border-radius:8px;max-height:500px">
      <table style="border-collapse:collapse;width:100%;font-size:13px">
        <thead>
          <tr style="background:#f1f5f9;position:sticky;top:0">
            <th v-for="h in headers" :key="h"
                style="padding:10px 14px;text-align:left;font-weight:600;color:#374151;border-bottom:1px solid #e2e8f0;white-space:nowrap">
              {{ h }}
            </th>
          </tr>
        </thead>
        <tbody>
          <tr v-for="(row, i) in rows" :key="i"
              :style="i % 2 === 0 ? 'background:#fff' : 'background:#f8fafc'">
            <td v-for="h in headers" :key="h"
                style="padding:8px 14px;border-bottom:1px solid #f1f5f9;color:#1e293b;max-width:200px;overflow:hidden;text-overflow:ellipsis;white-space:nowrap">
              {{ row[h] ?? '' }}
            </td>
          </tr>
        </tbody>
      </table>
    </div>

    <p v-if="error" style="color:#ef4444;font-size:13px">⚠️ {{ error }}</p>

    <div v-if="!rows.length && !error" style="text-align:center;padding:60px;color:#94a3b8">
      <div style="font-size:48px;margin-bottom:12px">📂</div>
      <p style="margin:0;font-size:14px">Upload a CSV file to preview it here</p>
    </div>
  </div>
</template>

<script setup>
import { ref } from 'vue'

const headers = ref([])
const rows = ref([])
const fileName = ref('')
const error = ref('')

function reset() {
  headers.value = []
  rows.value = []
  fileName.value = ''
  error.value = ''
}

function loadFile(e) {
  const file = e.target.files[0]
  if (!file) return
  reset()
  fileName.value = file.name

  const reader = new FileReader()
  reader.onload = (ev) => {
    try {
      parseCSV(ev.target.result)
    } catch (err) {
      error.value = err.message
    }
  }
  reader.readAsText(file)
}

function parseCSV(text) {
  const lines = text.trim().split(/\r?\n/)
  if (lines.length < 2) throw new Error('CSV must have at least a header row and one data row')

  const parse = (line) => {
    const result = []
    let current = ''
    let inQuotes = false
    for (let i = 0; i < line.length; i++) {
      const ch = line[i]
      if (ch === '"') {
        inQuotes = !inQuotes
      } else if (ch === ',' && !inQuotes) {
        result.push(current.trim())
        current = ''
      } else {
        current += ch
      }
    }
    result.push(current.trim())
    return result
  }

  headers.value = parse(lines[0])
  rows.value = lines.slice(1).map(line => {
    const vals = parse(line)
    return Object.fromEntries(headers.value.map((h, i) => [h, vals[i] ?? '']))
  })
}
</script>
