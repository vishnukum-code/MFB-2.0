
(function ($) {
    $.fn.resizeBox = function () {
        var pH = 0, nH = 0;
        if ($(this).length > 1) {
            $(this).each(function () {
                var $target = $(this);
                nH = $target.height();
                if (pH < nH) {
                    pH = nH;
                }
            });

            $(this).css("height", pH);
        }
    };

    $.fn.resizeBoxWithOuterHeight = function () {
        var pH = 0, nH = 0;
        if ($(this).length > 1) {
            $(this).each(function () {
                var $target = $(this);
                nH = $target.outerHeight();
                if (pH < nH) {
                    pH = nH;
                }
            });

            console.log(pH);
            $(this).css("height", pH);
        }
    };
})(jQuery);