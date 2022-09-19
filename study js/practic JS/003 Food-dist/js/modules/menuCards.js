function menuCards() {
    let menuField = document.querySelector(".menu__field");
    let container = menuField.querySelector(".container");

    class ItemsMenu {
        constructor(img, altimg, name, description, price, ...classes) {
            this.name = name;
            this.description = description;
            this.price = price * 40;
            this.img = img;
            this.altimg = altimg;
            this.classes = classes;
        }

        createMenuItem() {
            let divItem = document.createElement("div");
            if (this.classes.length === 0) {
                this.classes = "menu__item";
                divItem.classList.add(this.classes);
            } else {
                this.classes.forEach(className => divItem.classList.add(className));
            }
            divItem.insertAdjacentHTML("afterbegin", `<img src=${this.img} alt=${this.altimg}>
            <h3 class="menu__item-subtitle">${this.name}</h3>  <div class="menu__item-descr">${this.description}</div>
        <div class="menu__item-divider"></div>  <div class="menu__item-price">
        <div class="menu__item-cost">Цена: </div>
        <div class="menu__item-total"><span>${this.price}</span> грн/день</div>
    </div>`);

            container.append(divItem);
        }
    }
    let getData = async (url) => {
        let res = await fetch(url);
        if (!res.ok) {
            throw new Error(`Невозможно получить данные ${url}, статус ошибки ${res.status}`);
        }

        return await res.json();
    };

    getData("http://localhost:3000/menu")
        .then(data => data.forEach(({ img, altimg, title, descr, price }) => {
            new ItemsMenu(img, altimg, title, descr, price).createMenuItem();
        })
        );
}
module.exports = menuCards;