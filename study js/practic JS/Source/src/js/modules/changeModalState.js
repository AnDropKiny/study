import checkNumInputs from "./checkNumInputs";
const changeModalState = (state) => {
    const windowForm = document.querySelectorAll(".balcon_icons_img"),
        windowHeight = document.querySelectorAll("#height"),
        windowWidth = document.querySelectorAll("#width"),
        windowType = document.querySelectorAll("#view_type"),
        windowProfile = document.querySelectorAll(".checkbox");

    checkNumInputs("#height");
    checkNumInputs("#width");

    function bindActionToElems(event, elem, prop) {
        elem.forEach((item, i) => {
            item.addEventListener(event, () => {
                switch (item.nodeName) {
                    case "SPAN":
                        state[prop] = i;
                        break;
                    case "INPUT":
                        if (item.getAttribute('type') === 'checkbox') {
                            i === 0 ? state[prop] = "Холодное" : state[prop] = "Теплое";
                            elem.forEach((box, k) => {
                                box.checked = false;
                                if (i === k) {
                                    box.checked = true;
                                }
                            });
                        }
                        else {
                            state[prop] = item.value;
                        }
                        break;
                    case "SELECT":
                        state[prop] = item.value;
                        break;
                }
                console.log(state);
            });

        });
    }
    bindActionToElems("click", windowForm, "form");
    bindActionToElems("input", windowHeight, "Height");
    bindActionToElems("input", windowWidth, "Width");
    bindActionToElems("change", windowType, "Type");
    bindActionToElems("change", windowProfile, "Profile");

};
export default changeModalState;
