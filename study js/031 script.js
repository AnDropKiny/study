/* Задание на урок:

1) У нас уже есть рабочее приложение, состоящее из отдельных функций. Представьте, что
перед вами стоит задача переписать его так, чтобы все функции стали методами объекта personalMovieDB
Такое случается в реальных продуктах при смене технологий или подхода к архитектуре программы

2) Создать метод toggleVisibleMyDB, который при вызове будет проверять свойство privat. Если оно false - он
переключает его в true, если true - переключает в false. Протестировать вместе с showMyDB.

3) В методе writeYourGenres запретить пользователю нажать кнопку "отмена" или оставлять пустую строку. 
Если он это сделал - возвращать его к этому же вопросу. После того, как все жанры введены - 
при помощи метода forEach вывести в консоль сообщения в таком виде:
"Любимый жанр #(номер по порядку, начиная с 1) - это (название из массива)"*/

'use strict';

let lastFilm,
    filmScore,
    answer;


let personalMovieDB = {
    count: 0,
    movies: {},
    actors: {},
    genres: [],
    privat: false,
    start: function () {
        let numberOfFilms = +prompt("Сколько фильмов вы уже посмотрели?", "");

        while (numberOfFilms == "" || numberOfFilms == null || isNaN(numberOfFilms)) {
            numberOfFilms = +prompt("Сколько фильмов вы уже посмотрели?", "");
        }
        personalMovieDB.count = numberOfFilms;
        console.log(personalMovieDB);
    },
    rememberMyFilms: function () {
        do {
            lastFilm = prompt('Один из последних просмотренных фильмов?').trim();
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
    },
    detectPersonalLevel: function () {
        let count = personalMovieDB.count;
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
    },
    writeYourGenres: function () {
        for (let i = 1; i <= 3; i++) {
            let genresInput = prompt(`Ваш любимый жанр под номером ${i}`);
            if (!genresInput) i--;
            personalMovieDB.genres.push(genresInput);
        }
        personalMovieDB.genres.forEach((element, i) => {
            console.log(`Любимый жанр #${i + 1} - это ${element}`);
        });
    }
};



function showMyDB(privat) {
    if (!privat) console.log(personalMovieDB);
    else console.log(personalMovieDB.privat);
}

showMyDB(personalMovieDB.privat);

function toggleVisibleMyDB() {
    if (!personalMovieDB.privat) {
        personalMovieDB.privat = true;
        console.log(personalMovieDB);
    }
    else personalMovieDB.privat = false;
}
toggleVisibleMyDB(personalMovieDB.privat);
