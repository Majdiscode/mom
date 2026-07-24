const test = require('node:test');
const assert = require('node:assert/strict');
const fs = require('node:fs');
const path = require('node:path');

const root = path.resolve(__dirname, '..');
const html = fs.readFileSync(path.join(root, 'index.html'), 'utf8');
const runtime = fs.readFileSync(path.join(root, 'js', 'script.js'), 'utf8');
const slideshowImages = require(path.join(root, 'js', 'slideshow-data.js'));

test('page exposes baseline SEO metadata and a favicon', () => {
    assert.match(html, /<meta name="description"/);
    assert.match(html, /property="og:title"/);
    assert.match(html, /rel="canonical" href="\/"/);
    assert.match(html, /rel="icon"/);
});

test('page uses semantic main content and an accessible carousel', () => {
    assert.match(html, /<main/);
    assert.match(html, /aria-roledescription="carousel"/);
    assert.match(html, /aria-live="polite"/);
    assert.equal((html.match(/id="slideshowImage"/g) || []).length, 1);
});

test('carousel has no visible captions beneath portfolio images', () => {
    assert.doesNotMatch(html, /slideshow-meta|slideCaption|keyboard-hint/);
    assert.doesNotMatch(runtime, /slideCaption/);
});

test('Milpitas bedroom replaces slide 14 without being duplicated', () => {
    const expectedSlides = {
        replacement: {
            filename: 'milpitas-bedroom.webp',
            alt: 'Milpitas bedroom staged with a desk and warm natural textures'
        },
        final: {
            filename: 'milpitas-dining-room.webp',
            alt: 'Milpitas dining room staged with a modern table and garden views'
        }
    };
    const summarizeSlide = ({ src, alt }) => ({
        filename: decodeURIComponent(new URL(src).pathname).split('/').at(-1),
        alt
    });

    assert.equal(slideshowImages.length, 49);
    assert.deepEqual(summarizeSlide(slideshowImages[13]), expectedSlides.replacement);
    assert.deepEqual(summarizeSlide(slideshowImages.at(-1)), expectedSlides.final);
    assert.equal(
        slideshowImages.filter(({ src }) => src.includes('milpitas-bedroom.webp')).length,
        1
    );
    assert.equal(
        slideshowImages.some(({ src }) => src.includes('a1682fbeadea27157d38bcd14403a210')),
        false
    );

    for (const { filename } of Object.values(expectedSlides)) {
        assert.ok(fs.existsSync(path.join(root, 'Final Images', filename)));
    }

    assert.match(html, /id="totalSlides">49</);
});

test('contact form includes an announced result region and bounded inputs', () => {
    assert.match(html, /id="formStatus"[^>]*role="status"/);
    assert.match(html, /id="name"[^>]*maxlength="/);
    assert.match(html, /id="message"[^>]*maxlength="/);
});

test('runtime updates existing elements without injecting image HTML', () => {
    assert.doesNotMatch(runtime, /slide\.innerHTML/);
    assert.doesNotMatch(runtime, /setTimeout\(\(\) => \{\s*btn\.textContent/);
});

test('all maintained docs describe the current slideshow architecture', () => {
    const docs = [
        'AGENTS.md',
        'CLAUDE.md',
        'README-AUTOMATION.md',
        'QUICK-START.md'
    ];

    for (const filename of docs) {
        const content = fs.readFileSync(path.join(root, filename), 'utf8');
        assert.doesNotMatch(content, /projectImages|portfolio-grid|openModal/);
    }
});
