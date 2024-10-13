window.addEventListener("DOMContentLoaded", function(){ 
    var guideSwiper = new Swiper(".guideSwiper", {
        slidesPerView: 1,
        spaceBetween: 0,
        effect: "coverflow",
        grabCursor: true,
        centeredSlides: true,
        coverflowEffect: {
            rotate: 0,
            depth: 150,
            stretch: 0,
            modifier: 1,
            slideShadows: false
        },
        loop: true,
        navigation: {
            nextEl: ".swiper-button-next",
            prevEl: ".swiper-button-prev",
        },
        breakpoints: {
            481: {
                slidesPerView: 2,
                spaceBetween: 10,
                coverflowEffect: {
                    stretch: -20,
                },
            },
            768: {
                slidesPerView: 2,
                spaceBetween: 15,
                coverflowEffect: {
                    stretch: -50,
                },
            },
            961: {
                slidesPerView: 3,
                spaceBetween: 15,
                coverflowEffect: {
                    stretch: -70,
                },
            },
        },
    });
});