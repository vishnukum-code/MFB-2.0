var listTouraments = function () {
    var init = function () {
        GetlocalStorage();
        bindFx();
    },
        bindFx = function () {
            $("#SortBy").change(function () {
                bindData(0);
            });

            $('#SortBy .dropdown-item').click(function () {
                $('.sorting-list #dropdownMenuButton').text($(this).text());
                $('#SortByOption').val($(this).data('val'));
                ResetHtml();
                bindData(0);
            });

            $('.all-sport .dropdown-menu .dropdown-item').click(function () {
                $('.all-sport #dropdownMenuButton').text($(this).text());
                $("#SelectedSportId").val($(this).data('val'));
                ResetHtml();
                bindData(0);
            });


            $('.all-data').click(function () {
                $('.all-sport #dropdownMenuButton').text("All sports");
                $("#SelectedSportId").val("");
                $('.sorting-list #dropdownMenuButton').text("Created Date Descending");
                $('#SortByOption').val("CreatedDateDescending");
                bindData(0);
            });

            $(".top-block .left-sec li").click(function () {
                if (!$(this).hasClass('active')) {
                    $(this).addClass('active').siblings().removeClass('active');
                    if ($(this).find('a[data-val=All]').length > 0) {
                        $('.all-sport #dropdownMenuButton').text("All sports");
                        $("#SelectedSportId").val("");
                    }
                    ResetHtml();
                    bindData(0);
                }
            });

            bindData(0);
            //if ($("#Classes").val() !== "") {
            //    let values = $("#Classes").val();
            //    $.each(values.split(","), function (i, e) {
            //        $("#ClassesDrp option[value='" + e + "']").prop("selected", true);
            //    });
            //    setEventPriceAndDetails();
            //}

            //if ($("#Weightclass").val() !== "") {
            //    let values = $("#Weightclass").val();
            //    $.each(values.split(","), function (i, e) {
            //        $("#WeightclassDrp option[value='" + e + "']").prop("selected", true);
            //    });
            //    setEventPriceAndDetails();
            //}

            //$('.multi-select-federation').find('[value=""]').remove();

            //$('.multi-select').selectpicker({
            //    //noneSelectedText: "Select Federation",
            //});

            //$('#FederationId').change(function () {
            //    setLocalStorage();
            //    setDrpValue();
            //});

            //$('#WeightclassDrp').change(function () {
            //    setLocalStorage();
            //});

            //$('#ClassesDrp').change(function () {
            //    setLocalStorage();
            //});

            //var Ids = localStorage.getItem("TFedIds");

            //if (Ids != null && Ids.length > 0) {
            //    $.each(Ids.split(","), function (i, e) {
            //        $("#FederationId option[value='" + e + "']").prop("selected", true);
            //    });
            //}

            //$('.multi-select').selectpicker("refresh");


            //$(".filter-btn").click(function () {
            //    localStorage.setItem("isFilter", "Yes");
            //    setLocalStorage();

            //    filterFx();
            //});

            //if (Ids != null) {
            //    //localStorage.setItem("isFilter", "Yes");
            //    setDrpValue();
            //}
            //else {
            //    bindData();
            //}

            $(".load-more-btn").click(function () {
                var PageNumber = parseInt($("#PageNumber").val()) + 1;
                $("#PageNumber").val(PageNumber);

                bindData(1);
            })
        },
        ResetHtml = function () {
            $("#PageNumber").val('1');
            $(".tournaments-card").html('');
        },
        scrapeFbImage = function () {
            $(".social_icon ul .facebook a").click(function() {
                const url = $(this).attr("data-val");
                app.shareOnFacebook(url);
            });
        },
        SetlocalStorage = function (sortBy, sports, filterActive, pageSize, pageNumber, likeFilter) {
            localStorage.setItem("t_sortby", sortBy);
            localStorage.setItem("t_sports", sports);
            localStorage.setItem("t_filterActive", filterActive);
            localStorage.setItem("t_likeFilter", likeFilter);
            localStorage.setItem("t_pageSize", pageSize);
            localStorage.setItem("t_pageNumber", pageNumber);
        },
        GetlocalStorage = function () {
            var t_IsSkip = localStorage.getItem("t_IsSkip");
            var t_sortby = localStorage.getItem("t_sortby");
            var t_sports = localStorage.getItem("t_sports");
            var t_filterActive = localStorage.getItem("t_filterActive");
            var t_likeFilter = localStorage.getItem("t_likeFilter");
            var t_pageSize = localStorage.getItem("t_pageSize");
            var t_pageNumber = localStorage.getItem("t_pageNumber");

            if (t_sortby != null && t_sortby != undefined && t_sortby != "undefined" && t_sortby != "") {
                var text = $('.sorting-list .dropdown-menu a[data-val=' + t_sortby + ']').text();
                $('.sorting-list #dropdownMenuButton').text(text);
                $('#SortByOption').val(t_sortby);
            }
            else {
                $('.sorting-list #dropdownMenuButton').text("Created Date Descending");
                $('#SortByOption').val("CreatedDateDescending");
            }

            if (t_sports != null && t_sports != undefined && t_sports != "undefined" && t_sports != "") {
                var text = $('.all-sport .dropdown-menu a[data-val=' + t_sports + ']').text();
                $('.all-sport #dropdownMenuButton').text(text);
                $("#SelectedSportId").val(t_sports);
            }
            else {
                $('.all-sport #dropdownMenuButton').text("All sports");
                $("#SelectedSportId").val("");
            }

            if (t_filterActive != null && t_filterActive != undefined && t_filterActive != "undefined" && t_filterActive != "") {
                var text = $('.top-block .left-sec ul li a[data-val=' + t_filterActive + ']').text();
                $('.top-block .left-sec ul li a[data-val=' + t_filterActive + ']').parent().addClass('active');
            }
            else {
                $('.top-block .left-sec ul li a[data-val=All]').parent().addClass('active')
            }

            if (t_pageSize == "" || t_pageSize == "undefined" || t_pageSize == undefined || t_pageSize == null) {
                $("#PageSize").val('8');
            }
            else {
                $("#PageSize").val(t_pageSize);
            }
            if (t_pageNumber == "" || t_pageNumber == "undefined" || t_pageNumber == undefined || t_pageNumber == null) {
                $("#PageNumber").val('1');
            }
            else {
                $("#PageNumber").val(t_pageNumber);
            }
        },
        bindData = function (alldata) {
            app.showLoader();
            var pageSize = $("#PageSize").val();
            var pageNumber = $("#PageNumber").val();
            var sortby = $('#SortByOption').val();
            var sports = $("#SelectedSportId").val();
            var filterActive = $(".top-block .left-sec li.active a").attr('data-val');
            var searchString = "";
            var filterLike = "";
            var t_IsSkip = localStorage.getItem("t_IsSkip");
            SetlocalStorage(sortby, sports, filterActive, pageSize, pageNumber, filterLike);
            console.log("sortby", sortby);
            var url = "/tournaments/listpartial?SortBy=" + sortby + "&IsFilterBy=" + false
                + "&SearchString=" + searchString + "&FilterBySports=" + sports + "&FilterLike=" + filterLike + "&FilterActive=" + filterActive + "&PageNumber=" + pageNumber + "&PageSize=" + pageSize + "&IsSkip=" + t_IsSkip;

            //var url = "/tournaments/listpartial?SortBy=" + sortBy + "&Gender=" + gender + "&IsFilterBy=" + IsFilterBy + "&PageNumber=" + PageNumber + "&PageSize=" + PageSize;
            app.fetch(url, function (html) {
                if (alldata == 1) {
                    $(".tournaments-card").append(html);
                }
                else {
                    $(".tournaments-card").html(html);
                }
                localStorage.setItem("t_IsSkip", "0");
                scrapeFbImage();
                $('[data-toggle="tooltip"]').tooltip();
                app.hideLoader();
            });
        },

        //bindData = function () {
        //    app.showLoader();
        //    var sortBy = $("#SortBy").val();
        //    var IsFilterBy = false;
        //    var gender = $(".g-select select").index() > -1 ? $(".g-select select option:selected").val() : "";
        //    if (gender === "") {
        //        IsFilterBy = false;
        //    }
        //    else {
        //        IsFilterBy = true;
        //    }

        //    var PageSize = $("#PageSize").val();
        //    var PageNumber = $("#PageNumber").val();
        //    var url = "/tournaments/listpartial?SortBy=" + sortBy + "&Gender=" + gender + "&IsFilterBy=" + IsFilterBy + "&PageNumber=" + PageNumber + "&PageSize=" + PageSize;

        //    app.fetch(url, function (html) {
        //        $(".tournaments-card").append(html);
        //        scrapeFbImage();
        //        $('[data-toggle="tooltip"]').tooltip();
        //        app.hideLoader();
        //    });
        //},
        setDrpValue = async function () {
            var Ids = getLocalStorage();
            var SelectedFed = localStorage.getItem("TFedIds"),
                SelectedFClass = localStorage.getItem("TFCIds"),
                SelectedWClass = localStorage.getItem("TWIds"),
                SelectedGender = localStorage.getItem("TGender");

            app.showLoader();
            var URL = '/events/getWeightClassByFederationId';
            var ids = $('#FederationId').val();
            var itemsfightclass = '', cFightClass = 0;
            var itemsweightclass = '', cWeightClass = 0;
            $('#ClassesDrp').html('');
            $('#WeightclassDrp').html('');

            if (ids != null && ids != "") {
                for (var j = 0; j < ids.length; j++) {
                    await $.getJSON(URL + '?federationId=' + ids[j], function (data) {
                        $.each(data.fightclass, function (i, classes) {
                            cFightClass += 1;
                            $('#ClassesDrp').append("<option data-subtext='(" + data.federationName + ")' value='" + classes.id + "'>" + classes.name + "</option>");
                        });

                        $.each(data.weightclass, function (i, classes) {
                            cWeightClass += 1;
                            $('#WeightclassDrp').append("<option data-subtext='(" + data.federationName + ")' value='" + classes.id + "'>" + classes.name + "</option>");
                        });

                        eventPrice = data.adminPrice;
                        bankId = data.bankId;
                        status = data.status;
                    });
                }

                if (SelectedWClass != null) {
                    $.each(SelectedWClass.split(","), function (i, e) {
                        $("#WeightclassDrp option[value=" + e + "]").prop("selected", true);
                    });
                }

                if (SelectedFClass != null) {
                    $.each(SelectedFClass.split(","), function (i, e) {
                        $("#ClassesDrp option[value=" + e + "]").prop("selected", true);
                    });
                }

                if (cFightClass > 0) {
                    $('#ClassesDrp').removeAttr('disabled');
                } else {
                    $('#ClassesDrp').attr('disabled', 'disabled');
                }

                if (cWeightClass > 0) {
                    $('#WeightclassDrp').removeAttr('disabled');
                } else {
                    $('#WeightclassDrp').attr('disabled', 'disabled');
                }

                if (SelectedGender !== "" && SelectedGender !== null) {
                    $("select#Gender option[value=" + SelectedGender + "]").prop("selected", true);
                }

                $('.multi-select').selectpicker('destroy');
                $('.multi-select').selectpicker();
                $('.multi-select').selectpicker("refresh");

                if (localStorage.getItem("isFilter") == "Yes") {
                    filterFx();
                    //localStorage.removeItem("isFilter");
                }
                else {
                    app.hideLoader();
                }
            }
            else {

                $('#ClassesDrp').html(itemsfightclass);
                $('#ClassesDrp').attr('disabled', 'disabled');
                $('#WeightclassDrp').html(itemsweightclass);
                $('#WeightclassDrp').attr('disabled', 'disabled');
                $('.multi-select').selectpicker('destroy');
                $('.multi-select').selectpicker();

                if (localStorage.getItem("isFilter") == "Yes") {
                    filterFx();
                    //localStorage.removeItem("isFilter");
                }
                else {
                    app.hideLoader();
                }
            }
        },
        filterFx = function () {
            app.showLoader();

            var FederationId = $("#FederationId").index() > -1 ? $("#FederationId").val().toString() : "";

            var wc = $(".w-select .filter-option.pull-left").text(), WeightClass = "";
            var fc = $(".f-select .filter-option.pull-left").text(), FightClass = "";
            var gender = $(".g-select select").index() > -1 ? $(".g-select select option:selected").val() : "";
            var ss = fc.split(',');
            var ws = wc.split(',');

            $("#WeightclassDrp option").each(function () {
                var fName = $(this).text();
                var fid = $(this).val();
                for (var i = 0; i < ws.length; i++) {
                    if (fName === ws[i].trim()) {
                        WeightClass += fid + ",";
                    }
                }
            });

            $("#ClassesDrp option").each(function () {
                var fName = $(this).text();
                var fid = $(this).val();
                for (var i = 0; i < ss.length; i++) {
                    if (fName === ss[i].trim()) {
                        FightClass += fid + ",";
                    }
                }
            });

            if (WeightClass.endsWith(",")) {
                WeightClass = WeightClass.substring(0, WeightClass.length - 1);
            }

            if (FightClass.endsWith(",")) {
                FightClass = FightClass.substring(0, FightClass.length - 1);
            }

            if (FederationId === "") {
                bindData(0);
            }
            else {
                var model = {};
                model.FederationId = FederationId;
                model.FightClass = FightClass;
                model.WeightClass = WeightClass;
                model.IsFilterBy = true;
                model.Gender = gender;
                var sortBy = $("#SortBy").val();

                var PageSize = $("#PageSize").val();
                var PageNumber = $("#PageNumber").val();

                var url = "/tournaments/listpartial?SortBy=" + sortBy + "&PageNumber=" + PageNumber + "&PageSize=" + PageSize;
                app.fetchPost(url, model, function (html) {
                    $(".tournaments-card").html(html);
                    $('[data-toggle="tooltip"]').tooltip();
                    app.hideLoader();
                });
            }
        },
        setLocalStorage = function () {
            var SelectedFed = $('#FederationId').val() != null ? $('#FederationId').val().toString() : null;
            var SelectedFClass = $('#ClassesDrp').val() != null ? $('#ClassesDrp').val().toString() : null;
            var SelectedWClass = $('#WeightclassDrp').val() != null ? $('#WeightclassDrp').val().toString() : null;
            var SelectedGender = $("select#Gender option:selected").val();

            localStorage.setItem("TFedIds", SelectedFed);
            localStorage.setItem("TWIds", SelectedWClass);
            localStorage.setItem("TFCIds", SelectedFClass);
            localStorage.setItem("TGender", SelectedGender);
        },
        getLocalStorage = function () {
            var IdsArr = [];
            IdsArr.push(localStorage.getItem("TFedIds"));
            IdsArr.push(localStorage.getItem("TWIds"));
            IdsArr.push(localStorage.getItem("TFCIds"));

            return IdsArr;
        },
        setEventPriceAndDetails = function () {
            app.showLoader();
            var URL = '/events/getWeightClassByFederationId';
            $.getJSON(URL + '?federationId=' + $('#FederationId').val(), function (data) {
                eventPrice = data.adminPrice;
                bankId = data.bankId;
                status = data.status;
                app.hideLoader();
            });
        };
    return {
        init: init
    };
}();