const images = () => {
    const imageBox = document.createElement("div"),
        bigImage = document.createElement("img"),
        workStation = document.querySelector(".works");

    imageBox.classList.add('popup');
    workStation.appendChild(imageBox);
    imageBox.appendChild(bigImage);

    imageBox.style.justifyContent = "center";
    imageBox.style.alignItems = "center";
    imageBox.style.display = "none";

    workStation.addEventListener("click", (e) => {
        e.preventDefault();
        const target = e.target;

        if (target && target.classList.contains('preview')) {
            const path = target.parentNode.getAttribute('href');
            bigImage.setAttribute('src', path);
            imageBox.style.display = "flex";
            document.body.style.overflow = "hidden";

        }
        if (target && target.matches("div.popup")) {
            imageBox.style.display = "none";
            document.body.style.overflow = "";
        }
    });


};

export default images;
