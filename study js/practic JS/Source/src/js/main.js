import './slider';
import modals from './modules/modals';
import forms from './modules/forms';
import tabs from './modules/tabs';
import timer from './modules/timer';
import changeModalState from './modules/changeModalState';
import images from './modules/images';

window.addEventListener('DOMContentLoaded', () => {

    let modalState = {};

    modals();
    changeModalState(modalState);
    forms(modalState);
    tabs(".glazing_block", ".glazing_content", "active");
    tabs(".no_click", ".decoration_content_block", "after_click");
    tabs(".balcon_icons_img", ".big_img > img", "do_image_more", "inline-block");
    timer('.container1', "2022-09-30");
    images();
});