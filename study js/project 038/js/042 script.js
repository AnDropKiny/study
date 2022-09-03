/* Задания на урок:

 + 1) Реализовать функционал, что после заполнения формы и нажатия кнопки "Подтвердить" - 
новый фильм добавляется в список. Страница не должна перезагружаться.
Новый фильм должен добавляться в movieDB.movies.
Для получения доступа к значению input - обращаемся к нему как input.value;
P.S. Здесь есть несколько вариантов решения задачи, принимается любой, но рабочий.

 + 2) Если название фильма больше, чем 21 символ - обрезать его и добавить три точки 

3) При клике на мусорную корзину - элемент будет удаляться из списка (сложно)

+4) Если в форме стоит галочка "Сделать любимым" - в консоль вывести сообщение: 
"Добавляем любимый фильм"

5) Фильмы должны быть отсортированы по алфавиту */

'use strict';


window.addEventListener("load", () => {
    const movieDB = {
        movies: [
            "Логан",
            "Лига справедливости",
            "Ла-ла лэнд",
            "Одержимость",
            "Скотт Пилигрим против..."
        ]
    };



    let interactiveForm = document.forms[1];
    let interactiveButton = interactiveForm.elements[2];
    let filmsList = document.querySelector(".promo__interactive-list");

    interactiveButton.addEventListener("click", (e) => {
        e.preventDefault();
        let input1 = interactiveForm.elements[0];
        let favorite = interactiveForm.elements[1].checked;
        let newFilm = input1.value;
        if (input1.value) {
            if (input1.value.length > 21) {
                newFilm = input1.value.slice(0, 21);
                newFilm += '...';
            }
            if (favorite) {
                console.log(`Добавляем любимый фильм - ${newFilm}`);
            }
            movieDB.movies.push(newFilm);
            movieDB.movies.sort();
            createMovieList(movieDB.movies, filmsList);
        }
        else {
            input1.style.border = "1px solid red";
            input1.placeholder = "Вы не ввели название фильма";
        }
    });
    function makeChanges() {
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
    }
    function createMovieList(films, parent) {
        parent.innerHTML = "";
        movieDB.movies.sort();
        films.forEach((film, i) => {
            filmsList.insertAdjacentHTML("beforeend", ` <li class="promo__interactive-item">
            ${i + 1}. ${movieDB.movies[i]} <div class="delete"></div></li>`);
        });
        document.querySelectorAll('.delete').forEach((button, i) => {
            button.addEventListener("click", () => {
                button.parentElement.remove();
                movieDB.movies.splice(i, 1);
                createMovieList(films, parent);
            });
        });
    }
    makeChanges();
    createMovieList(movieDB.movies, filmsList);
});



