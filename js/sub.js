
window.addEventListener('DOMContentLoaded', function(){ 
    const btnGuide = document.querySelector(".btn-guide");

    if(btnGuide) {
        const guideBox = document.getElementById("guideBox");
    
        btnGuide.addEventListener('click', function(){
            if( guideBox.classList.contains('on')) {
                guideBox.classList.remove('on')
            } else {
                guideBox.classList.add('on')
            }
        })
        
        const guideForm = document.getElementById('guideForm');
        
        if(guideForm) {
            guideForm.addEventListener('submit', function(event) {
                event.preventDefault(); 
            
                var formData = new FormData(this);
        
                formData.append('service_id', 'service_berj6c8');
                formData.append('template_id', 'template_v42hb05');
                formData.append('user_id', 'nmWuFqNcSu-nC5H9Z');
            
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
    }

    
})