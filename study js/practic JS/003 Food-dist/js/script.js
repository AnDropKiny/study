require('es6-promise').polyfill();
import 'nodelist-foreach-polyfill';

import calc from './modules/calc';
import forms from './modules/forms';
import menuCards from './modules/menuCards';
import modal from './modules/modal';
import slider from './modules/slider';
import tabs from './modules/tabs';
import timer from './modules/timer';
import openModal from './modules/modal';

window.addEventListener("load", () => {
    let modalTimerId = setTimeout(() => openModal('.modal', modalTimerId), 300000);
    calc();
    forms("form", modalTimerId);
    menuCards();
    modal('.modal', '[data-modal]', modalTimerId);
    slider({
        container: ".offer__slider",
        slide: ".offer__slide",
        prevArrow: ".offer__slider-prev",
        nextArrow: ".offer__slider-next",
        currentCounter: "#current",
        totalCounter: "#total",
        wrapper: ".offer__slider-wrapper",
        field: ".offer__slider-inner"
    });
    tabs(".tabheader__items", ".tabheader__item", ".tabcontent", "tabheader__item_active");
    timer('.timer', '2022-09-30');
});