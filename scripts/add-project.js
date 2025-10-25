#!/usr/bin/env node

const fs = require('fs');
const path = require('path');

// ANSI color codes for better terminal output
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

if (args.length < 2) {
  log('\n❌ Usage: npm run add-project "<Project Name>" <image-folder-path>', 'red');
  log('\nExample: npm run add-project "Brentwood House" ./Brentwood', 'yellow');
  log('Example: npm run add-project "SF Apartment 3" "./SF Apt 3"\n', 'yellow');
  process.exit(1);
}

const projectName = args[0];
const imageFolderPath = args[1];

log('\n━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━', 'cyan');
log('🏠  SHIBLI HOMESTAGING - PROJECT AUTOMATION TOOL', 'bright');
log('━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━\n', 'cyan');

log(`📂 Project Name: ${projectName}`, 'blue');
log(`📁 Image Folder: ${imageFolderPath}\n`, 'blue');

// Resolve the absolute path
const absoluteImagePath = path.resolve(process.cwd(), imageFolderPath);

// Check if folder exists
if (!fs.existsSync(absoluteImagePath)) {
  log(`❌ Error: Folder not found at ${absoluteImagePath}`, 'red');
  process.exit(1);
}

// Check if it's a directory
if (!fs.statSync(absoluteImagePath).isDirectory()) {
  log(`❌ Error: ${absoluteImagePath} is not a directory`, 'red');
  process.exit(1);
}

// Get all image files from the folder
const imageExtensions = ['.jpg', '.jpeg', '.png', '.webp', '.gif'];
const allFiles = fs.readdirSync(absoluteImagePath);

// Get files with their metadata for sorting by creation/modification time
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
      birthtime: stats.birthtime, // Creation time
      mtime: stats.mtime // Modification time
    };
  })
  .sort((a, b) => {
    // Sort by name naturally (this preserves Finder order on macOS)
    return a.name.localeCompare(b.name, undefined, { numeric: true, sensitivity: 'base' });
  });

const imageFiles = filesWithStats.map(f => f.name);

if (imageFiles.length === 0) {
  log(`❌ No image files found in ${absoluteImagePath}`, 'red');
  log(`   Looking for: ${imageExtensions.join(', ')}`, 'yellow');
  process.exit(1);
}

// Determine grid type based on number of images
// Use the largest grid that can be COMPLETELY FILLED
function determineGridType(imageCount) {
  // Available grids in order from largest to smallest
  const grids = [
    { type: 'default-grid', cols: 5, rows: 3, max: 15, description: '5x3 grid (15 images)' },
    { type: 'daly-city-grid', cols: 4, rows: 3, max: 12, description: '4x3 grid (12 images)' },
    { type: 'luxury-grid', cols: 4, rows: 2, max: 8, description: '4x2 grid (8 images)' }
  ];

  // Find the largest grid that can be completely filled (imageCount >= grid.max)
  for (const grid of grids) {
    if (imageCount >= grid.max) {
      return grid;
    }
  }

  // If no grid can be completely filled, use the smallest one (4x2)
  return grids[grids.length - 1];
}

const gridInfo = determineGridType(imageFiles.length);

log(`✅ Found ${imageFiles.length} image(s)`, 'green');
log(`📐 Grid type: ${gridInfo.description}\n`, 'blue');

// Get folder name for GitHub path
const folderName = path.basename(absoluteImagePath);

// Generate the GitHub URLs
const githubBaseUrl = 'https://raw.githubusercontent.com/Majdiscode/mom/main/';

log('━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━', 'cyan');
log('📝 GENERATED CODE FOR index.html', 'bright');
log('━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━\n', 'cyan');

// Generate the code snippet
let codeSnippet = `            // 🏠 ${projectName.toUpperCase()}\n`;
codeSnippet += `            '${projectName}': [\n`;

imageFiles.forEach((file, index) => {
  const encodedFileName = encodeURIComponent(file);
  const encodedFolderName = encodeURIComponent(folderName);
  const url = `${githubBaseUrl}${encodedFolderName}/${encodedFileName}`;

  codeSnippet += `                '${url}'`;

  if (index < imageFiles.length - 1) {
    codeSnippet += ',';
  }

  codeSnippet += `  // ${index + 1}. ${file}\n`;
});

// Add empty slots for future images
const emptySlots = 5;
for (let i = 0; i < emptySlots; i++) {
  codeSnippet += `                ''${i < emptySlots - 1 ? ',' : ' '}  // ${imageFiles.length + i + 1}. Available for more images\n`;
}

codeSnippet += `            ],\n`;

console.log(codeSnippet);

log('━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━', 'cyan');
log('📋 PORTFOLIO HTML SNIPPET', 'bright');
log('━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━\n', 'cyan');

// Generate the portfolio item HTML
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
                </div>\n`;

console.log(portfolioHtml);

log('━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━', 'cyan');
log('📸 IMAGE LIST', 'bright');
log('━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━\n', 'cyan');

imageFiles.forEach((file, index) => {
  log(`  ${index + 1}. ${file}`, 'yellow');
});

log('\n━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━', 'cyan');
log('✅ NEXT STEPS', 'bright');
log('━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━\n', 'cyan');

log('1. Upload images to GitHub:', 'green');
log(`   git add "${imageFolderPath}"`, 'yellow');
log(`   git commit -m "Add ${projectName} project images"`, 'yellow');
log(`   git push\n`, 'yellow');

log('2. Copy the GENERATED CODE above and paste it into index.html', 'green');
log(`   - Find the projectImages object (around line 848)`, 'yellow');
log(`   - Add as THE FIRST entry in projectImages object`, 'yellow');
log(`   - This will make it the newest project on the website\n`, 'yellow');

log('3. Copy the PORTFOLIO HTML SNIPPET and add it to the portfolio section', 'green');
log(`   - Find the portfolio-grid (around line 694)`, 'yellow');
log(`   - Add as THE FIRST portfolio-item in the grid`, 'yellow');
log(`   - This will display it first on the homepage\n`, 'yellow');

log('4. Add grid configuration to the populateImageGrid function', 'green');
log(`   - Find "// Set grid class based on project" (around line 209)`, 'yellow');
log(`   - Add this BEFORE the first if statement:`, 'yellow');
log(`      if (projectTitle === '${projectName}') {`, 'cyan');
log(`          imageGrid.className = 'image-grid ${gridInfo.type}';`, 'cyan');
log(`          var maxImages = ${gridInfo.max}; // ${gridInfo.description}`, 'cyan');
log(`      } else if ...\n`, 'cyan');

log('5. Commit and push your changes:', 'green');
log(`   git add index.html`, 'yellow');
log(`   git commit -m "Add ${projectName} to portfolio"`, 'yellow');
log(`   git push\n`, 'yellow');

log('6. Update from cPanel\n', 'green');

log('━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━\n', 'cyan');

// Generate grid configuration snippet
const gridConfigSnippet = `            if (projectTitle === '${projectName}') {
                imageGrid.className = 'image-grid ${gridInfo.type}';
                var maxImages = ${gridInfo.max}; // ${gridInfo.description}
            } else`;

// Save to a file for easy reference
const outputFile = path.join(process.cwd(), `${projectName.replace(/\s+/g, '-').toLowerCase()}-code.txt`);
const fullOutput = `PROJECT: ${projectName}
IMAGES FOUND: ${imageFiles.length}
GRID TYPE: ${gridInfo.description}

=== CODE FOR projectImages OBJECT ===
(Add as FIRST entry in the projectImages object)

${codeSnippet}

=== PORTFOLIO HTML SNIPPET ===
(Add as FIRST portfolio-item in the grid)

${portfolioHtml}

=== GRID CONFIGURATION ===
(Add in populateImageGrid function, BEFORE the first 'if' statement)

${gridConfigSnippet}

=== IMAGE LIST ===

${imageFiles.map((file, i) => `${i + 1}. ${file}`).join('\n')}
`;

fs.writeFileSync(outputFile, fullOutput, 'utf8');
log(`💾 Code snippets saved to: ${outputFile}`, 'green');
log('━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━\n', 'cyan');
