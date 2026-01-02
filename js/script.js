// ===== SLIDESHOW IMAGES =====
// Add or remove images here - everything else auto-updates
const slideshowImages = [
    { src: 'https://raw.githubusercontent.com/Majdiscode/mom/main/Final%20Images/45e1cf379e5fb87d7bc2d20fc72f9b00-uncropped_scaled_within_1536_1152.webp', alt: 'Staged Design' },
    { src: 'https://raw.githubusercontent.com/Majdiscode/mom/main/Final%20Images/60be9d00045b27b80060e5439c84a6ee.jpg', alt: 'Staged Interior' },
    { src: 'https://raw.githubusercontent.com/Majdiscode/mom/main/Final%20Images/9621c92e5be17d2272eaaef9f5ff92b3.jpg', alt: 'Staged Bedroom' },
    { src: 'https://raw.githubusercontent.com/Majdiscode/mom/main/Final%20Images/c5767fd592d0dedb3e1084cb89da4b29.jpg', alt: 'Staged Room' },
    { src: 'https://raw.githubusercontent.com/Majdiscode/mom/main/Final%20Images/f5b949771d75cb87b9b66b7ee4661eb9.jpg', alt: 'Staged Space' },
    { src: 'https://raw.githubusercontent.com/Majdiscode/mom/main/Final%20Images/fc50688cdbc7746b474ea73c1da55f18.jpg', alt: 'Staged Home' },
    { src: 'https://raw.githubusercontent.com/Majdiscode/mom/main/Final%20Images/146_425072528_02.jpg', alt: 'Beale Street Living' },
    { src: 'https://raw.githubusercontent.com/Majdiscode/mom/main/Final%20Images/146_425072528_18.jpg', alt: 'Beale Street Interior' },
    { src: 'https://raw.githubusercontent.com/Majdiscode/mom/main/Final%20Images/146_425072528_21.jpg', alt: 'Beale Street Room' },
    { src: 'https://raw.githubusercontent.com/Majdiscode/mom/main/Final%20Images/6ee3938d9ae9641308cf3e16ae17b89f.jpg', alt: 'Staged Property' },
    { src: 'https://raw.githubusercontent.com/Majdiscode/mom/main/Final%20Images/28d8c7c33f03c98f1e88209093d08d8d.jpg', alt: 'Staged Living Room' }
];

// ===== SLIDESHOW FUNCTIONALITY =====
(function() {
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

            // Create dot
            const dot = document.createElement('button');
            dot.className = `slideshow-dot${index === 0 ? ' active' : ''}`;
            dot.dataset.index = index;
            dot.setAttribute('aria-label', `Go to slide ${index + 1}`);
            dot.addEventListener('click', () => goToSlide(index));
            dotsContainer.appendChild(dot);
        });

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
document.getElementById('contactForm').addEventListener('submit', function(e) {
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
    anchor.addEventListener('click', function(e) {
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
