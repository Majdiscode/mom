# Quick Start Guide

## New Project in 4 Steps

### 1️⃣ Download & Organize Images
- Download all Zillow images to a folder
- Name them in order (e.g., 01-living.jpg, 02-kitchen.jpg, etc.)
- Put folder in your project directory

### 2️⃣ Resize Images (Optional but Recommended)
```bash
npm run resize-images "./FolderName"
```

**What it does:**
✅ Analyzes all images to find smallest dimensions
✅ Resizes larger images to match (no upsizing)
✅ Creates backup of originals in `_originals_backup`
✅ Maintains aspect ratios and quality

**Why?** Prevents arrow jumping in lightbox viewer!

### 3️⃣ Run Automation Script
```bash
npm run auto-update "Project Name" ./FolderName
```

**What it does automatically:**
✅ Scans images in natural order (top to bottom in folder)
✅ Detects optimal grid size (4x2, 4x3, or 5x3)
✅ Updates `index.html` with all code
✅ Adds project as **FIRST** on website
✅ Creates backup file

### 4️⃣ Push to GitHub
```bash
git add .
git commit -m "Add Project Name"
git push
```

Then update cPanel. **Done!** 🎉

---

## Example

```bash
# You downloaded "Oakland House" images to a folder

# 1. Resize images for consistent sizing
npm run resize-images "./Oakland House"

# 2. Add to website
npm run auto-update "Oakland House" "./Oakland House"

# 3. Review changes and push
git add .
git commit -m "Add Oakland House project"
git push

# 4. Update cPanel
```

---

## Grid Sizes (Automatic)

| Images | Grid Type | Description |
|--------|-----------|-------------|
| 1-8    | 4x2       | Small projects |
| 9-12   | 4x3       | Medium projects |
| 13-15  | 5x3       | Large projects |

---

## Three Tools Available

### 1. Image Resizer (Recommended First Step)
```bash
npm run resize-images ./folder
```
Standardizes image sizes to prevent UI jumping.

### 2. Auto-Update (Recommended)
```bash
npm run auto-update "Name" ./folder
```
Directly updates `index.html` for you.

### 3. Manual Preview
```bash
npm run add-project "Name" ./folder
```
Shows code snippets to copy/paste manually.

---

## Important Notes

✨ **Image Sizing**: Use resize tool BEFORE adding project
✨ **Images**: Use the order they appear in your folder
✨ **New projects**: Always added as FIRST project
✨ **Grid**: Automatically chosen based on image count
✨ **Backup**: Always created before changes (both resize and auto-update)

Need more details? See `README-AUTOMATION.md`
