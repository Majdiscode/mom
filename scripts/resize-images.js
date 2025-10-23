#!/usr/bin/env node

const fs = require('fs');
const path = require('path');
const { execSync } = require('child_process');

// ANSI color codes
const colors = {
  reset: '\x1b[0m',
  bright: '\x1b[1m',
  green: '\x1b[32m',
  blue: '\x1b[34m',
  yellow: '\x1b[33m',
  red: '\x1b[31m',
  cyan: '\x1b[36m'
};

function log(message, color = 'reset') {
  console.log(`${colors[color]}${message}${colors.reset}`);
}

// Get command line arguments
const args = process.argv.slice(2);

if (args.length < 1) {
  log('\n❌ Usage: npm run resize-images <folder-path> [target-width] [target-height]', 'red');
  log('\nExamples:', 'yellow');
  log('  npm run resize-images "./Brentwood House"  (auto-detect smallest size)', 'cyan');
  log('  npm run resize-images "./Brentwood House" 1200 800  (resize to 1200x800)', 'cyan');
  log('\nNote: Requires ImageMagick or sips (macOS built-in)\\n', 'blue');
  process.exit(1);
}

const imageFolderPath = args[0];
const targetWidth = args[1] ? parseInt(args[1]) : null;
const targetHeight = args[2] ? parseInt(args[2]) : null;

log('\n━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━', 'cyan');
log('🖼️  SHIBLI HOMESTAGING - IMAGE RESIZE TOOL', 'bright');
log('━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━\n', 'cyan');

// Resolve absolute path
const absoluteImagePath = path.resolve(process.cwd(), imageFolderPath);

// Check if folder exists
if (!fs.existsSync(absoluteImagePath)) {
  log(`❌ Error: Folder not found at ${absoluteImagePath}`, 'red');
  process.exit(1);
}

// Check if ImageMagick or sips is available
let resizeTool = null;
try {
  execSync('which convert', { stdio: 'ignore' });
  resizeTool = 'imagemagick';
  log('✅ Found ImageMagick (convert command)', 'green');
} catch (error) {
  try {
    execSync('which sips', { stdio: 'ignore' });
    resizeTool = 'sips';
    log('✅ Found sips (macOS built-in)', 'green');
  } catch (sipsError) {
    log('❌ Error: Neither ImageMagick nor sips found', 'red');
    log('   Install ImageMagick: brew install imagemagick', 'yellow');
    process.exit(1);
  }
}

// Get all image files
const imageExtensions = ['.jpg', '.jpeg', '.png', '.webp'];
const imageFiles = fs.readdirSync(absoluteImagePath)
  .filter(file => {
    const ext = path.extname(file).toLowerCase();
    return imageExtensions.includes(ext);
  });

if (imageFiles.length === 0) {
  log(`❌ No image files found in ${absoluteImagePath}`, 'red');
  process.exit(1);
}

log(`📂 Found ${imageFiles.length} images in ${imageFolderPath}\n`, 'blue');

// Function to get image dimensions
function getImageDimensions(filePath) {
  try {
    if (resizeTool === 'imagemagick') {
      const output = execSync(`identify -format "%wx%h" "${filePath}"`, { encoding: 'utf8' });
      const [width, height] = output.trim().split('x').map(Number);
      return { width, height };
    } else if (resizeTool === 'sips') {
      const output = execSync(`sips -g pixelWidth -g pixelHeight "${filePath}"`, { encoding: 'utf8' });
      const widthMatch = output.match(/pixelWidth:\s*(\d+)/);
      const heightMatch = output.match(/pixelHeight:\s*(\d+)/);
      return {
        width: widthMatch ? parseInt(widthMatch[1]) : 0,
        height: heightMatch ? parseInt(heightMatch[1]) : 0
      };
    }
  } catch (error) {
    log(`⚠️  Warning: Could not get dimensions for ${path.basename(filePath)}`, 'yellow');
    return { width: 0, height: 0 };
  }
}

// Analyze all images
log('📊 Analyzing image dimensions...', 'blue');
const imageData = imageFiles.map(file => {
  const filePath = path.join(absoluteImagePath, file);
  const dimensions = getImageDimensions(filePath);
  return {
    file,
    filePath,
    ...dimensions
  };
}).filter(img => img.width > 0 && img.height > 0);

if (imageData.length === 0) {
  log('❌ Could not analyze any images', 'red');
  process.exit(1);
}

// Find smallest dimensions
const minWidth = Math.min(...imageData.map(img => img.width));
const minHeight = Math.min(...imageData.map(img => img.height));
const maxWidth = Math.max(...imageData.map(img => img.width));
const maxHeight = Math.max(...imageData.map(img => img.height));

log(`\n📐 Image Dimension Analysis:`, 'cyan');
log(`   • Smallest: ${minWidth}x${minHeight}px`, 'yellow');
log(`   • Largest:  ${maxWidth}x${maxHeight}px`, 'yellow');

// Determine target dimensions
let finalWidth, finalHeight;

if (targetWidth && targetHeight) {
  finalWidth = targetWidth;
  finalHeight = targetHeight;
  log(`   • Target:   ${finalWidth}x${finalHeight}px (custom)`, 'green');
} else {
  // Use smallest dimensions to avoid upsizing
  finalWidth = minWidth;
  finalHeight = minHeight;
  log(`   • Target:   ${finalWidth}x${finalHeight}px (auto-detected)`, 'green');
}

// Create backup folder
const backupFolder = path.join(absoluteImagePath, '_originals_backup');
if (!fs.existsSync(backupFolder)) {
  fs.mkdirSync(backupFolder);
  log(`\n💾 Created backup folder: ${backupFolder}`, 'yellow');
} else {
  log(`\n💾 Using existing backup folder: ${backupFolder}`, 'yellow');
}

// Resize images
log('\n🔄 Resizing images...', 'blue');

let resizedCount = 0;
let skippedCount = 0;

imageData.forEach((img, index) => {
  const needsResize = img.width > finalWidth || img.height > finalHeight;

  if (!needsResize) {
    log(`   [${index + 1}/${imageData.length}] ⏭️  Skipping ${img.file} (already ${img.width}x${img.height})`, 'blue');
    skippedCount++;
    return;
  }

  // Backup original
  const backupPath = path.join(backupFolder, img.file);
  if (!fs.existsSync(backupPath)) {
    fs.copyFileSync(img.filePath, backupPath);
  }

  // Resize image
  try {
    log(`   [${index + 1}/${imageData.length}] 🔄 Resizing ${img.file} (${img.width}x${img.height} → ${finalWidth}x${finalHeight})`, 'cyan');

    if (resizeTool === 'imagemagick') {
      // ImageMagick: resize to fit within dimensions, maintaining aspect ratio
      execSync(`convert "${img.filePath}" -resize ${finalWidth}x${finalHeight} "${img.filePath}"`, { stdio: 'ignore' });
    } else if (resizeTool === 'sips') {
      // sips: resize to fit within dimensions, maintaining aspect ratio
      execSync(`sips --resampleHeightWidthMax ${Math.max(finalWidth, finalHeight)} "${img.filePath}"`, { stdio: 'ignore' });
    }

    resizedCount++;
  } catch (error) {
    log(`   ❌ Error resizing ${img.file}: ${error.message}`, 'red');
  }
});

log('\n━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━', 'cyan');
log('✅ RESIZE COMPLETE!', 'bright');
log('━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━\n', 'cyan');

log('📝 Summary:', 'blue');
log(`   • Total images:   ${imageData.length}`, 'yellow');
log(`   • Resized:        ${resizedCount}`, 'green');
log(`   • Skipped:        ${skippedCount}`, 'blue');
log(`   • Target size:    ${finalWidth}x${finalHeight}px`, 'yellow');
log(`   • Backup folder:  ${backupFolder}\n`, 'yellow');

log('📋 Next Steps:', 'green');
log(`   1. Review resized images in ${imageFolderPath}`, 'yellow');
log(`   2. Run auto-update to add project to website:`, 'yellow');
log(`      npm run auto-update "Project Name" "${imageFolderPath}"`, 'cyan');
log(`   3. If you need to restore originals:`, 'yellow');
log(`      Copy files from ${backupFolder} back to ${imageFolderPath}`, 'cyan');
log('━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━\n', 'cyan');
