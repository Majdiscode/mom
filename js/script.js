(function initializeSite() {
    'use strict';

    const images = globalThis.SLIDESHOW_IMAGES;
    const carouselApi = globalThis.SlideshowController;
    const contactApi = globalThis.ContactForm;

    function initializeSlideshow() {
        const slideshow = document.getElementById('mainSlideshow');
        const stage = document.getElementById('slideshowStage');
        const image = document.getElementById('slideshowImage');
        const imageError = document.getElementById('imageError');
        const retryButton = document.getElementById('retryImage');
        const previousButton = document.getElementById('prevBtn');
        const nextButton = document.getElementById('nextBtn');
        const currentSlide = document.getElementById('currentSlide');
        const totalSlides = document.getElementById('totalSlides');
        const status = document.getElementById('slideStatus');

        if (!slideshow || !stage || !image || !carouselApi || !Array.isArray(images)) {
            return;
        }

        let state = carouselApi.createCarouselState(images);
        let touchStartX = 0;

        function preloadNextImage() {
            const nextIndex = carouselApi.wrapIndex(state.currentIndex + 1, state.total);
            const preload = new Image();
            preload.decoding = 'async';
            preload.src = images[nextIndex].src;
        }

        function showImageError() {
            stage.classList.remove('is-loading');
            image.hidden = true;
            imageError.hidden = false;
        }

        function render({ announce = true, forceReload = false } = {}) {
            const { currentImage, currentIndex, total } = state;
            stage.classList.add('is-loading');
            imageError.hidden = true;
            image.hidden = false;
            image.alt = currentImage.alt;
            currentSlide.textContent = String(currentIndex + 1);
            totalSlides.textContent = String(total);
            status.textContent = announce
                ? `Portfolio image ${currentIndex + 1} of ${total}: ${currentImage.alt}`
                : '';

            image.onload = () => {
                stage.classList.remove('is-loading');
                preloadNextImage();
            };
            image.onerror = showImageError;

            if (forceReload) {
                const separator = currentImage.src.includes('?') ? '&' : '?';
                image.src = `${currentImage.src}${separator}retry=${Date.now()}`;
            } else if (image.src !== currentImage.src) {
                image.src = currentImage.src;
            } else if (image.complete && image.naturalWidth > 0) {
                image.onload();
            }
        }

        function move(direction) {
            state = carouselApi.moveCarousel(state, images, direction);
            render();
        }

        previousButton.addEventListener('click', () => move(-1));
        nextButton.addEventListener('click', () => move(1));
        retryButton.addEventListener('click', () => render({ forceReload: true }));

        slideshow.addEventListener('keydown', (event) => {
            if (event.key === 'ArrowLeft') {
                event.preventDefault();
                move(-1);
            } else if (event.key === 'ArrowRight') {
                event.preventDefault();
                move(1);
            }
        });

        stage.addEventListener('touchstart', (event) => {
            touchStartX = event.changedTouches[0].screenX;
        }, { passive: true });

        stage.addEventListener('touchend', (event) => {
            const distance = event.changedTouches[0].screenX - touchStartX;

            if (Math.abs(distance) >= 50) {
                move(distance > 0 ? -1 : 1);
            }
        }, { passive: true });

        render({ announce: false });
    }

    function initializeContactForm() {
        const form = document.getElementById('contactForm');
        const submitButton = form?.querySelector('.submit-button');
        const buttonLabel = submitButton?.querySelector('.button-label');
        const status = document.getElementById('formStatus');

        if (!form || !submitButton || !buttonLabel || !status || !contactApi || !globalThis.fetch) {
            return;
        }

        form.addEventListener('input', (event) => {
            if (event.target instanceof HTMLInputElement || event.target instanceof HTMLTextAreaElement) {
                event.target.setCustomValidity('');
            }
        });

        form.addEventListener('submit', async (event) => {
            event.preventDefault();

            if (!form.checkValidity() || submitButton.disabled) {
                form.reportValidity();
                return;
            }

            const formData = new FormData(form);
            const validationErrors = contactApi.validateContactFields(
                Object.fromEntries(formData.entries())
            );

            for (const field of ['name', 'email', 'phone', 'message']) {
                form.elements[field].setCustomValidity(validationErrors[field] || '');
            }

            if (Object.keys(validationErrors).length > 0) {
                status.className = 'form-status is-error';
                status.textContent = 'Please review the highlighted field and try again.';
                form.reportValidity();
                return;
            }

            submitButton.disabled = true;
            form.setAttribute('aria-busy', 'true');
            buttonLabel.textContent = 'Sending…';
            status.className = 'form-status';
            status.textContent = 'Sending your message…';

            const controller = new AbortController();
            const timeout = setTimeout(() => controller.abort(), 15000);
            const fetchWithTimeout = (url, options) => fetch(url, {
                ...options,
                signal: controller.signal
            });
            const result = await contactApi.sendContact({
                endpoint: form.action,
                formData,
                fetchImpl: fetchWithTimeout
            });

            clearTimeout(timeout);
            submitButton.disabled = false;
            form.removeAttribute('aria-busy');
            buttonLabel.textContent = 'Send message';

            if (result.ok) {
                form.reset();
                status.className = 'form-status is-success';
                status.textContent = 'Thank you. Your message has been sent, and we’ll be in touch soon.';
                return;
            }

            status.className = 'form-status is-error';
            status.textContent = result.message;
        });
    }

    function initializeFooterYear() {
        const year = document.getElementById('currentYear');

        if (year) {
            year.textContent = String(new Date().getFullYear());
        }
    }

    initializeSlideshow();
    initializeContactForm();
    initializeFooterYear();
}());
