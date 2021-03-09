'use strict';

window.addEventListener('DOMContentLoaded', () => {
    initTabWork();
    initTimer(afterDays(1));
    const modal = initModal();
    initMenu();
    initSendForm(modal);
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

    function getZero(num) {
        if (num >= 0 && num < 10) {
            return '0' + num;
        }
        return num;
    }
}

function initModal(timeOut = 30000) {
    const modal = document.querySelector('.modal');
    document.querySelectorAll('[data-modal]').forEach(x => x.addEventListener('click', showModal));

    modal.addEventListener('click', e => {
        if (e.target === modal || e.target.getAttribute('data-modalClose') == '') {
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

function initMenu() {
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
    staticMenu().map(x => new FoodMenuRender(x, menuContainer)).forEach(x => x.render());

    function clearMenu() {
        menuContainer.querySelectorAll('.menu__item').forEach(x => x.remove());
    }

    function staticMenu() {
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
}

function initSendForm(modal) {
    const forms = document.querySelectorAll('form');

    const message = {
        loading: 'icons/spinner.svg',
        success: 'Спасибо! Скоро мы с вами свяжемся',
        failure: 'Что-то пошло не так...'
    };

    forms.forEach(x => postData(x, callBackRequestByJson));

    function postData(form, callBackRequest) {
        form.addEventListener('submit', (e) => {
            e.preventDefault();
            const img = document.createElement('img');
            img.src = message.loading;
            img.style.cssText = 'display: block; margin: 0 auto;';
            form.insertAdjacentElement('afterend', img);

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
            callBackRequest(form, request);
        })
    }

    function callBackRequestByFormData(form, request) {
        request.open('POST', 'callMe')
        request.send(new FormData(form));
    }

    function callBackRequestByJson(form, request) {
        request.open('POST', 'callMe')
        request.setRequestHeader('Content-type', 'application/json');
        const formData = new FormData(form);
        const object = {};
        formData.forEach(function (val, key) {
            object[key] = val;
        });
        request.send(JSON.stringify(object));
    }
}