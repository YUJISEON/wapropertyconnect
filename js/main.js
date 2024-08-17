
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

    var location = { lat: -32.03991, lng: 115.88508 };
    var map = new google.maps.Map(document.getElementById('map'), {
        center: location,
        zoom: 18
    });

    var marker = new google.maps.Marker({
        position: location,
        map: map
    });
})