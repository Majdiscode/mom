const path = require('node:path');

const githubBaseUrl = 'https://raw.githubusercontent.com/Majdiscode/mom/main/';
const supportedExtensions = new Set(['.jpg', '.jpeg', '.png', '.webp', '.gif']);
const startMarker = '// AUTO-INSERT:START';
const endMarker = '// AUTO-INSERT:END';

function naturalSort(left, right) {
    return left.localeCompare(right, undefined, {
        numeric: true,
        sensitivity: 'base'
    });
}

function describeImage(filename) {
    const basename = path.basename(filename, path.extname(filename));
    const words = basename
        .replace(/^\d+[-_\s]*/, '')
        .replace(/[-_]+/g, ' ')
        .replace(/\s+/g, ' ')
        .trim();

    if (!words || /^[a-f0-9]{12,}$/i.test(words) || /^img\s*\d+$/i.test(words)) {
        return 'interior';
    }

    return words.toLowerCase();
}

function buildImageEntries(projectName, folderPath, files) {
    const imageFiles = files
        .filter((filename) => supportedExtensions.has(path.extname(filename).toLowerCase()))
        .sort(naturalSort);

    if (imageFiles.length === 0) {
        throw new Error('No supported images were found.');
    }

    const encodedFolder = folderPath
        .replace(/^\.[/\\]/, '')
        .split(/[\\/]/)
        .filter(Boolean)
        .map(encodeURIComponent)
        .join('/');

    return imageFiles.map((filename) => ({
        src: `${githubBaseUrl}${encodedFolder}/${encodeURIComponent(filename)}`,
        alt: `${projectName} staged ${describeImage(filename)}`
    }));
}

function escapeJavaScript(value) {
    return value.replaceAll('\\', '\\\\').replaceAll("'", "\\'");
}

function formatProjectBlock(projectName, entries) {
    const lines = entries.map(({ src, alt }) => (
        `    { src: '${escapeJavaScript(src)}', alt: '${escapeJavaScript(alt)}' },`
    ));

    return [
        `    // PROJECT: ${projectName}`,
        ...lines,
        ''
    ].join('\n');
}

function insertProjectBlock(source, projectName, entries) {
    if (!source.includes(startMarker) || !source.includes(endMarker)) {
        throw new Error('The slideshow data insertion markers are missing.');
    }

    if (source.includes(`// PROJECT: ${projectName}`)) {
        throw new Error(`Project "${projectName}" already exists.`);
    }

    return source.replace(
        startMarker,
        `${startMarker}\n${formatProjectBlock(projectName, entries)}`
    );
}

module.exports = {
    buildImageEntries,
    formatProjectBlock,
    insertProjectBlock,
    naturalSort,
    supportedExtensions
};
