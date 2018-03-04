let $slider = $('#slider');
let $slidesContainer = $slider.find('.slides');
let $slides = $slidesContainer.find('.slide');
$slides.each(function () {
    let $img = $(this).find('img');
    console.log($img);
    let ratio = $img.width() / $img.height();
    // console.log(ratio);
});
// console.log($slides.eq(0).ratio);
// $visibleSlidesContainer = $('<div id="visible-slides"></div>');
// $slider.prepend($visibleSlidesContainer);
// $slides = $slider.find('.slide');
// $hiddenSlidesContainer = $('<div id="hidden-slides"></div>');
// $hiddenSlidesContainer.append($slides);
// $slider.append($hiddenSlidesContainer);
// $visibleSlides = $slides.slice(0,3);
// $visibleSlidesContainer.append($visibleSlides);
let currentSlide = 1;
$(window).on("load", function (e) {
   $('#preload').hide();
   $slider.show();
    init();
    // ratio3 = $slide3.find('img').width() / $slide3.find('img').height();
    // width3 = $visibleSlidesContainer.height() *  ratio3;
    // left3 = $visibleSlidesContainer.width() / 2 - width3/2;
    // $slide3.velocity({
    //     height: '100%',
    //     left: left3,
    //     opacity: 1
    // });

    $(window).resize(init);
    // setInterval(function () {
    //     $hiddenSlidesContainer.append($visibleSlidesContainer.find('.slide').eq(0));
    //     $visibleSlidesContainer.append($hiddenSlidesContainer.find('.slide').eq(0));
    //     init();
    // },1000);
});



function init() {
    let $centerSlide = $slides.eq(1);
    let $rightSlide = $slides.eq(0);
    let $leftSlide = $slides.eq(2);
    let centerHeight = $slidesContainer.height();

}

