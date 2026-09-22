# Bajaj Finserv App

A Next.js 14 JSON data processor frontend for the Bajaj Finserv API — paste
JSON data, POST it to the `/bfhl` backend, and filter which fields appear in the
response.

[![GitHub stars](https://img.shields.io/github/stars/5h4d0wn1k/bajaj-finshery-app)](#)
[![Last commit](https://img.shields.io/github/last-commit/5h4d0wn1k/bajaj-finshery-app)](#)

Deployment: [bajaj-finshery-app.vercel.app](https://bajaj-finshery-app.vercel.app)

## Why this project

API integration demos need to make request/response flows tangible. This app is
a focused, client-side tool for working with the Bajaj Finserv `/bfhl`
endpoint: it validates that you pasted valid JSON, submits it to the backend,
and then lets you inspect the response field-by-field with a multi-select. It
keeps the frontend minimal and dependency-light — Next.js 14 with the App
Router, Tailwind CSS, Radix UI primitives, and `react-select` — so it doubles
as a clean starting point for JSON-driven API frontends.

## Features

- **Next.js 14 App Router** with React 18 (JavaScript)
- **JSON validation** — invalid input is caught and surfaced before submit
- **Backend POST** — submits the parsed JSON to the `/bfhl` endpoint and
  renders the response
- **Field filtering** — multi-select (`react-select`) to show only the response
  keys you care about
- **Response inspector** — read-only, pretty-printed JSON output
- **Tailwind CSS + Radix UI** — `button`, `card`, `label`, `select`, `textarea`,
  `checkbox` primitives
- **Custom typography** — Bricolage Grotesque + Space Mono via `next/font`

## Quickstart

Prerequisites: Node 18+, npm.

```bash
npm install
npm run dev       # http://localhost:3000
npm run build     # production build
npm run start     # serve the production build
npm run lint      # eslint
```

## Project structure

- `src/app/` — App Router `layout.js` and `page.js`
- `src/components/ui/` — Radix/Tailwind UI primitives
- `src/components/component/` — the main JSON processor component
- `src/lib/utils.js` — `cn()` classname helper

## Contributing

Contributions are welcome via issues and pull requests.

## License

No LICENSE file is currently published in this repository. Contact the
maintainer about usage terms.