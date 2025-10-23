# Shibli Homestaging - Project Automation Tools

This automation toolkit simplifies adding new projects to your portfolio website.

## Key Features

- **Natural Image Ordering**: Images are added in the same order they appear in your folder
- **Automatic Grid Detection**: Script determines optimal grid size (4x2, 4x3, or 5x3) based on image count
- **First Position Insertion**: New projects automatically become the first/newest project on the website
- **Automatic Code Generation**: Generates all necessary code snippets for seamless integration

## Prerequisites

- Node.js installed on your computer
- Images downloaded from Zillow into a folder

## Available Scripts

### 1. `npm run resize-images` (Image Standardization)

**Use this when:** You want to standardize all image sizes before uploading to prevent UI issues.

**What it does:**
- Scans all images in folder
- Finds smallest dimensions automatically
- Resizes larger images to match (never upsizes)
- Maintains aspect ratios and quality
- Creates backup of originals in `_originals_backup` folder

**Usage:**
```bash
npm run resize-images ./path/to/images
```

Or specify custom target dimensions:
```bash
npm run resize-images ./path/to/images 1200 800
```

**Example:**
```bash
npm run resize-images "./Oakland House"
npm run resize-images "./SF Apt 3" 1400 900
```

**Benefits:**
- Prevents lightbox arrows from jumping around
- Consistent loading times
- Smaller file sizes for faster uploads
- Professional, uniform appearance

**Requirements:**
- macOS: Uses built-in `sips` tool (no installation needed)
- Other platforms: Requires ImageMagick (`brew install imagemagick`)

---

### 2. `npm run add-project` (Manual Mode)

**Use this when:** You want to see the generated code first before updating the website.

**What it does:**
- Scans your image folder
- Generates code snippets
- Displays the code in terminal
- Saves code to a `.txt` file for reference

**Usage:**
```bash
npm run add-project "Project Name" ./path/to/images
```

**Example:**
```bash
npm run add-project "Brentwood House" ./Brentwood
npm run add-project "SF Apartment 3" "./SF Apt 3"
```

**Output:**
- Code snippet for `projectImages` object
- HTML snippet for portfolio section
- Saves everything to `project-name-code.txt`

---

### 3. `npm run auto-update` (Automatic Mode)

**Use this when:** You want the script to automatically update `index.html` for you.

**What it does:**
- Scans your image folder
- **Automatically updates** `index.html`
- Adds project to `projectImages`
- Adds portfolio card to HTML
- Creates backup file (`index.html.backup`)

**Usage:**
```bash
npm run auto-update "Project Name" ./path/to/images
```

**Example:**
```bash
npm run auto-update "Brentwood House" ./Brentwood
npm run auto-update "SF Apartment 3" "./SF Apt 3"
```

**Safety:**
- Creates `index.html.backup` before making changes
- Won't overwrite if project already exists

---

## Complete Workflow

### Step 1: Download Images from Zillow
Download all property images into a folder inside your project directory.

**Example folder structure:**
```
Mom Website/
  ├── Brentwood/
  │   ├── living1.jpg
  │   ├── bedroom1.jpg
  │   └── kitchen1.jpg
  ├── SF Apt 3/
  │   ├── image1.jpg
  │   └── image2.jpg
  └── index.html
```

### Step 2: Resize Images (Recommended)
```bash
npm run resize-images "./Brentwood"
```

This standardizes all image sizes to prevent lightbox arrow jumping. Creates backup of originals.

### Step 3: Run the Automation Script

**Option A: Manual (see code first)**
```bash
npm run add-project "Brentwood House" ./Brentwood
```
Then copy/paste the generated code into `index.html`.

**Option B: Automatic (updates file for you)**
```bash
npm run auto-update "Brentwood House" ./Brentwood
```
Review the changes in `index.html`.

### Step 4: Upload Images to GitHub
```bash
git add Brentwood/
git commit -m "Add Brentwood House project images"
git push
```

### Step 5: Commit Website Changes
```bash
git add index.html
git commit -m "Add Brentwood House to portfolio"
git push
```

### Step 6: Update cPanel
Log into cPanel and pull the latest changes from GitHub.

---

## How It Works

### Image Ordering
Images are processed in **natural alphabetical order** (the same order you see them in Finder/Explorer). Make sure to name/order your images appropriately before running the script.

### Grid Detection
The script automatically selects the best grid layout:
- **1-8 images**: 4x2 grid (8 slots)
- **9-12 images**: 4x3 grid (12 slots)
- **13-15 images**: 5x3 grid (15 slots)

### Project Positioning
**New projects are always added as the FIRST project** on your website, making them appear at the top of your portfolio as the newest work.

## Tips

- **Use quotes** around project names with spaces: `"SF Apartment 3"`
- **Supported image formats:** .jpg, .jpeg, .png, .webp, .gif
- **Image naming**: Name images in the order you want them displayed (e.g., 01-living.jpg, 02-kitchen.jpg)
- Script adds 5 empty slots for future images
- First image in folder becomes the portfolio card thumbnail

## Troubleshooting

**"Folder not found" error:**
- Check the path to your image folder
- Use `./FolderName` for folders in current directory
- Use quotes for paths with spaces

**"No images found" error:**
- Make sure your folder contains .jpg, .jpeg, .png, .webp, or .gif files
- Check file extensions (must be lowercase or standard)

**Project already exists:**
- `auto-update` will warn you and skip updating
- Manually remove the old project from `index.html` first
- Or use `add-project` to generate new code and update manually

---

## Need to Undo?

If `auto-update` makes a mistake, restore from backup:
```bash
cp index.html.backup index.html
```

---

## Example: Complete Real Workflow

```bash
# 1. Downloaded images to "Oakland House" folder

# 2. Resize images for consistent sizing
npm run resize-images "./Oakland House"

# 3. Run automation
npm run auto-update "Oakland House" "./Oakland House"

# 4. Upload images to GitHub
git add "Oakland House/"
git commit -m "Add Oakland House project images"
git push

# 5. Commit website changes
git add index.html
git commit -m "Add Oakland House to portfolio"
git push

# 6. Update cPanel (via web interface)
```

Done! 🎉

---

## Time Saved

**Old workflow:** ~15-20 minutes per project
**New workflow:** ~3-4 minutes per project (including resize)

**Savings:** ~11-16 minutes per project! ⚡
