'use strict';

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

export default initMenu;