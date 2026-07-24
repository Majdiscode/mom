# Quick start

## Preview the website

```bash
python3 -m http.server 8765
```

Open `http://localhost:8765/`.

## Add a portfolio project

```bash
# Optional preparation
npm run convert-to-jpg -- "./Folder Name"
npm run resize-images -- "./Folder Name"

# Preview, then update
npm run add-project -- "Project Name" "./Folder Name"
npm run auto-update -- "Project Name" "./Folder Name"

# Verify
npm run build
npm run test:coverage
```

Review the new entries in `js/slideshow-data.js`, especially their alt text.
The first entry in the managed region appears first in the portfolio.

## Before publishing

- Confirm every new GitHub raw image URL loads.
- Test previous, next, arrow keys, swipe, and first/last wraparound.
- Test at 375px, 768px, and desktop widths.
- Submit the contact form once with valid test data.
- Disable the network and confirm the form displays a useful failure message.
- Review `git status`; do not commit downloaded listings, generated backups, or
  unrelated files.

See `README-AUTOMATION.md` for detailed behavior and troubleshooting.
