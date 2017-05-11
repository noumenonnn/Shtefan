// init with element
var grid = document.querySelector('.service-inner');
var msnry = new Masonry( grid, {
  // options...
  itemSelector: '.image',
  columnWidth: 430,
  gutter: 85
});

wow = new WOW(
  {
    animateClass: 'animated',
    offset: 100
  }
);
wow.init();

jQuery(function($) {
  var options = {
    slideSpeed: 850,
    directionThreshold: 0,
    easing: 'easeInOutQuad',
    $menu: $('.page-wrapper .ui-menu'),
    onSnapFinish: function($target) {

      let subpanel = $target[0].dataset.subpanel,
        $submenu = $('.page-wrapper .ui-side-points');
        $mainmenu = $('.page-wrapper .ui-menu');
      if (typeof subpanel == 'undefined') {
        $submenu.addClass('hide fadeOutRight');
        $submenu.removeClass('fadeInRight');
        $mainmenu.addClass('hide fadeOutUp');
        $mainmenu.removeClass('fadeInDown');
      } else {
        $submenu.removeClass('hide fadeOutRight');
        $submenu.addClass('fadeInRight');
        $mainmenu.removeClass('hide fadeOutUp');
        $mainmenu.addClass('fadeInDown');
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
