'use strict';

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

export default initModal;