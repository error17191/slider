$slider = $('#slider');
$visibleSlidesContainer = $('<div id="visible-slides"></div>');
$slider.prepend($visibleSlidesContainer);
$slides = $slider.find('.slide');
$hiddenSlidesContainer = $('<div id="hidden-slides"></div>');
$hiddenSlidesContainer.append($slides);
$slider.append($hiddenSlidesContainer);
$visibleSlides = $slides.slice(0,3);
$visibleSlidesContainer.append($visibleSlides);

$(window).on("load", function (e) {
   $('#preload').hide();
   $slider.show();
    init();

    $(window).resize(init);
    setInterval(function () {
        $hiddenSlidesContainer.append($visibleSlidesContainer.find('.slide').eq(0));
        $visibleSlidesContainer.append($hiddenSlidesContainer.find('.slide').eq(0));
        init();
    },1000);
});



function init() {
    $slide1 = $visibleSlidesContainer.find('.slide').eq(0);
    $slide2 = $visibleSlidesContainer.find('.slide').eq(1);
    $slide3 = $visibleSlidesContainer.find('.slide').eq(2);

    ratio1 = $slide1.find('img').width() / $slide1.find('img').height();
    ratio2 = $slide2.find('img').width() / $slide2.find('img').height();
    ratio3 = $slide3.find('img').width() / $slide3.find('img').height();

    width2 = $visibleSlidesContainer.height() * ratio2;
    $slide2.width(width2);
    width1 = $visibleSlidesContainer.height() * 0.7 * ratio1;
    width3 = $visibleSlidesContainer.height() * 0.7 *  ratio3;

    $slide1.width(width1);
    $slide3.width(width3);
}

