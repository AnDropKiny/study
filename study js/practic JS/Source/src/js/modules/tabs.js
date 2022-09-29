const tabs = (tabSelector, contentSelector, activeClass, display = "block") => {
    const tabs = document.querySelectorAll(tabSelector),
        content = document.querySelectorAll(contentSelector);

    function hideTabsContent() {
        tabs.forEach(tab => {
            // tab.classList.remove(activeClass);

            tab.lastElementChild.classList.remove(activeClass);
            tab.classList.remove(activeClass);
        });
        content.forEach(item => {
            item.style.display = "none";
        });
    }
    function showTabsContent(i = 1) {
        tabs[i].lastElementChild.classList.add(activeClass);
        tabs[i].classList.add(activeClass);
        content[i].style.display = display;
    }
    ////
    hideTabsContent();
    showTabsContent();
    tabs.forEach((tab, i) => {
        tab.addEventListener("click", (e) => {
            hideTabsContent();
            if (e.target !== tab.parentNode) {
                showTabsContent(i);

            }

        });

    });




};
export default tabs;