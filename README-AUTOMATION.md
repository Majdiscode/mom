# Portfolio automation

The automation tools add a folder of images to the current on-demand slideshow.
They update `js/slideshow-data.js`; they do not generate cards, grids, or modal
markup.

## Prerequisites

- Node.js 22 or newer
- Source images stored inside this repository
- macOS `sips` or ImageMagick for conversion and resizing

## Recommended workflow

### 1. Prepare a folder

Use clear, naturally sortable filenames:

```text
Oakland House/
  01-living-room.jpg
  02-dining-room.jpg
  03-bedroom.jpg
```

Clear filenames produce better initial alt text. Review the generated alt text
before publishing.

### 2. Convert formats when needed

```bash
npm run convert-to-jpg -- "./Oakland House"
```

This command converts supported non-JPEG formats and creates an
`_originals_backup` directory. It changes image files, so inspect the folder
afterward.

### 3. Resize oversized images when needed

```bash
npm run resize-images -- "./Oakland House"
```

Optional explicit dimensions:

```bash
npm run resize-images -- "./Oakland House" 1536 1024
```

The command never intentionally upscales images and creates a backup before
resizing.

### 4. Preview generated slideshow entries

```bash
npm run add-project -- "Oakland House" "./Oakland House"
```

Preview mode does not change website source. It prints the exact labeled block
that automatic mode would insert.

### 5. Update the slideshow data

```bash
npm run auto-update -- "Oakland House" "./Oakland House"
```

Automatic mode:

- reads supported image files in natural filename order;
- generates encoded GitHub raw URLs;
- derives initial alt text from the project and filename;
- inserts the project at the start of the managed data region;
- rejects an existing project label;
- writes a timestamped backup beside `js/slideshow-data.js`;
- updates the data file atomically.

### 6. Review and verify

Open `js/slideshow-data.js` and make every alt description specific to what is
visible in the photograph. Then run:

```bash
npm run build
npm run test:coverage
python3 -m http.server 8765
```

At `http://localhost:8765/`, verify the first image, both arrow buttons,
keyboard arrows, mobile swipe, wraparound from first to last, and the counter.

## Available commands

| Command | Purpose |
| --- | --- |
| `npm run add-project -- "Name" "./Folder"` | Preview a new slideshow block |
| `npm run auto-update -- "Name" "./Folder"` | Insert a new slideshow block |
| `npm run convert-to-jpg -- "./Folder"` | Convert supported formats to JPEG |
| `npm run resize-images -- "./Folder"` | Normalize oversized dimensions |
| `npm run audit-media` | Report exact duplicate tracked image contents |
| `npm run build` | Run source checks and tests |
| `npm run test:coverage` | Enforce the coverage threshold |

## Troubleshooting

**Image folder not found**

Use a repository-relative path and quote paths containing spaces.

**No supported images found**

Supported additions are JPG, JPEG, PNG, WebP, and GIF files.

**Project already exists**

Choose a distinct project label or deliberately edit the existing labeled block.

**Insertion markers are missing**

Restore `AUTO-INSERT:START` and `AUTO-INSERT:END` in
`js/slideshow-data.js`; do not insert into an arbitrary array.

**An image fails after deployment**

Confirm the exact path, capitalization, and extension exist on the GitHub
`main` branch. GitHub paths are case-sensitive.

## Media duplication

`npm run audit-media` reports byte-identical tracked images. It does not delete
anything. A duplicate path may still be a published GitHub URL, so consolidate
only after checking the live slideshow and any externally shared links.
