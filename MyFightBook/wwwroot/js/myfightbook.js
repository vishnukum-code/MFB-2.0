$(function () {
    //$("#search-block").parent().addClass("search-left");
    $('[data-toggle="tooltip"]').tooltip();
    $('#search').select2({
        ajax: {
            url: '/search',
            dataType: 'json',
            delay: 250
        },
        placeholder: '',
        minimumInputLength: 1,
        escapeMarkup: function (markup) { return markup; },
        templateSelection: function (r) { return ''; },
        templateResult: function (r) { if (r.loading) return r.text; return r.html }
    }).on('select2:selecting', function (e) {
        var data = e.params.args.data;
        window.location.href = data.url;
    });
    setTimeout(function () {
        $('#saved').remove();
    }, 4000);

    //Open dropdown menu on mobile
    $(".mobile-dropdown-menu a").click(function () {
        if ($(this).parent().find("ul").hasClass("popped")) {
            $(this).parent().find("ul").removeClass("popped");
            $('body').removeClass("overlay");
        } else {
            $(this).parent().find("ul").addClass("popped");
            $('body').addClass("overlay");
        }
    });


    $("#SearchString").keyup(function () {
        app.searchAllFx();
    });

    $(".accept-only-num").keypress(function (e) {
        if (e.which !== 8 && e.which !== 0 && (e.which < 48 || e.which > 57)) {
            return false;
        }
    });


    $('.nav-toggle').click(function () {
        $(this).toggleClass("show");
        $('.main-container .sidebar_nav').toggleClass('pushed_left');
    })
    // on sidebar enu click
    $('.nav-sec ul li').click(function () {

        // tournament and tournaments ids blank
        localStorage.removeItem("TFedIds");
        localStorage.removeItem("TWIds");
        localStorage.removeItem("TFCIds");
        localStorage.removeItem("TGender");
        localStorage.removeItem("isFilter");
        localStorage.removeItem("EFedIds");

        //federation blank
        localStorage.removeItem("f_sortby");
        localStorage.removeItem("f_sports");
        localStorage.removeItem("f_filterActive");

        //tournament blank
        localStorage.removeItem("t_sortby");
        localStorage.removeItem("t_sports");
        localStorage.removeItem("t_filterActive");
        localStorage.removeItem("t_likeFilter");
        localStorage.removeItem("t_pageSize");
        localStorage.removeItem("t_pageNumber");
        localStorage.removeItem("t_IsSkip");

        //event blank
        localStorage.removeItem("e_sortby");
        localStorage.removeItem("e_sports");
        localStorage.removeItem("e_filterActive");
        localStorage.removeItem("e_likeFilter");
        localStorage.removeItem("e_pageSize");
        localStorage.removeItem("e_pageNumber");
        localStorage.removeItem("e_IsSkip");

        localStorage.removeItem("c_sortby");
        localStorage.removeItem("c_sports");
        localStorage.removeItem("c_filterActive");
    });


    // $("input").attr("autocomplete", "off");
    var pathname = window.location.pathname;
    if (pathname === "/clubs/list") {
        localStorage.removeItem("TFedIds");
        localStorage.removeItem("TWIds");
        localStorage.removeItem("TFCIds");
        localStorage.removeItem("TGender");
        localStorage.removeItem("isFilter");
        localStorage.removeItem("EFedIds");

        localStorage.removeItem("f_sortby");
        localStorage.removeItem("f_sports");
        localStorage.removeItem("f_filterActive");

        localStorage.removeItem("t_sortby");
        localStorage.removeItem("t_sports");
        localStorage.removeItem("t_filterActive");
        localStorage.removeItem("t_likeFilter");
        localStorage.removeItem("t_pageSize");
        localStorage.removeItem("t_pageNumber");
        localStorage.removeItem("t_IsSkip");

        localStorage.removeItem("e_sortby");
        localStorage.removeItem("e_sports");
        localStorage.removeItem("e_filterActive");
        localStorage.removeItem("e_likeFilter");
        localStorage.removeItem("e_pageSize");
        localStorage.removeItem("e_pageNumber");
        localStorage.removeItem("e_IsSkip");
    }
    else if (pathname === "/federations/list") {
        localStorage.removeItem("TFedIds");
        localStorage.removeItem("TWIds");
        localStorage.removeItem("TFCIds");
        localStorage.removeItem("TGender");
        localStorage.removeItem("isFilter");
        localStorage.removeItem("EFedIds");

        localStorage.removeItem("c_sortby");
        localStorage.removeItem("c_sports");
        localStorage.removeItem("c_filterActive");

        localStorage.removeItem("t_sortby");
        localStorage.removeItem("t_sports");
        localStorage.removeItem("t_filterActive");
        localStorage.removeItem("t_likeFilter");
        localStorage.removeItem("t_pageSize");
        localStorage.removeItem("t_pageNumber");
        localStorage.removeItem("t_IsSkip");

        localStorage.removeItem("e_sortby");
        localStorage.removeItem("e_sports");
        localStorage.removeItem("e_filterActive");
        localStorage.removeItem("e_likeFilter");
        localStorage.removeItem("e_pageSize");
        localStorage.removeItem("e_pageNumber");
        localStorage.removeItem("e_IsSkip");
    }

    else if (pathname === "/tournaments/list") {
        localStorage.removeItem("EFedIds");

        localStorage.removeItem("c_sortby");
        localStorage.removeItem("c_sports");
        localStorage.removeItem("c_filterActive");

        localStorage.removeItem("f_sortby");
        localStorage.removeItem("f_sports");
        localStorage.removeItem("f_filterActive");

        localStorage.removeItem("e_sortby");
        localStorage.removeItem("e_sports");
        localStorage.removeItem("e_filterActive");
        localStorage.removeItem("e_likeFilter");
        localStorage.removeItem("e_pageSize");
        localStorage.removeItem("e_pageNumber");
        localStorage.removeItem("e_IsSkip");
    }
    else if (pathname === "/events/list") {
        localStorage.removeItem("TFedIds");
        localStorage.removeItem("TWIds");
        localStorage.removeItem("TFCIds");
        localStorage.removeItem("TGender");
        localStorage.removeItem("isFilter");

        localStorage.removeItem("c_sortby");
        localStorage.removeItem("c_sports");
        localStorage.removeItem("c_filterActive");

        localStorage.removeItem("f_sortby");
        localStorage.removeItem("f_sports");
        localStorage.removeItem("f_filterActive");

        localStorage.removeItem("t_sortby");
        localStorage.removeItem("t_sports");
        localStorage.removeItem("t_filterActive");
        localStorage.removeItem("t_likeFilter");
        localStorage.removeItem("t_pageSize");
        localStorage.removeItem("t_pageNumber");
        localStorage.removeItem("t_IsSkip");
    }
    else if (pathname === "/dashboard" || pathname === "/grades/list" || pathname === "/grades/gradelist"
        || pathname === "/profile" || pathname === "/medical" || pathname === "/settings/list") {
        localStorage.removeItem("TFedIds");
        localStorage.removeItem("TWIds");
        localStorage.removeItem("TFCIds");
        localStorage.removeItem("TGender");
        localStorage.removeItem("EFedIds");
        localStorage.removeItem("isFilter");

        localStorage.removeItem("c_sortby");
        localStorage.removeItem("c_sports");
        localStorage.removeItem("c_filterActive");

        localStorage.removeItem("f_sortby");
        localStorage.removeItem("f_sports");
        localStorage.removeItem("f_filterActive");

        localStorage.removeItem("t_sortby");
        localStorage.removeItem("t_sports");
        localStorage.removeItem("t_filterActive");
        localStorage.removeItem("t_likeFilter");
        localStorage.removeItem("t_pageSize");
        localStorage.removeItem("t_pageNumber");
        localStorage.removeItem("t_IsSkip");

        localStorage.removeItem("e_sortby");
        localStorage.removeItem("e_sports");
        localStorage.removeItem("e_filterActive");
        localStorage.removeItem("e_likeFilter");
        localStorage.removeItem("e_pageSize");

        if (pathname !== "/dashboard") {
            localStorage.removeItem("e_IsSkip");
            localStorage.removeItem("e_pageNumber");
        }
    }

    if ($("div").hasClass("carouselExampleSlidesOnly")) {
        $('#carouselExampleSlidesOnly').slick({
            dots: false,
            infinite: true,
            autoplay: true,
            speed: 300,
            slidesToShow: 1,
            arrows: false,
            adaptiveHeight: true
        });
    }

    $(".date input").attr("type", "date");
    //if (/Mobi/.test(navigator.userAgent)) {
    //    // if mobile device, use native pickers

    //} else {
    // if desktop device, use DateTimePicker
    $(".datepicker1").not(".hiddenLastMonth").not(".hiddenLastMonthone").datetimepicker({
        useCurrent: false,
        format: "L",
        showTodayButton: true,
        icons: {
            next: "fa fa-chevron-right",
            previous: "fa fa-chevron-left",
            today: 'todayText',
        }
    });

    var date = new Date();
    var firstDay = new Date(date.getFullYear(), date.getMonth(), 1);
    $('.hiddenLastMonth').datetimepicker({
        minDate: firstDay,
        useCurrent: false,
        format: "L",
        showTodayButton: false,
        icons: {
            next: "fa fa-chevron-right",
            previous: "fa fa-chevron-left",
            today: 'todayText',
        }
    });

    //For cancel membership
    $('.hiddenLastMonthone').datetimepicker({
        minDate: date,
        useCurrent: false,
        format: "L",
        showTodayButton: false,
        icons: {
            next: "fa fa-chevron-right",
            previous: "fa fa-chevron-left",
            today: 'todayText',
        }
    });
    //console.log(date.getFullYear(), date.getMonth(), date.getDate())
    var newDate = new Date(date.getFullYear(), date.getMonth() + 4, date.getDate());
    $('.hiddenLastMonthone').val(newDate.getMonth() + "/" + newDate.getDate() + "/" + newDate.getFullYear());
    //}

    $.responsiveTables();

    app.applyNiceScroll($(".scrollbar-dynamic"));
    app.applyNiceScroll($(".notification-dropdown ul"));
    $(".dropdown .dropdown-menu").not(".dropdown-not").niceScroll({
        cursorwidth: "4px",
        cursorcolor: "#44464a",
        cursorborder: "1px solid #44464a",
        autohidemode: false,
        horizrailenabled: true,
        //touchbehavior: true,
        //preventmultitouchscrolling: false,
        //emulatetouch: true,
        //cursordragontouch: true
    });

    $('.dropdown-item').click(function () {
        var href = $(this).attr('href');
        if (href != null && href != '') {
            window.location.href = href;
        }
    });

    $('.select2').select2()
        .on("select2:open", function () {
            app.applyNiceScroll($(".select2-results__options"));
        });

    if (jQuery.fn.select2) {
        $(".init-loader.loading-dropdown-animation").remove();
    }

    $(function () {
        $(".init-loader.loading-dropdown-animation").remove();
    });

    $(".form-group").on("shown.bs.dropdown", function (e) {
        app.applyNiceScroll($(this).find(".dropdown-menu > .inner"));
    });

    $('.file-delete input[type="file"]').change(function (e) {
        var thisFile = $(this);
        if (e.target.files[0] !== undefined) {
            var fileName = e.target.files[0].name;
            var extArr = fileName.split('.');
            var ext = extArr[extArr.length - 1];
            console.log(fileName, ext);
            if (thisFile.hasClass("accept-only-xmlfile")) {
                if (ext.toLowerCase() === "xlsx") {

                }
                else {
                    thisFile.val('');
                    alert("Please select only excel file");
                    return false;
                }
            }
            $(this).parent().find('input[type="text"]').val(fileName);
            if (e.target.files && e.target.files[0]) {
                var reader = new FileReader();

                reader.onload = function (a) {
                    var imagePath = "";
                    if (ext.toLowerCase() === "zip") {
                        imagePath = "/backend-assets/img/zip.png";
                    }
                    else if (ext.toLowerCase() === "pdf") {
                        imagePath = "/backend-assets/img/pdf.png";
                    }
                    else if (ext.toLowerCase() === "xlsx" || ext.toLowerCase() === "xls" || ext.toLowerCase() === "csv") {
                        imagePath = "/backend-assets/img/xls.png";
                    }
                    else if (ext.toLowerCase() === "doc" || ext.toLowerCase() === "docx" || ext.toLowerCase() === "txt") {
                        imagePath = "/backend-assets/img/Google_Doc_Logo.jpg";
                    }
                    else {
                        imagePath = a.target.result;
                    }
                    thisFile.closest(".file-delete").find(".delete-icon").removeAttr('style');
                    //thisFile.closest(".file-delete").find(".delete-icon").css({ "background": "url(" + imagePath + ") no-repeat", "background-size": "100%", "background-position":"center" });
                }
                reader.readAsDataURL(e.target.files[0]);
            }
        }
        else {
            $(this).parent().find('input[type="text"]').val('');
            thisFile.closest(".file-delete").find(".delete-icon").removeAttr('style');
            thisFile.closest(".file-delete").find(".delete-icon").hide();
        }
    });

    $('.file-delete .OpenImgUpload').click(function (e) {
        e.preventDefault();
        var Id = $(this).parent().find('.file-upload').attr('id');//.trigger('click');
        var uploader = document.getElementById(Id);
        uploader.click();
    });

    $(".file-delete .delete-icon").click(function () {
        $(this).closest(".file-delete").find(".file-input input").val('');
        $(this).removeAttr('style');
        $(this).hide();
    });
});

var app = function () {
    var currentRequest = null, init = function () {

    },
        shareOnFacebook = function (url) {
            app.showLoader();
            let req = new XMLHttpRequest();
            req.open("GET", "/auth/getfacebookaccesstoken");
            req.onload = function () {
                if (req.status === 200) {
                    const accessToken = req.response;
                    req = new XMLHttpRequest();
                    req.open("POST", `https://graph.facebook.com?id=${url}&scrape=true&access_token=${accessToken}`);
                    req.onload = function () {
                        if (req.status === 200) {
                            app.hideLoader();
                            window.open(`http://www.facebook.com/sharer.php?u=${url}`, "", "height=800,width=600");
                        } else {
                            app.hideLoader();
                            console.log(req.response);
                        }
                    };

                    req.send();
                } else {
                    app.hideLoader();
                    console.log(req.response);
                }
            };

            req.send();
        },
        applyNiceScroll = function ($this) {
            $this.niceScroll({
                cursorwidth: "4px",
                cursorcolor: "#44464a",
                cursorborder: "1px solid #44464a",
                autohidemode: true,
                horizrailenabled: true,
                //touchbehavior: true,
                //preventmultitouchscrolling: false,
                //emulatetouch: true,
                //cursordragontouch: true
            });
        },
        showLoader = function () {
            $(".loader-2").show();
        },
        hideLoader = function () {
            $(".loader-2").hide();
        },
        changeDateFormat = function () {
            $(".datepicker").each(function () {
                var txt = $(this).val();

                try {
                    var d = new Date(txt);
                    var newDate = (d.getMonth() + 1) + '/' + d.getDate() + '/' + d.getFullYear();
                    $(this).val(newDate);
                }
                catch (err) {
                    $(this).val(txt);
                }
            });
        },
        goBack = function () {
            window.history.back();
        },
        removeDateFormat = function () {
            $(".datepicker").each(function () {
                var txt = $(this).val();

                if (txt == "1/1/0001 12:00:00 AM") {
                    $(this).val("");
                }
            });
        },
        bindTiny = function () {
            tinymce.init({
                selector: '.rte',
                height: 200,
                menubar: false,
                plugins: [
                    'advlist autolink lists link image charmap print preview anchor',
                    'searchreplace visualblocks code fullscreen',
                    'insertdatetime media table contextmenu paste code'
                ],
                toolbar: 'undo redo | bold italic | bullist numlist | link'
            });
        },
        fetch = function (url, callback) {
            $.ajax({
                type: "get",
                cache: false,
                url: url,
                success: function (html) {
                    callback(html);
                },
                error: function (XMLHttpRequest, textStatus, errorThrown) {
                    // never gets hit until page navigation, which aborts this call
                }
            });
        },
        fetchPost = function (url, data, callback) {
            $.ajax({
                type: "post",
                cache: false,
                data: data,
                url: url,
                success: function (html) {
                    callback(html);
                },
                error: function (XMLHttpRequest, textStatus, errorThrown) {
                    // never gets hit until page navigation, which aborts this call
                }
            });
        },
        searchAllFx = function () {
            $("#Search-Result").html('<div class="search-spinner"><div class="spinner-border text-muted"></div></div>');
            $("#Search-Result").show();
            var searchText = $("#SearchString").val().trim();
            var FederationIds = $("#SelectedFedIds").val();//$(".search-left .fed-block.desktop #SerchBoxFederationId").val();

            if (searchText.length > 0 && searchText !== "" && searchText !== null) {
                currentRequest = jQuery.ajax({
                    type: 'Get',
                    data: { "searchText": searchText, "federationIds": FederationIds != null && FederationIds.length > 0 ? FederationIds.toString() : "" },
                    url: '/search/searchForAllNew',
                    beforeSend: function () {
                        if (currentRequest != null) {
                            currentRequest.abort();
                        }
                    },
                    success: function (data) {
                        $("#Search-Result").addClass("open");
                        if (data !== null && data.trim().length) {
                            $("#Search-Result").show();
                            $("#Search-Result").html(data);
                            app.applyNiceScroll($("#Search-Result"));
                        }
                        else {
                            $("#Search-Result").html("<h2>Data not found !!</h2>");
                        }
                    },
                    error: function (e) {
                        console.log(e);
                    }
                });
            }
            else {
                if (currentRequest != null) {
                    currentRequest.abort();
                }
                $("#Search-Result").html('');
                $("#Search-Result").hide();
            }

            $(document).mouseup(function (e) {
                var container = $("#Search-Result");
                var block = $("#search-block");
                // if the target of the click isn't the container nor a descendant of the container
                if (container.hasClass('open') && !block.is(e.target) && block.has(e.target).length === 0 && !container.is(e.target) && container.has(e.target).length === 0) {
                    container.hide();
                    container.removeClass('hide')
                }
            });
        };
    return {
        init: init,
        showLoader: showLoader,
        hideLoader: hideLoader,
        changeDateFormat: changeDateFormat,
        removeDateFormat: removeDateFormat,
        bindTiny: bindTiny,
        fetch: fetch,
        fetchPost: fetchPost,
        goBack: goBack,
        searchAllFx: searchAllFx,
        applyNiceScroll: applyNiceScroll,
        shareOnFacebook: shareOnFacebook
    };
}();