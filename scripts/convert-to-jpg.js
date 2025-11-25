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
  log('\n❌ Usage: npm run convert-to-jpg <folder-path>', 'red');
  log('\nExample:', 'yellow');
  log('  npm run convert-to-jpg "./SF Apt 3"', 'cyan');
  log('  npm run convert-to-jpg "./Oakland House"\n', 'cyan');
  log('What it does:', 'blue');
  log('  • Converts ALL images (webp, png, gif, etc.) to JPG format', 'yellow');
  log('  • Deletes original non-JPG files after conversion', 'yellow');
  log('  • Creates backup of originals in _originals_backup folder', 'yellow');
  log('  • Standardizes all images to JPG for consistent website format\n', 'yellow');
  process.exit(1);
}

const imageFolderPath = args[0];

log('\n━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━', 'cyan');
log('🔄 SHIBLI HOMESTAGING - IMAGE FORMAT CONVERTER', 'bright');
log('━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━\n', 'cyan');

// Resolve absolute path
const absoluteImagePath = path.resolve(process.cwd(), imageFolderPath);

// Check if folder exists
if (!fs.existsSync(absoluteImagePath)) {
  log(`❌ Error: Folder not found at ${absoluteImagePath}`, 'red');
  process.exit(1);
}

// Check if sips is available (macOS built-in)
let conversionTool = null;
try {
  execSync('which sips', { stdio: 'ignore' });
  conversionTool = 'sips';
  log('✅ Found sips (macOS built-in image converter)', 'green');
} catch (error) {
  try {
    execSync('which convert', { stdio: 'ignore' });
    conversionTool = 'imagemagick';
    log('✅ Found ImageMagick (convert command)', 'green');
  } catch (magickError) {
    log('❌ Error: Neither sips nor ImageMagick found', 'red');
    log('   macOS: sips should be pre-installed', 'yellow');
    log('   Other: Install ImageMagick with: brew install imagemagick', 'yellow');
    process.exit(1);
  }
}

// Get all image files (excluding JPG/JPEG since those are already in the target format)
const imageExtensions = ['.webp', '.png', '.gif', '.bmp', '.tiff', '.tif', '.heic'];
const allFiles = fs.readdirSync(absoluteImagePath);

const imagesToConvert = allFiles.filter(file => {
  const ext = path.extname(file).toLowerCase();
  return imageExtensions.includes(ext);
});

// Also check for existing JPG files
const existingJpgs = allFiles.filter(file => {
  const ext = path.extname(file).toLowerCase();
  return ext === '.jpg' || ext === '.jpeg';
});

if (imagesToConvert.length === 0) {
  log(`\n✅ No conversion needed!`, 'green');
  log(`   All ${existingJpgs.length} images are already in JPG format.\n`, 'blue');
  process.exit(0);
}

log(`\n📂 Found in ${imageFolderPath}:`, 'blue');
log(`   • ${imagesToConvert.length} images to convert to JPG`, 'yellow');
log(`   • ${existingJpgs.length} images already in JPG format\n`, 'green');

// Create backup folder
const backupFolder = path.join(absoluteImagePath, '_originals_backup');
if (!fs.existsSync(backupFolder)) {
  fs.mkdirSync(backupFolder);
  log(`💾 Created backup folder: ${backupFolder}`, 'yellow');
} else {
  log(`💾 Using existing backup folder: ${backupFolder}`, 'yellow');
}

// Convert images
log('\n🔄 Converting images to JPG format...\n', 'blue');

let convertedCount = 0;
let failedCount = 0;
const failedFiles = [];

imagesToConvert.forEach((file, index) => {
  const filePath = path.join(absoluteImagePath, file);
  const fileNameWithoutExt = path.parse(file).name;
  const newFileName = `${fileNameWithoutExt}.jpg`;
  const newFilePath = path.join(absoluteImagePath, newFileName);
  const backupPath = path.join(backupFolder, file);

  try {
    log(`   [${index + 1}/${imagesToConvert.length}] 🔄 Converting ${file} → ${newFileName}`, 'cyan');

    // Backup original file
    if (!fs.existsSync(backupPath)) {
      fs.copyFileSync(filePath, backupPath);
    }

    // Convert to JPG
    if (conversionTool === 'sips') {
      execSync(`sips -s format jpeg "${filePath}" --out "${newFilePath}"`, { stdio: 'ignore' });
    } else if (conversionTool === 'imagemagick') {
      execSync(`convert "${filePath}" "${newFilePath}"`, { stdio: 'ignore' });
    }

    // Verify conversion was successful
    if (fs.existsSync(newFilePath)) {
      // Delete original file
      fs.unlinkSync(filePath);
      log(`   ✅ Successfully converted and deleted original`, 'green');
      convertedCount++;
    } else {
      throw new Error('Conversion failed - output file not created');
    }

  } catch (error) {
    log(`   ❌ Error converting ${file}: ${error.message}`, 'red');
    failedCount++;
    failedFiles.push(file);
  }
});

log('\n━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━', 'cyan');
log('✅ CONVERSION COMPLETE!', 'bright');
log('━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━\n', 'cyan');

log('📝 Summary:', 'blue');
log(`   • Successfully converted: ${convertedCount} images`, 'green');
if (failedCount > 0) {
  log(`   • Failed conversions:     ${failedCount} images`, 'red');
  log(`   • Failed files:           ${failedFiles.join(', ')}`, 'red');
}
log(`   • Existing JPG files:     ${existingJpgs.length} images`, 'blue');
log(`   • Total JPG files now:    ${existingJpgs.length + convertedCount} images`, 'yellow');
log(`   • Backup folder:          ${backupFolder}\n`, 'yellow');

log('📋 Next Steps:', 'green');
log(`   1. Review converted JPG images in ${imageFolderPath}`, 'yellow');
log(`   2. (Optional) Resize images for consistent sizing:`, 'yellow');
log(`      npm run resize-images "${imageFolderPath}"`, 'cyan');
log(`   3. Add project to website:`, 'yellow');
log(`      npm run auto-update "Project Name" "${imageFolderPath}"`, 'cyan');
log(`   4. If you need to restore originals:`, 'yellow');
log(`      Files are backed up in: ${backupFolder}\n`, 'cyan');

log('━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━\n', 'cyan');
