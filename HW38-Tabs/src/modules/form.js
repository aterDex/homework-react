'use strict';

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

export default initSendForm;