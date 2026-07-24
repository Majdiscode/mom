#!/usr/bin/env node

const fs = require('node:fs');
const path = require('node:path');
const { execFileSync } = require('node:child_process');

const root = path.resolve(__dirname, '..');
const sourceFolders = ['js', 'scripts', 'tests'];
const errors = [];

function collectJavaScript(folder) {
    return fs.readdirSync(path.join(root, folder), { withFileTypes: true })
        .filter((entry) => entry.isFile() && entry.name.endsWith('.js'))
        .map((entry) => path.join(root, folder, entry.name));
}

for (const file of sourceFolders.flatMap(collectJavaScript)) {
    try {
        execFileSync(process.execPath, ['--check', file], { stdio: 'pipe' });
    } catch (error) {
        errors.push(`${path.relative(root, file)} has invalid JavaScript syntax.`);
    }
}

const html = fs.readFileSync(path.join(root, 'index.html'), 'utf8');
const css = fs.readFileSync(path.join(root, 'css', 'styles.css'), 'utf8');
const images = require(path.join(root, 'js', 'slideshow-data.js'));

if (/on(?:click|error|load)=/i.test(html)) {
    errors.push('index.html contains an inline event handler.');
}

if (/style="/i.test(html)) {
    errors.push('index.html contains an inline style.');
}

if ((css.match(/{/g) || []).length !== (css.match(/}/g) || []).length) {
    errors.push('css/styles.css has unbalanced braces.');
}

const seenUrls = new Set();

for (const image of images) {
    if (!image.src || !image.alt || image.alt.length < 12) {
        errors.push(`Invalid slideshow entry: ${JSON.stringify(image)}`);
        continue;
    }

    if (seenUrls.has(image.src)) {
        errors.push(`Duplicate slideshow URL: ${image.src}`);
    }
    seenUrls.add(image.src);

    const url = new URL(image.src);
    const repositoryMarker = '/Majdiscode/mom/main/';
    const markerIndex = url.pathname.indexOf(repositoryMarker);

    if (markerIndex >= 0) {
        const relativePath = decodeURIComponent(
            url.pathname.slice(markerIndex + repositoryMarker.length)
        );

        if (!fs.existsSync(path.join(root, relativePath))) {
            errors.push(`Missing local source image: ${relativePath}`);
        }
    }
}

if (errors.length > 0) {
    console.error(errors.map((error) => `- ${error}`).join('\n'));
    process.exit(1);
}

console.log(`Project checks passed: ${images.length} slideshow images and ${sourceFolders.length} source folders.`);
