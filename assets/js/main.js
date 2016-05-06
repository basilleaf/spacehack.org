$(function() {

  sh.adjust_grid_fonts();

  $('.header').scrollToFixed({
      postFixed: function() { 
        $(this).css('background-color', 'transparent'); 
      },
      preFixed: function() { 
        $(this).css('background-color', 'black'); 
      }
  });

});

var sh = {

  adjust_grid_fonts: function() {

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
    }
  },

}