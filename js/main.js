
window.addEventListener('DOMContentLoaded', function(){

    var swipsec01Swiperer = new Swiper(".sec01Swiper", {
        slidesPerView: 2,
        spaceBetween: 10,
        loop: true,
        navigation: {
            nextEl: ".main-section-01 .swiper-button-next",
            prevEl: ".main-section-01 .swiper-button-prev",
        },
        breakpoints: {
            481: {
                slidesPerView: 3,
                spaceBetween: 10,
            },
            769: {
                slidesPerView: 4,
                spaceBetween: 20,
            },
            961: {
                slidesPerView: 5,
                spaceBetween: 20,
            },
        },
    });


    ///////////////////////////////////////////////////

    function initMap() {
        var location = { lat: -32.0405267, lng: 115.8850593 };
        
        var map = new google.maps.Map(document.getElementById('map'), {
            zoom: 16,
            center: location
        });
        
        // 마커 생성
        var marker = new google.maps.Marker({
            position: location,
            map: map,
        });
        
        // InfoWindow 생성 및 텍스트 설정
        var infowindow = new google.maps.InfoWindow({
            content: '<h3>WA Property Connect</h3>'
        });
        
        // 처음부터 InfoWindow를 열기
        infowindow.open(map, marker);
    }

    initMap();

    ///////////////////////////////////////////////////

})