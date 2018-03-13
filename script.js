let slides = [];
let slidesHeight = $('#slider .slides').height();
let slidesTop = $('#slider .slides').position().top;
let slidesWidth = $('#slider .slides').width();
window.slider = {
    currentSlide: 0,
    loop: true,
};
for (i = 1; i <= 16; i++) {
    let img = document.createElement('img');
    img.order = i;
    img.onload = function () {
        $('#slider .slider-helper').html(img);
        img.width = $(img).width();
        img.height = $(img).height();
        slides.push(img);
        if (slides.length == 16) {
            slides.sort(function (a, b) {
                return a.order - b.order;
            });
            initSlideShow();
            setInterval(runSlideShow,10000);
            // setInterval(function () {
            //     if (slider.currentSlide == slides.length - 1) {
            //         slider.currentSlide = 0;
            //     } else {
            //         slider.currentSlide++;
            //     }
            //     runSlider();
            // }, 5000);

        }
    }
    img.src = i + '.jpg';
}

function initSlideShow() {
    let centerSlide = slides[0];
    let leftSlide = slides[slides.length - 1]
    let rightSlide = slides[1]

    let centerWidth = slidesHeight * centerSlide.width / centerSlide.height;
    let centerLeft = slidesWidth / 2 - centerWidth / 2;
    let freeWidth = slidesWidth - centerWidth;
    let sideHeight = 0.76 * slidesHeight;
    let leftWidth, rightWidth, leftLeft, rightLeft;
    leftWidth = sideHeight * leftSlide.width / leftSlide.height;
    rightWidth = sideHeight * rightSlide.width / rightSlide.height;

    let minWidth,leftZIndex,rightZIndex;
    if (leftWidth <= rightWidth) {
        minWidth = leftWidth;
        leftZIndex = 5;
        rightZIndex = 4;
    } else {
        minWidth = rightWidth;
        leftZIndex = 4;
        rightZIndex = 5;
    }
    let finalWidth;
    if (freeWidth / 2 <= minWidth / 2) {
        finalWidth = freeWidth;
    } else {
        finalWidth = minWidth;
    }
    leftLeft = centerLeft - finalWidth / 2
    rightLeft = centerLeft + centerWidth - finalWidth/2;
    let $centerSlide = $(document.createElement('div'));
    $centerSlide.addClass('slide center-slide');
    $centerSlide.css('width', centerWidth + 'px');
    $centerSlide.css('left', centerLeft + 'px');
    $centerSlide.css('height', slidesHeight + 'px');
    $centerSlide.css('z-index', 6);
    $centerSlide.css('background-image', `url("${centerSlide.src}")`);
    $('#slider .slides').append($centerSlide);

    let $leftSlide = $(document.createElement('div'));
    $leftSlide.addClass('slide left-slide');
    $leftSlide.css('width', finalWidth + 'px');
    $leftSlide.css('left', leftLeft + 'px');
    $leftSlide.css('height', sideHeight + 'px');
    $leftSlide.css('z-index', leftZIndex);
    $leftSlide.css('opacity', 0.5);
    $leftSlide.css('background-image', `url("${leftSlide.src}")`);
    $leftSlide.css('background-position', 'left');
    $leftSlide.slide = leftSlide;
    $('#slider .slides').append($leftSlide);

    let $rightSlide = $(document.createElement('div'));
    $rightSlide.addClass('slide right-slide');
    $rightSlide.css('width', finalWidth + 'px');
    $rightSlide.css('left', rightLeft + 'px');
    $rightSlide.css('height', sideHeight + 'px');
    $rightSlide.css('z-index', rightZIndex);
    $rightSlide.css('opacity', 0.5);
    $rightSlide.css('background-image', `url("${rightSlide.src}")`);
    $leftSlide.css('background-position', 'right');
    $('#slider .slides').append($rightSlide);

}

function runSlideShow(){
    let duration = 1000;
    let $prevLeftSlide = $('#slider .slides .left-slide');
    $prevLeftSlide.removeClass('left-slide right-slide center-slide')
    $prevLeftSlide.velocity({
        left: '-=300px',
        opacity: 0
    },{
        duration: duration,
        complete: function () {
            $prevLeftSlide.remove();
        }
    });


    let leftSlide = slides[slider.currentSlide];
    let rightSlide = slides[(slider.currentSlide + 2) % slides.length];
    let sideHeight = 0.76 * slidesHeight;
    let leftWidth = sideHeight * leftSlide.width / leftSlide.height;
    let rightWidth = sideHeight * rightSlide.width / rightSlide.height;
    let centerSlide = slides[(slider.currentSlide + 1) % slides.length]
    let centerWidth = slidesHeight * centerSlide.width / centerSlide.height;
    let centerLeft = slidesWidth / 2 - centerWidth / 2;
    let freeWidth = slidesWidth - centerWidth;
    let minWidth,leftZIndex,rightZIndex;
    if (leftWidth <= rightWidth) {
        minWidth = leftWidth;
        leftZIndex = 5;
        rightZIndex = 4;
    } else {
        minWidth = rightWidth;
        leftZIndex = 4;
        rightZIndex = 5;
    }
    let finalWidth;
    if (freeWidth / 2 <= minWidth / 2) {
        finalWidth = freeWidth;
    } else {
        finalWidth = minWidth;
    }
    let leftLeft = centerLeft - finalWidth / 2
    let rightLeft = centerLeft + centerWidth - finalWidth/2;

    let $prevCenterSlide = $('#slider .slides .center-slide');
    $prevCenterSlide.removeClass('left-slide right-slide center-slide')
    $prevCenterSlide.addClass('left-slide');
    $prevCenterSlide.css('z-index',leftZIndex);
    $prevCenterSlide.css('background-position','left');
    $prevCenterSlide.velocity({
        left: leftLeft + 'px',
        width: leftWidth + 'px',
        height: sideHeight + 'px',
        opacity: 0.5
    },{
        duration : duration
    });

    let $prevRightSlide = $('#slider .slides .right-slide');
    $prevRightSlide.removeClass('center-slide right-slide left-slide');
    $prevRightSlide.addClass('center-slide');
    $prevRightSlide.css('z-index',6);

    $prevRightSlide.velocity({
        left: centerLeft + 'px',
        width: centerWidth + 'px',
        height: slidesHeight + 'px',
        opacity: 1
    },{
        duration : duration
    });

    let $rightSlide = $(document.createElement('div'));
    $rightSlide.addClass('slide right-slide');
    $rightSlide.css('width', finalWidth + 'px');
    $rightSlide.css('left', rightLeft + 300 + 'px');
    $rightSlide.css('height', sideHeight + 'px');
    $rightSlide.css('opacity',0);
    $rightSlide.css('background-image', `url("${rightSlide.src}")`);
    $rightSlide.css('background-position','right');
    $('#slider .slides').append($rightSlide);
    $rightSlide.velocity({
        left: rightLeft,
        opacity: 0.5
    },{
        duration: duration
    });
    slider.currentSlide = (slider.currentSlide + 1) % slides.length;
}

