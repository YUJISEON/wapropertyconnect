
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

})