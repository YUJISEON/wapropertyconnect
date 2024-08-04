window.addEventListener("DOMContentLoaded", function(){ 

    const rangeSliderWrap = document.getElementById("rangeSliderWrap");
    const rangeSlider = document.getElementById("rangeSlider");
    const handle = document.getElementById("handle");
    const basicPrice = document.querySelector(".basic-price");
    const comm = document.getElementById("comm");
    const commPrice = document.getElementById("commPrice");
    const resultPrice = document.getElementById("resultPrice")
    const maxRange = 6000000;

    function formatNumberWithCommas(number) {
        return number.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",");
    }

    function updateSlider() {
        let xPercent = gsap.utils.mapRange(0, slider[0].maxX, 0, 100),
            changePrice = (maxRange * xPercent(slider[0].x)) * 0.01,
            commValue = parseFloat(comm.value) / 100;

        rangeSlider.style.width = xPercent(slider[0].x) + '%';
        basicPrice.innerText = formatNumberWithCommas(Math.round(changePrice));
        commPrice.innerText = formatNumberWithCommas(Math.round(commValue*changePrice));
        resultPrice.innerText = formatNumberWithCommas(Math.round(changePrice-(commValue*changePrice)));
    }

    const slider = Draggable.create(handle, {
        type: "x",
        bounds: rangeSliderWrap,
        onDrag: updateSlider,
    });

});