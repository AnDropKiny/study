function calc() {
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
}

export default calc;
