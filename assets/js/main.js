/* adapted from http://jsfiddle.net/qB4Z2/ */
function sticky_relocate() {
    var window_top = $(window).scrollTop();
    var div_top = $('#sticky-anchor').offset().top;
    if (window_top > div_top) {
        $('#sticky').addClass('stick');
        $('#sticky-anchor').height($('#sticky').outerHeight());
    } else {
        $('#sticky').removeClass('stick');
        $('#sticky-anchor').height(0);
    }
}

$(function() {

    if ($('.project-grid').length) {

        // do any of our homepage grid project titles need smaller font? 
        var min_length = 18;  // if title larger than this then shrink its font
        var new_font_size = "1.0em"; 
        for (var k in site_posts) {  /* found in head.html */
            title_slug = site_posts[k]['title_slug'];
            if (title_slug.length > min_length) {
                // this project title is too long, make it use smaller font 
                $('.project .circle h2.' +  title_slug).css({"font-size": new_font_size});
            }
        }

        // when scrolling the site title scrolls to top with page and then becomes fixed 
        $(window).scroll(sticky_relocate);
        sticky_relocate();
    }

});

var dir = 1;
var MIN_TOP = 200;
var MAX_TOP = 350;

function autoscroll() {
    var window_top = $(window).scrollTop() + dir;
    if (window_top >= MAX_TOP) {
        window_top = MAX_TOP;
        dir = -1;
    } else if (window_top <= MIN_TOP) {
        window_top = MIN_TOP;
        dir = 1;
    }
    $(window).scrollTop(window_top);
    window.setTimeout(autoscroll, 100);
}