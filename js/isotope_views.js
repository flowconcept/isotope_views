(function($, Drupal) {
  "use strict";

  /**
   * Isotope layout.
   */
  Drupal.behaviors.isotope = {
    attach: function(context, settings) {
      var $grid = $('.isotope-grid', context)
        .once('isotope-processed')
        .isotope({
          itemSelector: '.grid-item',
          percentPosition: true,
          masonry: {
            columnWidth: '.grid-sizer'
          }
        });

      var timer;

      // Repaint layout
      var layout = function() {
        if (timer) {
          clearTimeout(timer);
        }
        // iOS Safari requires 72msec delay, why?
        timer = setTimeout(function() {
          $grid.isotope('layout');
        }, 72);
      };

      // Attach to imageloaded and flexslider events
      $grid.imagesLoaded().progress(layout);
      // $grid.on('flexslider-init', layout);
    }
  };

})(jQuery, Drupal);
