// ===== SLIDESHOW IMAGES =====
// Add or remove images here - everything else auto-updates
const slideshowImages = [

    { src: 'https://raw.githubusercontent.com/Majdiscode/mom/main/Final%20Images/45e1cf379e5fb87d7bc2d20fc72f9b00-uncropped_scaled_within_1536_1152.webp?v=2', alt: 'Staged Design' },
    { src: 'https://raw.githubusercontent.com/Majdiscode/mom/main/Final%20Images/60be9d00045b27b80060e5439c84a6ee.jpg?v=2', alt: 'Staged Interior' },
    { src: 'https://raw.githubusercontent.com/Majdiscode/mom/main/Final%20Images/9621c92e5be17d2272eaaef9f5ff92b3.jpg?v=2', alt: 'Staged Bedroom' },
    { src: 'https://raw.githubusercontent.com/Majdiscode/mom/main/Final%20Images/f5b949771d75cb87b9b66b7ee4661eb9.jpg?v=2', alt: 'Staged Space' },
    { src: 'https://raw.githubusercontent.com/Majdiscode/mom/main/Final%20Images/fc50688cdbc7746b474ea73c1da55f18.jpg?v=2', alt: 'Staged Home' },
    { src: 'https://raw.githubusercontent.com/Majdiscode/mom/main/Final%20Images/146_425072528_02.jpg?v=2', alt: 'Beale Street Living' },
    { src: 'https://raw.githubusercontent.com/Majdiscode/mom/main/Final%20Images/146_425072528_18.jpg?v=2', alt: 'Beale Street Interior' },
    { src: 'https://raw.githubusercontent.com/Majdiscode/mom/main/Final%20Images/146_425072528_21.jpg?v=2', alt: 'Beale Street Room' },
    { src: 'https://raw.githubusercontent.com/Majdiscode/mom/main/Final%20Images/6ee3938d9ae9641308cf3e16ae17b89f.jpg?v=2', alt: 'Staged Property' },
    { src: 'https://raw.githubusercontent.com/Majdiscode/mom/main/Final%20Images/28d8c7c33f03c98f1e88209093d08d8d.jpg?v=2', alt: 'Staged Living Room' },
    { src: 'https://raw.githubusercontent.com/Majdiscode/mom/main/Final%20Images/0bb6523a19d56626eb79e0cab004e52d-cc_ft_768.JPEG?v=2', alt: 'Staged Property' },
    { src: 'https://raw.githubusercontent.com/Majdiscode/mom/main/Final%20Images/13aa859af4d954a41d958e864270269b.JPEG?v=2', alt: 'Staged Property' },
    { src: 'https://raw.githubusercontent.com/Majdiscode/mom/main/Final%20Images/1519ac5a9a229985d9abe71ba80a8a22-cc_ft_1536.JPEG?v=2', alt: 'Staged Property' },
    { src: 'https://raw.githubusercontent.com/Majdiscode/mom/main/Final%20Images/6102c1af4f06bd087b19701645eb66af.JPEG?v=2', alt: 'Staged Property' },
    { src: 'https://raw.githubusercontent.com/Majdiscode/mom/main/Final%20Images/92002cb9725089c9187bfbf1cd9ffa80.JPEG?v=2', alt: 'Staged Property' },
    { src: 'https://raw.githubusercontent.com/Majdiscode/mom/main/Final%20Images/Bathroom%234.JPEG?v=2', alt: 'Staged Property' },
    { src: 'https://raw.githubusercontent.com/Majdiscode/mom/main/Final%20Images/Bedroom%231.JPEG?v=2', alt: 'Staged Property' },
    { src: 'https://raw.githubusercontent.com/Majdiscode/mom/main/Final%20Images/DDining%231.JPEG?v=2', alt: 'Staged Property' },
    { src: 'https://raw.githubusercontent.com/Majdiscode/mom/main/Final%20Images/DSC_1600.JPEG?v=2', alt: 'Staged Property' },
    { src: 'https://raw.githubusercontent.com/Majdiscode/mom/main/Final%20Images/Dining%232.JPEG?v=2', alt: 'Staged Property' },
    { src: 'https://raw.githubusercontent.com/Majdiscode/mom/main/Final%20Images/File_000(1).jpg?v=2', alt: 'Staged Property' },
    { src: 'https://raw.githubusercontent.com/Majdiscode/mom/main/Final%20Images/File_000(2).jpg?v=2', alt: 'Staged Property' },
    { src: 'https://raw.githubusercontent.com/Majdiscode/mom/main/Final%20Images/File_000(3).jpg?v=2', alt: 'Staged Property' },
    { src: 'https://raw.githubusercontent.com/Majdiscode/mom/main/Final%20Images/File_000(4).jpg?v=2', alt: 'Staged Property' },
    { src: 'https://raw.githubusercontent.com/Majdiscode/mom/main/Final%20Images/File_000(5).jpg?v=2', alt: 'Staged Property' },
    { src: 'https://raw.githubusercontent.com/Majdiscode/mom/main/Final%20Images/File_000.jpg?v=2', alt: 'Staged Property' },
    { src: 'https://raw.githubusercontent.com/Majdiscode/mom/main/Final%20Images/IMG_0186.jpeg?v=2', alt: 'Staged Property' },
    { src: 'https://raw.githubusercontent.com/Majdiscode/mom/main/Final%20Images/IMG_0189.jpeg?v=2', alt: 'Staged Property' },
    { src: 'https://raw.githubusercontent.com/Majdiscode/mom/main/Final%20Images/IMG_0217.jpeg?v=2', alt: 'Staged Property' },
    { src: 'https://raw.githubusercontent.com/Majdiscode/mom/main/Final%20Images/IMG_0228.JPEG?v=2', alt: 'Staged Property' },
    { src: 'https://raw.githubusercontent.com/Majdiscode/mom/main/Final%20Images/IMG_0235.jpeg?v=2', alt: 'Staged Property' },
    { src: 'https://raw.githubusercontent.com/Majdiscode/mom/main/Final%20Images/IMG_0255.JPEG?v=2', alt: 'Staged Property' },
    { src: 'https://raw.githubusercontent.com/Majdiscode/mom/main/Final%20Images/bathroom1.JPEG?v=2', alt: 'Staged Property' },
    { src: 'https://raw.githubusercontent.com/Majdiscode/mom/main/Final%20Images/bedroom1.JPEG?v=2', alt: 'Staged Property' },
    { src: 'https://raw.githubusercontent.com/Majdiscode/mom/main/Final%20Images/c4400f978a30a7d247457f6e05cb002a.JPEG?v=2', alt: 'Staged Property' },
    { src: 'https://raw.githubusercontent.com/Majdiscode/mom/main/Final%20Images/ca2620895459e0c9a3b3ba71ff295692.JPEG?v=2', alt: 'Staged Property' },
    { src: 'https://raw.githubusercontent.com/Majdiscode/mom/main/Final%20Images/fc50688cdbc7746b474ea73c1da55f18-cc_ft_1536.JPEG?v=2', alt: 'Staged Property' },
    { src: 'https://raw.githubusercontent.com/Majdiscode/mom/main/Final%20Images/livign3.JPEG?v=2', alt: 'Staged Property' },

    // San Francisco Apartment
    { src: 'https://raw.githubusercontent.com/Majdiscode/mom/main/San%20Francisco%20Apartment/1789ce285b5199465ef1c8c8b36b5412-uncropped_scaled_within_1536_1152.webp', alt: 'SF Apartment Staged' },
    { src: 'https://raw.githubusercontent.com/Majdiscode/mom/main/San%20Francisco%20Apartment/4b8208295eb0801214dd1e3f2ed93f66-uncropped_scaled_within_1536_1152.webp', alt: 'SF Apartment Staged' },
    { src: 'https://raw.githubusercontent.com/Majdiscode/mom/main/San%20Francisco%20Apartment/5a30fb4b7df07254e7d83289c434b716-uncropped_scaled_within_1536_1152.webp', alt: 'SF Apartment Staged' },
    { src: 'https://raw.githubusercontent.com/Majdiscode/mom/main/San%20Francisco%20Apartment/793aa53afccfdd978c662bb11c4760f9-uncropped_scaled_within_1536_1152.webp', alt: 'SF Apartment Staged' },
    { src: 'https://raw.githubusercontent.com/Majdiscode/mom/main/San%20Francisco%20Apartment/971437bbaec69ecc4af1fe6c6944830c-uncropped_scaled_within_1536_1152.webp', alt: 'SF Apartment Staged' },
    { src: 'https://raw.githubusercontent.com/Majdiscode/mom/main/San%20Francisco%20Apartment/979489aface36ae97ee31db8d809b64b-uncropped_scaled_within_1536_1152.webp', alt: 'SF Apartment Staged' },
    { src: 'https://raw.githubusercontent.com/Majdiscode/mom/main/San%20Francisco%20Apartment/a5e22a2d56bedfc7d81acb6f89655a33-uncropped_scaled_within_1536_1152.webp', alt: 'SF Apartment Staged' },
    { src: 'https://raw.githubusercontent.com/Majdiscode/mom/main/San%20Francisco%20Apartment/c6af2b61b7cab864d98c31fc160d5829-uncropped_scaled_within_1536_1152.webp', alt: 'SF Apartment Staged' },
    { src: 'https://raw.githubusercontent.com/Majdiscode/mom/main/San%20Francisco%20Apartment/d07489e8bdac729d7938fb749d00bd56-uncropped_scaled_within_1536_1152.webp', alt: 'SF Apartment Staged' },
    { src: 'https://raw.githubusercontent.com/Majdiscode/mom/main/San%20Francisco%20Apartment/ded3a4890c63d5bb329ef5475373cd5c-uncropped_scaled_within_1536_1152.webp', alt: 'SF Apartment Staged' },
    { src: 'https://raw.githubusercontent.com/Majdiscode/mom/main/San%20Francisco%20Apartment/e836aa731da2c09d22c056cfa985ce31-uncropped_scaled_within_1536_1152.webp', alt: 'SF Apartment Staged' },
    { src: 'https://raw.githubusercontent.com/Majdiscode/mom/main/San%20Francisco%20Apartment/f8506eaf6bcb6b47457c881d8a9ddb51-uncropped_scaled_within_1536_1152.webp', alt: 'SF Apartment Staged' },

    // San Jose — Willow Creek Ct (March 2025)
    { src: 'https://raw.githubusercontent.com/Majdiscode/mom/main/March%2027/0d1ed54a3feffaf58b7b84a17858b829-uncropped_scaled_within_1536_1152.webp?v=1', alt: 'San Jose staged interior' },
    { src: 'https://raw.githubusercontent.com/Majdiscode/mom/main/March%2027/2e1f44760947475f56d816db0a40aacc-uncropped_scaled_within_1536_1152.webp?v=1', alt: 'San Jose staged interior' },
    { src: 'https://raw.githubusercontent.com/Majdiscode/mom/main/March%2027/4d5eae3f4a2809f84ba37f589fad6635-uncropped_scaled_within_1536_1152.webp?v=1', alt: 'San Jose staged interior' },
    { src: 'https://raw.githubusercontent.com/Majdiscode/mom/main/March%2027/4e6dec3c6bbf226a1bb784ccfa192b83-uncropped_scaled_within_1536_1152.webp?v=1', alt: 'San Jose staged interior' },
    { src: 'https://raw.githubusercontent.com/Majdiscode/mom/main/March%2027/5a865f1af873ef88d41e9b4eecad33a2-uncropped_scaled_within_1536_1152.webp?v=1', alt: 'San Jose staged interior' },
    { src: 'https://raw.githubusercontent.com/Majdiscode/mom/main/March%2027/20b86eacf1be3144c5ff512de14d7a7c-uncropped_scaled_within_1536_1152.webp?v=1', alt: 'San Jose staged interior' },
    { src: 'https://raw.githubusercontent.com/Majdiscode/mom/main/March%2027/59c3b5f7cb241a2e6cb699ff757de24a-uncropped_scaled_within_1536_1152.webp?v=1', alt: 'San Jose staged interior' },
    { src: 'https://raw.githubusercontent.com/Majdiscode/mom/main/March%2027/4124e11d0f3881c7beafdf12cba7ed05-uncropped_scaled_within_1536_1152.webp?v=1', alt: 'San Jose staged interior' },
    { src: 'https://raw.githubusercontent.com/Majdiscode/mom/main/March%2027/bd51486953f1335b736352b11042fcff-uncropped_scaled_within_1536_1152.webp?v=1', alt: 'San Jose staged interior' },
    { src: 'https://raw.githubusercontent.com/Majdiscode/mom/main/March%2027/d312f93d674a9f3a56e8c65fec9627ca-uncropped_scaled_within_1536_1152.webp?v=1', alt: 'San Jose staged interior' },
    { src: 'https://raw.githubusercontent.com/Majdiscode/mom/main/March%2027/d631af6c9b4072627924683749fa95a7-uncropped_scaled_within_1536_1152.webp?v=1', alt: 'San Jose staged interior' },
    { src: 'https://raw.githubusercontent.com/Majdiscode/mom/main/March%2027/e4cdfb1852e8cac46ab9ed1342641da6-uncropped_scaled_within_1536_1152.webp?v=1', alt: 'San Jose staged interior' }
];

// ===== SLIDESHOW FUNCTIONALITY =====
(function () {
    const slideshow = document.getElementById('mainSlideshow');
    const slidesContainer = document.getElementById('slidesContainer');
    const dotsContainer = document.getElementById('dotsContainer');
    const prevBtn = document.getElementById('prevBtn');
    const nextBtn = document.getElementById('nextBtn');
    const currentSlideEl = document.getElementById('currentSlide');
    const totalSlidesEl = document.getElementById('totalSlides');

    let currentIndex = 0;
    const totalSlides = slideshowImages.length;

    // Generate slides and dots from array
    function initSlideshow() {
        // Clear existing content
        slidesContainer.innerHTML = '';
        dotsContainer.innerHTML = '';

        // Create slides
        slideshowImages.forEach((image, index) => {
            const slide = document.createElement('div');
            slide.className = `slide${index === 0 ? ' active' : ''}`;
            slide.dataset.index = index;
            slide.innerHTML = `<img src="${image.src}" alt="${image.alt}">`;
            slidesContainer.appendChild(slide);

            // Only create dots if we have a reasonable number of slides (e.g., <= 15)
            // Otherwise, it gets too cluttered. The counter text is sufficient.
            if (totalSlides <= 15) {
                const dot = document.createElement('button');
                dot.className = `slideshow-dot${index === 0 ? ' active' : ''}`;
                dot.dataset.index = index;
                dot.setAttribute('aria-label', `Go to slide ${index + 1}`);
                dot.addEventListener('click', () => goToSlide(index));
                dotsContainer.appendChild(dot);
            }
        });

        // Hide dots container visually if no dots are created to prevent empty padding
        if (totalSlides > 15) {
            dotsContainer.style.display = 'none';
        }

        // Update counter
        totalSlidesEl.textContent = totalSlides;
    }

    // Go to specific slide
    function goToSlide(index) {
        if (index < 0) index = totalSlides - 1;
        if (index >= totalSlides) index = 0;

        // Update slides
        document.querySelectorAll('.slide').forEach((slide, i) => {
            slide.classList.toggle('active', i === index);
        });

        // Update dots
        document.querySelectorAll('.slideshow-dot').forEach((dot, i) => {
            dot.classList.toggle('active', i === index);
        });

        currentSlideEl.textContent = index + 1;
        currentIndex = index;
    }

    function nextSlide() { goToSlide(currentIndex + 1); }
    function prevSlide() { goToSlide(currentIndex - 1); }

    // Event listeners
    nextBtn.addEventListener('click', nextSlide);
    prevBtn.addEventListener('click', prevSlide);

    // Keyboard navigation
    document.addEventListener('keydown', (e) => {
        const rect = slideshow.getBoundingClientRect();
        const isInView = rect.top < window.innerHeight && rect.bottom > 0;

        if (isInView) {
            if (e.key === 'ArrowRight') { e.preventDefault(); nextSlide(); }
            else if (e.key === 'ArrowLeft') { e.preventDefault(); prevSlide(); }
        }
    });

    // Touch/Swipe support
    let touchStartX = 0;
    let touchEndX = 0;

    slidesContainer.addEventListener('touchstart', (e) => {
        touchStartX = e.changedTouches[0].screenX;
    }, { passive: true });

    slidesContainer.addEventListener('touchend', (e) => {
        touchEndX = e.changedTouches[0].screenX;
        const swipeDistance = touchEndX - touchStartX;
        if (Math.abs(swipeDistance) > 50) {
            swipeDistance > 0 ? prevSlide() : nextSlide();
        }
    }, { passive: true });

    // Initialize
    initSlideshow();
})();

// ===== CONTACT FORM =====
document.getElementById('contactForm').addEventListener('submit', function (e) {
    const btn = document.querySelector('.submit-button');
    btn.textContent = 'Sending...';
    btn.disabled = true;
    btn.style.opacity = '0.7';

    setTimeout(() => {
        btn.textContent = 'Send Message';
        btn.disabled = false;
        btn.style.opacity = '1';
    }, 3000);
});

// ===== SMOOTH SCROLLING =====
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function (e) {
        e.preventDefault();
        const target = document.querySelector(this.getAttribute('href'));
        if (target) {
            target.scrollIntoView({ behavior: 'smooth', block: 'start' });
        }
    });
});

// ===== SCROLL ANIMATIONS =====
const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            entry.target.classList.add('fade-in');
        }
    });
}, { threshold: 0.1, rootMargin: '0px 0px -50px 0px' });

const slideshowWrapper = document.querySelector('.slideshow-wrapper');
if (slideshowWrapper) observer.observe(slideshowWrapper);
