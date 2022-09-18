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

    let deadline = "2022-09-20";

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
        else { return num; }
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
    // post request

    let forms = document.querySelectorAll("form");

    let message = {
        loading: "img/form/spinner.svg",
        success: "Спасибо! Скоро мы с вами свяжемся",
        failure: "Что-то пошло не так..."
    };

    forms.forEach(form => {
        bindPostData(form);
    });

    let postData = async (url, data) => {
        let res = await fetch(url, {
            method: "POST",
            headers: {
                'Content-type': "application/json"
            },
            body: data
        });
        return await res.json();
    };

    function bindPostData(form) {
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
            let json = JSON.stringify(Object.fromEntries(formData.entries()));

            postData("http://localhost:3000/requests", json)
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

    // slider 
    let slides = document.querySelectorAll(".offer__slide"),
        slider = document.querySelector(".offer__slider"),
        prev = document.querySelector(".offer__slider-prev"),
        next = document.querySelector(".offer__slider-next"),
        currentIndex = document.querySelector("#current"),
        total = document.querySelector("#total"),
        slidesWrapper = document.querySelector(".offer__slider-wrapper"),
        slidesInner = document.querySelector(".offer__slider-inner"),
        width = window.getComputedStyle(slidesWrapper).width;

    let sliderIndex = 1;
    let offset = 0;

    function switchSlide() {
        slidesInner.style.transform = `translateX(-${offset}px)`;

        if (slides.length < 10) {
            total.textContent = `0${slides.length}`;
            currentIndex.textContent = `0${sliderIndex}`;
        }
        else {
            total.textContent = slides.length;
            currentIndex.textContent = sliderIndex;
        }
    }
    switchSlide();
    slidesInner.style.width = 100 * slides.length + "%";
    slidesInner.style.display = "flex";
    slidesInner.style.transition = '0.5s all';

    slidesWrapper.style.overflow = "hidden";


    slides.forEach(slide => {
        slide.style.width = width;
    });

    slider.style.position = "relative";

    let indicators = document.createElement("ol"),
        dots = [];
    indicators.classList.add("carousel-indicators");
    slider.append(indicators);


    for (let i = 0; i < slides.length; i++) {
        const dot = document.createElement("li");
        dot.setAttribute('data-slide-to', i + 1);
        dot.classList.add('dot');

        if (i == 0) {
            dot.style.opacity = 1;
        }
        indicators.append(dot);
        dots.push(dot);
    }
    function switchDotOpacity() {
        dots.forEach(dot => dot.style.opacity = '0.5');
        dots[sliderIndex - 1].style.opacity = 1;
    }

    next.addEventListener("click", () => {
        if (offset == +width.replace(/\D/g, '') * (slides.length - 1)) {
            offset = 0;
        } else {
            offset += +width.replace(/\D/g, '');
        }

        if (sliderIndex == slides.length) {
            sliderIndex = 1;
        } else {
            sliderIndex++;
        }
        switchSlide();
        switchDotOpacity();
    });
    prev.addEventListener("click", () => {
        if (offset == 0) {
            offset = +width.replace(/\D/g, '') * (slides.length - 1);
        } else {
            offset -= +width.replace(/\D/g, '');
        }

        if (sliderIndex == 1) {
            sliderIndex = slides.length;
        } else {
            sliderIndex--;
        }
        switchSlide();
        switchDotOpacity();
    });

    dots.forEach(dot => {
        dot.addEventListener("click", (e) => {
            const slideTo = e.target.getAttribute("data-slide-to");
            sliderIndex = slideTo;
            offset = +width.replace(/\D/g, '') * (slideTo - 1);

            switchSlide();
            switchDotOpacity();
        });
    });

    /// Calc

    let result = document.querySelector(".calculating__result span");
    let sex, height, weight, age, ratio;

    if (localStorage.getItem("sex")) {
        sex = localStorage.getItem("sex");

    }
    else {
        sex = "female";
        localStorage.setItem('sex', 'female');
    }

    if (localStorage.getItem("ratio")) {
        ratio = localStorage.getItem("ratio");
    }
    else {
        ratio = 1.375;
        localStorage.setItem('ratio', 1.375);
    }

    function initLocalSettings(selector, classActive) {
        let elements = document.querySelectorAll(selector);

        elements.forEach(elem => {
            elem.classList.remove(classActive);
            if (elem.getAttribute('id') === localStorage.getItem("sex")) {
                elem.classList.add(classActive);
            }
            if (elem.getAttribute('data-ratio') === localStorage.getItem("ratio")) {
                elem.classList.add(classActive);
            }
        });
    }
    initLocalSettings('#gender div', 'calculating__choose-item_active');

    initLocalSettings('.calculating__choose_big div', 'calculating__choose-item_active');

    function calcTotal() {
        if (!sex || !height || !weight || !age || !ratio) {
            result.style.fontSize = "18px";
            result.style.color = "red";
            result.textContent = "Заполните значения для получения";
            return;
        }

        if (sex === "female") {
            result.textContent = Math.round((447.6 + (9.2 * weight) + (3.1 * height) - (4.3 * age)) * ratio);
            result.style.fontSize = "";
            result.style.color = "";
        }
        else {
            result.textContent = Math.round((88.36 + (13.4 * weight) + (4.8 * height) - (5.7 * age)) * ratio);
            result.style.fontSize = "";
            result.style.color = "";
        }
    }
    function getStaticInformation(parentElem, classActive) {
        let elements = document.querySelectorAll(parentElem);

        elements.forEach(elem => {
            elem.addEventListener('click', (e) => {
                elements.forEach(elem => {
                    elem.classList.remove(classActive);
                });
                if (e.target.getAttribute('data-ratio')) {
                    ratio = +e.target.getAttribute('data-ratio');
                    localStorage.setItem('ratio', +e.target.getAttribute('data-ratio'));
                }
                else {
                    sex = e.target.getAttribute('id');
                    localStorage.setItem('sex', e.target.getAttribute('id'));
                }
                e.target.classList.add(classActive);
                calcTotal();
            });
        });
    }
    getStaticInformation('#gender div', 'calculating__choose-item_active');
    getStaticInformation('.calculating__choose_big div', 'calculating__choose-item_active');

    function getDynamicInformation(parentElem) {
        let input = document.querySelector(parentElem);
        input.addEventListener("input", (e) => {

            if (input.value.match(/\D/g)) {
                input.style.border = "1px solid red";
            }
            else {
                input.style.border = "none";
            }

            switch (e.target.getAttribute('id')) {
                case 'height':
                    height = +input.value;
                    break;
                case 'weight':
                    weight = +input.value;
                    break;
                case 'age':
                    age = +input.value;
                    break;
            }
            calcTotal();
        });
    }
    getDynamicInformation('#height');
    getDynamicInformation('#weight');
    getDynamicInformation('#age');
});