(function attachSlideshowController(root, factory) {
    const api = factory();

    if (typeof module === 'object' && module.exports) {
        module.exports = api;
        return;
    }

    root.SlideshowController = api;
}(typeof globalThis !== 'undefined' ? globalThis : this, function createApi() {
    function assertImages(images) {
        if (!Array.isArray(images) || images.length === 0) {
            throw new Error('The slideshow needs at least one image.');
        }

        const invalidImage = images.some((image) => (
            !image
            || typeof image.src !== 'string'
            || image.src.trim() === ''
            || typeof image.alt !== 'string'
            || image.alt.trim() === ''
        ));

        if (invalidImage) {
            throw new Error('Every slideshow image needs a source and alt text.');
        }
    }

    function wrapIndex(index, total) {
        if (!Number.isInteger(total) || total < 1) {
            throw new Error('The slideshow needs at least one image.');
        }

        return ((index % total) + total) % total;
    }

    function createCarouselState(images, requestedIndex = 0) {
        assertImages(images);
        const currentIndex = wrapIndex(requestedIndex, images.length);

        return Object.freeze({
            currentIndex,
            currentImage: images[currentIndex],
            total: images.length
        });
    }

    function moveCarousel(state, images, direction) {
        if (!state || !Number.isInteger(state.currentIndex)) {
            throw new Error('A valid carousel state is required.');
        }

        return createCarouselState(images, state.currentIndex + direction);
    }

    return {
        createCarouselState,
        moveCarousel,
        wrapIndex
    };
}));
