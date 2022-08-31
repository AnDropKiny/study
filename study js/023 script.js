/* Задание на урок:

1) Первую часть задания повторить по уроку

2) Создать функцию showMyDB, которая будет проверять свойство privat. Если стоит в позиции
false - выводит в консоль главный объект программы

3) Создать функцию writeYourGenres в которой пользователь будет 3 раза отвечать на вопрос 
"Ваш любимый жанр под номером ${номер по порядку}". Каждый ответ записывается в массив данных
genres

P.S. Функции вызывать не обязательно*/

'use strict';

let numberOfFilms;

function start() {
    numberOfFilms = +prompt("Сколько фильмов вы уже посмотрели?", "");

    while (numberOfFilms == "" || numberOfFilms == null || isNaN(numberOfFilms)) {
        numberOfFilms = +prompt("Сколько фильмов вы уже посмотрели?", "");
    }
}

// start();

let personalMovieDB = {
    count: numberOfFilms,
    movies: {},
    actors: {},
    genres: [],
    privat: false
};

let lastFilm,
    filmScore,
    answer;
let count = personalMovieDB.count;

function rememberMyFilms() {
    do {
        lastFilm = prompt('Один из последних просмотренных фильмов?');
        filmScore = prompt('На сколько оцените его?');

        if (!lastFilm || lastFilm.length <= 3 || lastFilm.length > 50) {
            alert("Введите название фильма корректно");
            answer = true;
        }
        else if (!filmScore) {
            alert("Оценка фильма должны быть от 1 до 10");
            answer = true;
        }
        else {
            personalMovieDB.movies[lastFilm] = filmScore;
            answer = confirm("Хотите продолжить добавлять фильмы?");
        }

    }
    while (answer);
}

// rememberMyFilms();

function detectPersonalLevel() {
    if (count < 10) {
        alert("Просмотрено довольно мало фильмов");
    }
    else if (count >= 10 && count < 30) {
        alert("Вы классический зритель");
    }
    else if (count >= 30) {
        alert("Вы киноман");
    }
    else {
        alert("Произошла ошибка");
    }
}
// detectPersonalLevel();

function showMyDB(privat) {
    if (!privat) console.log(personalMovieDB);
}

showMyDB(personalMovieDB.privat);

function writeYourGenres() {
    for (let i = 1; i <= 3; i++) {
        let genres = prompt(`Ваш любимый жанр под номером ${i}`);
        personalMovieDB.genres.push(genres);
    }
}
writeYourGenres();