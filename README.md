# Unplayed App

A personal game backlog tracker that lets you organize and browse your video game collection across categories: **Unplayed**, **Unbeaten**, **Beaten**, and **Abandoned**.

This is a Vue.js reimplementation of [Unplayed](https://shauninman.com/archive/2011/04/18/unplayed) by Shaun Inman. Instead of PHP, it uses Vue.js as the frontend framework and loads game data from simple Markdown files—no backend or database required.

## What You Can Do

- **Browse your backlog** — View all games in one combined list or split by category
- **Filter by console** — Click console buttons (e.g., PS4, Switch, PC) to narrow the list
- **Search by name** — Type in the search box to find specific games
- **Sort** — Sort the full list by game name or console
- **Manage your list** — Edit Markdown files in `unplayed-lists/` to add, remove, or move games between categories

## Tech Stack

| Category | Tools |
|----------|-------|
| **Framework** | Vue.js 2, Vue Router |
| **Markdown** | [Showdown](https://github.com/showdownjs/showdown) — parses Markdown game lists to HTML |
| **UI** | Bootstrap 4, Open Iconic |
| **Build** | Webpack 3, Babel |
| **Testing** | Jest, Nightwatch |
| **Deployment** | gh-pages (GitHub Pages) |

## Running Locally

**Prerequisites:** Node.js 6+ and npm 3+

```bash
# Install dependencies
npm install

# Start development server with hot reload (http://localhost:8080)
npm run dev
# or
npm start
```

## Building for Production

```bash
# Build static files to dist/
npm run build

# Optional: view bundle analysis
npm run build --report
```

The output in `dist/` can be served by any static host.

## Deploying to GitHub Pages

```bash
# Build and push to gh-pages branch
npm run deploy
```

The site will be live at `https://<username>.github.io/unplayed-app/`.

**Note:** If your repo name differs from `unplayed-app`, update `assetsPublicPath` in `config/index.js` to match (e.g., `'/your-repo-name/'`).

## Customizing Your Game List

Games are stored in Markdown files under `unplayed-lists/`:

| File | Category |
|------|----------|
| `unplayed.markdown` | Games you haven't started |
| `unbeaten.markdown` | Games in progress |
| `beaten.markdown` | Completed games |
| `abandoned.markdown` | Games you've given up on |

**Format:**
```markdown
A short description (optional).

- [Game Title](https://optional-link.com) (Console)
- Another Game (Platform)
```

Examples:
- `- [Persona 5](https://www.metacritic.com/game/playstation-4/persona-5) (PS4)`
- `- Miles Edgeworth: Ace Attorney Investigations 2 (DS)`

## Other Scripts

```bash
# Run unit tests
npm run unit

# Run end-to-end tests
npm run e2e

# Run all tests
npm test

# Lint code
npm run lint
```

## License

MIT
