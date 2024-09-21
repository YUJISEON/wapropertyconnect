window.addEventListener("DOMContentLoaded", function(){ 

    const shareBox = document.querySelector('.share-box');
    const shareBtn = document.querySelector('.share-btn');
    const sharePopup = document.querySelector('.share-popup');
    const popupInner = document.querySelector('.popup-inner');

    shareBox.addEventListener('click', function(){
        if(shareBox.classList.contains('on')) {
            shareBox.classList.remove('on');
        } else {
            shareBox.classList.add('on');
        }
    });

    shareBtn.addEventListener('click', function(){
        if(sharePopup.classList.contains('show')) {
            sharePopup.classList.remove('show');
        } else {
            sharePopup.classList.add('show');
        }
    });

    sharePopup.addEventListener('click', function(e) {
        if (!popupInner.contains(e.target)) {
            sharePopup.classList.remove('show');
        }
    });

    const pageUrl = encodeURIComponent(window.location.href);
    const pageTitle = encodeURIComponent(document.title);

    document.getElementById('facebookShare').href = `https://www.facebook.com/sharer/sharer.php?u=${pageUrl}`;
    document.getElementById('twitterShare').href = `https://twitter.com/intent/tweet?url=${pageUrl}&text=${pageTitle}`;
    document.getElementById('copyLink').addEventListener('click', function() {    
        navigator.clipboard.writeText(pageUrl).then(function() {
            alert("Link copied!");
        }).catch(function(err) {
            // 복사 실패 시 에러 처리
            console.error('Failed to copy the link: ', err);
        });
    });

});