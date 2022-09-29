import checkNumInputs from "./checkNumInputs";

function forms(state) {
    const forms = document.querySelectorAll('.form');

    let message = {
        // loading: "../assets/img/form/spinner.svg",
        loading: "Идёт Отправка",
        success: "Спасибо! Скоро мы с вами свяжемся",
        failure: "Что-то пошло не так..."
    };

    forms.forEach(form => {
        bindPostData(form);
    });

    checkNumInputs('input[name="user_phone"]');



    function bindPostData(form) {
        form.addEventListener("submit", (e) => {
            e.preventDefault();

            let statusMessage = document.createElement("div");
            statusMessage.classList.add("status");
            form.appendChild(statusMessage);

            let formData = new FormData(form);
            if (form.getAttribute('data-calc') === "end") {
                for (let key in state) {
                    formData.append(key, state[key]);
                }
            }

            let json = JSON.stringify(Object.fromEntries(formData.entries()));

            let postData = async (url, data) => {
                statusMessage.textContent = message.loading;
                let res = await fetch(url, {
                    method: "POST",
                    headers: {
                        'Content-type': "application/json"
                    },
                    body: data
                });
                return await res.json();
            };

            postData("http://localhost:3000/requests", json)
                .then(data => {
                    console.log(data);
                    statusMessage.textContent = message.success;

                }).catch(() => {
                    statusMessage.textContent = message.failure;
                }).finally(() => {
                    setTimeout(() => {
                        statusMessage.remove();
                    }, 4000);
                    form.reset();
                });
        });
    }
}
export default forms;