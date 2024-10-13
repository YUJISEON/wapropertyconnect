window.addEventListener("DOMContentLoaded", function(){

    const page = document.getElementById('subPage');
    
    if ( ! page.classList.contains('agents') ) {
        const findForm = document.getElementById('findForm');
        const progress = document.getElementById('progress');
        const step1 = document.getElementById('step1');
        const step2_01 = document.getElementById('step2-01');
        const step2_02 = document.getElementById('step2-02');
        const step2_03 = document.getElementById('step2-03');
        const step3 = document.getElementById('step3');
        const step4 = document.getElementById('step4');
        const step5_01 = document.getElementById('step5-01');
        const step5_02 = document.getElementById('step5-02');
        const section1 = document.getElementById('section1');
        const section2 = document.getElementById('section2');
        const steps = [step1, step2_01, step2_02, step2_03, step3, step4, step5_01, step5_02];
        let stepsHistory = ['step1'];

        const backBtn = document.querySelectorAll('.back');
        const nextStep = document.getElementById('nextStep');
        const prevStep = document.getElementById('prevStep');
    
        const option1 = document.getElementById('step1-option');
        const option2_01 = document.getElementById('step2-01-option');
        const option2_02 = document.getElementById('step2-02-option');
        const option2_03 = document.getElementById('step2-03-option');
        const option3 = document.getElementById('step3-option');
        const option4 = document.getElementById('step4-option');
        const option5_01 = document.getElementById('step5-01-option');
    
        const step1Options = step1.querySelectorAll('.sel-list > div');
        const step2Options_01 = step2_01.querySelectorAll('.sel-list > div');
        const step2Options_02 = step2_02.querySelectorAll('.sel-list > div');
        const step2Options_03 = step2_03.querySelectorAll('.sel-list > div');
        const step3Options = step3.querySelectorAll('.sel-list > div');
        const step4Options = step4.querySelectorAll('.sel-list > div');
        const step5Options_01 = step5_01.querySelectorAll('.sel-list > div');
        const progressStep = progress.querySelectorAll('li');
    
        step1Options.forEach(option => {
            option.addEventListener('click', () => {
                option1.value = option.querySelector('.col-inner').getAttribute('data-step1');
    
                step1.classList.remove('active');
                
                if( option1.value === 'Buy') {
                    step2_01.classList.add('active');
                    nextStep.value = "step2-01";
                    stepsHistory.push("step2-01");
                } else {
                    step2_02.classList.add('active');
                    nextStep.value = "step2-02";
                    stepsHistory.push("step2-02");
                }
    
                prevStep.value = "step1";
                progressStep[1].classList.add('on');
            });
        });
    
        step2Options_01.forEach(option => {
            option.addEventListener('click', () => {
                option2_01.value = option.querySelector('.col-inner').getAttribute('data-step2-01');
    
                step2_01.classList.remove('active');
                step2_02.classList.add('active');
                nextStep.value = "step2-02";
                stepsHistory.push("step2-02");

                if( option1.value === 'Buy') {
                    progressStep[2].classList.add('on');
                }

                prevStep.value = "step2-01";
                progressStep[1].classList.add('on');
            });
        });
    
        step2Options_02.forEach(option => {
            option.addEventListener('click', () => {
                option2_02.value = option.querySelector('.col-inner').getAttribute('data-step2-02');
    
                step2_02.classList.remove('active');
                

                if( option1.value === 'Rent') {
                    step2_03.classList.add('active');
                    nextStep.value = "step2-03";
                    stepsHistory.push("step2-03");
                } else {
                    step3.classList.add('active');
                    nextStep.value = "step3";
                    stepsHistory.push("step3");
                    progressStep[2].classList.add('on');
                }

                prevStep.value = "step2-02";
            });
        });
    
        step2Options_03.forEach(option => {
            option.addEventListener('click', () => {
                option2_03.value = option.querySelector('.col-inner').getAttribute('data-step2-03');
    
                step2_03.classList.remove('active');
                step5_02.classList.add('active');
                nextStep.value = "step5-02";
                stepsHistory.push("step5-02");

                progressStep[2].classList.add('on');
                progressStep[3].classList.add('on');
                progressStep[4].classList.add('on');

                prevStep.value = "step2-03";
            });
        });
        
    
        step3Options.forEach(option => {
            option.addEventListener('click', () => {
                option3.value = option.querySelector('.col-inner').getAttribute('data-step3');
    
                step3.classList.remove('active');
                step4.classList.add('active');
                nextStep.value = "step4";
                stepsHistory.push("step4");

                progressStep[3].classList.add('on');

                prevStep.value = "step3";
            });
        });
    
        step4Options.forEach(option => {
            option.addEventListener('click', () => {
                option4.value = option.querySelector('.col-inner').getAttribute('data-step4');
    
                step4.classList.remove('active');
                step5_01.classList.add('active');
                nextStep.value = "step5-01";
                progressStep[4].classList.add('on');

                prevStep.value = "step4";
            });
        });
    
        step5Options_01.forEach(option => {
            option.addEventListener('click', () => {
                option5_01.value = option.querySelector('.col-inner').getAttribute('data-step5-01');
    
                step5_01.classList.remove('active');
                section1.classList.remove('active');
                section2.classList.add('active');
                progressStep[5].classList.add('on');
                loadingAni();
            });
        });

        backBtn.forEach(btn => { 
            btn.addEventListener('click', () => {
                let prevValue = prevStep.value;
                let historyNum = 0;

                steps.forEach(step => {
                    step.classList.remove('active');
                })

                progressStep.forEach(progress => {
                    progress.classList.remove('on');
                })

                stepsHistory.forEach((history, index) => {
                    if ( history == prevValue) {
                        historyNum = index;
                        document.getElementById(history).classList.add('active');
                    }
                })

                prevStep.value = stepsHistory[historyNum - 1];
                nextStep.value = stepsHistory[historyNum];
                stepsHistory.splice(historyNum + 1);

                if (prevValue === 'step1') { endNum = 1; }
                if (prevValue === 'step2-01' || prevValue === 'step2-02' || prevValue === 'step2-03') {endNum = 2; }
                if (prevValue === 'step3') {  endNum = 3;}
                if (prevValue === 'step4') { endNum = 4; }

                for (let i=0;i<endNum;i++) {
                    progressStep[i].classList.add('on');
                }
            });
        });

        
        

        function loadingAni() {
            const loadingBox = document.getElementById('loadingBox');
            const resultBox = document.getElementById('resultBox');

            const personList = document.getElementById('personList');
            const items = gsap.utils.toArray(personList.querySelectorAll('li'));

            const tl = gsap.timeline()
            .from(items, {
                scale: 0.5,
                repeat: 3,
                yoyo : true,
                stagger: {
                    each: 0.2,
                    //repeatDelay : 1.5
                },
                ease: "Power1.inOut",
                transformOrigin:"50% 50%",

            })

            const checkList = document.getElementById('checkList');
            const checks = checkList.querySelectorAll('li');

            tl.eventCallback('onUpdate', function() {
                if ( tl.progress() >= 0 && tl.progress() <= 0.3333 ) {
                    checks.forEach(function(check){
                        check.classList.remove('ani');
                    });
                    
                    checks[0].classList.add('ani');
                } else if ( tl.progress() >= 0.3333 && tl.progress() <= 0.666 ) {
                    checks[1].classList.add('ani');
                } else {
                    checks[2].classList.add('ani');
                }
            })

            tl.eventCallback('onComplete', function() {
                loadingBox.classList.remove('active');
                resultBox.classList.add('active');
            });
        }
    
        findForm.addEventListener('submit', function(event) {
            event.preventDefault(); // prevent reload
        
            var formData = new FormData(this);
            // 체크박스 값 수집
            const importanceCheckboxes = this.querySelectorAll('input[name="importance[]"]:checked');
            let importanceValues = [];
            importanceCheckboxes.forEach((checkbox) => {
                importanceValues.push(checkbox.value);
            });
            formData.append('importance', importanceValues.join(', ')); // 배열을 문자열로 변환하여 추가

            // formData.append('service_id', 'service_berj6c8');
            // formData.append('template_id', 'template_v42hb05');
            // formData.append('user_id', 'nmWuFqNcSu-nC5H9Z');
            formData.append('service_id', 'service_ez7fo8u');
            formData.append('template_id', 'template_j98y5yb');
            formData.append('user_id', 'Uwlpc8XZC0VSGFsVJ');
        
            var xhr = new XMLHttpRequest();
            xhr.open('POST', 'https://api.emailjs.com/api/v1.0/email/send-form', true);
            xhr.onload = function() {
                if (xhr.status >= 200 && xhr.status < 300) {
                    alert('Your mail is sent!');
                    location.replace('/wapropertyconnect/agents/index.html');
                } else {
                    alert('Oops... ' + xhr.responseText);
                }
            };
            xhr.onerror = function() {
                alert('Oops... Something went wrong.');
            };
            xhr.send(formData);
        });

        const checkboxes = document.querySelectorAll('input[name="importance[]"]');
        
        checkboxes.forEach(function (checkbox) {
            checkbox.addEventListener('change', function () {
                const checkedCount = document.querySelectorAll('input[name="importance[]"]:checked').length;

                if (checkedCount > 3) {
                    this.checked = false;
                    alert('You can only select up to 3 priorities.');
                }
            });
        });
    }


    ///////////////////////////////////////////////////////////
});