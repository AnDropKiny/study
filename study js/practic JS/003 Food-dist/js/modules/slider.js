function slider() {
    let slides = document.querySelectorAll(".offer__slide"),
        slider = document.querySelector(".offer__slider"),
        prev = document.querySelector(".offer__slider-prev"),
        next = document.querySelector(".offer__slider-next"),
        currentIndex = document.querySelector("#current"),
        total = document.querySelector("#total"),
        slidesWrapper = document.querySelector(".offer__slider-wrapper"),
        slidesInner = document.querySelector(".offer__slider-inner"),
        width = window.getComputedStyle(slidesWrapper).width;

    let sliderIndex = 1;
    let offset = 0;

    function switchSlide() {
        slidesInner.style.transform = `translateX(-${offset}px)`;

        if (slides.length < 10) {
            total.textContent = `0${slides.length}`;
            currentIndex.textContent = `0${sliderIndex}`;
        }
        else {
            total.textContent = slides.length;
            currentIndex.textContent = sliderIndex;
        }
    }
    switchSlide();
    slidesInner.style.width = 100 * slides.length + "%";
    slidesInner.style.display = "flex";
    slidesInner.style.transition = '0.5s all';

    slidesWrapper.style.overflow = "hidden";


    slides.forEach(slide => {
        slide.style.width = width;
    });

    slider.style.position = "relative";

    let indicators = document.createElement("ol"),
        dots = [];
    indicators.classList.add("carousel-indicators");
    slider.append(indicators);


    for (let i = 0; i < slides.length; i++) {
        const dot = document.createElement("li");
        dot.setAttribute('data-slide-to', i + 1);
        dot.classList.add('dot');

        if (i == 0) {
            dot.style.opacity = 1;
        }
        indicators.append(dot);
        dots.push(dot);
    }
    function switchDotOpacity() {
        dots.forEach(dot => dot.style.opacity = '0.5');
        dots[sliderIndex - 1].style.opacity = 1;
    }

    next.addEventListener("click", () => {
        if (offset == +width.replace(/\D/g, '') * (slides.length - 1)) {
            offset = 0;
        } else {
            offset += +width.replace(/\D/g, '');
        }

        if (sliderIndex == slides.length) {
            sliderIndex = 1;
        } else {
            sliderIndex++;
        }
        switchSlide();
        switchDotOpacity();
    });
    prev.addEventListener("click", () => {
        if (offset == 0) {
            offset = +width.replace(/\D/g, '') * (slides.length - 1);
        } else {
            offset -= +width.replace(/\D/g, '');
        }

        if (sliderIndex == 1) {
            sliderIndex = slides.length;
        } else {
            sliderIndex--;
        }
        switchSlide();
        switchDotOpacity();
    });

    dots.forEach(dot => {
        dot.addEventListener("click", (e) => {
            const slideTo = e.target.getAttribute("data-slide-to");
            sliderIndex = slideTo;
            offset = +width.replace(/\D/g, '') * (slideTo - 1);

            switchSlide();
            switchDotOpacity();
        });
    });
}
module.exports = slider;