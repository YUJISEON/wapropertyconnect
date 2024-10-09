$(function(){
    // Mobile Ui 
    var mobile = {
        leftOpen : function(){
            $('.gnb').stop().animate({'right':'0'}, 400,'easeInOutQuad');
        },

        leftClose : function(){
            $('.gnb').stop().animate({'right':'200%'}, 400, 'easeInOutQuad');
        },

        rightOpen : function(){
            $('.gnb').stop().animate({'left':'0'}, 400,'easeInOutQuad');
        },

        rightClose : function(){
            $('.gnb').stop().animate({'left':'200%'}, 400, 'easeInOutQuad');
        },

        slideOpen : function(){
            $('.gnb').stop().slideDown(400,'easeInOutQuad');
        },

        slideClose : function(){
            $('.gnb').stop().slideUp(400, 'easeInOutQuad');
        },

        showOpen : function(){
            $('.gnb').stop().fadeIn(0, 'easeInOutQuad');
        },

        showClose : function(){
            $('.gnb').stop().fadeOut(0, 'easeInOutQuad');
        },

        down : function(target){
            $(target).addClass('on');
            $(target).next().stop().slideDown(400,'easeInOutQuad');
            
        },

        up : function(target){
            $(target).removeClass('on');
            $(target).next().stop().slideUp(400, 'easeInOutQuad');
        },

        siblingsUp : function(target){
            $(target).parent().siblings('li').children('a').removeClass('on');
            $(target).parent().siblings('li').children('ul').stop().slideUp(400, 'easeInOutQuad');
        },

        bgOn : function(){
            $('.gnb-bg').stop().fadeIn(400);
            $('.gnb').addClass('on');
            $("body").addClass("gnb-open");
        },

        bgOff : function(){
            $('.gnb-bg').stop().fadeOut(400);
            $('.gnb').removeClass('on');
            $("body").removeClass("gnb-open");
        }
    }	

    function gnbClickOn() {
        $('.mo-menu-btn').off('click').on('click', function(){
            $('.mo-menu-btn').toggleClass('on');
            if( $(this).hasClass('on') ) {
                if( $('.gnb').hasClass('left-move') ) {
                    mobile.leftOpen();
                } else if( $('.gnb').hasClass('right-move') ) {
                    mobile.rightOpen();
                } else if( $('.gnb').hasClass('slide-move') ) {
                    mobile.slideOpen()
                } else if( $('.gnb').hasClass('show-move') ) {
                    mobile.showOpen()
                }
                mobile.bgOn();            
            } else {
                if( $('.gnb').hasClass('left-move') ) {
                    mobile.leftClose();
                } else if( $('.gnb').hasClass('right-move') ) {
                    mobile.rightClose();
                } else if( $('.gnb').hasClass('slide-move') ) {
                    mobile.slideClose()
                } else if( $('.gnb').hasClass('show-move') ) {
                    mobile.showClose()
                }
                mobile.bgOff();            
            }
        })    
    }

    function gnbClickOff () {
		$('.mo-menu-btn').off("click").on("click",function(e){
			e.stopPropagation();
		});
	}

    $(window).on("load resize", function(){
		if (matchMedia("screen and (max-width: 768px)").matches) {
			gnbClickOn();
		}else {
			gnbClickOff();

            $('.mo-menu-btn').removeClass('on');
            if( $('.gnb').hasClass('left-move') ) {
                mobile.leftClose();
            } else if( $('.gnb').hasClass('right-move') ) {
                mobile.rightClose();
            } else if( $('.gnb').hasClass('slide-move') ) {
                mobile.slideClose()
            } else if( $('.gnb').hasClass('show-move') ) {
                mobile.showClose()
            }
            mobile.bgOff();   
		}
	});
});

window.addEventListener('DOMContentLoaded', function(){

    const agentBox = document.querySelector('.agent-box');

    if(agentBox) {
        var agentSwiperer = new Swiper(".agentSwiper", {
            slidesPerView: 2,
            spaceBetween: 10,
            loop: true,
            navigation: {
                nextEl: ".agentSwiper + .swiper-button-next",
                prevEl: ".agentSwiper + .swiper-button-prev",
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
    }

    ///////////////////////////////////////////////////////////

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

    const parallaxArea = document.querySelector('.parallax-area')
    const parallaxBg = document.querySelector('.parallax-bg')

    gsap.to(parallaxBg, {        
        scrollTrigger: {
            trigger: parallaxArea,
            start: "top top", 
            end: "bottom top", 
            scrub: 1,
            //markers : true
        },
        yPercent: -20, 
        ease : "none",
    });

    ///////////////////////////////////////////////////////////

    const input = document.getElementById('postcode');
    const suggestionsList = document.getElementById('suggestions');
    const searchBtn = document.getElementById('searchBtn');

    if(input) {
        async function fetchPostcodes(query) {
            const response = await fetch(`https://api.zippopotam.us/AU/${query}`);
            if (response.ok) {
                const data = await response.json();
                return data.places.map(place => `${place['place name']} ${place['state abbreviation']} ${query}`);
            } else {
                return [];
            }
        }
        
        input.addEventListener('input', async () => {
            const query = input.value.toLowerCase();
            suggestionsList.innerHTML = '';
            if (query) {
                const postcodes = await fetchPostcodes(query);
                postcodes.forEach(postcode => {
                    const li = document.createElement('li');
                    li.textContent = postcode;
                    li.addEventListener('click', () => {
                        input.value = postcode;
                        suggestionsList.innerHTML = '';
                    });
                    suggestionsList.appendChild(li);
                });
    
                if( postcodes.length ) {
                    suggestionsList.classList.add('on');
                } else {
                    suggestionsList.classList.remove('on');
                }
            }
        });
    
        suggestionsList.addEventListener('click', function(e) {
            if (e.target && e.target.nodeName === 'LI') {
                input.value = e.target.innerText;
                suggestionsList.innerHTML = '';
            }
        });
    
        let postValue = '';
    
        searchBtn.addEventListener('click', function(e) {
            if (!input.value) {
                alert('Enter your postcode..');
                return false;
            } 
    
            postValue = input.value;
            location.replace('/wapropertyconnect/agents/finder.html');
        });
    } 

    ///////////////////////////////////////////////////////////

    const contactForm = document.getElementById('contactForm');

    if(contactForm) {
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
    }

    ///////////////////////////////////////////////////////////

    const reviewContainer = document.getElementById('review');
    const starBox = document.querySelector('.star-box');
    const ratingBox = document.querySelector('.rating-box');
    const totalBox = document.querySelector('.total-box');

    function initReview() {
        const placeId = 'ChIJCbj3jze9MioRtWFA_T3cqJY';
        const service = new google.maps.places.PlacesService(document.createElement('div'));

        service.getDetails({ placeId: placeId }, (place, status) => {
            if (status === google.maps.places.PlacesServiceStatus.OK) {
                const reviews = place.reviews;       
                const rating = place.rating; 
                const totalReviews = place.user_ratings_total; 
                const placeUrl = `https://www.google.com/maps/place/?q=place_id:${placeId}`;
                let reviewElement = '';
                const ratingStandard = 5;

                if (starBox) {
                    let stars = '';

                    for (let i=0;i<rating;i++) {
                        stars += `<i class="fas fa-star"></i>`
                    }

                    starBox.innerHTML = stars;
                }
                if (ratingBox) ratingBox.innerHTML = rating;
                if (totalBox) totalBox.innerHTML = totalReviews;

                reviews.forEach(review => {                    
                    const reviewDate = formatDate(review.time);

                    if (review.rating >= ratingStandard) {                    
                        reviewElement += `
                            <div class="swiper-slide">
                                <a href="${placeUrl}" target="_blank">
                                    <div class="review-box">                                        
                                        <div class="text">
                                            <i class="fas fa-quote-left"></i>
                                            <p class="t-rw rw-5">${review.text}</p>
                                            <i class="fas fa-quote-right"></i>
                                        </div>                                        
                                        <p><span class="name">${review.author_name}</span><span class="time">${reviewDate}</span></p>
                                    </div>
                                </a>
                            </div>
                        `;
                    }

                    
                });

                reviewContainer.innerHTML = reviewElement;

                const reviewSwiper = new Swiper(".reviewSwiper", {
                    slidesPerView: 1,
                    spaceBetween: 10,
                    //loop: true,
                    pagination: {
                        el: ".swiper-pagination",
                        clickable: true,
                    },
                    // navigation: {
                    //     nextEl: ".swiper-button-next",
                    //     prevEl: ".swiper-button-prev",
                    // },
                    breakpoints: {
                        376: {
                            slidesPerView: 2,
                            spaceBetween: 10,
                        },
                        769: {
                            slidesPerView: 3,
                            spaceBetween: 20,
                        },
                        961: {
                            slidesPerView: 4,
                            spaceBetween: 20,
                        },
                    },
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

    if(reviewContainer) initReview();
})