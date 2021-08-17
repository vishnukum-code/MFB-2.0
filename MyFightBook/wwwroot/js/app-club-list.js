var listClub = function () {
    var init = function () {
        GetlocalStorage();
        bindFn();

    },
        bindFn = function () {
            bindData();
            $("#SortBy").change(function () {
                bindData();
            });

            $('#SortBy .dropdown-item').click(function () {
                console.log($(this).text());
                $('.sorting-list #dropdownMenuButton').text($(this).text());
                $('#SortByOption').val($(this).data('val'));
                bindData();
            });

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

            $(".top-block .left-sec li").click(function () {
                if (!$(this).hasClass('active')) {
                    $(this).addClass('active').siblings().removeClass('active');
                    if ($(this).find('a[data-val=MyMemberships]').length == 0) {
                        $('.all-sport #dropdownMenuButton').text("All sports");
                        $("#SelectedSportId").val("");
                        bindData();
                    }
                    else {
                        localStorage.setItem("c_filterActive", "MyMemberships");
                    }
                }
            })
        },
        SetlocalStorage = function (sortBy, sports, filterActive) {
            localStorage.setItem("c_sortby", sortBy);
            localStorage.setItem("c_sports", sports);
            localStorage.setItem("c_filterActive", filterActive);
        },

        GetlocalStorage = function () {
            var c_sortby = localStorage.getItem("c_sortby");
            var c_sports = localStorage.getItem("c_sports");
            var c_filterActive = localStorage.getItem("c_filterActive");

            if (c_sortby != null && c_sortby != undefined && c_sortby != "") {
                var text = $('.sorting-list .dropdown-menu a[data-val=' + c_sortby + ']').text();
                $('.sorting-list #dropdownMenuButton').text(text);
                $('#SortByOption').val(c_sortby);
            }
            else {
                $('.sorting-list #dropdownMenuButton').text("Name Ascending");
                $('#SortByOption').val("");
            }

            if (c_sports != null && c_sports != undefined && c_sports != "") {
                var text = $('.all-sport .dropdown-menu a[data-val=' + c_sports + ']').text();
                $('.all-sport #dropdownMenuButton').text(text);
                $("#SelectedSportId").val(c_sports);
            }
            else {
                $('.all-sport #dropdownMenuButton').text("All sports");
                $("#SelectedSportId").val("");
            }

            if (c_filterActive != null && c_filterActive != undefined && c_filterActive != "") {
                var text = $('.top-block .left-sec ul li a[data-val=' + c_filterActive + ']').text();
                $('.top-block .left-sec ul li a[data-val=' + c_filterActive + ']').parent().addClass('active');
            }
            else {
                $('.top-block .left-sec ul li a[data-val=All]').parent().addClass('active')
            }

        },

        bindData = function () {
            app.showLoader();
            var sortby = $('#SortByOption').val();
            var sports = $("#SelectedSportId").val();
            var filterActive = $(".top-block .left-sec li.active a").attr('data-val');
            SetlocalStorage(sortby, sports, filterActive)

            var url = "/clubs/listpartial?SearchString=" + sports + "&SortBy=" + sortby;
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