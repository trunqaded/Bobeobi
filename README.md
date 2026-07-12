# Bobeobi

Bobeobi is an atmospheric visual collection of poems by Velimir Khlebnikov, combining large Cyrillic typography, original illustrations, and a restrained Russian Futurist presentation.

## Product contract

Bobeobi presents a focused, atmospheric reading experience for a curated collection of Khlebnikov poems while preserving the original text, artwork, and Russian Futurist visual language.

It is not a general publishing platform, content-management system, or editorial modernization of the poems.

## First vertical slice

Serve the static site locally, navigate between poems, open the associated artwork, and verify that the same experience remains usable on desktop and mobile.

## Definition of done

- Every published poem, attribution, illustration, and navigation target is present and correct.
- Desktop and mobile layouts preserve readable typography and intentional line breaks.
- Image expansion, sharing, favicons, social previews, and all asset requests work.
- `CNAME` and the dependency-free GitHub Pages deployment remain intact.

## Structure

- `index.html` — the published single-page collection.
- `styles.css` — layout, typography, responsive behavior, and image viewing.
- `script.js` — navigation, image interaction, and sharing behavior.
- `assets/` — illustrations, previews, favicons, and social artwork.
- `assets/fullscreen/` — optimized fullscreen artwork loaded by the lightbox.
- `CNAME` — GitHub Pages custom domain configuration.

## Run locally

```bash
python3 -m http.server 4173
```

Open `http://127.0.0.1:4173/`.

## Verification

- Check desktop and mobile layouts in a real browser.
- Verify poem navigation, active state, image expansion, sharing, and all asset requests.
- Confirm `CNAME`, favicons, and social preview assets remain present before publishing.

## Canonical location

`/Users/trunqo/Documents/Projects/Bobeobi`
