var listEvent = function () {
    var init = function () {
        GetlocalStorage();
        bindFn();
    },
        resetHtml = function () {
            $("#PageNumber").val('1');
            $(".event-card").html('');
        },
        bindFn = function () {

            $("#SortBy").change(function () {
                bindData(0);
            });

            $("#SortBy .dropdown-item").click(function () {
                $(".sorting-list #dropdownMenuButton").text($(this).text());
                $("#SortByOption").val($(this).data("val"));
                resetHtml();
                bindData(0);
            });

            $(".all-sport .dropdown-menu .dropdown-item").click(function () {
                $(".all-sport #dropdownMenuButton").text($(this).text());
                $("#SelectedSportId").val($(this).data("val"));
                resetHtml();
                bindData(0);
            });

            $(".all-data").click(function () {
                $(".all-sport #dropdownMenuButton").text("All sports");
                $("#SelectedSportId").val("");
                $(".sorting-list #dropdownMenuButton").text("Created Date Descending");
                $("#SortByOption").val("CreatedDateDescending");
                bindData(0);
            });

            $(".top-block .left-sec li").click(function () {
                if (!$(this).hasClass("active")) {
                    $(this).addClass("active").siblings().removeClass("active");
                    if ($(this).find("a[data-val=All]").length > 0) {
                        $(".all-sport #dropdownMenuButton").text("All sports");
                        $("#SelectedSportId").val("");
                    }
                    resetHtml();
                    bindData(0);
                }
            });

            bindData(0);

            $(".load-more-btn").click(function () {
                var pageNumber = parseInt($("#PageNumber").val()) + 1;
                $("#PageNumber").val(pageNumber);

                bindData(1);
            });
        },
        scrapeFbImage = function () {
            $("ul .facebook a").click(function () {
                const url = $(this).attr("data-val");
                app.shareOnFacebook(url);
            });
        },
        SetlocalStorage = function (sortBy, sports, filterActive, pageSize, pageNumber, likeFilter) {
            localStorage.setItem("e_sortby", sortBy);
            localStorage.setItem("e_sports", sports);
            localStorage.setItem("e_filterActive", filterActive);
            localStorage.setItem("e_likeFilter", likeFilter);
            localStorage.setItem("e_pageSize", pageSize);
            localStorage.setItem("e_pageNumber", pageNumber);
        },
        GetlocalStorage = function () {
            var e_IsSkip = localStorage.getItem("e_IsSkip");
            var e_sortby = localStorage.getItem("e_sortby");
            var e_sports = localStorage.getItem("e_sports");
            var e_filterActive = localStorage.getItem("e_filterActive");
            var e_likeFilter = localStorage.getItem("e_likeFilter");
            var e_pageSize = localStorage.getItem("e_pageSize");
            var e_pageNumber = localStorage.getItem("e_pageNumber");

            if (e_sortby != null && e_sortby != undefined && e_sortby != "undefined" && e_sortby != "") {
                var text = $('.sorting-list .dropdown-menu a[data-val=' + e_sortby + ']').text();
                $('.sorting-list #dropdownMenuButton').text(text);
                $('#SortByOption').val(e_sortby);
            }
            else {
                $('.sorting-list #dropdownMenuButton').text("Created Date Descending");
                $('#SortByOption').val("CreatedDateDescending");
            }

            if (e_sports != null && e_sports != undefined && e_sports != "undefined" && e_sports != "") {
                var text = $('.all-sport .dropdown-menu a[data-val=' + e_sports + ']').text();
                $('.all-sport #dropdownMenuButton').text(text);
                $("#SelectedSportId").val(e_sports);
            }
            else {
                $('.all-sport #dropdownMenuButton').text("All sports");
                $("#SelectedSportId").val("");
            }

            if (e_filterActive != null && e_filterActive != undefined && e_filterActive != "undefined" && e_filterActive != "") {
                var text = $('.top-block .left-sec ul li a[data-val=' + e_filterActive + ']').text();
                $('.top-block .left-sec ul li a[data-val=' + e_filterActive + ']').parent().addClass('active');
            }
            else {
                $('.top-block .left-sec ul li a[data-val=All]').parent().addClass('active')
            }

            if (e_pageSize == "" || e_pageSize == "undefined" || e_pageSize == undefined || e_pageSize == null) {
                $("#PageSize").val('8');
            }
            else {
                $("#PageSize").val(e_pageSize);
            }
            if (e_pageNumber == "" || e_pageNumber == "undefined" || e_pageNumber == undefined || e_pageNumber == null) {
                $("#PageNumber").val('1');
            }
            else {
                $("#PageNumber").val(e_pageNumber);
            }
        },
        bindData = function (alldata) {
            app.showLoader();
            var pathname = window.location.pathname;
            var pathName = "events";
            if (pathname === "/dashboard") {
                pathName = "dashboard";
            }
            else {
                pathName = "events";
            }
            var pageSize = $("#PageSize").val();
            var pageNumber = $("#PageNumber").val();
            var sortby = $('#SortByOption').val();
            var sports = $("#SelectedSportId").val();
            var filterActive = $(".top-block .left-sec li.active a").attr('data-val');
            var searchString = "";
            var filterLike = "";
            var e_IsSkip = localStorage.getItem("e_IsSkip");
            SetlocalStorage(sortby, sports, filterActive, pageSize, pageNumber, filterLike);

            var url = "/" + pathName + "/listpartial?SortBy=" + sortby + "&pathName=" + pathName
                + "&SearchString=" + searchString + "&FilterBySports=" + sports + "&FilterLike=" + filterLike + "&FilterActive=" + filterActive + "&PageNumber=" + pageNumber + "&PageSize=" + pageSize + "&IsSkip=" + e_IsSkip;

            app.fetch(url, function (html) {
                if (alldata == 1) {
                    $(".event-card").append(html);
                }
                else {
                    $(".event-card").html(html);
                }
                localStorage.setItem("e_IsSkip", "0");
                scrapeFbImage();
                $('[data-toggle="tooltip"]').tooltip();
                $('.multi-select').selectpicker('destroy');
                $('.multi-select').selectpicker({
                    noneSelectedText: "Select Federation"
                });
                app.hideLoader();
            });
        };
    return {
        init: init
    };
}();