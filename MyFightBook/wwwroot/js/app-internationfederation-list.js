var listInternationalFederation = function () {
    var init = function () {
        bindFn();
    },
        bindFn = function () {
            $("#SortBy").change(function () {
                bindData();
            });

            $('#SortBy .dropdown-item').click(function () {
                $('.sorting-list #dropdownMenuButton').text($(this).text());
                $('#SortByOption').val($(this).data('val'));
                bindData();
            });

            bindData();

            $('.all-sport .dropdown-menu .dropdown-item').click(function () {
                $('.all-sport #dropdownMenuButton').text($(this).text());
                $("#SelectedSportId").val($(this).data('val'));
                bindData();
            });
            $('.all-data').click(function () {
                $('.all-sport #dropdownMenuButton').text("All sports");
                $("#SelectedSportId").val("");
                $('.sorting-list #dropdownMenuButton').text("Name Ascending");
                $('#SortByOption').val("NameAscending");
                bindData();
            });
        },
        bindData = function () {
            app.showLoader();
            var sortby = $('#SortByOption').val();
            console.log(sortby);
            var url = "/internationalfederations/listpartial?SearchString=" + $("#SelectedSportId").val() + "&SortBy=" + sortby;
            app.fetch(url, function (html) {
                $(".club-card").html(html);
                $('[data-toggle="tooltip"]').tooltip();
                $("#load-more-btn").click(function () {
                    $('.club-box.hide:lt(8)').removeClass("hide");

                    if (!$('.club-box').hasClass("hide")) {
                        $(this).hide();
                    }
                });
                app.hideLoader();
            });
        };
    return {
        init: init
    };
}();