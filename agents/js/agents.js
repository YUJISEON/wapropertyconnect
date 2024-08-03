window.addEventListener("DOMContentLoaded", function(){

    async function fetchPostcodes(query) {
        const response = await fetch(`https://api.zippopotam.us/AU/${query}`);
        if (response.ok) {
            const data = await response.json();
            return data.places.map(place => `${place['place name']} ${place['state abbreviation']} ${query}`);
        } else {
            return [];
        }
    }
    
    const input = document.getElementById('postcode');
    const suggestionsList = document.getElementById('suggestions');
    const searchBtn = document.getElementById('searchBtn');
    const contactForm = document.getElementById('contactForm');
    // const step1 = document.getElementById('step1');
    // const step2 = document.getElementById('step2');
    // const step3 = document.getElementById('step3');
    // const step4 = document.getElementById('step4');
    
    // const option1 = document.getElementById('option1');
    // const option2 = document.getElementById('option2');
    
    // const options = document.querySelectorAll('.option');
    // const propertyTypes = document.querySelectorAll('.property-type');
    
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
        location.replace('/agents/finder.html');

    });


    // contactForm.addEventListener('submit', function(event) {
    //     event.preventDefault(); // prevent reload
    
    //     var formData = new FormData(this);
    //     formData.append('service_id', 'service_berj6c8');
    //     formData.append('template_id', 'template_v42hb05');
    //     formData.append('user_id', 'nmWuFqNcSu-nC5H9Z');
    
    //     var xhr = new XMLHttpRequest();
    //     xhr.open('POST', 'https://api.emailjs.com/api/v1.0/email/send-form', true);
    //     xhr.onload = function() {
    //         if (xhr.status >= 200 && xhr.status < 300) {
    //             alert('Your mail is sent!');
    //         } else {
    //             alert('Oops... ' + xhr.responseText);
    //         }
    //     };
    //     xhr.onerror = function() {
    //         alert('Oops... Something went wrong.');
    //     };
    //     xhr.send(formData);
    // });
    
});