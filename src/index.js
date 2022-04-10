window.onload = function () {
    const link = document.getElementById("link");
    const menuBtn = document.getElementById("checkbox");
    const menuMob = document.querySelector(".mobile-menu__container");
    const form = document.getElementById("form");

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

    //Slider
    $(document).ready(function () {
        $(".portfolio__box").slick({
            slidesToShow: 4,
            prevArrow: ".portfolio__btn_back",
            nextArrow: ".portfolio__btn__next",
        });
    });
};
