const test = require('node:test');
const assert = require('node:assert/strict');

const {
    createCarouselState,
    moveCarousel,
    wrapIndex
} = require('../js/slideshow-controller');

const images = [
    { src: 'one.jpg', alt: 'Living room staged with neutral furniture' },
    { src: 'two.jpg', alt: 'Dining room staged for six guests' },
    { src: 'three.jpg', alt: 'Bedroom staged with warm textiles' }
];

test('wrapIndex loops in both directions', () => {
    assert.equal(wrapIndex(3, 3), 0);
    assert.equal(wrapIndex(-1, 3), 2);
});

test('wrapIndex rejects an empty collection', () => {
    assert.throws(() => wrapIndex(0, 0), /at least one image/i);
});

test('createCarouselState starts on the requested image', () => {
    const state = createCarouselState(images, 1);

    assert.deepEqual(state, {
        currentIndex: 1,
        currentImage: images[1],
        total: 3
    });
});

test('createCarouselState rejects invalid image data', () => {
    assert.throws(() => createCarouselState([], 0), /at least one image/i);
    assert.throws(
        () => createCarouselState([{ src: '', alt: '' }], 0),
        /source and alt text/i
    );
});

test('moveCarousel advances and wraps without mutating the prior state', () => {
    const state = createCarouselState(images, 2);
    const next = moveCarousel(state, images, 1);

    assert.equal(state.currentIndex, 2);
    assert.equal(next.currentIndex, 0);
    assert.equal(next.currentImage, images[0]);
});
