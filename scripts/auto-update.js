#!/usr/bin/env node

const fs = require('fs');
const path = require('path');

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
  log('\n❌ Usage: npm run auto-update "<Project Name>" [optional-path]', 'red');
  log('\nExamples:', 'yellow');
  log('  npm run auto-update "Brentwood House"  (auto-finds folder)', 'cyan');
  log('  npm run auto-update "Brentwood House" ./Brentwood  (specify path)', 'cyan');
  log('  npm run auto-update "SF Apartment 3" "./SF Apt 3"\n', 'cyan');
  process.exit(1);
}

const projectName = args[0];
let imageFolderPath = args[1];

log('\n━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━', 'cyan');
log('🤖 SHIBLI HOMESTAGING - AUTO UPDATE TOOL', 'bright');
log('━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━\n', 'cyan');

log(`📂 Project Name: ${projectName}`, 'blue');

// If no path provided, search for folder by name
let absoluteImagePath;
const indexHtmlPath = path.resolve(process.cwd(), 'index.html');

if (!imageFolderPath) {
  log(`🔍 Searching for folder matching "${projectName}"...`, 'yellow');

  // Search for folder recursively
  const { execSync } = require('child_process');
  try {
    const searchResult = execSync(
      `find "${process.cwd()}" -type d -name "*${projectName}*" 2>/dev/null | head -1`,
      { encoding: 'utf8' }
    ).trim();

    if (searchResult) {
      absoluteImagePath = searchResult;
      imageFolderPath = path.relative(process.cwd(), absoluteImagePath);
      log(`✅ Found: ${imageFolderPath}\n`, 'green');
    } else {
      log(`❌ Could not find folder matching "${projectName}"`, 'red');
      log(`   Please provide the folder path manually.`, 'yellow');
      process.exit(1);
    }
  } catch (error) {
    log(`❌ Error searching for folder`, 'red');
    process.exit(1);
  }
} else {
  log(`📁 Image Folder: ${imageFolderPath}\n`, 'blue');
  absoluteImagePath = path.resolve(process.cwd(), imageFolderPath);
}

// Check if folder exists
if (!fs.existsSync(absoluteImagePath)) {
  log(`❌ Error: Folder not found at ${absoluteImagePath}`, 'red');
  process.exit(1);
}

// Check if index.html exists
if (!fs.existsSync(indexHtmlPath)) {
  log(`❌ Error: index.html not found at ${indexHtmlPath}`, 'red');
  process.exit(1);
}

// Get all image files
const imageExtensions = ['.jpg', '.jpeg', '.png', '.webp', '.gif'];
const allFiles = fs.readdirSync(absoluteImagePath);

// Get files with their metadata for natural sorting
const filesWithStats = allFiles
  .filter(file => {
    const ext = path.extname(file).toLowerCase();
    return imageExtensions.includes(ext);
  })
  .map(file => {
    const filePath = path.join(absoluteImagePath, file);
    const stats = fs.statSync(filePath);
    return {
      name: file,
      birthtime: stats.birthtime,
      mtime: stats.mtime
    };
  })
  .sort((a, b) => {
    // Natural sort to preserve Finder order
    return a.name.localeCompare(b.name, undefined, { numeric: true, sensitivity: 'base' });
  });

const imageFiles = filesWithStats.map(f => f.name);

if (imageFiles.length === 0) {
  log(`❌ No image files found in ${absoluteImagePath}`, 'red');
  process.exit(1);
}

// Determine grid type based on number of images
function determineGridType(imageCount) {
  if (imageCount <= 8) {
    return { type: 'luxury-grid', cols: 4, rows: 2, max: 8, description: '4x2 grid (8 images)' };
  } else if (imageCount <= 12) {
    return { type: 'daly-city-grid', cols: 4, rows: 3, max: 12, description: '4x3 grid (12 images)' };
  } else {
    return { type: 'default-grid', cols: 5, rows: 3, max: 15, description: '5x3 grid (15 images)' };
  }
}

const gridInfo = determineGridType(imageFiles.length);

log(`✅ Found ${imageFiles.length} image(s)`, 'green');
log(`📐 Grid type: ${gridInfo.description}\n`, 'blue');

// Generate the code
// Use the relative path from project root instead of just basename
const folderName = imageFolderPath;
const githubBaseUrl = 'https://raw.githubusercontent.com/Majdiscode/mom/main/';

// Generate projectImages entry
let projectImagesCode = `            // 🏠 ${projectName.toUpperCase()}\n`;
projectImagesCode += `            '${projectName}': [\n`;

imageFiles.forEach((file, index) => {
  const encodedFileName = encodeURIComponent(file);
  const encodedFolderName = encodeURIComponent(folderName);
  const url = `${githubBaseUrl}${encodedFolderName}/${encodedFileName}`;
  projectImagesCode += `                '${url}'`;
  if (index < imageFiles.length - 1) {
    projectImagesCode += ',';
  }
  projectImagesCode += `  // ${index + 1}. ${file}\n`;
});

// Add empty slots
const emptySlots = 5;
for (let i = 0; i < emptySlots; i++) {
  projectImagesCode += `                ''${i < emptySlots - 1 ? ',' : ' '}  // ${imageFiles.length + i + 1}. Available for more images\n`;
}

projectImagesCode += `            ],\n`;

// Generate portfolio HTML
const firstImageFile = imageFiles[0];
const encodedFirstFileName = encodeURIComponent(firstImageFile);
const encodedFolderName = encodeURIComponent(folderName);
const firstImageUrl = `${githubBaseUrl}${encodedFolderName}/${encodedFirstFileName}`;

const portfolioHtml = `                <!-- PROJECT: ${projectName.toUpperCase()} -->
                <div class="portfolio-item">
                    <div class="portfolio-image">
                        <img src="${firstImageUrl}" alt="${projectName} Main Image" onerror="this.style.display='none'; this.nextElementSibling.style.display='flex';">
                        <div style="display: none;">[${projectName} - Main Room]</div>
                    </div>
                    <div class="portfolio-content">
                        <button class="show-more-btn" onclick="openModal('${projectName}')">Show More</button>
                    </div>
                </div>`;

// Read index.html
let htmlContent = fs.readFileSync(indexHtmlPath, 'utf8');

// Backup original file
const backupPath = indexHtmlPath + '.backup';
fs.writeFileSync(backupPath, htmlContent, 'utf8');
log(`💾 Backup created: ${backupPath}`, 'yellow');

// Find and update projectImages - ADD AS FIRST PROJECT
const projectImagesRegex = /const projectImages = \{([\s\S]*?)\n        \};/;
const match = htmlContent.match(projectImagesRegex);

if (!match) {
  log(`❌ Could not find projectImages object in index.html`, 'red');
  process.exit(1);
}

const existingProjectImages = match[1];

// Check if project already exists
if (existingProjectImages.includes(`'${projectName}':`)) {
  log(`⚠️  Warning: Project "${projectName}" already exists in projectImages`, 'yellow');
  log(`   Skipping projectImages update. Please update manually or remove existing entry.`, 'yellow');
} else {
  // Add new project at the BEGINNING of projectImages
  const updatedProjectImages = '\n' + projectImagesCode + existingProjectImages;
  htmlContent = htmlContent.replace(
    projectImagesRegex,
    `const projectImages = {${updatedProjectImages}\n        };`
  );
  log(`✅ Added "${projectName}" as FIRST project in projectImages`, 'green');
}

// Find portfolio-grid and add new portfolio item AS FIRST ITEM
const portfolioGridRegex = /(<div class="portfolio-grid">)\s*([\s\S]*?)(\s*<\/div>\s*<\/div>\s*<\/section>)/;
const portfolioMatch = htmlContent.match(portfolioGridRegex);

if (!portfolioMatch) {
  log(`❌ Could not find portfolio-grid in index.html`, 'red');
  process.exit(1);
}

// Check if portfolio item already exists
if (htmlContent.includes(`onclick="openModal('${projectName}')"`) || htmlContent.includes(`<!-- PROJECT: ${projectName.toUpperCase()} -->`)) {
  log(`⚠️  Warning: Portfolio item for "${projectName}" may already exist`, 'yellow');
  log(`   Skipping portfolio HTML update. Please check manually.`, 'yellow');
} else {
  // Add new portfolio item as THE FIRST item in the grid
  htmlContent = htmlContent.replace(
    portfolioGridRegex,
    `$1${portfolioHtml}\n\n$2$3`
  );
  log(`✅ Added portfolio item for "${projectName}" as FIRST project`, 'green');
}

// Update the grid configuration in JavaScript for this project
const gridComment = '// Set grid class based on project';
const gridCommentIndex = htmlContent.indexOf(gridComment);

if (gridCommentIndex !== -1) {
  // Find the next line after the comment (where the first 'if' should be)
  const afterComment = htmlContent.indexOf('\n', gridCommentIndex) + 1;

  // Find the first 'if' statement after the comment
  const firstIfMatch = htmlContent.substring(afterComment).match(/(\s*)if \(projectTitle === /);

  if (firstIfMatch) {
    const firstIfPos = afterComment + firstIfMatch.index;
    const indentation = firstIfMatch[1]; // Capture the existing indentation

    // Insert new grid config BEFORE the first if, and turn the first if into an 'else if'
    const newGridConfig = `${indentation}if (projectTitle === '${projectName}') {
${indentation}    imageGrid.className = 'image-grid ${gridInfo.type}';
${indentation}    var maxImages = ${gridInfo.max}; // ${gridInfo.description}
${indentation}} else `;

    htmlContent = htmlContent.slice(0, firstIfPos) + newGridConfig + htmlContent.slice(firstIfPos);
    log(`✅ Added grid configuration for "${projectName}" (${gridInfo.description})`, 'green');
  } else {
    log(`⚠️  Warning: Could not find grid configuration insertion point`, 'yellow');
    log(`   Please add grid config manually in populateImageGrid function`, 'yellow');
  }
} else {
  log(`⚠️  Warning: Could not find grid configuration section`, 'yellow');
  log(`   Please add grid config manually in populateImageGrid function`, 'yellow');
}

// Write updated content
fs.writeFileSync(indexHtmlPath, htmlContent, 'utf8');

log('\n━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━', 'cyan');
log('✅ SUCCESS! index.html has been updated', 'bright');
log('━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━\n', 'cyan');

log('📝 Summary:', 'blue');
log(`   • Project: ${projectName}`, 'yellow');
log(`   • Images: ${imageFiles.length}`, 'yellow');
log(`   • Grid: ${gridInfo.description}`, 'yellow');
log(`   • Position: FIRST project on website`, 'yellow');
log(`   • Backup: ${backupPath}\n`, 'yellow');

log('📋 Next Steps:', 'green');
log(`   1. Review the changes in index.html`, 'yellow');
log(`   2. Upload images to GitHub:`, 'yellow');
log(`      git add "${imageFolderPath}"`, 'cyan');
log(`      git commit -m "Add ${projectName} project images"`, 'cyan');
log(`      git push`, 'cyan');
log(`   3. Commit index.html changes:`, 'yellow');
log(`      git add index.html`, 'cyan');
log(`      git commit -m "Add ${projectName} to portfolio"`, 'cyan');
log(`      git push`, 'cyan');
log(`   4. Update from cPanel\n`, 'yellow');

log('━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━\n', 'cyan');
