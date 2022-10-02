import { allTranslations } from './translations.js';

var xDown = null;
var yDown = null;

window.addEventListener('load', function () {
    /*-- Initialize the Image Slider --*/
    initializeGlider();

    /*-- Initialize Animate On Scroll Library --*/
    initializeAnimateOnScroll();

    /*-- Check the user preference and change the language of the page --*/
    changeLanguage(null, true);

    /*- Add Event Listeners -*/
    addEventListeners();
});

function changeLanguage(e, isLoading) {
    try {
        let pageLang = localStorage.getItem('user_preferred_lang') || 'en';
        if (isLoading && pageLang === 'en') {
            return;
        }
        if (!isLoading) {
            if (pageLang === 'en') {
                pageLang = 'es';
            } else {
                pageLang = 'en';
            }

            localStorage.setItem('user_preferred_lang', pageLang);
        }

        const translations = allTranslations[pageLang];
        for (let elementID in translations) {
            const translatedText = translations[elementID];
            const htmlElement = document.getElementById(elementID);
            if (!htmlElement) return;
            htmlElement.innerHTML = translatedText;
        }
    } catch (ex) {
        // console.error(ex.message);
    }
}

function initializeGlider() {
    new Glider(document.querySelector('.slider__list'), {
        slidesToShow: 1,
        scrollLock: true,
        dots: '.slider__indicators',
        arrows: {
            prev: '#arrow__left',
            next: '#arrow__right'
        }
    });
}

function initializeAnimateOnScroll() {
    AOS.init({
        delay: 0,
        duration: 500,
        once: true
    });
}

function addEventListeners() {
    document.getElementById('lang_picker').addEventListener('click', changeLanguage);
    document
        .getElementById('slider')
        .addEventListener('touchstart', handleTouchStart, false);
    document
        .getElementById('slider')
        .addEventListener('touchmove', handleTouchMove, false);
}

function handleTouchStart(evt) {
    const firstTouch = evt.touches[0];
    xDown = firstTouch.clientX;
    yDown = firstTouch.clientY;
}

function handleTouchMove(evt) {
    if (!xDown || !yDown) {
        return;
    }

    var xUp = evt.touches[0].clientX;
    var yUp = evt.touches[0].clientY;

    var xDiff = xDown - xUp;
    var yDiff = yDown - yUp;

    if (Math.abs(xDiff) > Math.abs(yDiff)) {
        /*most significant*/
        if (xDiff > 0) {
            /* right swipe */
            document.getElementById('arrow__right').click();
        } else {
            /* left swipe */
            document.getElementById('arrow__left').click();
        }
    } else {
        if (yDiff > 0) {
            /* down swipe */
        } else {
            /* up swipe */
        }
    }
    /* reset values */
    xDown = null;
    yDown = null;
}
