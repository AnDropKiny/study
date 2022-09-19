function tabs() {
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
}
module.exports = tabs;