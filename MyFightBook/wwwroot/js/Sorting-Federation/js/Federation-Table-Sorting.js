(function ($) {

    'use strict';

    var isAscending = true;

    var methods = {
        init: function () {
            $("#clubImg").attr("src", "/images/AscendingImage.png");
            var $this = this;
            return this.find('thead th').each(function (x) {
                var th = $(this);
                (function (i) {
                    $(th).bind('click', function () {
                        sortListener(i, $this);
                    }).css('cursor', 'pointer');
                })(x);
            });
        },
        destroy: function () {
            return this.find('thead th').each(function () {
                $(this).unbind();
            })
        }
    }

    $.fn.sortTable = function (method) {
        if (methods[method]) {
            return methods[method].apply(this, Array.prototype.slice.call(arguments, 1));
        } else if (typeof method == 'object' || !method) {
            return methods.init.apply(this, arguments);
        } else {
            $.error('This method ' + method + ' is absent.');
        }
    }

    function sortListener(i, $this) {
        try {

            var rows = $($this).find('tbody tr').not(".loading__animate--box").clone();

            rows.sort(function (a, b) {
                var tdFirst = $(a).find('td')[i];
                var valueFirst = tdFirst.innerText.toLowerCase();
                var tdSecond = $(b).find('td')[i];
                var valueSecond = tdSecond.innerText.toLowerCase();
                if (valueFirst > valueSecond) {
                    return (isAscending) ? 1 : -1;
                } else if (valueFirst == valueSecond) {
                    return 0;
                } else {
                    return (isAscending) ? -1 : 1;
                }
            });
            isAscending = !isAscending;

            //Set Image According Order
            if (!isAscending && i == 0) {
                $("#nameImg").attr("src", "/images/AscendingImage.png");
            }
            else if (isAscending && i == 0) {
                $("#nameImg").attr("src", "/images/DescendingImage.jpg");
            }
            else {
                $("#nameImg").attr("src", "/images/AscDesImage.png");
            }

            if (!isAscending && i == 1) {
                $("#weightImg").attr("src", "/images/AscendingImage.png");
            }
            else if (isAscending && i == 1) {
                $("#weightImg").attr("src", "/images/DescendingImage.jpg");
            }
            else {
                $("#weightImg").attr("src", "/images/AscDesImage.png");
            }

            if (!isAscending && i == 2) {
                $("#fightImg").attr("src", "/images/AscendingImage.png");
            }
            else if (isAscending && i == 2) {
                $("#fightImg").attr("src", "/images/DescendingImage.jpg");
            }
            else {
                $("#fightImg").attr("src", "/images/AscDesImage.png");
            }

            if (!isAscending && i == 3) {
                $("#clubImg").attr("src", "/images/AscendingImage.png");
            }
            else if (isAscending && i == 3) {
                $("#clubImg").attr("src", "/images/DescendingImage.jpg");
            }
            else {
                $("#clubImg").attr("src", "/images/AscDesImage.png");
            }

            if (!isAscending && i == 4) {
                $("#fedImg").attr("src", "/images/AscendingImage.png");
            }
            else if (isAscending && i == 4) {
                $("#fedImg").attr("src", "/images/DescendingImage.jpg");
            }
            else {
                $("#fedImg").attr("src", "/images/AscDesImage.png");
            }


            $($this).find('tbody tr').not(".loading__animate--box").remove();
            
            if (($this).find('tbody tr.loading__animate--box').length > 0) {
                $($this).find('tbody tr.loading__animate--box').before(rows);
            }
            else {
                $($this).find('tbody').append(rows);
            }
        }
        catch {
            console.log("Please wait...Users list still loading.");
        }
    }

})(jQuery);