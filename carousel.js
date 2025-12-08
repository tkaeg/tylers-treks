// Carousel Module
const Carousel = (() => {
    let currentIndex = 0;
    let slides, track, indicators, autoAdvanceInterval;
    const AUTO_ADVANCE_DELAY = 5000;

    const init = () => {
        slides = document.querySelectorAll('.carousel-slide');
        track = document.getElementById('carousel-track');
        const indicatorsContainer = document.getElementById('indicators');
        
        createIndicators(indicatorsContainer);
        indicators = document.querySelectorAll('.indicator');
        setupEventListeners();
        startAutoAdvance();
    };

    const createIndicators = (container) => {
        slides.forEach((_, index) => {
            const indicator = document.createElement('button');
            indicator.classList.add('indicator');
            if (index === 0) indicator.classList.add('active');
            indicator.onclick = () => goToSlide(index);
            container.appendChild(indicator);
        });
    };

    const updateCarousel = () => {
        track.style.transform = `translateX(-${currentIndex * 100}%)`;
        
        indicators.forEach((indicator, index) => {
            indicator.classList.toggle('active', index === currentIndex);
        });
    };

    const moveCarousel = (direction) => {
        currentIndex += direction;
        
        if (currentIndex < 0) {
            currentIndex = slides.length - 1;
        } else if (currentIndex >= slides.length) {
            currentIndex = 0;
        }
        
        updateCarousel();
    };

    const goToSlide = (index) => {
        currentIndex = index;
        updateCarousel();
    };

    const startAutoAdvance = () => {
        autoAdvanceInterval = setInterval(() => moveCarousel(1), AUTO_ADVANCE_DELAY);
    };

    const stopAutoAdvance = () => {
        clearInterval(autoAdvanceInterval);
    };

    const setupEventListeners = () => {
        const container = document.querySelector('.carousel-container');
        
        // Pause auto-advance on hover
        container.addEventListener('mouseenter', stopAutoAdvance);
        container.addEventListener('mouseleave', startAutoAdvance);
        
        // Keyboard navigation
        document.addEventListener('keydown', (e) => {
            if (e.key === 'ArrowLeft') moveCarousel(-1);
            if (e.key === 'ArrowRight') moveCarousel(1);
        });
    };

    return {
        init,
        move: moveCarousel,
        goTo: goToSlide
    };
})();

// Initialize carousel when DOM is ready
document.addEventListener('DOMContentLoaded', () => {
    Carousel.init();
});

// Expose functions to global scope for button onclick handlers
function moveCarousel(direction) {
    Carousel.move(direction);
}

function goToSlide(index) {
    Carousel.goTo(index);
}