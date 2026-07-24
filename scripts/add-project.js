#!/usr/bin/env node

const fs = require('node:fs');
const path = require('node:path');
const {
    buildImageEntries,
    formatProjectBlock,
    supportedExtensions
} = require('./project-tools');

const [projectName, imageFolderPath] = process.argv.slice(2);

if (!projectName || !imageFolderPath) {
    console.error('Usage: npm run add-project -- "Project Name" "./image-folder"');
    process.exit(1);
}

const absoluteFolder = path.resolve(process.cwd(), imageFolderPath);

if (!fs.existsSync(absoluteFolder) || !fs.statSync(absoluteFolder).isDirectory()) {
    console.error(`Image folder not found: ${absoluteFolder}`);
    process.exit(1);
}

const files = fs.readdirSync(absoluteFolder, { withFileTypes: true })
    .filter((entry) => entry.isFile() && supportedExtensions.has(path.extname(entry.name).toLowerCase()))
    .map((entry) => entry.name);

try {
    const entries = buildImageEntries(projectName, imageFolderPath, files);

    console.log(`\nPreview for ${projectName} (${entries.length} images)\n`);
    console.log(formatProjectBlock(projectName, entries));
    console.log('Run auto-update with the same arguments to add this block to js/slideshow-data.js.');
} catch (error) {
    console.error(error.message);
    process.exit(1);
}
