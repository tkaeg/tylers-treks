const Carousel = (() => {
            const carousels = [];

            const createCarousel = (containerId, options = {}) => {
                console.log(`Creating carousel in container: ${containerId}`);
                const container = document.getElementById(containerId);
                if (!container) {
                    console.error(`Carousel container "${containerId}" not found`);
                    return null;
                }

                const autoAdvanceDelay = options.autoAdvance !== false ? (options.delay || 5000) : null;

                let currentIndex = 0;
                let autoAdvanceInterval;
                console.log('container:', container);
                const carousel = container.querySelector('.carousel');
                const track = carousel.querySelector('.carousel-track');
                const slides = track.querySelectorAll('.carousel-slide');
                const indicatorsContainer = container.querySelector('.carousel-indicators');

                const indicators = [];
                slides.forEach((_, index) => {
                    const indicator = document.createElement('button');
                    indicator.classList.add('indicator');
                    if (index === 0) indicator.classList.add('active');
                    indicator.onclick = () => goToSlide(index);
                    indicatorsContainer.appendChild(indicator);
                    indicators.push(indicator);
                });

                let prevBtn = container.querySelector('.carousel-btn.prev');
                let nextBtn = container.querySelector('.carousel-btn.next');

                if (prevBtn) prevBtn.onclick = () => moveCarousel(-1);
                if (nextBtn) nextBtn.onclick = () => moveCarousel(1);

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
                    if (autoAdvanceDelay) {
                        autoAdvanceInterval = setInterval(() => moveCarousel(1), autoAdvanceDelay);
                    }
                };

                const stopAutoAdvance = () => {
                    if (autoAdvanceInterval) {
                        clearInterval(autoAdvanceInterval);
                    }
                };

                container.addEventListener('mouseenter', stopAutoAdvance);
                container.addEventListener('mouseleave', startAutoAdvance);

                startAutoAdvance();

                const carouselInstance = {
                    move: moveCarousel,
                    goTo: goToSlide,
                    stop: stopAutoAdvance,
                    start: startAutoAdvance
                };

                carousels.push(carouselInstance);
                return carouselInstance;
            };

            const init = () => {
                const containers = document.querySelectorAll('[data-carousel]');
                containers.forEach(container => {
                    const options = {
                        autoAdvance: container.dataset.autoAdvance !== 'false',
                        delay: parseInt(container.dataset.delay) || 5000
                    };
                    createCarousel(container.id, options);
                });

                document.addEventListener('keydown', (e) => {
                    if (e.key === 'ArrowLeft' && carousels.length > 0) {
                        carousels[0].move(-1);
                    }
                    if (e.key === 'ArrowRight' && carousels.length > 0) {
                        carousels[0].move(1);
                    }
                });
            };

            return {
                init,
                create: createCarousel,
                getAll: () => carousels
            };
        })();

        document.addEventListener('DOMContentLoaded', () => {
            Carousel.init();
        });