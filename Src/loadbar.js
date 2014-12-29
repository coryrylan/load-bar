/*
 * Load-Bar https://github.com/splintercode/load-bar
 * MIT License
 * Cory Bateman
 */

(function($) {
    'use strict';

    var methods = {
        init: function(options) {
            var opts = $.extend({}, $.fn.loadbar.defaults, options);

            var template = [
              '<div class="loading-bar">',
                '<div class="loading-bar__inner" role="progressbar" aria-valuenow="0" aria-valuemin="0" aria-valuemax="100"></div>',
              '</div>'
            ].join('');

            this.html(template);

            return this;
        },
        update: function(percentage, options) {
            var $elm = this.find('.loading-bar');
            $elm.find('.loading-bar__inner').attr('aria-valuenow', percentage);

            $elm.find('.loading-bar__inner').stop().animate({ left: '-' + (100 - percentage) + '%' }, 600, function() {
                if (percentage === 100 && options.fade) {
                    $elm.delay(300).fadeOut(300);

                    setTimeout(function() {
                        $elm.find('.loading-bar__inner').css({ left: '-100%' });
                        $elm.find('.loading-bar__inner').attr('aria-valuenow', 0);
                    }, 600);
                }
            });
        }
    };

    $.fn.loadbar = function(methodOrOptions) {
        if (methods[methodOrOptions]) {
            return methods[methodOrOptions].apply(this, Array.prototype.slice.call(arguments, 1));
        } else if (typeof methodOrOptions === 'object' || !methodOrOptions) {
            // Default to "init"
            return methods.init.apply(this, arguments);
        } else {
            $.error('Method ' + methodOrOptions + ' does not exist on jQuery.loadbar');
        }
    };

    // May remove
    $.fn.loadbar.defaults = {
        loadingText: 'Loading...',
        completeText: 'Complete!'
    };
}(jQuery));
