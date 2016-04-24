$(function() {

    if ($('.project-grid').length) {

        // when scrolling the site title scrolls to top with page and then becomes fixed 
        $(window).scroll(sh.sticky_relocate);
        sh.sticky_relocate();

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

    }

});

var sh = {

    /* adapted from http://jsfiddle.net/qB4Z2/ */
    sticky_relocate: function() {
        var window_top = $(window).scrollTop();
        var div_top = $('#sticky-anchor').offset().top;
        if (window_top > div_top) {
            // make the top banner stick to top
            $('#sticky').addClass('stick');
            $('.hero-image').removeClass('top_margin_adjust');
            // $('#sticky-anchor').height($('#sticky').outerHeight());
        } else {
            // make the top banner go back to it's floaty place
            $('.hero-image').addClass('top_margin_adjust');
            $('#sticky').removeClass('stick');
            // $('#sticky-anchor').height(0);
        }
    },

}