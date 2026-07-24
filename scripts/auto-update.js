#!/usr/bin/env node

const fs = require('node:fs');
const path = require('node:path');
const {
    buildImageEntries,
    insertProjectBlock,
    supportedExtensions
} = require('./project-tools');

const [projectName, imageFolderPath] = process.argv.slice(2);

if (!projectName || !imageFolderPath) {
    console.error('Usage: npm run auto-update -- "Project Name" "./image-folder"');
    process.exit(1);
}

const projectRoot = process.cwd();
const absoluteFolder = path.resolve(projectRoot, imageFolderPath);
const dataFile = path.join(projectRoot, 'js', 'slideshow-data.js');

if (!fs.existsSync(absoluteFolder) || !fs.statSync(absoluteFolder).isDirectory()) {
    console.error(`Image folder not found: ${absoluteFolder}`);
    process.exit(1);
}

if (!fs.existsSync(dataFile)) {
    console.error(`Slideshow data file not found: ${dataFile}`);
    process.exit(1);
}

const files = fs.readdirSync(absoluteFolder, { withFileTypes: true })
    .filter((entry) => entry.isFile() && supportedExtensions.has(path.extname(entry.name).toLowerCase()))
    .map((entry) => entry.name);

try {
    const entries = buildImageEntries(projectName, imageFolderPath, files);
    const source = fs.readFileSync(dataFile, 'utf8');
    const updated = insertProjectBlock(source, projectName, entries);
    const timestamp = new Date().toISOString().replaceAll(':', '-').replace(/\.\d{3}Z$/, 'Z');
    const backupFile = `${dataFile}.backup-${timestamp}`;
    const temporaryFile = `${dataFile}.tmp`;

    fs.copyFileSync(dataFile, backupFile, fs.constants.COPYFILE_EXCL);
    fs.writeFileSync(temporaryFile, updated, 'utf8');
    fs.renameSync(temporaryFile, dataFile);

    console.log(`Added ${entries.length} images for "${projectName}".`);
    console.log(`Updated: ${dataFile}`);
    console.log(`Backup: ${backupFile}`);
} catch (error) {
    console.error(error.message);
    process.exit(1);
}
