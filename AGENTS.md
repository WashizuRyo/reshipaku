# reshipaku

An app to save and manage recipe URLs and create shopping lists.

## Architecture

Monorepo powered by pnpm workspaces.

| Package | Role | Tech Stack |
|---|---|---|
| `packages/client` | Mobile app | Expo, React Native, TypeScript |
| `packages/server` | API server | Hono, Cloudflare Workers, TypeScript |

## Tech Stack

- **Package manager**: pnpm (workspaces)
- **Language**: TypeScript
- **Linter / Formatter**: Biome (configured per package)
- **CI**: GitHub Actions (Biome check + tsc --noEmit)
- **AI**: Vercel AI SDK + Google Gemini

## Platforms

- Targeting iOS first (via EAS Build)
- Android support planned

## Commands

```bash
# Server
pnpm sv dev           # Start local dev server
pnpm sv deploy        # Deploy to Cloudflare Workers
pnpm sv check         # Run lint and format check
pnpm sv format        # Auto-fix lint and format issues

# Client
pnpm client start     # Start Expo dev server
pnpm client ios       # Launch on iOS simulator
pnpm client check     # Run lint and format check
pnpm client format    # Auto-fix lint and format issues
```
