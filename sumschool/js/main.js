function updateHeroDots(slider) {
    const currentIndex = slider.track.details.rel;
    const paginations = document.querySelectorAll('.hero-pagination');

    paginations.forEach((pagination) => {
        const dots = pagination.querySelectorAll('.hero-pagination-dot');
        dots.forEach((dot, index) => {
            dot.classList.toggle('is-active', index === currentIndex);
            dot.setAttribute('aria-current', index === currentIndex ? 'true' : 'false');
        });
    });
}

function updateReviewsDots(slider) {
    const currentIndex = slider.track.details.rel;
    const paginations = document.querySelectorAll('.reviews-pagination');
    paginations.forEach((pagination) => {
        const dots = pagination.querySelectorAll('.reviews-pagination-dot');
        dots.forEach((dot, index) => {
            dot.classList.toggle('is-active', index === currentIndex);
            dot.setAttribute('aria-current', index === currentIndex ? 'true' : 'false');
        });
    });
}

function bindHeroDots(slider) {
    const paginations = document.querySelectorAll('.hero-pagination');

    paginations.forEach((pagination) => {
        const dots = pagination.querySelectorAll('.hero-pagination-dot');
        dots.forEach((dot, index) => {
            dot.addEventListener('click', () => {
                slider.moveToIdx(index);
            });
        });
    });
}

function bindReviewsDots(slider) {
    const paginations = document.querySelectorAll('.reviews-pagination');
    paginations.forEach((pagination) => {
        const dots = pagination.querySelectorAll('.reviews-pagination-dot');
        dots.forEach((dot, index) => {
            dot.addEventListener('click', () => {
                slider.moveToIdx(index);
            });
        });
    });
}

function bindPartnersArrows(slider) {
    const prevButton = document.querySelector('.partners-arrow-prev');
    const nextButton = document.querySelector('.partners-arrow-next');

    if (!prevButton || !nextButton) {
        return;
    }

    prevButton.addEventListener('click', () => {
        slider.prev();
    });

    nextButton.addEventListener('click', () => {
        slider.next();
    });
}

function initHeroSlider() {
    const sliderElement = document.querySelector('#hero-slider');
    if (!sliderElement || typeof KeenSlider === 'undefined') {
        return;
    }

    new KeenSlider(sliderElement, {
        loop: true,
        rubberband: false,
        mode: 'snap',
        renderMode: 'performance',
        slides: {
            perView: 1,
            spacing: 2,
        },
        created(slider) {
            bindHeroDots(slider);
            updateHeroDots(slider);
        },
        slideChanged(slider) {
            updateHeroDots(slider);
        },
    });
}

function initReviewsSlider() {
    const sliderElement = document.querySelector('#reviews-slider');
    if (!sliderElement || typeof KeenSlider === 'undefined') {
        return;
    }

    new KeenSlider(sliderElement, {
        loop: true,
        rubberband: false,
        mode: 'snap',
        renderMode: 'performance',
        slides: {
            perView: 1,
            spacing: 2,
        },
        created(slider) {
            bindReviewsDots(slider);
            updateReviewsDots(slider);
        },
        slideChanged(slider) {
            updateReviewsDots(slider);
        },
    });
}

function initPartnersSlider() {
    const sliderElement = document.querySelector('#partners-slider');
    if (!sliderElement || typeof KeenSlider === 'undefined') {
        return;
    }

    new KeenSlider(sliderElement, {
        loop: true,
        rubberband: false,
        mode: 'snap',
        renderMode: 'performance',
        slides: {
            perView: 1,
            spacing: 8,
        },
        breakpoints: {
            '(min-width: 500px)': {
                slides: {
                    perView: 1,
                    spacing: 8,
                },
            },
            '(min-width: 770px)': {
                slides: {
                    perView: 2,
                    spacing: 8,
                },
            },
            '(min-width: 1024px)': {
                slides: {
                    perView: 3,
                    spacing: 8,
                },
            },
            '(min-width: 1400px)': {
                slides: {
                    perView: 3,
                    spacing: 16,
                },
            },
            '(min-width: 1920px)': {
                slides: {
                    perView: 4,
                    spacing: 16,
                },
            },
        },
        created(slider) {
            bindPartnersArrows(slider);
        },
    });
}

function initHeroVideos() {
    document.querySelectorAll('.video.has-video').forEach((wrapper) => {
        const video = wrapper.querySelector('video');
        if (!video) return;

        wrapper.addEventListener('click', () => {
            const requestFs = wrapper.requestFullscreen
                || wrapper.webkitRequestFullscreen
                || wrapper.msRequestFullscreen;

            const play = () => {
                video.controls = true;
                video.play();
            };

            if (requestFs) {
                requestFs.call(wrapper).then(play).catch(play);
            } else {
                play();
            }
        });

        video.addEventListener('play', () => wrapper.classList.add('is-playing'));
        video.addEventListener('pause', () => wrapper.classList.remove('is-playing'));
        video.addEventListener('ended', () => wrapper.classList.remove('is-playing'));
    });
}

function initLandingPage() {
    initHeroSlider();
    initReviewsSlider();
    initPartnersSlider();
    initHeroVideos();
    if (typeof initReviews === 'function') {
        initReviews();
    }
}

if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', initLandingPage);
} else {
    initLandingPage();
}