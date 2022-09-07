window.addEventListener("load", () => {
    // Tabs 
    let itemsParent = document.querySelector(".tabheader__items"),
        item = document.querySelectorAll(".tabheader__item"),
        tabs = document.querySelectorAll(".tabcontent");

    function hideTabsContent() {
        tabs.forEach(tab => {
            tab.classList.add("hide");
            tab.classList.remove("show", "fade");
        });
        item.forEach(item => {
            item.classList.remove("tabheader__item_active");
        });
    }
    function showTabsContent(i = 0) {
        item[i].classList.add("tabheader__item_active");
        tabs[i].classList.remove("hide");
        tabs[i].classList.add("show", "fade");
    }
    hideTabsContent();
    showTabsContent();

    itemsParent.addEventListener("click", (e) => {
        let target = e.target;
        if (target && target.classList.contains("tabheader__item")) {
            item.forEach((item, i) => {
                if (item == target) {
                    hideTabsContent();
                    showTabsContent(i);
                }
            });
        }
    });
    // Timer 

    let deadline = "2022-09-07";

    function getTimeRemaining(endtime) {
        let days, hours,
            minutes, seconds;
        let t = Date.parse(endtime) - Date.parse(new Date());
        if (t <= 0) {
            days = 0;
            hours = 0;
            minutes = 0;
            seconds = 0;
        } else {
            days = Math.floor(t / (1000 * 60 * 60 * 24));
            hours = Math.floor(t / (1000 * 60 * 60) % 60) - 3;
            minutes = Math.floor(t / (1000 * 60) % 60);
            seconds = Math.floor((t / 1000) % 60);
        }
        return {
            total: t,
            days: days,
            hours: hours,
            minutes: minutes,
            seconds: seconds
        };
    }
    function getZero(num) {
        if (num >= 0 && num < 10) {
            return `0${num}`;
        }
        else return num;
    }

    function setClock(parent, endtime) {
        let timer = document.querySelector(parent),
            days = timer.querySelector("#days"),
            hours = timer.querySelector("#hours"),
            minutes = timer.querySelector("#minutes"),
            seconds = timer.querySelector("#seconds"),
            timeInterval = setInterval(updateClock, 1000);
        updateClock();

        function updateClock() {
            let timer = getTimeRemaining(endtime);
            days.innerHTML = getZero(timer.days);
            hours.innerHTML = getZero(timer.hours);
            minutes.innerHTML = getZero(timer.minutes);
            seconds.innerHTML = getZero(timer.seconds);
            if (timer.total <= 0) {
                clearInterval(timeInterval);
            }
        }
    }
    setClock(".timer", deadline);
    // Modal 

    function openModal() {
        modalMenu.classList.add("show");
        modalMenu.classList.remove("hide");
        document.body.style.overflow = "hidden";
        clearInterval(modalTimerId);
    }
    function closeModal() {
        modalMenu.classList.add("hide");
        modalMenu.classList.remove("show");
        document.body.style.overflow = "";
    }



    let modalMenu = document.querySelector(".modal");
    document.querySelectorAll("[data-modal]").forEach(modal => {
        modal.addEventListener("click", openModal);
    });
    document.querySelector("[data-close]").addEventListener("click", () => {
        // modalMenu.style.display = "none";
        closeModal();

    });
    modalMenu.addEventListener("click", (e) => {
        if (e.target === modalMenu) {
            closeModal();
        }
    });

    document.addEventListener("keydown", (e) => {
        if (e.code == "Escape" && modalMenu.classList.contains("show")) {
            closeModal();
        }
    });

    let modalTimerId = setTimeout(openModal, 3000);

    function showModalByScroll() {
        if (window.pageYOffset + document.documentElement.clientHeight >= document.documentElement.scrollHeight - 1) {
            openModal();
            window.removeEventListener("scroll", showModalByScroll);
        }
    }

    window.addEventListener("scroll", showModalByScroll);
});