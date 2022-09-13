window.addEventListener("load", () => {
    // Tabs 
    let itemsParent = document.querySelector(".tabheader__items"),
        item = document.querySelectorAll(".tabheader__item"),
        tabs = document.querySelectorAll(".tabcontent");

    function hideTabsContent() {
        tabs.forEach(tab => {
            tab.classList.add("hide");
            tab.classList.remove("show", "fade");
        });
        item.forEach(item => {
            item.classList.remove("tabheader__item_active");
        });
    }
    function showTabsContent(i = 0) {
        item[i].classList.add("tabheader__item_active");
        tabs[i].classList.remove("hide");
        tabs[i].classList.add("show", "fade");
    }
    hideTabsContent();
    showTabsContent();

    itemsParent.addEventListener("click", (e) => {
        let target = e.target;
        if (target && target.classList.contains("tabheader__item")) {
            item.forEach((item, i) => {
                if (item == target) {
                    hideTabsContent();
                    showTabsContent(i);
                }
            });
        }
    });
    // Timer 

    let deadline = "2022-09-07";

    function getTimeRemaining(endtime) {
        let days, hours,
            minutes, seconds;
        let t = Date.parse(endtime) - Date.parse(new Date());
        if (t <= 0) {
            days = 0;
            hours = 0;
            minutes = 0;
            seconds = 0;
        } else {
            days = Math.floor(t / (1000 * 60 * 60 * 24));
            hours = Math.floor(t / (1000 * 60 * 60) % 60) - 3;
            minutes = Math.floor(t / (1000 * 60) % 60);
            seconds = Math.floor((t / 1000) % 60);
        }
        return {
            total: t,
            days: days,
            hours: hours,
            minutes: minutes,
            seconds: seconds
        };
    }
    function getZero(num) {
        if (num >= 0 && num < 10) {
            return `0${num}`;
        }
        else return num;
    }

    function setClock(parent, endtime) {
        let timer = document.querySelector(parent),
            days = timer.querySelector("#days"),
            hours = timer.querySelector("#hours"),
            minutes = timer.querySelector("#minutes"),
            seconds = timer.querySelector("#seconds"),
            timeInterval = setInterval(updateClock, 1000);
        updateClock();

        function updateClock() {
            let timer = getTimeRemaining(endtime);
            days.innerHTML = getZero(timer.days);
            hours.innerHTML = getZero(timer.hours);
            minutes.innerHTML = getZero(timer.minutes);
            seconds.innerHTML = getZero(timer.seconds);
            if (timer.total <= 0) {
                clearInterval(timeInterval);
            }
        }
    }
    setClock(".timer", deadline);
    // Modal 

    let modalMenu = document.querySelector(".modal");
    document.querySelectorAll("[data-modal]").forEach(modal => {
        modal.addEventListener("click", openModal);
    });

    function openModal() {
        modalMenu.classList.add("show");
        modalMenu.classList.remove("hide");
        document.body.style.overflow = "hidden";
        clearInterval(modalTimerId);
    }
    function closeModal() {
        modalMenu.classList.add("hide");
        modalMenu.classList.remove("show");
        document.body.style.overflow = "";
    }

    modalMenu.addEventListener("click", (e) => {
        if (e.target === modalMenu || e.target.getAttribute("data-close") == '') {
            closeModal();
        }
    });

    document.addEventListener("keydown", (e) => {
        if (e.code == "Escape" && modalMenu.classList.contains("show")) {
            closeModal();
        }
    });

    let modalTimerId = setTimeout(openModal, 300000);

    function showModalByScroll() {
        if (window.pageYOffset + document.documentElement.clientHeight >= document.documentElement.scrollHeight) {
            openModal();
            window.removeEventListener("scroll", showModalByScroll);
        }
    }

    window.addEventListener("scroll", showModalByScroll);

    /// Menu 

    let menuField = document.querySelector(".menu__field");
    let container = menuField.querySelector(".container");

    class ItemsMenu {
        constructor(img, name, description, price, menuClass, ...classes) {
            this.name = name;
            this.description = description;
            this.price = price;
            this.img = img;
            this.menuClass = menuClass;
            this.classes = classes;
        }

        createMenuItem() {
            let totalPrice = this.price * 30;
            let divItem = document.createElement("div");
            if (this.classes.length === 0) {
                this.classes = "menu__item";
                divItem.classList.add(this.classes);
            } else {
                this.classes.forEach(className => divItem.classList.add(className));
            }
            divItem.insertAdjacentHTML("afterbegin", `<img src=${this.img} alt=${this.menuClass}>
            <h3 class="menu__item-subtitle">${this.name}</h3>  <div class="menu__item-descr">${this.description}</div>
        <div class="menu__item-divider"></div>  <div class="menu__item-price">
        <div class="menu__item-cost">Цена: ${totalPrice}грн</div>
        <div class="menu__item-total"><span>${this.price}</span> грн/день</div>
    </div>`);

            container.append(divItem);
        }
    }

    let vegyDescr = 'Меню "Фитнес" - это новый подход к приготовлению блюд: больше свежих овощей и фруктов. Продукт активных и здоровых людей. Это абсолютно новый продукт с оптимальной ценой и высоким качеством!';
    let eliteDescr = 'В меню “Премиум” - мы используем не только красивый дизайн упаковки, но и качественное исполнение блюд. Красная рыба, морепродукты, фрукты - ресторанное меню без похода в ресторан!';
    let postDescr = 'Меню “Постное” - это тщательный подбор ингредиентов: полное отсутствие продуктов животного происхождения, молоко из миндаля, овса, кокоса или гречки, правильное количество белков за счет тофу и импортных вегетарианских стейков.';

    let vegyItem = new ItemsMenu("img/tabs/vegy.jpg", 'Меню "Фитнес"', vegyDescr, 229, "vegy").createMenuItem();
    let eliteItem = new ItemsMenu("img/tabs/elite.jpg", 'Меню “Премиум”', eliteDescr, 550, "elite").createMenuItem();
    let postItem = new ItemsMenu("img/tabs/post.jpg", 'Меню "Постное"', postDescr, 430, "post").createMenuItem();

    // post request

    let forms = document.querySelectorAll("form");

    let message = {
        loading: "img/form/spinner.svg",
        success: "Спасибо! Скоро мы с вами свяжемся",
        failure: "Что-то пошло не так..."
    };

    forms.forEach(form => {
        postData(form);
    });

    function postData(form) {
        form.addEventListener("submit", (e) => {
            e.preventDefault();
            let statusMessage = document.createElement("img");
            statusMessage.src = message.loading;
            statusMessage.style.cssText = `
            display: block;
            margin: 0 auto;
            `;
            form.insertAdjacentElement('afterend', statusMessage);
            let formData = new FormData(form);

            let obj = {};

            formData.forEach((value, key) => {
                obj[key] = value;
            });

            fetch("server.php", {
                method: "POST",
                headers: {
                    'Content-type': "application/json"
                },
                body: JSON.stringify(obj)
            })
                .then(data => data.text())
                .then(data => {
                    console.log(data);
                    showThxModal(message.success);
                    form.reset();
                    statusMessage.remove();
                }).catch(() => {
                    showThxModal(message.failure);
                }).finally(() => {
                    form.reset();
                });




        });
    }
    function showThxModal(message) {
        let prevModalDialog = document.querySelector(".modal__dialog");

        prevModalDialog.classList.add("hide");
        prevModalDialog.classList.remove("show");

        openModal();

        let thxModal = document.createElement("div");
        thxModal.classList.add("modal__dialog");
        thxModal.innerHTML =
            `<div class="modal__content">
        <div class="modal__close" data-close>x</div>
        <div class="modal__title" data-close>${message}</div>
        </div>`;
        document.querySelector(".modal").append(thxModal);
        setTimeout(() => {
            thxModal.remove();
            prevModalDialog.classList.add("show");
            prevModalDialog.classList.remove("hide");
            closeModal();
        }, 4000);
    }
});