"use strict";

let inputUSD = document.querySelector("#usd"),
    inputUAH = document.querySelector("#uah");

inputUAH.addEventListener("input", () => {
    let request = new XMLHttpRequest();
    request.open("GET", "js/current.json");
    request.setRequestHeader('Content-type', "application/json; charset=utf-8");
    request.send();

    request.addEventListener("load", () => {
        if (request.status === 200) {
            let response = JSON.parse(request.response);

            inputUSD.value = (+inputUAH.value / response.current.usd).toFixed(2);
        }
        else {
            inputUSD.value = "Что-то пошло не так";
            inputUSD.style.border = "1px solid red";
        }
    });
});
inputUSD.addEventListener("input", () => {
    let request = new XMLHttpRequest();
    request.open("GET", "js/current.json");
    request.setRequestHeader('Content-type', "application/json; charset=utf-8");
    request.send();

    request.addEventListener("load", () => {
        if (request.status === 200) {
            let response = JSON.parse(request.response);

            inputUAH.value = (+inputUSD.value * response.current.usd).toFixed(2);
        }
        else {
            inputUAH.value = "Что-то пошло не так";
            inputUAH.style.border = "1px solid red";
        }
    });
});

