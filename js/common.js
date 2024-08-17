
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
                header.classList.add('fixed');
            } else { 
                showHeader.reverse();
                header.classList.remove('fixed');
            }
		}
	});

})