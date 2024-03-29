function openModal(modalSelector, modalTimerId) {
    const modal = document.querySelector(modalSelector);
    modal.classList.add("show");
    modal.classList.remove("hide");

    document.body.style.overflow = "hidden";
    if (modalTimerId) {
        clearInterval(modalTimerId);
    }
}
function closeModal(modalSelector) {
    const modal = document.querySelector(modalSelector);
    modal.classList.add("hide");
    modal.classList.remove("show");
    document.body.style.overflow = "";
}
function modal(modalSelector, triggerSelector, modalTimerId) {
    let modalMenu = document.querySelector(modalSelector);
    document.querySelectorAll(triggerSelector).forEach(modal => {
        modal.addEventListener("click", () => openModal(modalSelector, modalTimerId));
    });



    modalMenu.addEventListener("click", (e) => {
        if (e.target === modalMenu || e.target.getAttribute("data-close") == '') {
            closeModal(modalSelector);
        }
    });

    document.addEventListener("keydown", (e) => {
        if (e.code == "Escape" && modalMenu.classList.contains("show")) {
            closeModal(modalSelector);
        }
    });



    function showModalByScroll() {
        if (window.pageYOffset + document.documentElement.clientHeight >= document.documentElement.scrollHeight) {
            openModal(modalSelector, modalTimerId);
            window.removeEventListener("scroll", showModalByScroll);
        }
    }

    window.addEventListener("scroll", showModalByScroll);
}
export default modal;
export { closeModal, openModal };