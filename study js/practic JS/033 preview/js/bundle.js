/******/ (() => { // webpackBootstrap
/******/ 	"use strict";
var __webpack_exports__ = {};
/*!**********************!*\
  !*** ./js/script.js ***!
  \**********************/


const btnPhone = document.querySelector('#iphone'),
    btnMacbook = document.querySelector('#macbook'),
    images = document.querySelectorAll('img');

// let phoneAnimation = images[0].animate([
//     { transform: 'translateY(0)' },
//     { transform: 'translateY(100px)' },
//     { transform: 'translateY(-100px)' },
//     { transform: 'translateY(0)' }
// ], {
//     duration: 3000,
//     iterations: Infinity
// });
let macBookAni;
btnMacbook.addEventListener("click", () => {
    if (!macBookAni) {
        macBookAni = images[1].animate([
            { height: "100%" },
            { height: "105%" },
            { height: "110%" },
            { height: "105%" },
            { height: "100%" },
            { border: "0px solid red" }
        ], {
            duration: 3000,
            iterations: Infinity
        });
    }
    else if (macBookAni.playState === 'paused') {
        macBookAni.play();
    } else {
        macBookAni.pause();
    }
});
/******/ })()
;
//# sourceMappingURL=bundle.js.map