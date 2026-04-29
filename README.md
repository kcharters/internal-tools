# Internal Tools

A lightweight **Vue 3 + Vite** web app housing a collection of everyday internal utilities for the team. No backend required — runs entirely in the browser.

## Tools

| Tool | Description |
|---|---|
| JSON Formatter | Pretty-print or minify JSON with one click |
| Password Generator | Cryptographically random passwords with strength meter |
| CSV Preview | Upload and preview CSV files as a paginated table |
| Base64 | Encode or decode Base64 strings |

## Getting Started

```bash
npm install
npm run dev
```

Open [http://localhost:5000](http://localhost:5000).

## Adding a New Tool

1. Create a new `.vue` file in `src/views/`
2. Add a route to `src/main.js`
3. Add the nav item to the `navItems` array in `src/App.vue`
4. Add a card to the `tools` array in `src/views/Home.vue`

## Project Structure

```
internal-tools/
  src/
    main.js           # app entry + router
    App.vue           # shell with sidebar nav
    views/
      Home.vue               # tool launcher grid
      JsonFormatter.vue
      PasswordGenerator.vue
      CsvPreview.vue
      Base64Tool.vue
  index.html
  vite.config.js
  package.json
```
