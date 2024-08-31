window.addEventListener("DOMContentLoaded", function(){ 

    const rangeSliderWrap = document.getElementById("rangeSliderWrap");
    const rangeSlider = document.getElementById("rangeSlider");
    const handle = document.getElementById("handle");

    const rangeSliderWrap2 = document.getElementById("rangeSliderWrap2");
    const rangeSlider2 = document.getElementById("rangeSlider2");
    const handle2 = document.getElementById("handle2");

    let basicPrice = document.querySelector(".basic-price");
    let finalPrice = document.querySelector(".final-price");
    let comm1 = document.getElementById("comm1");
    let comm2 = document.getElementById("comm2");
    let comm3 = document.getElementById("comm3");

    let commPrice = document.getElementById("commPrice");
    let resultPrice = document.getElementById("resultPrice");

    let basic = document.querySelector(".basic");
    let inputCommi1 = document.querySelector(".input-commi1");
    let result = document.querySelector(".result");    

    let basic2 = document.querySelector(".basic2");
    let above = document.querySelector(".above");    
    let inputCommi2 = document.querySelector(".input-commi2");
    let inputCommi3 = document.querySelector(".input-commi3");
    let result2 = document.querySelector(".result2");
    let result3 = document.querySelector(".result3");
    let total = document.querySelector(".total");

    const maxRange = 6000000;
    let targetSale = targetSaleRange = 800000, aboveSale = 50000, finalPSale = targetSaleRange2 = targetSale + aboveSale;
    let slider2, isFrist = false;

    function fixed() {
        const handlePositionPercent = (targetSaleRange * 100 / maxRange);        
        const handleWidth = handle.offsetWidth;
        const handlePositionX = (handlePositionPercent * rangeSliderWrap.clientWidth / 100) - (handleWidth / 2);

        gsap.set(handle, {x: handlePositionX });
        slider[0].update(); 

        rangeSlider.style.width = handlePositionPercent + '%'; 
        
        let commValue = parseFloat(comm1.value) / 100; 
        inputCommi1.innerText = comm1.value
        basicPrice.innerText = basic.innerText = formatNumberWithCommas(Math.round(targetSaleRange));
        commPrice.innerText = result.innerText = formatNumberWithCommas(Math.round(commValue * targetSaleRange));
        resultPrice.innerText = formatNumberWithCommas(Math.round(targetSaleRange - (commValue * targetSaleRange)));
    }

    function tiered() {
        fixed();

        const handlePositionPercent2 = (targetSaleRange2 * 100 / maxRange);        
        const handleWidth2 = handle.offsetWidth;
        const handlePositionX2 = (handlePositionPercent2 * rangeSliderWrap.clientWidth  / 100) - (handleWidth2 / 2);

        gsap.set(handle2, {x: handlePositionX2});
        slider2[0].update(); 

        rangeSlider2.style.width = (targetSaleRange2 * 100 / maxRange) + '%';

        let commValue2 = parseFloat(comm2.value) / 100, 
            commValue3 = parseFloat(comm3.value) / 100;

        inputCommi2.innerText = comm2.value;
        inputCommi3.innerText = comm3.value;
        finalPrice.innerText = basic2.innerText = formatNumberWithCommas(Math.round(targetSaleRange2));

        aboveSale = targetSaleRange2 - targetSaleRange <= 0 ? 0 : targetSaleRange2 - targetSaleRange ;
        above.innerText = aboveSale <= 0 ? 0 : formatNumberWithCommas(Math.round(aboveSale)) ;

        result2.innerText = formatNumberWithCommas(Math.round(commValue2 * targetSaleRange));        
        result3.innerText = formatNumberWithCommas(Math.round(commValue3 * aboveSale));
        commPrice.innerText = total.innerText = formatNumberWithCommas(Math.round((commValue2 * targetSaleRange) + (commValue3 * aboveSale)));
        resultPrice.innerText = aboveSale <= 0 ? formatNumberWithCommas(Math.round(targetSaleRange - (commValue2 * targetSaleRange))) : formatNumberWithCommas(Math.round(targetSaleRange2 - ((commValue2 * targetSaleRange) + (commValue3 * aboveSale))));
    }

    function formatNumberWithCommas(number) {
        let price = Math.ceil(number / 10) * 10;

        return price.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",");
    }

    function updateSlider(isInput, target) {
        let xPercent, xPercent2, commValue, commValue2;

        if (isInput) {
            if ( target === 'handle') {
                xPercent = gsap.utils.mapRange(0, slider[0].maxX, 0, 100);
                targetSaleRange = (maxRange * xPercent(slider[0].x)) * 0.01;
                rangeSlider.style.width = xPercent(slider[0].x) + '%';
            } else if ( target === 'handle2') {
                xPercent2 = gsap.utils.mapRange(0, slider2[0].maxX, 0, 100);
                targetSaleRange2 = (maxRange * xPercent2(slider2[0].x)) * 0.01;
                rangeSlider2.style.width = xPercent2(slider2[0].x) + '%';
            }
        }

        aboveSale = targetSaleRange2 - targetSaleRange <= 0 ? 0 : targetSaleRange2 - targetSaleRange ;
        above.innerText = aboveSale <= 0 ? 0 : formatNumberWithCommas(Math.round(aboveSale)) ;

        commValue = parseFloat(comm1.value) / 100;
        commValue2 = parseFloat(comm2.value) / 100;
        commValue3 = parseFloat(comm3.value) / 100;
        comm1.value = parseFloat(comm1.value).toFixed(2);
        comm2.value = parseFloat(comm2.value).toFixed(2);
        comm3.value = parseFloat(comm3.value).toFixed(2);
        inputCommi1.innerText = comm1.value
        inputCommi2.innerText = comm2.value;
        inputCommi3.innerText = comm3.value;

        basicPrice.innerText = basic2.innerText = basic.innerText = formatNumberWithCommas(Math.round(targetSaleRange));
        finalPrice.innerText = formatNumberWithCommas(Math.round(targetSaleRange2));           
        result2.innerText = formatNumberWithCommas(Math.round(commValue2 * (targetSaleRange2 - aboveSale)));        
        result3.innerText = formatNumberWithCommas(Math.round(commValue3 * aboveSale));

        if ( target === 'handle') { 
            commPrice.innerText = result.innerText = formatNumberWithCommas(Math.round(commValue * targetSaleRange));
            resultPrice.innerText = formatNumberWithCommas(Math.round(targetSaleRange - (commValue * targetSaleRange)));
        } else {                      
            if(aboveSale > 0)  {
                commPrice.innerText = total.innerText = formatNumberWithCommas(Math.round((commValue2 * (targetSaleRange2 - aboveSale)) + (commValue3 * aboveSale)));
                resultPrice.innerText = formatNumberWithCommas(Math.round(targetSaleRange2 - ((commValue2 * (targetSaleRange2 - aboveSale)) + + (commValue3 * aboveSale))))
            };
        }        
    }

    function updataInput(e) {     
        if(e.target.id == 'comm1') updateSlider(false, 'handle');
        if(e.target.id == 'comm2' || e.target.id == 'comm3') updateSlider(false, 'handle2');
    }

    const slider = Draggable.create(handle, {
        type: "x",
        bounds: rangeSliderWrap,
        onDrag: updateSlider,
        onDragParams : [true, 'handle']
    });

    

    comm1.addEventListener('input', updataInput);
    comm2.addEventListener('input', updataInput);
    comm3.addEventListener('input', updataInput);

    fixed();

    const wayToggle = document.querySelector('.way-toggle');
    const commiToggle = document.querySelector('.commi-toggle');
    const infoToggle = document.querySelector('.info-toggle');
    const wayToggleBtns = wayToggle.querySelectorAll('li');
    const commiToggleList = commiToggle.querySelectorAll('li');
    const infoToggleList = infoToggle.querySelectorAll('li');

    const tooltip = document.querySelector('.tooltip');
    const infoWrap = document.querySelector('.info-wrap');


    wayToggleBtns.forEach((btn, index)=>{
        btn.addEventListener('click', function(){
            wayToggleBtns.forEach((wayBtn) => wayBtn.classList.remove('on'));
            commiToggleList.forEach((commiList) => commiList.classList.remove('on'));
            infoToggleList.forEach((infoList) => infoList.classList.remove('on'));

            this.classList.add('on');
            commiToggleList[index].classList.add('on');
            infoToggleList[index].classList.add('on');

            infoWrap.classList.remove('on')

            if (index === 0) {
                fixed();

            } else {
                if(!isFrist) {
                    isFrist = true;
                    slider2 = Draggable.create(handle2, {
                        type: "x",
                        bounds: rangeSliderWrap2,
                        onDrag: updateSlider,
                        onDragParams : [true, 'handle2']
                    });
                }
                tiered();
            }     
        })
    })


    tooltip.addEventListener('click', function(){
        if( infoWrap.classList.contains('on')) {
            infoWrap.classList.remove('on')
        } else {
            infoWrap.classList.add('on')
        }
    })
});