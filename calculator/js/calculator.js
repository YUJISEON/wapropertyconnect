window.addEventListener("DOMContentLoaded", function(){ 

    const rangeSliderWrap = document.getElementById("rangeSliderWrap");
    const rangeSlider = document.getElementById("rangeSlider");
    const handle = document.getElementById("handle");
    const rangeSliderWrap2 = document.getElementById("rangeSliderWrap2");
    const rangeSlider2 = document.getElementById("rangeSlider2");
    const handle2 = document.getElementById("handle2");

    const basicPrice = document.querySelector(".basic-price");
    const finalPrice = document.querySelector(".final-price");
    const comm1 = document.getElementById("comm1");
    const comm2 = document.getElementById("comm2");
    const comm3 = document.getElementById("comm3");

    const commPrice = document.getElementById("commPrice");
    const resultPrice = document.getElementById("resultPrice")
    const maxRange = 6000000;

    function init() {
        let changePrice = 800000,
            commValue = parseFloat(comm1.value) / 100;
        const handlePositionPercent = (changePrice * 100 / maxRange);        
        const handleWidth = handle.offsetWidth;
        const handlePositionX = (handlePositionPercent * rangeSliderWrap.clientWidth / 100) - (handleWidth / 2);
        
        gsap.set(handle, {x: handlePositionX });
        slider[0].update(); 

        rangeSlider.style.width = handlePositionPercent + '%';
        basicPrice.innerText = formatNumberWithCommas(Math.round(changePrice));
        commPrice.innerText = formatNumberWithCommas(Math.round(commValue * changePrice));
        resultPrice.innerText = formatNumberWithCommas(Math.round(changePrice - (commValue * changePrice)));
    }

    function formatNumberWithCommas(number) {
        return number.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",");
    }

    function updateSlider(isInput) {
        let xPercent, xPercent2, changePrice, changePrice2, commValue, commValue2;
        let target = 'handle';

        if(!isInput) {
            target = this.target.classList.contains('handle2') && 'handle2';
        }

        if ( target === 'handle') {
            xPercent = gsap.utils.mapRange(0, slider[0].maxX, 0, 100);
            changePrice = (maxRange * xPercent(slider[0].x)) * 0.01;
            commValue = parseFloat(comm1.value) / 100;

            rangeSlider.style.width = xPercent(slider[0].x) + '%';
        } else {
            xPercent2 = gsap.utils.mapRange(0, slider2[0].maxX, 0, 100);
            changePrice2 = (maxRange * xPercent2(slider2[0].x)) * 0.01;
            commValue2 = parseFloat(comm2.value) / 100;

            rangeSlider2.style.width = xPercent2(slider2[0].x) + '%';
        }

        comm1.value = parseFloat(comm1.value).toFixed(2);
        basicPrice.innerText = formatNumberWithCommas(Math.round(changePrice));
        commPrice.innerText = formatNumberWithCommas(Math.round(commValue*changePrice));
        resultPrice.innerText = formatNumberWithCommas(Math.round(changePrice-(commValue*changePrice)));
    }

    function updataInput(e) {     
        if(e.target.id == 'comm1') updateSlider(true);

        // comm1.value = parseFloat(comm1.value).toFixed(2);
        // basicPrice.innerText = formatNumberWithCommas(Math.round(changePrice));
        // commPrice.innerText = formatNumberWithCommas(Math.round(commValue*changePrice));
        // resultPrice.innerText = formatNumberWithCommas(Math.round(changePrice-(commValue*changePrice)));
    }

    const slider = Draggable.create(handle, {
        type: "x",
        bounds: rangeSliderWrap,
        onDrag: updateSlider,
        onDragParams : [false]
    });

    comm1.addEventListener('input', updataInput);
    comm2.addEventListener('input', updataInput);
    comm3.addEventListener('input', updataInput);

    const slider2 = Draggable.create(handle2, {
        type: "x",
        bounds: rangeSliderWrap2,
        onDrag: updateSlider,
    });

    init();
});