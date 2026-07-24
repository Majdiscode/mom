# AGENTS.md

Guidance for coding agents working on the Shibli Homestaging Services website.

## Current architecture

This is a static, dependency-free website deployed through cPanel.

- `index.html` contains the semantic page structure and contact form.
- `css/styles.css` contains the complete responsive design system.
- `js/slideshow-data.js` is the canonical ordered portfolio image list.
- `js/slideshow-controller.js` contains pure carousel state helpers.
- `js/contact-form.js` contains the Formspree request boundary.
- `js/script.js` connects the page, carousel, form, and footer behavior.
- `scripts/` contains image preparation, portfolio-update, lint, and audit tools.
- `tests/` uses the built-in Node.js test runner.

The portfolio is a single accessible carousel. Only its current image is present
in the rendered image element; the next image is preloaded after the current one
finishes. Do not recreate legacy project cards, grids, or modals.

## Commands

```bash
npm test
npm run test:coverage
npm run lint
npm run build
npm run audit-media
```

Local preview:

```bash
python3 -m http.server 8765
```

Then open `http://localhost:8765/`.

## Adding portfolio images

1. Put the source images in a named folder inside the repository.
2. Convert non-JPEG images only if necessary:
   `npm run convert-to-jpg -- "./Folder Name"`
3. Resize oversized originals if necessary:
   `npm run resize-images -- "./Folder Name"`
4. Preview the generated entries:
   `npm run add-project -- "Project Name" "./Folder Name"`
5. Update the slideshow data:
   `npm run auto-update -- "Project Name" "./Folder Name"`
6. Review `js/slideshow-data.js`, run `npm run build`, and test the carousel.

The update tool inserts a labeled block at `AUTO-INSERT:START`, creates a
timestamped backup, preserves natural filename ordering, encodes GitHub paths,
and refuses duplicate project names.

## Important constraints

- Portfolio files are served from
  `https://raw.githubusercontent.com/Majdiscode/mom/main/`.
- Every image entry needs specific, useful alt text.
- Keep exactly one `#slideshowImage` element in the page.
- Preserve arrow-key, button, and swipe navigation.
- Preserve `prefers-reduced-motion` behavior and visible focus styles.
- Keep Formspree pointed at `https://formspree.io/f/mpwlprla`.
- Do not place secrets, inline event handlers, or inline styles in `index.html`.
- Do not delete media merely because the audit reports duplicate contents;
  confirm that no published GitHub URL depends on the path first.
- Do not overwrite unrelated working-tree changes.

## Verification

Before presenting a change as complete:

1. Run `npm run build`.
2. Run `npm run test:coverage`.
3. Run `npm run audit-media` when media changed.
4. Render desktop, tablet, and 375px mobile layouts.
5. Confirm only the current and preloaded-next portfolio requests occur.
6. Test buttons, keyboard arrows, swipe navigation, failed-image recovery,
   native form validation, successful form feedback, and network-error feedback.
7. Confirm the browser console has no errors.
