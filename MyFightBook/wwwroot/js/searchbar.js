var appSearchBar = function () {
    var init = function () {
        bindFn();
    },
        bindFn = function () {
            var searchFedBlockHtml = $(".fed-block").html();
            searchFedBlockHtml = "<div class='fed-block mobile'>" + searchFedBlockHtml + "</div>";
            $(".right-section .top-sec").after(searchFedBlockHtml);

            $('.fed-block #SerchBoxFederationId').selectpicker({
                noneSelectedText: "Select Federation"
            });

            $(".fed-block.desktop").on("shown.bs.dropdown", function (e) {
                app.applyNiceScroll($(this).find(".dropdown-menu > .inner"));
                // nicelist.show().resize();
            });

            bindNiceScroll();

            $('.fed-block #SerchBoxFederationId').change(function () {
                if ($(this).val() == null) {
                    $("#SelectedFedIds").val("");
                }
                else {
                    $("#SelectedFedIds").val($(this).val().toString());
                }
            });

            $(window).resize(function () {
                if ($(this).width() > 991) {
                    $(".fed-block.mobile #SerchBoxFederationId option").prop("selected", false);
                    $('.fed-block.mobile #SerchBoxFederationId').selectpicker("refresh");
                }
                else {
                    $(".fed-block.desktop #SerchBoxFederationId option").prop("selected", false);
                    $('.fed-block.desktop #SerchBoxFederationId').selectpicker("refresh");
                }
            });
        },
        bindNiceScroll = function () {
            $(".fed-block.mobile").on("shown.bs.dropdown", function (e) {
                app.applyNiceScroll($(this).find(".dropdown-menu > .inner"));
                // nicelist.show().resize();
            });
        };
    return {
        init: init
    };
}();