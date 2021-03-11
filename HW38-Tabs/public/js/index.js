'use strict';

window.addEventListener('DOMContentLoaded', () => {
    const storage = initStorage();
    initTabWork();
    initTimer(afterDays(1));
    const modal = initModal();
    initMenu(storage);
    initSendForm(modal, storage);
    initSlider();
    initCalc();
});

function initTabWork() {

    const ST_TABHEADER_ITEM_ACTIVE = 'tabheader__item_active';

    const tabHeaders = document.querySelectorAll('.tabheader__item'),
        tabContents = document.querySelectorAll('.tabcontent'),
        tabPane = document.querySelector('.tabheader');

    hideTabAll();
    showTab();

    tabPane.addEventListener('click', e => {
        const t = e.target;
        if (t && t.classList.contains('tabheader__item')) {
            let i = 0;
            for (let e of tabHeaders) {
                if (t === e) {
                    hideTabAll();
                    showTab(i);
                }
                i++;
            }
        }
    });

    function hideTabAll() {
        tabContents.forEach(x => x.hidden = true);
        tabHeaders.forEach(x => x.classList.remove(ST_TABHEADER_ITEM_ACTIVE))
    }

    function showTab(i = 0) {
        tabContents[i].hidden = false;
        tabHeaders[i].classList.add(ST_TABHEADER_ITEM_ACTIVE);
    }
}

function afterDays(days) {
    const now = new Date();
    now.setDate(now.getDate() + days);
    return now;
}

function initTimer(dateFinish, timeRefresh = 1000) {
    document.querySelectorAll('.promotion__timeEnd')
        .forEach(x => x.textContent = `${dateFinish.toLocaleDateString()} в ${dateFinish.toLocaleTimeString()}`);

    showTimeRemaining(getTimeRemaining(dateFinish));
    startTimer();

    function startTimer() {
        console.log(`timerStart refresh by ${timeRefresh}`)
        const timerId = setInterval(() => {
            const rem = getTimeRemaining(dateFinish);
            showTimeRemaining(rem);
            if (!(rem.days || rem.hours || rem.minute || rem.seconds)) {
                clearInterval(timerId);
                console.log('timerStop')
            }
        }, timeRefresh);
    }

    function getTimeRemaining(dateFinish) {
        const t = dateFinish - new Date();
        if (t < 0) {
            return {days: 0, hours: 0, minute: 0, seconds: 0};
        }
        return {
            days: Math.floor(t / 86400000),
            hours: Math.floor((t % 86400000) / 3600000),
            minute: Math.floor((t % 86400000 % 3600000) / 60000),
            seconds: Math.floor((t % 86400000 % 3600000 % 60000) / 1000)
        }
    }

    function showTimeRemaining(remaining) {
        document.querySelector('#days').textContent = getZero(remaining.days);
        document.querySelector('#hours').textContent = getZero(remaining.hours);
        document.querySelector('#minutes').textContent = getZero(remaining.minute);
        document.querySelector('#seconds').textContent = getZero(remaining.seconds);
    }
}

function initModal(timeOut = 30000) {
    const modal = document.querySelector('.modal');
    document.querySelectorAll('[data-modal]').forEach(x => x.addEventListener('click', showModal));

    modal.addEventListener('click', e => {
        if (e.target === modal || e.target.getAttribute('data-modalClose') === '') {
            hideModal();
        }
    });
    document.addEventListener('keydown', e => {
        if (e.code === 'Escape' && !modal.hidden) {
            hideModal();
        }
    });
    const showModalTimeout = timeOut > 0 ? setTimeout(showModal, timeOut) : undefined;

    const scrollEvent = () => {
        if (window.pageYOffset + document.documentElement.clientHeight >= document.documentElement.scrollHeight) {
            showModal();
            window.removeEventListener('scroll', scrollEvent)
        }
    };
    window.addEventListener('scroll', scrollEvent);

    function showModal() {
        reloadModal();
        showModalWithoutReload();
    }

    function showModalWithoutReload() {
        modal.hidden = false;
        document.body.style.overflow = 'hidden';
        if (showModalTimeout) {
            clearTimeout(showModalTimeout);
        }
    }

    function reloadModal() {
        modal.querySelector('[data-modalOrigin]').hidden = false;
        modal.querySelectorAll('.modal > :not([data-modalOrigin])')
            .forEach(x => x.remove());
    }

    function hideModal() {
        modal.hidden = true;
        document.body.style.overflow = '';
    }

    function showTextModal(text) {
        reloadModal();
        modal.querySelector('[data-modalOrigin]').hidden = true;
        showModalWithoutReload();
        const textModal = document.createElement('div');
        textModal.classList.add('modal__dialog');
        textModal.innerHTML = `
            <div class="modal__content">
                <div data-modalClose class="modal__close">&times;</div>
                <div class="modal__title"/>
            </div>`;
        textModal.querySelector('.modal__title').textContent = text;
        modal.append(textModal);
    }

    return {
        show: showModal,
        hide: hideModal,
        showText: showTextModal
    }
}

function initMenu(storage) {
    const urlMenu = 'menu';

    class FoodMenu {
        constructor(name, description, price, img, imgAlt) {
            this.name = name;
            this.description = description;
            this.price = price;
            this.img = img;
            this.imgAlt = imgAlt;
        }
    }

    class FoodMenuRender {
        constructor(foodMenu, parent) {
            this.foodMenu = foodMenu;
            this.parent = parent;
        }

        render() {
            const c = document.querySelector('#template_menu__item').content;
            const base = c.cloneNode(true);
            const img = base.querySelector('.menu__item img');
            img.src = this.foodMenu.img;
            img.alt = this.foodMenu.imgAlt;
            base.querySelector('.menu__item-subtitle').textContent = this.foodMenu.name;
            base.querySelector('.menu__item-descr').textContent = this.foodMenu.description;
            base.querySelector('.menu__item-price .menu__item-total span').textContent = this.foodMenu.price;
            this.parent.appendChild(base);
        }
    }

    const menuContainer = document.querySelector('.menu__field .container');
    clearMenu();
    fetchMenu()
        .then(data => data.map(x => new FoodMenuRender(x, menuContainer)).forEach(x => x.render()))
        .catch((err) => {
            console.log(err);
            clearMenu();
            new FoodMenuRender(new FoodMenu(
                'Ошибка',
                'Ошибка при загрузки меню',
                0,
                '',
                'Ошибка'
            ), menuContainer).render();
        });

    function clearMenu() {
        menuContainer.querySelectorAll('.menu__item').forEach(x => x.remove());
    }

    async function staticMenu() {
        return [
            new FoodMenu(
                'Меню "Фитнес"',
                'Меню "Фитнес" - это новый подход к приготовлению блюд: больше свежих овощей и фруктов. Продукт активных и здоровых людей. Это абсолютно новый продукт с оптимальной ценой и высоким качеством!',
                229,
                'img/tabs/vegy.jpg',
                'vegy'
            ),
            new FoodMenu(
                'Меню “Премиум”',
                'В меню “Премиум” мы используем не только красивый дизайн упаковки, но и качественное исполнение блюд. Красная рыба, морепродукты, фрукты - ресторанное меню без похода в ресторан! ',
                550,
                'img/tabs/elite.jpg',
                'elite'
            ),
            new FoodMenu(
                'Меню "Постное"',
                'Меню “Постное” - это тщательный подбор ингредиентов: полное отсутствие продуктов животного происхождения, молоко из миндаля, овса, кокоса или гречки, правильное количество белков за счет тофу и импортных вегетарианских стейков.',
                430,
                'img/tabs/post.jpg',
                'post'
            )
        ]
    }

    async function fetchMenu() {
        return storage.getResource(urlMenu).then(data => {
            return data.menu.map(({img, altimg, title, descr, price}) => {
                return new FoodMenu(
                    title,
                    descr,
                    price,
                    img,
                    altimg
                );
            })
        });
    }
}

function initSendForm(modal, storage) {
    const forms = document.querySelectorAll('form');
    const pathCallMe = 'callMe';
    const message = {
        loading: 'icons/spinner.svg',
        success: 'Спасибо! Скоро мы с вами свяжемся',
        failure: 'Что-то пошло не так...'
    };

    forms.forEach(x => postDataOverFetchFormData(x, callBackRequestByJson));

    // forms.forEach(x => postDataOverXMLHttpRequest(x, callBackRequestByJson));

    function postDataOverXMLHttpRequest(form, callBackRequest) {
        form.addEventListener('submit', (e) => {
            e.preventDefault();
            const img = document.createElement('img');
            img.src = message.loading;
            img.style.cssText = 'display: block; margin: 0 auto;';
            form.insertAdjacentElement('afterend', img);

            const mes = callBackRequest(form);
            const request = new XMLHttpRequest();

            request.addEventListener('load', () => {
                console.log(request.response);
                if (request.status === 200) {
                    modal.showText(message.success);
                    form.reset();
                } else {
                    modal.showText(message.failure);
                }
                img.remove();
            });

            request.open('POST', mes.path);
            if (mes.headers) {
                for (let key in mes.headers) {
                    if (mes.headers.hasOwnProperty(key)) {
                        request.setRequestHeader(key, mes.headers[key]);
                    }
                }
            }
            request.send(mes.body);
        })
    }

    function postDataOverFetchFormData(form, callBackRequest) {
        form.addEventListener('submit', (e) => {
            e.preventDefault();

            const img = document.createElement('img');
            img.src = message.loading;
            img.style.cssText = 'display: block; margin: 0 auto;';
            form.insertAdjacentElement('afterend', img);

            const mes = callBackRequest(form);
            storage.postData(mes.path, mes.headers, mes.body)
                .then(data => {
                    console.log(data);
                    modal.showText(message.success);
                    form.reset();
                })
                .catch((err) => {
                    console.log(err);
                    modal.showText(message.failure);
                })
                .finally(() => img.remove());
        });
    }

    function callBackRequestByFormData(form) {
        return {
            path: pathCallMe,
            body: new FormData(form)
        }
    }

    function callBackRequestByJson(form) {
        return {
            path: pathCallMe,
            headers: {
                'Content-type': 'application/json'
            },
            body: JSON.stringify(Object.fromEntries(new FormData(form).entries()))
        }
    }
}

function initStorage() {
    return {
        postData: async function (url, headers, body) {
            const res = await fetch(url, {
                method: "POST",
                headers: headers,
                body: body
            });
            if (!res.ok) {
                throw new Error(`Could not fetch ${url}, status: ${res.status}`);
            }
            return await res.json();
        },
        getResource: async function (url) {
            const res = await fetch(url);
            if (!res.ok) {
                throw new Error(`Could not fetch ${url}, status: ${res.status}`);
            }
            return await res.json();
        }
    }
}

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

function initCalc() {
    const clChoiceItem = 'calculating__choose-item',
        clChoiceItemActive = 'calculating__choose-item_active';
    const calculating = document.querySelector('.calculating'),
        genderChoice = calculating.querySelector('#gender'),
        height = calculating.querySelector('#height'),
        weight = calculating.querySelector('#weight'),
        age = calculating.querySelector('#age'),
        ratioChoice = calculating.querySelector('#ratio'),
        sum = calculating.querySelector('.calculating__result > span');

    initChoice(genderChoice);
    initChoice(ratioChoice);
    initInput(height);
    initInput(weight);
    initInput(age);
    reCalc();

    function initChoice(choicer) {
        const items = choicer.querySelectorAll('.calculating__choose-item');
        choicer.addEventListener('click', e => {
            const t = e.target;
            if (t.classList.contains(clChoiceItem) && !t.classList.contains(clChoiceItemActive)) {
                items.forEach(x => x.classList.remove(clChoiceItemActive));
                t.classList.add(clChoiceItemActive);
                reCalc();
            }
        });
    }

    function initInput(input) {
        input.addEventListener('input', e => reCalc());
    }

    function getChoice(choicer) {
        return choicer.querySelector(`.${clChoiceItemActive}`);
    }

    function reCalc() {
        try {
            if (weight.value && height.value && age.value) {
                const ratio = +getChoice(ratioChoice).getAttribute('data-ratio');
                if (getChoice(genderChoice).id === 'female') {
                    sum.textContent = Math.round((447.6 + (9.2 * +weight.value) + (3.1 * +height.value) - (5.7 * +age.value)) * ratio);
                } else {
                    sum.textContent = Math.round((88.36 + (13.4 * +weight.value) + (4.8 * +height.value) - (4.3 * +age.value)) * ratio);
                }
            } else {
                sum.textContent = '2700';
            }
        } catch (e) {
            console.log(e);
            sum.textContent = '2700';
        }
    }
}

function getZero(num) {
    if (num >= 0 && num < 10) {
        return '0' + num;
    }
    return num;
}