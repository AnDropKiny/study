window.addEventListener("load", () => {
    const calc = require('./modules/calc'),
        forms = require('./modules/forms'),
        menuCards = require('./modules/menuCards'),
        modal = require('./modules/modal'),
        slider = require('./modules/slider'),
        tabs = require('./modules/tabs'),
        timer = require('./modules/timer');

    calc();
    forms();
    menuCards();
    modal();
    slider();
    tabs();
    timer();
});