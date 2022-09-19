function modal() {
    let modalMenu = document.querySelector(".modal");
    document.querySelectorAll("[data-modal]").forEach(modal => {
        modal.addEventListener("click", openModal);
    });

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

    modalMenu.addEventListener("click", (e) => {
        if (e.target === modalMenu || e.target.getAttribute("data-close") == '') {
            closeModal();
        }
    });

    document.addEventListener("keydown", (e) => {
        if (e.code == "Escape" && modalMenu.classList.contains("show")) {
            closeModal();
        }
    });

    let modalTimerId = setTimeout(openModal, 300000);

    function showModalByScroll() {
        if (window.pageYOffset + document.documentElement.clientHeight >= document.documentElement.scrollHeight) {
            openModal();
            window.removeEventListener("scroll", showModalByScroll);
        }
    }

    window.addEventListener("scroll", showModalByScroll);
}
module.exports = modal;