'use strict';

function initCalc() {
    const clChoiceItem = 'calculating__choose-item',
        clChoiceItemActive = 'calculating__choose-item_active',
        localStorageName = 'calc';
    const calculating = document.querySelector('.calculating'),
        genderChoice = calculating.querySelector('#gender'),
        height = calculating.querySelector('#height'),
        weight = calculating.querySelector('#weight'),
        age = calculating.querySelector('#age'),
        ratioChoice = calculating.querySelector('#ratio'),
        sum = calculating.querySelector('.calculating__result > span');

    const calc = JSON.parse(localStorage.getItem(localStorageName));

    if (calc) {
        initChoice(genderChoice, calc.gender);
        initChoice(ratioChoice, calc.ratio);
        initInput(height, calc.height);
        initInput(weight, calc.weight);
        initInput(age, calc.age);
    } else {
        initChoice(genderChoice);
        initChoice(ratioChoice);
        initInput(height);
        initInput(weight);
        initInput(age);
    }
    reCalc();

    function initChoice(choicer, defId) {
        const items = choicer.querySelectorAll('.calculating__choose-item');
        if (defId) {
            const def = choicer.querySelector(`#${defId}`);
            if (def) {
                clearChoice();
                def.classList.add(clChoiceItemActive);
            }

        }

        choicer.addEventListener('click', e => {
            const t = e.target;
            if (t.classList.contains(clChoiceItem) && !t.classList.contains(clChoiceItemActive)) {
                clearChoice();
                t.classList.add(clChoiceItemActive);
                reCalc();
            }
        });

        function clearChoice() {
            items.forEach(x => x.classList.remove(clChoiceItemActive));
        }
    }

    function initInput(input, def) {
        if (def) {
            input.value = def;
        }
        input.addEventListener('input', e => {
            if (input.value.match(/\D/)) {
                input.classList.add('input_error');
            } else {
                input.classList.remove('input_error');
            }
            reCalc();
        });
    }

    function getChoice(choicer) {
        return choicer.querySelector(`.${clChoiceItemActive}`);
    }

    function reCalc() {
        try {
            const w = +weight.value,
                h = +height.value,
                a = +age.value;
            if (w && h && a) {
                const rc = getChoice(ratioChoice),
                    gc = getChoice(genderChoice),
                    ratio = rc.getAttribute('data-ratio');
                if (gc.id === 'female') {
                    sum.textContent = Math.round((447.6 + (9.2 * w) + (3.1 * h) - (5.7 * a)) * ratio);
                } else {
                    sum.textContent = Math.round((88.36 + (13.4 * w) + (4.8 * h) - (4.3 * a)) * ratio);
                }
                localStorage.setItem(localStorageName, JSON.stringify({
                    gender: gc.id,
                    ratio: rc.id,
                    weight: w,
                    height: h,
                    age: a
                }));

            } else {
                sum.textContent = '2700';
            }
        } catch (e) {
            console.log(e);
            sum.textContent = '2700';
        }
    }
}

export default initCalc;