<template>
  <div style="display:flex;min-height:100vh;font-family:system-ui,sans-serif">
    <!-- Sidebar -->
    <nav style="width:200px;background:#1e1b4b;padding:24px 16px;flex-shrink:0">
      <h2 style="color:#a5b4fc;font-size:14px;margin:0 0 20px;text-transform:uppercase;letter-spacing:.1em">
        🛠 Internal Tools
      </h2>
      <ul style="list-style:none;margin:0;padding:0">
        <li v-for="item in navItems" :key="item.path" style="margin-bottom:4px">
          <RouterLink
            :to="item.path"
            style="display:block;padding:8px 12px;border-radius:6px;color:#c7d2fe;text-decoration:none;font-size:14px;transition:background .15s"
            active-class="active-link"
          >
            {{ item.icon }} {{ item.label }}
          </RouterLink>
        </li>
      </ul>
    </nav>

    <!-- Main content -->
    <main style="flex:1;padding:32px;background:#f8fafc;overflow:auto">
      <RouterView />
    </main>
  </div>
</template>

<script setup>
const navItems = [
  { path: '/', label: 'Home', icon: '🏠' },
  { path: '/json', label: 'JSON Formatter', icon: '📄' },
  { path: '/password', label: 'Password Generator', icon: '🔑' },
  { path: '/csv', label: 'CSV Preview', icon: '📊' },
  { path: '/base64', label: 'Base64', icon: '🔐' },
]
</script>

<style>
* { box-sizing: border-box; }
body { margin: 0; }
.active-link {
  background: rgba(165, 180, 252, 0.15) !important;
  color: #fff !important;
  font-weight: 600;
}
</style>
