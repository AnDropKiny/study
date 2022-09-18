"use strict";

let inputUSD = document.querySelector("#usd"),
    inputUAH = document.querySelector("#uah");

inputUAH.addEventListener("input", () => {
    fetch("js/current.json", {
        method: "GET",
        headers: {
            'Content-type': "application/json"
        }
    })
        .then(item => item.json())
        .then(item => inputUSD.value = (+inputUAH.value / item.current.usd).toFixed(2))
        .catch(item => {
            inputUSD.value = "Что-то пошло не так";
            inputUSD.style.border = "1px solid red";
        });
});
inputUSD.addEventListener("input", () => {
    fetch("js/current.json", {
        method: "GET",
        headers: {
            'Content-type': "application/json"
        }
    })
        .then(item => item.json())
        .then(item => inputUAH.value = (+inputUSD.value * item.current.usd).toFixed(2))
        .catch(item => {
            inputUAH.value = "Что-то пошло не так";
            inputUAH.style.border = "1px solid red";
        });

});