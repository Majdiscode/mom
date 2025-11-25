# Quick Start Guide

## New Project in 5 Steps

### 1️⃣ Download & Organize Images
- Download all Zillow images to a folder (any format: webp, png, jpg, etc.)
- Name them in order (e.g., 01-living.jpg, 02-kitchen.jpg, etc.)
- Put folder in your project directory

### 2️⃣ Convert All Images to JPG (REQUIRED)
```bash
npm run convert-to-jpg "./FolderName"
```

**What it does:**
✅ Converts ALL image formats (webp, png, gif, etc.) to JPG
✅ Deletes original non-JPG files after conversion
✅ Creates backup of originals in `_originals_backup`
✅ Standardizes format for consistent website display

**Why?** Website only uses JPG format for all images!

### 3️⃣ Resize Images (Optional but Recommended)
```bash
npm run resize-images "./FolderName"
```

**What it does:**
✅ Analyzes all images to find smallest dimensions
✅ Resizes larger images to match (no upsizing)
✅ Creates backup of originals in `_originals_backup`
✅ Maintains aspect ratios and quality

**Why?** Prevents arrow jumping in lightbox viewer!

### 4️⃣ Run Automation Script
```bash
npm run auto-update "Project Name" ./FolderName
```

**What it does automatically:**
✅ Scans images in natural order (top to bottom in folder)
✅ Detects optimal grid size (4x2, 4x3, or 5x3)
✅ Updates `index.html` with all code
✅ Adds project as **FIRST** on website
✅ Creates backup file

### 5️⃣ Push to GitHub
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

# 1. Convert all images to JPG format (REQUIRED)
npm run convert-to-jpg "./Oakland House"

# 2. Resize images for consistent sizing (Optional)
npm run resize-images "./Oakland House"

# 3. Add to website
npm run auto-update "Oakland House" "./Oakland House"

# 4. Review changes and push
git add .
git commit -m "Add Oakland House project"
git push

# 5. Update cPanel
```

---

## Grid Sizes (Automatic)

| Images | Grid Type | Description |
|--------|-----------|-------------|
| 1-8    | 4x2       | Small projects |
| 9-12   | 4x3       | Medium projects |
| 13-15  | 5x3       | Large projects |

---

## Four Tools Available

### 1. Format Converter (REQUIRED FIRST STEP)
```bash
npm run convert-to-jpg ./folder
```
Converts all images to JPG format. **Run this first!**

### 2. Image Resizer (Recommended Second Step)
```bash
npm run resize-images ./folder
```
Standardizes image sizes to prevent UI jumping.

### 3. Auto-Update (Recommended)
```bash
npm run auto-update "Name" ./folder
```
Directly updates `index.html` for you.

### 4. Manual Preview
```bash
npm run add-project "Name" ./folder
```
Shows code snippets to copy/paste manually.

---

## Important Notes

✨ **Image Format**: ALWAYS convert to JPG first (required!)
✨ **Image Sizing**: Use resize tool after conversion for best results
✨ **Images**: Use the order they appear in your folder
✨ **New projects**: Always added as FIRST project
✨ **Grid**: Automatically chosen based on image count
✨ **Backup**: Always created before changes (convert, resize, and auto-update)

Need more details? See `README-AUTOMATION.md`
