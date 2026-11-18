# Repository guide

## Build, test, and lint

- Use Node.js 26.x (`.nvmrc`) and install dependencies with `npm ci`.
- `npm start` starts the development server at `http://localhost:3000`.
- `npm run build` creates the production bundle in `build/`; this is also the build run by the GitHub Actions workflow.
- `CI=true npm test -- --runInBand` runs the Jest suite once without watch mode.
- To run one test, use `CI=true npm test -- --runInBand ui/path/to/file.test.tsx` (or the matching `.spec.*` path). Jest discovers tests under `ui/**/__tests__` and files named `*.test.*` or `*.spec.*`.
- There is no standalone lint script. ESLint is wired into the webpack build/dev compilation; `npm run build` checks the production build.

## Architecture

- This is a React 16 + TypeScript single-page app. `ui/index.tsx` mounts the app inside React Router; `ui/App.tsx` defines `/` (home/prompt and shows), `/game` (interactive game), and `/epk` (press kit). Feature components and their CSS generally live together under `ui/`.
- The game is a data-driven text adventure. `ui/Game/spoilers.ts` defines item/command constants and the section script (dialog, accepted terms, transitions, item conditions); `ui/Game/Game.reducer.tsx` owns player state and exposes it through `GameProvider`/`useGame`; `ui/Game/Game.fc.tsx` interprets player input and connects script transitions to the UI. Keep script-driven behavior in sync with reducer state and the game partials when changing sections, items, or scenes.
- Shows and the press kit fetch JSON from SheetDB in their feature components, then use the matching `*.model.tsx` `toUI()` conversion to map API records into UI data. The older `Posts` component/model still targets Google Sheets; it is not part of the home route.
- Shared global styles are imported by `ui/index.tsx` from `ui/_styles`. Static assets are served from `public/`; game music and imagery are referenced by paths relative to that public root.

## Repository conventions

- TypeScript is strict (`tsconfig.json`, TypeScript 4.9). `baseUrl` is `ui`, and `@curses/*` and `@styles/*` map to shared code and styles; CRACO keeps these nonstandard source paths wired into React Scripts.
- React feature components use the `.fc.tsx` suffix; associated styles use a neighboring `.css` file. Data adapters use `.model.tsx` and expose a `toUI()` method.
- Keep game vocabulary and transitions in the typed constants/script in `ui/Game/spoilers.ts`; game state updates belong in the reducer/context rather than being duplicated as local state in game UI.
- Follow the nearby file's formatting: the codebase contains both two-space and tab-indented files. `ui/.prettierrc` specifies two-space indentation when formatting new code.
