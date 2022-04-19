import $ from "jquery";
import { Form } from "./forms/form";
import ApiService from "./services/api-service";

window.onload = function () {
    const link = document.getElementById("link");
    const menuBtn = document.getElementById("checkbox");
    const menuMob = document.querySelector(".mobile-menu__container");
    const form = document.getElementById("form");
    const extendedForm = document.getElementById("extended-form");
    const priceBtn = document.querySelectorAll(".price__navigation ul>li>a");
    const priceBox = document.querySelectorAll(".price__box");

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

    //Mobile menu
    menuBtn.onclick = function () {
        menuMob.classList.toggle("active");
    };
    link.onclick = function () {
        menuMob.classList.toggle("active");
    };

    //Form data
    form.addEventListener("submit", formData);

    function formData(event) {
        event.preventDefault();
        const userName = form.querySelector('[name="name"]');
        const phone = form.querySelector('[name="phone"]');
        const userData = {
            name: userName.value,
            phone: phone.value,
        };

        console.log(userData);
    }

    $(function () {
        $("#extended-form").validate({
            rules: {
                name: {
                    required: true,
                    minlength: 2,
                },
            },
            messages: {
                name: {
                    required: "'Имя' обязательно к заполнению",
                    minlength: "'Имя' должно содержать не менее 2-х символов",
                },
                phone: {
                    required: "'Телефон' обязателен к заполнению",
                },
            },
        });
    });

    $(document).ready(function () {
        $(mask).inputmask({ mask: "+7 (999) 999-99-99" });
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

    //Extended Form
    extendedForm.addEventListener("submit", getFormValue);

    async function getFormValue(event) {
        event.preventDefault();
        const name = extendedForm.querySelector('[name="name"]');
        const phone = extendedForm.querySelector('[name="phone"]');
        const masterId = extendedForm.querySelector('[name="masterId"]');
        const serviceId = extendedForm.querySelector('[name="serviceId"]');
        const visitDate = extendedForm.querySelector('[name="visitDate"]');
        const formData = {
            name: name.value,
            phone: phone.value,
            masterId: Number(masterId.value),
            serviceId: Number(serviceId.value),
            visitDate: visitDate.value,
        };

        function toggleLoader() {
            const loader = document.getElementById("loader");
            loader.classList.toggle("hidden");
        }

        toggleLoader();
        const response = await ApiService.createOrder(formData);
        toggleLoader();

        function success(formData) {
            const div = document.createElement("div");
            div.className = "alert";
            div.innerHTML =
                "Ваша заявка отправлена! В ближайшее время с вами свяжется менеджер.";
            extendedForm.append(div);
        }

        if (response.ok) {
            success();
        }

        setTimeout(function () {
            extendedForm.style.display = "none";
        }, 3000);
    }
};
