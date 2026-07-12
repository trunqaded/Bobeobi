# Agent instructions

Read `README.md` before changing the project. Global instructions are inherited from `~/.codex/AGENTS.md`.

## Project constraints

- This is a dependency-free static site published through GitHub Pages.
- Preserve the Russian poem text, line breaks, punctuation, and attribution unless the user explicitly requests an editorial change.
- Keep the established Russian Futurist visual language and responsive reading experience.
- Do not replace existing artwork or generated brand assets without inspecting them visually.
- Preserve `CNAME` and deployment-related assets.

## Verification

- Run `python3 -m http.server 4173` from the repository root.
- Verify the result in the browser at desktop and mobile viewport sizes.
- Check navigation, images, share behavior, favicons, and missing asset requests.
