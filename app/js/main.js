//Services section grid
var grid = document.querySelector('.service-inner');
var msnry = new Masonry(grid, {
  itemSelector: '.image',
  columnWidth: 430,
  gutter: 85
});

//Reviews section grid
var grid = document.querySelector('.reviews-inner');
var msnry = new Masonry(grid, {
  itemSelector: '.reviews-item',
  columnWidth: 335,
  gutter: 85
});

// Анимация слайдов
jQuery(function($) {
  var options = {
    slideSpeed: 850,
    directionThreshold: 0,
    easing: 'easeInOutQuad',
    $menu: $('.page-wrapper .ui-menu'),
    onSnapStart: function($target) {
      setTimeout(function() {
        $('.ui-menu').removeClass('full-screen-menu');
      }, 300);
      $('.ui-menu').removeClass('is-active').addClass('hide');
      $(".ui-menu-button").removeClass('is-active');

      let subpanel = $target[0].dataset.subpanel,
        main = $target[0].dataset.main,
        gridmenu = $target[0].dataset.gridmenu,
        $submenu = $('.page-wrapper .ui-side-points');
      $mainmenu = $('.page-wrapper .ui-menu'),
      $menuGrid = $('#categories-nav-inner');
      if (typeof main != 'undefined') {
        $mainmenu.addClass('hide');
      } else {
        $mainmenu.removeClass('hide');
      }

      if (typeof subpanel == 'undefined') { //Если нет атрибута  data-subpanel="n%"
        $submenu.addClass('hide fadeOutRight'); //Убрать боковое меню
        $submenu.removeClass('fadeInRight');
      } else { //Если есть атрибут  data-subpanel="n%"
        $submenu.removeClass('hide fadeOutRight'); //Добавить боковое меню
        $submenu.addClass('fadeInRight');
      }

      if (typeof gridmenu == 'undefined') {
        $menuGrid.addClass('hide');
      } else {
        $menuGrid.removeClass('hide');
        $menuGrid.addClass('is-active');
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

// Hamburger menu openCategory
$(function() {
  let $mainmenu = $('.ui-menu');

  $(".ui-menu-button").on('click', function() {
    if ($mainmenu.hasClass('full-screen-menu')) {
      setTimeout(function() {
        $mainmenu.removeClass('full-screen-menu');
      }, 300);
      $mainmenu.removeClass('is-active').addClass('hide');
      $(this).removeClass('is-active');
    } else {
      $mainmenu.addClass('full-screen-menu').addClass('is-active').removeClass('hide');
      $(this).addClass('is-active');
    }
  });

});

// Слайды и табы в меню
var $carousel = $('.carousel').flickity({prevNextButtons: false});

$('.carousel').flickity('resize');

$('.control-buttons-prev').on('click', function() {
  $carousel.flickity('previous');
});

$('.control-buttons-next').on('click', function() {
  $carousel.flickity('next');
});

var $carouselNav = $('.carousel-nav');
var $carouselNavCells = $carouselNav.find('.carousel-cell');

$carouselNav.on('click', '.carousel-cell', function(event) {
  var index = $(event.currentTarget).index();
  $carousel.flickity('select', index);
});

var flkty = $carousel.data('flickity');
var navTop = $carouselNav.position().top;
var navCellHeight = $carouselNavCells.height();
var navHeight = $carouselNav.height();

$carousel.on('select.flickity', function() {
  // set selected nav cell
  $carouselNav.find('.is-nav-selected').removeClass('is-nav-selected');
  var $selected = $carouselNavCells.eq(flkty.selectedIndex).addClass('is-nav-selected');
  // scroll nav
  var scrollY = $selected.position().top + $carouselNav.scrollTop() - (navHeight + navCellHeight) / 2;
  $carouselNav.animate({scrollTop: scrollY});
});

//Menu products

function mobilecheck() {
  var check = false;
  (function(a) {
    if (/(android|ipad|playbook|silk|bb\d+|meego).+mobile|avantgo|bada\/|blackberry|blazer|compal|elaine|fennec|hiptop|iemobile|ip(hone|od)|iris|kindle|lge |maemo|midp|mmp|netfront|opera m(ob|in)i|palm( os)?|phone|p(ixi|re)\/|plucker|pocket|psp|series(4|6)0|symbian|treo|up\.(browser|link)|vodafone|wap|windows (ce|phone)|xda|xiino/i.test(a) || /1207|6310|6590|3gso|4thp|50[1-6]i|770s|802s|a wa|abac|ac(er|oo|s\-)|ai(ko|rn)|al(av|ca|co)|amoi|an(ex|ny|yw)|aptu|ar(ch|go)|as(te|us)|attw|au(di|\-m|r |s )|avan|be(ck|ll|nq)|bi(lb|rd)|bl(ac|az)|br(e|v)w|bumb|bw\-(n|u)|c55\/|capi|ccwa|cdm\-|cell|chtm|cldc|cmd\-|co(mp|nd)|craw|da(it|ll|ng)|dbte|dc\-s|devi|dica|dmob|do(c|p)o|ds(12|\-d)|el(49|ai)|em(l2|ul)|er(ic|k0)|esl8|ez([4-7]0|os|wa|ze)|fetc|fly(\-|_)|g1 u|g560|gene|gf\-5|g\-mo|go(\.w|od)|gr(ad|un)|haie|hcit|hd\-(m|p|t)|hei\-|hi(pt|ta)|hp( i|ip)|hs\-c|ht(c(\-| |_|a|g|p|s|t)|tp)|hu(aw|tc)|i\-(20|go|ma)|i230|iac( |\-|\/)|ibro|idea|ig01|ikom|im1k|inno|ipaq|iris|ja(t|v)a|jbro|jemu|jigs|kddi|keji|kgt( |\/)|klon|kpt |kwc\-|kyo(c|k)|le(no|xi)|lg( g|\/(k|l|u)|50|54|\-[a-w])|libw|lynx|m1\-w|m3ga|m50\/|ma(te|ui|xo)|mc(01|21|ca)|m\-cr|me(rc|ri)|mi(o8|oa|ts)|mmef|mo(01|02|bi|de|do|t(\-| |o|v)|zz)|mt(50|p1|v )|mwbp|mywa|n10[0-2]|n20[2-3]|n30(0|2)|n50(0|2|5)|n7(0(0|1)|10)|ne((c|m)\-|on|tf|wf|wg|wt)|nok(6|i)|nzph|o2im|op(ti|wv)|oran|owg1|p800|pan(a|d|t)|pdxg|pg(13|\-([1-8]|c))|phil|pire|pl(ay|uc)|pn\-2|po(ck|rt|se)|prox|psio|pt\-g|qa\-a|qc(07|12|21|32|60|\-[2-7]|i\-)|qtek|r380|r600|raks|rim9|ro(ve|zo)|s55\/|sa(ge|ma|mm|ms|ny|va)|sc(01|h\-|oo|p\-)|sdk\/|se(c(\-|0|1)|47|mc|nd|ri)|sgh\-|shar|sie(\-|m)|sk\-0|sl(45|id)|sm(al|ar|b3|it|t5)|so(ft|ny)|sp(01|h\-|v\-|v )|sy(01|mb)|t2(18|50)|t6(00|10|18)|ta(gt|lk)|tcl\-|tdg\-|tel(i|m)|tim\-|t\-mo|to(pl|sh)|ts(70|m\-|m3|m5)|tx\-9|up(\.b|g1|si)|utst|v400|v750|veri|vi(rg|te)|vk(40|5[0-3]|\-v)|vm40|voda|vulc|vx(52|53|60|61|70|80|81|83|85|98)|w3c(\-| )|webc|whit|wi(g |nc|nw)|wmlb|wonu|x700|yas\-|your|zeto|zte\-/i.test(a.substr(0, 4)))
      check = true
  })(navigator.userAgent || navigator.vendor || window.opera);
  return check;
}(function() {

  function scrollY() {
    return window.pageYOffset || docElem.scrollTop;
  }

  var docElem = window.document.documentElement,
    // support transitions
    support = Modernizr.csstransitions,
    // transition end event name
    transEndEventNames = {
      'WebkitTransition': 'webkitTransitionEnd',
      'MozTransition': 'transitionend',
      'OTransition': 'oTransitionEnd',
      'msTransition': 'MSTransitionEnd',
      'transition': 'transitionend'
    },
    transEndEventName = transEndEventNames[Modernizr.prefixed('transition')],
    docscroll = 0,
    // click event (if mobile use touchstart)
    clickevent = mobilecheck()
      ? 'touchstart'
      : 'click';

  function init() {
    var showMenu = document.getElementById('showMenu'),
      perspectiveWrapper = document.getElementById('perspective'),
      container = perspectiveWrapper.querySelector('.container'),
      contentWrapper = container.querySelector('.menu-products-wrapper');

    showMenu.addEventListener(clickevent, function(ev) {
      ev.stopPropagation();
      ev.preventDefault();
      docscroll = scrollY();
      // change top of contentWrapper
      contentWrapper.style.top = docscroll * -1 + 'px';
      // mac chrome issue:
      document.body.scrollTop = document.documentElement.scrollTop = 0;
      // add modalview class
      classie.add(perspectiveWrapper, 'modalview');
      // animate..
      setTimeout(function() {
        classie.add(perspectiveWrapper, 'animate');
      }, 25);
    });

    container.addEventListener(clickevent, function(ev) {
      if (classie.has(perspectiveWrapper, 'animate')) {
        var onEndTransFn = function(ev) {
          if (support && (ev.target.className !== 'container' || ev.propertyName.indexOf('transform') == -1))
            return;
          this.removeEventListener(transEndEventName, onEndTransFn);
          classie.remove(perspectiveWrapper, 'modalview');
          // mac chrome issue:
          document.body.scrollTop = document.documentElement.scrollTop = docscroll;
          // change top of contentWrapper
          contentWrapper.style.top = '0px';
        };
        if (support) {
          perspectiveWrapper.addEventListener(transEndEventName, onEndTransFn);
        } else {
          onEndTransFn.call();
        }
        classie.remove(perspectiveWrapper, 'animate');
      }
    });

    perspectiveWrapper.addEventListener(clickevent, function(ev) {
      return false;
    });
  }

  init();

})();

// Menu grid view tabs
function openCategory(evt, сategoryName) {

  // Highlight active item in menu
  var ind = index(evt.currentTarget);
  $(".tablink").removeClass('is-nav-selected');
  $("#categories-nav").children().eq(ind).addClass("is-nav-selected");
  $("#outer-nav").children().eq(ind).addClass("is-nav-selected");

  // Hide and show active class from all tabs
  $(".category").hide();
  $(".category#" + сategoryName).show();

  // Jump to menu
  var checkOuterNav = evt.currentTarget.parentNode.className.indexOf('outer-nav');
  perspectiveWrapper = document.getElementById('perspective');
  menuGridView = document.getElementById('menu-products-grid');
  if (checkOuterNav > -1) {
    classie.remove(perspectiveWrapper, 'animate');
    setTimeout(function() {
      menuGridView.scrollIntoView(top);
    }, 250);
  }
};

// Product menu grid view button change view
$(function() {
  $("#ui-product-menu-control").on('click', function() {
    var $target = $("#product-card");
    $('.page-wrapper').panelSnap('snapToPanel', $target);
  });
});

// Career page button scroll to vacancies
$(function() {
  $("#career-button").on('click', function() {
    var $target = $("#vacancies");
    $('.page-wrapper').panelSnap('snapToPanel', $target);
  });
});

// Animation blocks in view
inView('.in-view').on('enter', function(el) {
  el.classList.add('is-active')
}).on('exit', function(el) {
  el.classList.remove('is-active');
});

// Add class and button for long reviews
$(".reviews-item").each(function() {
  var $text = $(this).find(".reviews-item-description");
  if ($text.text().length > 110) {
    $text.addClass('is-less');
    $(this).append('<button class="neutral-button show-more">Читать подробнее</button>');
  }
});

// Show/hide long reviews
$(".show-more").on('click', function(e) {
  var $text = $(this).prev('p');
  $text.toggleClass('is-less');
  if ($text.hasClass('is-less')) {
    $(this).text('Читать подробнее');
  } else {
    $(this).text('Свернуть');
  }
});

function index(el) {
  var children = el.parentNode.children,
    i = 0;
  for (; i < children.length; i++) {
    if (children[i] == el) {
      return i;
    }
  }
  return -1;
};

// News load
$(function() {
  $(".news-item").slice(0, 4).show();
  $("#load-more-news").on('click', function() {
    let $that = $(this);
    $(".news-inner div:hidden").slice(0, 4).slideDown();
    if ($(".news-item").find($("div:hidden")).length == 0) {
      $("#load-more-news").addClass('disable');
    }
  });
});

$(document).ready(function() {
    updateTextFields();
  });

// $("[data-fancybox="modal"]").fancybox({
// 		defaults = {
//       arrows : false
//     }
// });

$('#textarea1').val('');
$('#textarea1').trigger('autoresize');

$('[data-fancybox="modal"]').fancybox({arrows: false, modal: true});
