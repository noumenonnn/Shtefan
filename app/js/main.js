var wow = new WOW({
  boxClass: 'wow', // animated element css class (default is wow)
  animateClass: 'animated', // animation css class (default is animated)
  offset: 0, // distance to the element when triggering the animation (default is 0)
  mobile: true, // trigger animations on mobile devices (default is true)
  live: true, // act on asynchronously loaded content (default is true)
  callback: function(box) {
    // the callback is fired every time an animation is started
    // the argument that is passed in is the DOM node being animated
  },
  scrollContainer: null // optional scroll container selector, otherwise use window
});
wow.init();
console.log(wow);

jQuery(function($) {
  var options = {
    slideSpeed: 1000,
    directionThreshold: 0,
    easing: 'easeInOutQuad',
    $menu: $('.page-wrapper .ui-menu'),
    onSnapFinish: function($target) {

      let subpanel = $target[0].dataset.subpanel,
        $submenu = $('.page-wrapper .ui-side-points');
      if (typeof subpanel == 'undefined') {
        $submenu.addClass('hide');
      } else {
        $submenu.removeClass('hide');
      }
      $('.line a', $submenu).removeClass('active');
      $(' .line:eq(' + subpanel + ') a', $submenu).addClass('active');
    }
  };
  $('.page-wrapper').panelSnap(options);
  $('.page-wrapper .ui-side-points .line a').on('click', function(e) {
    e.preventDefault();
    let num = $(this).parent('.line').index();
    $target = $('.page-wrapper .screen[data-subpanel=' + num + ']');
    $('.page-wrapper').panelSnap('snapToPanel', $target);
  })
});
