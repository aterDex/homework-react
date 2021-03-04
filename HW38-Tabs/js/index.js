window.addEventListener('DOMContentLoaded', () => {

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
            for(let e of tabHeaders) {
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
});