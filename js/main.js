
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

    // API Key와 Place ID를 정의합니다.
    const apiKey = 'AIzaSyCZqcKMWUf1MtqkSPT1E__Fsh_r8nabwEU';
    const placeId = 'ChIJ5xgH6zux2DsRk4_4AQxupYg'; // 예시 Place ID

    // API 요청을 통해 리뷰 데이터를 가져옵니다.
    fetch(`https://maps.googleapis.com/maps/api/place/details/json?place_id=${placeId}&key=${apiKey}`)
    .then(response => response.json())
    .then(data => {
        const reviews = data.result.reviews;
        
        // 가져온 리뷰를 화면에 출력합니다.
        reviews.forEach(review => {
        console.log(`Author: ${review.author_name}`);
        console.log(`Rating: ${review.rating}`);
        console.log(`Review: ${review.text}`);
        console.log('------');
        });
    })
    .catch(error => console.error('Error fetching reviews:', error));


    const reviewContainer = document.getElementById('reviews');

    reviews.forEach(review => {
        const reviewElement = document.createElement('div');
        reviewElement.innerHTML = `
            <h4>${review.author_name} - ${review.rating}★</h4>
            <p>${review.text}</p>
        `;
        reviewContainer.appendChild(reviewElement);
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