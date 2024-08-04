window.addEventListener("DOMContentLoaded", function(){ 

    const sliderRange = document.getElementById("rangeSlider");
    const handle = document.getElementById("handle");
    const basicPrice = document.querySelector(".basic-price");
    
    const maxRange = 6000000;

    function updateSlider() {
        console.log('updateSlider');

        const handlePosition = gsap.getProperty(handle, "x");
        const rangeWidth = sliderRange.offsetWidth;
        const percentage = handlePosition / rangeWidth;
        const value = Math.round(percentage * maxRange);

        sliderRange.style.background = `linear-gradient(to right, #333 ${percentage * 100}%, #ddd ${percentage * 100}%)`;
        basicPrice.textContent = value.toLocaleString();
    }

    Draggable.create(handle, {
        type: "x",
        bounds: sliderRange,
        onDrag: updateSlider,
        onDragEnd: updateSlider
    });

    // 초기값 설정
    updateSlider();

});