<template>
  <div>
    <h1 style="margin:0 0 8px;font-size:24px;color:#1e1b4b">Internal Tools</h1>
    <p style="color:#64748b;margin:0 0 32px">A collection of handy utilities for the team.</p>

    <div style="display:grid;grid-template-columns:repeat(auto-fill,minmax(200px,1fr));gap:16px">
      <RouterLink
        v-for="tool in tools"
        :key="tool.path"
        :to="tool.path"
        style="text-decoration:none"
      >
        <div style="background:#fff;border:1px solid #e2e8f0;border-radius:10px;padding:20px;cursor:pointer;transition:box-shadow .2s"
             @mouseenter="hovered=tool.path" @mouseleave="hovered=null"
             :style="hovered===tool.path ? 'box-shadow:0 4px 12px rgba(0,0,0,.08)' : ''">
          <div style="font-size:28px;margin-bottom:8px">{{ tool.icon }}</div>
          <div style="font-size:15px;font-weight:600;color:#1e293b;margin-bottom:4px">{{ tool.label }}</div>
          <div style="font-size:12px;color:#94a3b8">{{ tool.description }}</div>
        </div>
      </RouterLink>
    </div>
  </div>
</template>

<script setup>
import { ref } from 'vue'

const hovered = ref(null)

const tools = [
  { path: '/json', icon: '📄', label: 'JSON Formatter', description: 'Pretty-print and validate JSON' },
  { path: '/password', icon: '🔑', label: 'Password Generator', description: 'Generate secure random passwords' },
  { path: '/csv', icon: '📊', label: 'CSV Preview', description: 'Parse and preview CSV data as a table' },
  { path: '/base64', icon: '🔐', label: 'Base64', description: 'Encode or decode Base64 strings' },
]
</script>
