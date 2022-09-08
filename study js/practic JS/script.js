"use strict";
let btns = document.querySelectorAll("button");


let obh = {
    a: 5,
    b: 10,
    funk: function () {
        let a = function (c) {
            console.log(this.c);
        };
        a(5);
    }
};
obh.funk();
