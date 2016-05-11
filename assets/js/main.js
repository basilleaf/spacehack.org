$(function() {

  sh.adjust_grid_fonts(); // adjusts font for project titles that are too big for their circles

  // makes entire grid box clickable (sans js only circle is clickable)
  $('.project-box').click(function() {
    window.location.href = $(this).find('a').attr('href');
  });

  // infinite scroll style lazy loading on homepage 
  $('.project-grid').jscroll({
    nextSelector: 'a.next:last',
    padding:200,
    callback: function() {
      $('a.next').remove();  // it was getting confused
    }
  });

  // handle the sticky header
  if(sh.isPositionSticky('.header')) {
    // we can just use css position sticky yay!: just need to handle
    // extra styling on the header when it is fixed
    window.setInterval(function() { sh.fixedHeaderstyle(); }, 200);

  } else {
    // this browser does not suppoer position sticky, 
    // init scrollToFixed plugin 
    $('.header').scrollToFixed({
        postFixed: function() { 
          $('.tagline').css('margin-top', '200px'); 
          $(this).css('margin-top', '-200px'); 
          $(this).css('background-color', 'transparent'); 
          dontSetWidth: true;
          marginTop:0;
          },
        preFixed: function() { 
          $('.tagline').css('margin-top', '0'); 
          $(this).css('margin-top', 0); 
          // $(this).css('background-color', 'black'); 
          $(this).animate({
            backgroundColor: "black",
          }, 300);
          dontSetWidth: true
          marginTop:0;
        },
    }); // scrollToFixed init
  } // end else position sticky 
}); // on page load 



var sh = {

  header_is_fixed: false,

  isPositionSticky: function(selector){
      // does this browser support position: sticky 
      // via https://github.com/bigspotteddog/ScrollToFixed/issues/100
      return ($.inArray($(selector).css('position'), ['-webkit-sticky', '-moz-sticky', '-ms-sticky', '-o-sticky', 'sticky']) != -1);
  }, 

  getScrollTop: function() {
      scrolltop = $(document).scrollTop();
      return scrolltop;
  }, 

  fixedHeaderstyle: function(scrolltop) {
    // when scroll top is 30px (50px position header minus 20px padding)
    // turn the background black, else transparent 
    scrolltop = sh.getScrollTop();

    if (scrolltop > 29) {
      // page has scrolled so header we infer should be fixed 
        if (!sh.header_is_fixed) {
          sh.header_is_fixed = true;        
          $('header').addClass('black',300);
        }
    } else  {
      // scroll is less than 30, header is released
        if (sh.header_is_fixed) {
          sh.header_is_fixed = false;        
          $('header').removeClass('black');
        }
      }
  },

  adjust_grid_fonts: function() {
    // some projects have long titles and need a bit smaller
    // font when displayed in homepage grid circles 
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