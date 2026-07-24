#!/usr/bin/env node

const fs = require('node:fs');
const crypto = require('node:crypto');
const { execFileSync } = require('node:child_process');

const imagePattern = /\.(?:jpe?g|png|webp|gif|heic)$/i;
const files = execFileSync('git', ['ls-files', '-z'])
    .toString()
    .split('\0')
    .filter((filename) => filename && imagePattern.test(filename));
const groups = new Map();

for (const filename of files) {
    const content = fs.readFileSync(filename);
    const hash = crypto.createHash('sha256').update(content).digest('hex');
    const group = groups.get(hash) || [];
    group.push({ filename, bytes: content.length });
    groups.set(hash, group);
}

const duplicates = [...groups.values()].filter((group) => group.length > 1);
const duplicateBytes = duplicates.reduce(
    (total, group) => total + group[0].bytes * (group.length - 1),
    0
);

console.log(JSON.stringify({
    trackedImages: files.length,
    uniqueImageContents: groups.size,
    duplicateGroups: duplicates.length,
    duplicateCopies: duplicates.reduce((total, group) => total + group.length - 1, 0),
    duplicateMiB: Number((duplicateBytes / 1024 / 1024).toFixed(1))
}, null, 2));
