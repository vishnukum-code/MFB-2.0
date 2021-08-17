var listfederation = function () {
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
                        localStorage.setItem("f_filterActive", "MyMemberships");
                    }
                }
            })
        },
        SetlocalStorage = function (sortBy, sports, filterActive) {
            localStorage.setItem("f_sortby", sortBy);
            localStorage.setItem("f_sports", sports);
            localStorage.setItem("f_filterActive", filterActive);
        },
        GetlocalStorage = function () {
            var f_sortby = localStorage.getItem("f_sortby");
            var f_sports = localStorage.getItem("f_sports");
            var f_filterActive = localStorage.getItem("f_filterActive");

            if (f_sortby != null && f_sortby != undefined && f_sortby != "") {
                var text = $('.sorting-list .dropdown-menu a[data-val=' + f_sortby + ']').text();
                $('.sorting-list #dropdownMenuButton').text(text);
                $('#SortByOption').val(f_sortby);
            }
            else {
                $('.sorting-list #dropdownMenuButton').text("Name Ascending");
                $('#SortByOption').val("");
            }

            if (f_sports != null && f_sports != undefined && f_sports != "") {
                var text = $('.all-sport .dropdown-menu a[data-val=' + f_sports + ']').text();
                $('.all-sport #dropdownMenuButton').text(text);
                $("#SelectedSportId").val(f_sports);
            }
            else {
                $('.all-sport #dropdownMenuButton').text("All sports");
                $("#SelectedSportId").val("");
            }

            if (f_filterActive != null && f_filterActive != undefined && f_filterActive != "") {
                var text = $('.top-block .left-sec ul li a[data-val=' + f_filterActive + ']').text();
                $('.top-block .left-sec ul li a[data-val=' + f_filterActive + ']').parent().addClass('active');
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

            var url = "/federations/listpartial?SearchString=" + sports + "&SortBy=" + sortby;
            app.fetch(url, function (html) {
                $(".federation-card").html(html);
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