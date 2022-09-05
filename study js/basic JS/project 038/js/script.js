/* Задания на урок:

1) Удалить все рекламные блоки со страницы (правая часть сайта)

2) Изменить жанр фильма, поменять "комедия" на "драма"

3) Изменить задний фон постера с фильмом на изображение "bg.jpg". Оно лежит в папке img.
Реализовать только при помощи JS

4) Список фильмов на странице сформировать на основании данных из этого JS файла.
Отсортировать их по алфавиту 

5) Добавить нумерацию выведенных фильмов */

'use strict';

const movieDB = {
    movies: [
        "Логан",
        "Лига справедливости",
        "Ла-ла лэнд",
        "Одержимость",
        "Скотт Пилигрим против..."
    ]
};

let advBlock = document.querySelector(".promo__adv");
document.querySelector(".promo__genre").textContent = "Драма";
let genreBg = document.querySelector(".promo__bg");
genreBg.style.backgroundImage = 'url("img/bg.jpg")';

let advButton = document.createElement("button");
advButton.innerHTML = "Убрать рекламу";
advBlock.append(advButton);

advButton.addEventListener("click", () => {
    let adv = document.querySelectorAll(".promo__adv img");
    let advText = document.querySelector(".promo__adv-title");
    advText.innerHTML = "Здесь может быть ваша реклама";

    adv.forEach(img => {
        img.style.display = "none";
    });
});

let promoInter = document.querySelector(".promo__interactive div");
let promoButton = document.createElement("button");
promoButton.innerHTML = "Отсортировать список";
promoInter.append(promoButton);

promoButton.addEventListener("click", () => {
    movieDB.movies.sort();
    let i = 0;
    document.querySelectorAll(".promo__interactive-item").forEach(item => {
        item.textContent = `${i + 1}. ${movieDB.movies[i]}`;
        i++;
    });

});