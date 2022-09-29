import { closeModal, openModal } from './modal';
import { postData } from '../services/services';

function forms(formSelector, modalTimerId) {
    let forms = document.querySelectorAll(formSelector);

    let message = {
        loading: "img/form/spinner.svg",
        success: "Спасибо! Скоро мы с вами свяжемся",
        failure: "Что-то пошло не так..."
    };

    forms.forEach(form => {
        bindPostData(form);
    });


    function bindPostData(form) {
        form.addEventListener("submit", (e) => {
            e.preventDefault();
            let statusMessage = document.createElement("img");
            statusMessage.src = message.loading;
            statusMessage.style.cssText = `
            display: block;
            margin: 0 auto;
            `;
            form.insertAdjacentElement('afterend', statusMessage);
            let formData = new FormData(form);
            let json = JSON.stringify(Object.fromEntries(formData.entries()));

            postData("http://localhost:3000/requests", json)
                .then(data => {
                    console.log(data);
                    showThxModal(message.success);
                    form.reset();
                    statusMessage.remove();
                }).catch(() => {
                    showThxModal(message.failure);
                }).finally(() => {
                    form.reset();
                });
        });
    }
    function showThxModal(message) {
        let prevModalDialog = document.querySelector(".modal__dialog");

        prevModalDialog.classList.add("hide");
        prevModalDialog.classList.remove("show");

        openModal('.modal', modalTimerId);

        let thxModal = document.createElement("div");
        thxModal.classList.add("modal__dialog");
        thxModal.innerHTML =
            `<div class="modal__content">
        <div class="modal__close" data-close>x</div>
        <div class="modal__title" data-close>${message}</div>
        </div>`;
        document.querySelector(".modal").append(thxModal);
        setTimeout(() => {
            thxModal.remove();
            prevModalDialog.classList.add("show");
            prevModalDialog.classList.remove("hide");
            closeModal('.modal');
        }, 4000);
    }
}
export default forms;
