
window.addEventListener('DOMContentLoaded', function(){

    // 숫자를 천 단위로 쉼표를 넣어주는 함수
    function formatNumber(num) {
        return num.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ',');
    }

    function countAnimation() {
        var countBoxes = document.querySelectorAll('.count-box');

        countBoxes.forEach(function(countBox) {
            if (!countBox.classList.contains('counted')) {
                countBox.classList.add('counted');
                var countText = countBox.querySelector('.count-text');
                var stop = parseInt(countText.getAttribute('data-stop'), 10);
                var speed = parseInt(countText.getAttribute('data-speed'), 10);
                var start = parseInt(countText.innerText.replace(/,/g, ''), 10);
                var startTime = null;

                function animateCount(timestamp) {
                    if (!startTime) startTime = timestamp;
                    var progress = timestamp - startTime;
                    var currentCount = Math.min(start + (progress / speed) * (stop - start), stop);

                    countText.innerText = formatNumber(Math.floor(currentCount));

                    if (progress < speed) {
                        requestAnimationFrame(animateCount);
                    } else {
                        countText.innerText = formatNumber(stop);
                    }
                }

                requestAnimationFrame(animateCount);
            }
        });
    }

    // IntersectionObserver를 사용하여 요소가 화면에 보이는지 감지
    var observer = new IntersectionObserver(function(entries) {
        entries.forEach(function(entry) {
            if (entry.isIntersecting) {
                countAnimation();
            }
        });
    }, { threshold: 0 });

    document.querySelectorAll('.count-box').forEach(function(box) {
        observer.observe(box);
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