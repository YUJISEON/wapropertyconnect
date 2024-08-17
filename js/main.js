
window.addEventListener('DOMContentLoaded', function(){
    gsap.registerPlugin(ScrollTrigger);

    const mainVisual = document.querySelector('.main-visual')
    const mainBg = document.querySelector('.parallax-bg')

    gsap.to(mainBg, {        
        scrollTrigger: {
            trigger: mainVisual,
            start: "top top", 
            end: "bottom top", 
            scrub: 1,
            //markers : true
        },
        yPercent: -20, 
        ease : "none",
    });


    ///////////////////////////////////////////////////

    function initReview() {
        const placeId = 'ChIJybE15Y-lMioRBbOCaWFGAYE';
        const service = new google.maps.places.PlacesService(document.createElement('div'));

        service.getDetails({ placeId: placeId }, (place, status) => {
            if (status === google.maps.places.PlacesServiceStatus.OK) {
                const reviews = place.reviews;
                const reviewContainer = document.getElementById('riview');
                let reviewElement = '';

                reviews.forEach(review => {                    
                    const reviewDate = formatDate(review.time);

                    reviewElement += `
                        <div class="swiper-slide">
                            <div class="review-box">
                                <div class="text t-rw rw-3">${review.text}</div>
                                <p><span class="name">${review.author_name}</span><span class="time">${reviewDate}</span></p>
                            </div>
                        </div>
                    `;
                    
                });

                reviewContainer.innerHTML = reviewElement;

                const reviewSwiper = new Swiper(".reviewSwiper", {
                    slidesPerView: 4,
                    spaceBetween: 20,
                    loop: true,
                    pagination: {
                        el: ".swiper-pagination",
                        clickable: true,
                    },
                    // navigation: {
                    //     nextEl: ".swiper-button-next",
                    //     prevEl: ".swiper-button-prev",
                    // },
                });
            } else {
                console.error('Error fetching reviews:', status);
            }
        });

        function formatDate(timestamp) {
            const options = { day: '2-digit', month: 'short', year: 'numeric' };
            const date = new Date(timestamp * 1000);
            return date.toLocaleDateString('en-GB', options);
        }
    }

    initReview();

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

    const contactForm = document.getElementById('contactForm');

    contactForm.addEventListener('submit', function(event) {
        event.preventDefault(); // prevent reload
    
        var formData = new FormData(this);
        formData.append('service_id', 'service_ez7fo8u');
        formData.append('template_id', 'template_v0a1gia');
        formData.append('user_id', 'Uwlpc8XZC0VSGFsVJ');
    
        var xhr = new XMLHttpRequest();
        xhr.open('POST', 'https://api.emailjs.com/api/v1.0/email/send-form', true);
        xhr.onload = function() {
            if (xhr.status >= 200 && xhr.status < 300) {
                alert('Your mail is sent!');
            } else {
                alert('Oops... ' + xhr.responseText);
            }
        };
        xhr.onerror = function() {
            alert('Oops... Something went wrong.');
        };
        xhr.send(formData);
    });
})