# reshipaku

An app to save and manage recipe URLs and create shopping lists.

## Tech Stack

- **Client**: Expo / React Native / TypeScript
- **Server**: Hono / Cloudflare Workers / TypeScript
- **AI**: Vercel AI SDK + Google Gemini
- **Linter / Formatter**: Biome
- **CI**: GitHub Actions

## Getting Started

### Prerequisites

- [Node.js](https://nodejs.org/) v22+
- [pnpm](https://pnpm.io/) v9+

### Setup

```bash
pnpm install
```

### Development

```bash
# Start the API server
pnpm sv dev

# Start the Expo dev server
pnpm client start

# Launch on iOS simulator
pnpm client ios
```

### Lint & Format

```bash
# Check
pnpm sv check
pnpm client check

# Auto-fix
pnpm sv format
pnpm client format
```

### Deploy

```bash
# Deploy server to Cloudflare Workers
pnpm sv deploy
```

## License

Private
