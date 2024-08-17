
window.addEventListener('DOMContentLoaded', function(){
    gsap.registerPlugin(ScrollTrigger);

    const header = document.querySelector('#header');
    const showHeader = gsap.from(header, { 
        top: `-=${header.offsetHeight}`,
        paused: true,
        duration: .3,
        ease: 'power3.easeOut'
    }).progress(1);

    ScrollTrigger.create({
		start: 'top top',
		end: 'max',
		onUpdate: (self) => {  
            if (self.direction === -1) { 
                showHeader.play();
            } else { 
                showHeader.reverse();
            }
		}
	});

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