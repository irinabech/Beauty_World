window.onload = function () {
    const link = document.getElementById("link");
    const menuBtn = document.getElementById("checkbox");
    const menuMob = document.querySelector(".mobile-menu__container");

    menuBtn.onclick = function () {
        menuMob.classList.toggle("active");
    };

    link.onclick = function () {
        menuMob.classList.toggle("active");
    };
};

$(document).ready(function () {
    $(".portfolio__box").slick({
        slidesToShow: 4,
        prevArrow: ".portfolio__btn_back",
        nextArrow: ".portfolio__btn__next",
    });
});
