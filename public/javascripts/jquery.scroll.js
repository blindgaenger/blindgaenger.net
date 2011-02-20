/**
 * detects scrolling anchors (resp. something with an `id`) and fires the callback
 */
(function($){
  
  $.fn.anchorScroll = function(callback) {
    $.contextAnchors = $(this).filter('[id]')
    
    $(window).scroll(function(){
      var scrollOffset = $(this).scrollTop();
      var viewportHeight = $(this).height();
      $.contextAnchors.filter(function() {
        var anchor = $(this);
        if (scrollOffset >= anchor.offset().top - viewportHeight/2) {
          if (scrollOffset <= anchor.offset().top + anchor.outerHeight(true)) {
            return true
          }
        }
        return false
      }).each(callback);
    }) // window#scroll
    
  }; // anchorScroll

})(jQuery);
