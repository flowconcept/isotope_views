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
          layoutMode: 'masonry',
          masonry: {
            columnWidth: '.grid-sizer'
          }
        });

      if ($grid.length) {
        //****************************
        // Isotope Load more button
        //****************************
        var initShow = 4; //number of items loaded on init & onclick load more button
        var counter = initShow; //counter for load more button
        var isotope = $grid.data('isotope'); // get Isotope instance

        loadMore(initShow); //execute function onload


        //append load more button
        $grid.after('<button type="button" class="btn btn-default btn-lg" id="isotope-load-more"> Load More</button>');

        //when load more button clicked
        $("#isotope-load-more").click(function () {
          counter = counter + initShow;

          loadMore(counter);
          $grid.isotope('layout');
        });
      }

      function loadMore(toShow) {

        var shownElems = isotope.filteredItems.slice(0, toShow).map(function (item) {
          return item.element;
        });
        $(shownElems).removeClass('hidden');
        $grid.isotope('layout');

        //when no more to load, hide show more button
        if ($grid.find(".hidden").length == 0) {
          $("#isotope-load-more").hide();
        }
      };

      var timer;

      // Repaint layout
      var layout = function () {
        if (timer) {
          clearTimeout(timer);
        }
        // iOS Safari requires 72msec delay, why?
        timer = setTimeout(function () {
          $grid.isotope('layout');
        }, 72);
      };

      // Attach to imageloaded and flexslider events
      $grid.imagesLoaded().progress(layout);
      // $grid.on('flexslider-init', layout);

    }
  };

})(jQuery, Drupal);
