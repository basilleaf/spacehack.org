$(function() {

  sh.adjust_grid_fonts(); // adjusts font for project titles that are too big for their circles

  // makes entire grid box clickable (sans js only circle is clickable)
  $('.project-box').click(function() {
    window.location.href = $(this).find('a').attr('href');
  });

  // fix the header to the top when it scrolls there
  $('.header').scrollToFixed({
      postFixed: function() { 

        $('.tagline').css('margin-top', '-30px'); 
        $(this).css('background-color', 'transparent'); 

      },
      preFixed: function() { 

        $('.tagline').css('margin-top', '-10px'); 
        $(this).css('background-color', 'black'); 

        /*
        if you want to animate the change of header from transparent to black:
        $(this).animate({
          backgroundColor: "black",
          background: "black",
        }, 300);
        */

      }
  });

});

var sh = {

  adjust_grid_fonts: function() {

    if ($('.project-grid').length) {
      // do any of our homepage grid project titles need smaller font? 
      var min_length = 18;  // if title larger than this then shrink its font
      var new_font_size = "1.8em"; 
      for (var k in site_posts) {  /* found in head.html */
        title_slug = site_posts[k]['title_slug'];
        if (title_slug.length > min_length) {
            // this project title is too long, make it use smaller font 
            $('.project .circle h2.' +  title_slug).css({"font-size": new_font_size});
        }
      }
    }
  },

}