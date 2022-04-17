import $ from "jquery";
import { Form } from "./forms/form";

window.onload = function () {
    const link = document.getElementById("link");
    const menuBtn = document.getElementById("checkbox");
    const menuMob = document.querySelector(".mobile-menu__container");
    const form = document.getElementById("form");
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
};
