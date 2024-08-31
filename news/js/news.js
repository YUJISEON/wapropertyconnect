window.addEventListener("DOMContentLoaded", function(){ 
    var guideSwiper = new Swiper(".guideSwiper", {
        slidesPerView: 1,
        spaceBetween: 0,
        //loop: true,
        navigation: {
            nextEl: ".swiper-button-next",
            prevEl: ".swiper-button-prev",
        },
        breakpoints: {
            481: {
                slidesPerView: 2,
                spaceBetween: 10,
            },
            768: {
                slidesPerView: 2,
                spaceBetween: 15,
            },
            961: {
                slidesPerView: 3,
                spaceBetween: 15,
            },
        },
    });
});