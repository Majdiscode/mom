# CLAUDE.md

The authoritative repository guidance is in `AGENTS.md`. Read it before making
changes.

## Project summary

Shibli Homestaging Services is a static HTML/CSS/JavaScript site with:

- a responsive editorial landing page;
- an accessible, on-demand portfolio slideshow;
- a Formspree contact form with native validation and announced result states;
- Node.js automation for preparing and adding portfolio images;
- dependency-free tests, lint checks, and cPanel deployment.

Portfolio order and metadata live in `js/slideshow-data.js`. Use
`npm run add-project` to preview additions and `npm run auto-update` to insert a
new labeled image block. Never edit an obsolete generated HTML gallery.

Run `npm run build` and `npm run test:coverage` after every implementation
change. Browser-check desktop and mobile behavior before handing work off.
