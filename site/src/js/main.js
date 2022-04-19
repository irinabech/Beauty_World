import $ from "jquery";
import { Form } from "./forms/form";
import ApiService from "./services/api-service";

window.onload = function () {
    const link = document.getElementById("link");
    const menuBtn = document.getElementById("checkbox");
    const menuMob = document.querySelector(".mobile-menu__container");
    const applicantForm = document.getElementById("form");
    const extendedForm = document.getElementById("extended-form");
    const priceBtn = document.querySelectorAll(".price__navigation ul>li>a");
    const priceBox = document.querySelectorAll(".price__box");

    //Mobile menu
    menuBtn.onclick = function () {
        menuMob.classList.toggle("active");
    };
    link.onclick = function () {
        menuMob.classList.toggle("active");
    };

    //Tabs
    for (let i = 0; i < priceBtn.length; i++) {
        priceBtn[i].addEventListener("click", (e) => {
            const tabsPath = e.target.dataset.tabsPath;
            priceBtn.forEach((el) => {
                el.classList.remove("navigation_active");
            });
            document
                .querySelector(`[data-tabs-path="${tabsPath}"]`)
                .classList.add("navigation_active");
            tabsHandler(tabsPath);
        });
    }

    const tabsHandler = (path) => {
        priceBox.forEach((el) => {
            el.classList.remove("price-box_active");
        });
        document
            .querySelector(`[data-tabs-target="${path}"]`)
            .classList.add("price-box_active");
        priceBtn.forEach((btn) => {
            btn.classList.remove("navigation_active-btn");
        });
        document
            .querySelector(`[data-tabs-path="${path}"]`)
            .classList.add("navigation_active-btn");
    };

    tabsHandler("Styling"); // Default state

    //Form
    function success(form) {
        const div = document.createElement("div");
        div.className = "alert";
        div.innerHTML =
            "Ваша заявка отправлена! В ближайшее время с вами свяжется менеджер.";
        form.append(div);
    }

    async function handleFormSubmit(event) {
        event.preventDefault();
        const name = applicantForm.querySelector('[name="name"]');
        const phone = applicantForm.querySelector('[name="phone"]');
        if (!name.checkValidity() || !phone.checkValidity()) {
            return 0;
        }
        const formData = serializeForm(applicantForm);
        const response = await ApiService.createOrder(formData);

        if (response.ok) {
            success(applicantForm);
            setTimeout(function () {
                applicantForm.reset();
                applicantForm.getElementsByClassName("alert")[0].remove();
            }, 3000);
        }
    }

    //Extended Form
    async function getFormValue(event) {
        event.preventDefault();
        const name = extendedForm.querySelector('[name="name"]');
        const phone = extendedForm.querySelector('[name="phone"]');
        if (!name.checkValidity() || !phone.checkValidity()) {
            return 0;
        }
        const formData = serializeForm(extendedForm);

        function toggleLoader() {
            const loader = document.getElementById("loader");
            loader.classList.toggle("loader_hidden");
        }

        toggleLoader();
        const response = await ApiService.createOrder(formData);
        toggleLoader();

        if (response.ok) {
            success(extendedForm);
            setTimeout(function () {
                extendedForm
                    .getElementsByClassName("fancybox-button")[0]
                    .click();
                extendedForm.reset();
                extendedForm.getElementsByClassName("alert")[0].remove();
            }, 3000);
        }
    }

    function serializeForm(formNode) {
        const { elements } = formNode;
        const data = {};
        const data_raw = Array.from(elements)
            .filter((item) => !!item.name)
            .map((element) => {
                const { name, value } = element;

                return { name, value };
            });
        data_raw.forEach(function (el) {
            data[el["name"]] = el["value"];
        });

        return data;
    }

    function createValidator(form) {
        $(function () {
            $(form).validate({
                rules: {
                    name: {
                        required: true,
                        minlength: 2,
                    },
                },
                messages: {
                    name: {
                        required: "&laquo; Имя c обязательно к заполнению",
                        minlength:
                            "&laquo; Имя &laquo; должно содержать не менее 2-х символов",
                    },
                    phone: {
                        required:
                            "&laquo Телефон &raquo; обязателен к заполнению",
                    },
                },
            });
        });
    }

    extendedForm.addEventListener("submit", getFormValue);
    applicantForm.addEventListener("submit", handleFormSubmit);

    createValidator("#form");
    $(document).ready(function () {
        $(mask).inputmask({ mask: "+7 (999) 999-99-99" });
    });

    createValidator("#extended-form");
    $(document).ready(function () {
        $(extendedMask).inputmask({ mask: "+7 (999) 999-99-99" });
    });

    //Slider
    function init() {
        $(".portfolio__box").slick({
            slidesToShow: 4,
            prevArrow: ".portfolio__btn_back",
            nextArrow: ".portfolio__btn__next",
        });

        new Form();
    }

    $(document).ready(init);
};
