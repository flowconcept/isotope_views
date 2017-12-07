(function($, Drupal) {
    "use strict";

    /**
     * Isotope layout.
     */
    Drupal.behaviors.isotope = {
        attach: function(context, settings) {
            $('.isotope-grid', context)
                .not('.isotope-attached')
                .addClass('isotope-attached')
                .each(function () {

                    var $grid = $(this),
                        settings = $(this).data('isotopesettings');

                    $grid.isotope({
                        itemSelector: '.grid-item',
                        percentPosition: true,
                        layoutMode: 'masonry',
                        masonry: {
                            columnWidth: '.grid-sizer'
                        }
                    });


                    if ($grid.length && settings.use_load_more) {
                        //****************************
                        // Isotope Load more button
                        //****************************
                        var initShow = parseInt(settings.initial_number_of_items); //number of items loaded on init & onclick load more button
                        var counter = initShow; //counter for load more button
                        var isotope = $grid.data('isotope'); // get Isotope instance

                        showMoreItems(initShow); //execute function onload

                        if (initShow < isotope.items.length) {
                            //append load more button
                            $grid.after('<div class="col-xs-12 text-center"><button type="button" class="btn btn-default btn-lg isotope-load-more">' + Drupal.t('Load More') + '</button></div>');

                            //when load more button clicked
                            $(".isotope-load-more", context).on('click', function () {
                                var parent = $(this).parents('.view-gallery-images');

                                showMoreItems(parent);
                                // loadMore(counter);
                                $grid.isotope('layout');
                            });
                        }

                    }

                    function showMoreItems(parent) {
                        if (isNaN(parent)) {
                            parent.find('.hidden').removeClass('hidden');
                            parent.find('.isotope-load-more').hide();
                        } else {
                            var shownElems = isotope.filteredItems.slice(0, parent).map(function (item) {
                                return item.element;
                            });
                            $(shownElems).removeClass('hidden');
                            $grid.isotope('layout');
                        }
                    }

                    var timer;

                    // Repaint layout
                    var layout = function (e) {
                        if (timer) {
                            clearTimeout(timer);
                        }
                        // iOS Safari requires 72msec delay, why?
                        timer = setTimeout(function () {
                            $grid.isotope('layout');
                        }, 72);
                    };

                    // Attach to lazloader and flexslider events
                    $grid.on('lazybeforeunveil', layout);
                    $grid.on('flexslider-init', layout);
                });
        }
    };

})(jQuery, Drupal);

