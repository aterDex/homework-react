'use strict';

import {getZero} from './utils';

function initSlider() {
    const slider = document.querySelector('.offer__slider'),
        current = slider.querySelector('.offer__slider-counter #current'),
        total = slider.querySelector('.offer__slider-counter #total'),
        sliderContainer = slider.querySelector('.offer__slider-wrapper'),
        slides = sliderContainer.querySelectorAll('.offer__slide'),
        sliderInner = sliderContainer.querySelector('.offer__slider-inner'),
        width = window.getComputedStyle(sliderContainer).width,
        widthN = +width.replace(/\D/g, '');
    let position = 0;

    sliderContainer.style.overflow = 'hidden';

    sliderInner.style.width = 100 * slides.length + '%';
    sliderInner.style.display = 'flex';
    sliderInner.style.transition = '0.5s all';

    slides.forEach(x => x.style.width = width);

    slider
        .querySelector('.offer__slider-prev')
        .addEventListener('click', () => next(-1));
    slider
        .querySelector('.offer__slider-next')
        .addEventListener('click', () => next());
    slider.style.position = 'relative';
    total.textContent = getZero(slides.length);

    const indicators = document.createElement('ol');
    indicators.classList.add('carousel-indicators');
    slider.append(indicators);

    slides.forEach((x, y) => {
        const dot = document.createElement('li');
        dot.setAttribute('data-slide-to', y);
        dot.classList.add('dot');
        indicators.append(dot);
        dot.addEventListener('click', e => {
            show(+e.target.getAttribute('data-slide-to'));
        });
    });

    const dots = indicators.querySelectorAll('.dot');
    dots[0].classList.add('dot-s');

    sliderContainer.addEventListener('dblclick', () => {
        next();
    });

    function show(newPos) {
        if (position != newPos) {
            next(newPos - position);
        }
    }

    function next(offset = 1) {
        position = (position + offset) % slides.length;
        if (position < 0) {
            position = slides.length + position;
        }
        sliderInner.style.transform = `translateX(-${widthN * position}px)`;
        current.textContent = getZero(position + 1);
        dots.forEach(x => x.classList.remove('dot-s'));
        indicators.querySelectorAll(`.dot[data-slide-to='${position}']`).forEach(x => x.classList.add('dot-s'));
    }
}

export default initSlider;