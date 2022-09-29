function tabs(tabItemsSelector, itemSelector, tabContentSelector, activeSelector) {
    let itemsParent = document.querySelector(tabItemsSelector),
        item = document.querySelectorAll(itemSelector),
        tabs = document.querySelectorAll(tabContentSelector);

    function hideTabsContent() {
        tabs.forEach(tab => {
            tab.classList.add("hide");
            tab.classList.remove("show", "fade");
        });
        item.forEach(item => {
            item.classList.remove(activeSelector);
        });
    }
    function showTabsContent(i = 0) {
        item[i].classList.add(activeSelector);
        tabs[i].classList.remove("hide");
        tabs[i].classList.add("show", "fade");
    }
    hideTabsContent();
    showTabsContent();

    itemsParent.addEventListener("click", (e) => {
        let target = e.target;
        if (target && target.classList.contains(itemSelector.slice(1))) {
            item.forEach((item, i) => {
                if (item == target) {
                    hideTabsContent();
                    showTabsContent(i);
                }
            });
        }
    });
}
export default tabs;