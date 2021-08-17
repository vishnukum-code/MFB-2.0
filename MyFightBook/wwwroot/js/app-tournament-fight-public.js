var createFightMixing = function () {
    var init = function () {
        bindData();
        $(".loader-1").show();
        $(window).load(function () {
            $(".loader-1").hide();
        });
    },
        bindData = function () {
            $.each($(".Draw-Sec"), function () {
                loadData($(this));
            });
        },
        loadData = function ($this) {
            var url = $this.attr("data-url");
            $.ajax({
                url: url,
                type: 'get',
                success: function (html) {
                    $this.removeClass('waiting');
                    $this.html(html);
                    $(".scrollbar-dynamic")
                        .niceScroll(
                            {
                                cursorwidth: "4px",
                                cursorcolor: "#44464a",
                                cursorborder: "1px solid #44464a"
                            });

                    $(".scrollbar-dynamic").mouseover(function () {
                        $(".scrollbar-dynamic").getNiceScroll().resize();
                    });
                    setTourBoxes($this);
                    statisticsPopup();
                }
            });
        },
        statisticsPopup = function () {
            $(".statisticsBtn").click(function () {
                var bodyContent = $(this).closest(".FighterDetail").find(".statistics-block").html();
                console.log(bodyContent);
                $("#FighterStatistics .fighter-statistics-list").html(bodyContent);
                $("#FighterStatistics").modal('show');
            });
            $("#FighterStatistics").modal('hide');
        },
        setTourBoxes = function ($this) {
            var TotalH = 0, TotalW = 0;
            $this.find(".MainSec.FBlock .Draw-Block").each(function () {
                $(this).css({ "top": TotalH });
                TotalH += $(this).outerHeight(true);
            });

            var num = $this.find(".MainSec").length;
            let width = $this.find(".MainSec .Draw-Block").width();
            TotalW = (width * num) + (75 * num);

            $this.height(TotalH - ($this.find(".MainSec.FBlock .Draw-Block").length * 3));
            $this.width(TotalW);

            var i = 0, j = 0;
            for (let c = 0; c < $this.find(".MainSec.SBlock .Draw-Block").length; c++) {
                i = 0;
                $this.find(".MainSec.SBlock:eq(" + c + ") .Draw-Block").each(function () {
                    let fBlock;
                    let sBlock;
                    if (j === 0) {
                        fBlock = $this.find(".MainSec.FBlock .Draw-Block").eq(i++);
                        sBlock = $this.find(".MainSec.FBlock .Draw-Block").eq(i++);
                    }
                    else {
                        fBlock = $this.find(".MainSec.SBlock:eq(" + (j - 1) + ") .Draw-Block").eq(i++);
                        sBlock = $this.find(".MainSec.SBlock:eq(" + (j - 1) + ") .Draw-Block").eq(i++);
                    }

                    $(this).css({ "display": "block" });

                    let fDraw = fBlock.position().top;
                    let sDraw = sBlock.position().top;

                    let topC = fDraw + fBlock.find('.main-block').eq(1).position().top;
                    let bottomC = sDraw + sBlock.find('.main-block').eq(1).position().top;

                    let center = (bottomC - topC) / 2;

                    let fBlockMainSec = fBlock.find(".main-block").eq(0).outerHeight(true);
                    let sBlockMainSec = $(this).find(".main-block").eq(0).outerHeight(true);

                    let centerTop = fBlockMainSec + center + fDraw - sBlockMainSec;
                    let svgTop = topC;
                    if (c == 0) {
                        centerTop -= ((i - 1) * 4);
                        svgTop = svgTop - ((i - 1) * 4);
                    }
                    $(this).css({ "top": centerTop });

                    svg = "<svg xmlns='http://www.w3.org/2000/svg' width='41.816' height='472.451' viewBox='0 0 41.816 472.451' style='height:" + (bottomC - topC) + "px;top: " + (svgTop) + "px;'><defs><style>.a{fill:none;stroke:#e3e5ea;}</style></defs><g transform='translate(-1157.641 -384.91)'><path class='a' d='M-16474.016-16834.727s31.129,29.465,21.865,113.344c-14.826,90.592,19.268,122.252,19.268,122.252' transform='translate(17632 17220)'/><path class='a' d='M-16474.016-16599.129s31.129-29.465,21.865-113.346c-14.826-90.59,19.268-122.25,19.268-122.25' transform='translate(17632 17456.127)'/></g></svg>"
                    $(this).before(svg);
                });
                j++;
            }
        };
    return {
        init: init
    };
}();