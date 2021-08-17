var currentRequest = null;
(function () {
    var burger = document.querySelector(".burger-container"),
        header = document.querySelector(".header");

    burger.onclick = function () {
        header.classList.toggle("menu-opened");
    };

    AOS.init({
        duration: 500
    });

    $(".menu-sec .menu .menu-item.close-bar").click(function () {
        $(".header").removeClass("menu-opened");
    });

    $(".club-request-popup-btn").click(function () {
        $(".header").removeClass("menu-opened");
        $("#myContactModal").modal("show");
    });

    $(".accept-only-num").keypress(function (e) {
        if (e.which !== 8 && e.which !== 0 && (e.which < 48 || e.which > 57)) {
            return false;
        }

        return true;
    });

    $("#ContactSub").click(function () {
        var isValidModel = true;
        var model = {};
        model.UserName = $("#Name").val();
        model.Email = $("#Email").val();
        model.PhoneNumber = $("#Phone").val();
        if (model.UserName.length <= 0) {
            isValidModel = false;
            $("#Name").addClass("error");
        } else {
            $("#Name").removeClass("error");
        }
        if (model.Email.length <= 0) {
            isValidModel = false;
            $("#Email").addClass("error");
        } else {
            var pattern = /^([a-z\d!#$%&'*+\-\/=?^_`{|}~\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF]+(\.[a-z\d!#$%&'*+\-\/=?^_`{|}~\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF]+)*|"((([ \t]*\r\n)?[ \t]+)?([\x01-\x08\x0b\x0c\x0e-\x1f\x7f\x21\x23-\x5b\x5d-\x7e\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF]|\\[\x01-\x09\x0b\x0c\x0d-\x7f\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF]))*(([ \t]*\r\n)?[ \t]+)?")@(([a-z\d\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF]|[a-z\d\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF][a-z\d\-._~\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF]*[a-z\d\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])\.)+([a-z\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF]|[a-z\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF][a-z\d\-._~\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF]*[a-z\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])\.?$/i;
            if (pattern.test(model.Email)) {
                $("#Email").removeClass("error");
            } else {
                isValidModel = false;
                $("#Email").addClass("error");
            }
        }
        if (model.PhoneNumber.length <= 0) {
            isValidModel = false;
            $("#Phone").addClass("error");
        } else {
            $("#Phone").removeClass("error");
        }

        if (isValidModel) {
            var loader = $(".loader-1");
            loader.show();
            var url = "/home/requestforclub";
            $.ajax({
                type: "post",
                cache: false,
                data: model,
                url: url,
                success: function (result) {
                    loader.hide();
                    if (result) {
                        $("#myContactModal").modal("hide");
                        $("#messagePopup").modal("show");
                    } else {
                        alert("Something wants wrong !!");
                    }
                },
                error: function () {
                    loader.hide();
                    alert("Your request send failure !!");
                }
            });
        }
    });
})();

$(document).ready(function () {
    var notbodyclick = false;
    SearchEventTournament();
    SearchForAll();
    SearchForFighters();
    SpecificPriceClick();
    SearchForAllDesktop();
    SearchEventTournamentDesktop();
    //pricing section
    $("#clubspricing").hide();
    $("#fighterspricing").hide();
    //eventtournament searching section
    $(".eventtournamentsearch").hide();
    $(".eventtournamentsearchdesktop").hide();
    //all serch
    $(".searchalltype").hide();
    //fighters sections
    $(".searchfighters").hide();
    $("#searchmodaldesktop").hide();
    var first = 0, last = 0;
    //search section cross image
    $(".close-img").hide();
    $(".eventdeletedesktop").hide();
    $(".eventdeletemobile").hide();
    //add scrolling without see on screen 
    $(".eventtournamentsearch").niceScroll(
        {
            cursorwidth: "0px"
        });
    $(".eventtournamentsearchdesktop").niceScroll(
        {
            cursorwidth: "0px"
        });
    $(".searchalltype").niceScroll(
        {
            cursorwidth: "0px"
        });
    $(".searchfighters").niceScroll(
        {
            cursorwidth: "0px"
        });
    $(".searchalltypedesktop").niceScroll(
        {
            cursorwidth: "0px"
        });
    //handle cross icon and search icon on fighter search 
    $(".fightersearchcross").click(
        function () {
            $(this).prev().find('img').show();
            $(this).find('img').eq(0).hide();
            $(".searchfightersinput").val('');
        });
    $(".eventcrossmobile").click(
        function () {
            $(this).prev().find('img').show();
            $(this).find('img').eq(0).hide();
            $(".searcheventtournament").val('');
        });
    $(".eventcrossdesktop").click(
        function () {
            $(this).prev().find('img').show();
            $(this).find('img').eq(0).hide();
            $(".searcheventtournamentdesktop").val('');
        });
    $(".allsearchcrossmobile").click(function () {
        $(this).prev().find('img').show();
        $(this).find('img').eq(0).hide();
        $(".searchallinput").val('');
    });
    $(".allsearchcrossdesktop").click(function () {
        $(this).prev().find('img').show();
        $(this).find('img').eq(0).hide();
        $(".searchallinputdesktopbox").val('');
    });
    //search icon click fighter section 
    $(".fightersearchclick").click(function () {
        var searchvalue = $(".searchfightersinput").val();
        SearchClickFighter(searchvalue);
    });
    // search icon for eventtour mobile
    $(".searchclickeventtournamentmobile").click(function () {
        var searchvalue = $(".searcheventtournament").val();
        SearchClickEventTournamentMobile(searchvalue);
    });
    //search for eventtour desktop
    $(".searchclickeventtournamentdesktop").click(function () {
        var searchvalue = $(".searcheventtournamentdesktop").val();
        SearchClickEventTournamentDesktop(searchvalue);
    });
    //search for all  desktop
    $(".serachclickdesktop").click(function () {
        var searchvalue = $(".searchallinputdesktopbox").val();
        SearchClickallDesktop(searchvalue);
    });
    $(".serachclickmobile").click(function () {
        var searchvalue = $(".searchallinput").val();
        SearchClickallMobile(searchvalue);
    });
    $("#owl-carousel").owlCarousel({
        loop: false,
        margin: 10,
        rtl: true,
        responsiveClass: true,
        dots: false,
        nav: true,
        //stagePadding: 150,
        responsive: {
            0: {
                items: 1.25
            },
            600: {
                items: 1.5
            },
            767: {
                items: 2
            },
            768: {
                items: 1
            },
            900: {
                items: 1.5
            },
            1200: {
                items: 2.5,
                margin: 20
            },
            1400: {
                items: 2.5,
                margin: 20
            },
            1600: {
                items: 2.5,
                margin: 20
            }
        }
    });

    $(".col-left .owl-nav .owl-prev").attr('disabled', 'disabled');
    var count = $(".col-left .owl-item").length;

    first = $(".col-left .owl-item.active").length;

    $(".col-left .owl-nav .owl-next").click(function () {
        ++last;
        if (++first == count) {
            $(".col-left .owl-nav .owl-next").attr('disabled', 'disabled');
            $(".col-left .owl-nav .owl-next").addClass('disabled');
        }
        $(".col-left .owl-nav .owl-prev").removeAttr('disabled');
    });

    $(".col-left .owl-nav .owl-prev").click(function () {
        --first;
        if (--last == 0) {
            $(".col-left .owl-nav .owl-prev").attr('disabled', 'disabled');
        }
        $(".col-left .owl-nav .owl-next").removeAttr('disabled');
        $(".col-left .owl-nav .owl-next").removeClass('disabled');
    });

    var first1 = 0, last1 = 0;
    $("#owl-carousel1").owlCarousel({
        //loop: true,
        margin: 20,
        responsiveClass: true,
        dots: false,
        nav: true,
        responsive: {
            0: {
                items: 1,
                stagePadding: 50,
            },
            600: {
                items: 2,
                stagePadding: 50,
            },
            800: {
                items: 2,
                stagePadding: 50,
            },
            1200: {
                items: 3.5,
                margin: 20
            },
            1400: {
                items: 4.5,
                margin: 20
            },
            1600: {
                items: 4.5,
                margin: 20
            }
        }
    });

    $(".event-item-bg .owl-nav .owl-prev").attr('disabled', 'disabled');
    var count1 = $(".event-item-bg .owl-item").length;

    first1 = $(".event-item-bg .owl-item.active").length;

    $(".event-item-bg .owl-nav .owl-next").click(function () {
        ++last1;
        if (++first1 == count1) {
            $(".event-item-bg .owl-nav .owl-next").attr('disabled', 'disabled');
            $(".event-item-bg .owl-nav .owl-next").addClass('disabled');
        }
        $(".event-item-bg .owl-nav .owl-prev").removeAttr('disabled');
    });

    $(".event-item-bg .owl-nav .owl-prev").click(function () {
        --first1;
        if (--last1 == 0) {
            $(".event-item-bg .owl-nav .owl-prev").attr('disabled', 'disabled');
        }
        $(".event-item-bg .owl-nav .owl-next").removeAttr('disabled');
        $(".event-item-bg .owl-nav .owl-next").removeClass('disabled');
    });

    //AOS.init({
    //    duration: 1200,
    //})

    $("#search").click(function (e) {
        $("#search_submit").addClass("search-btn");
        e.stopPropagation()
    });

    //document click section 
    $(document).on("click", function (e) {
        if ($(e.target).is("#search") === false) {
            $("#search_submit").removeClass("search-btn");
        }
        var searchevent = $(".searcheventtournament").val();
        var serachfighter = $(".searchfightersinput").val();
        var searchalldesktop = $(".searchallinputdesktopbox").val();
        var searchallmobile = $(".searchallinput").val();
        var searcheventtournamentdesktop = $(".searcheventtournamentdesktop").val();
        //console.log(searchevent, serachfighter, searchalldesktop, searchallmobile);
        $(".eventtournamentsearch").hide();
        $(".eventtournamentsearch").html('');
        $(".searcheventtournament").val(searchevent);
        $(".searcheventtournamentdesktop").val(searcheventtournamentdesktop);
        $(".eventtournamentsearchdesktop").hide();
        $(".eventtournamentsearchdesktop").html('');
        $(".searchalltype").hide();
        $(".searchalltype").html();
        $(".searchallinput").val(searchallmobile);
        $(".searchfighters").hide();
        $(".searchfighters").html();
        $(".searchfightersinput").val(serachfighter);
        $(".searchallinputdesktopbox").val(searchalldesktop);
        $(".searchalltypedesktop").html('');
        $(".close-img").hide();
        $(".eventdeletedesktop").hide();
        $(".eventdeletemobile").hide();
        $(".fightersearch").show();
        $(".searcheventdesktop").show();
        $(".searcheventmobile").show();
        $(".allsearchcrossmobileimg").hide();
        $(".searchallimg").show();
        $(".searchalldesktop").show();
        $(".allsearchcrossdesktopimg").hide();
    });
    
    $(".variable").slick({
        dots: false,
        variableWidth: true,
        slidesToShow: 4,
        loop: false,
        infinite: false,
        responsive: [
            {
                breakpoint: 500,
                settings: {
                    slidesToShow: 1
                }
            },
            {
                breakpoint: 700,
                settings: {
                    slidesToShow: 2
                }
            },
            {
                breakpoint: 1100,
                settings: {
                    slidesToShow: 2
                }
            },
            {
                breakpoint: 1600,
                settings: {
                    slidesToShow: 3
                }
            }
        ]
    });
    
    $(".variablecomp").slick({
        dots: false,
        variableWidth: true,
        slidesToShow: 2,
        loop: false,
        infinite: false,
        rtl: true,
        responsive: [
            {
                breakpoint: 576,
                settings: {
                    slidesToShow: 1,
                    rtl: false,
                    infinite: true
                }
            },
            {
                breakpoint: 580,
                settings: {
                    slidesToShow: 1
                }
            },
            {
                breakpoint: 700,
                settings: {
                    slidesToShow: 1
                }
            },
            {
                breakpoint: 1100,
                settings: {
                    slidesToShow: 1
                }
            },
            {
                breakpoint: 1600,
                settings: {
                    slidesToShow: 2
                }
            }
        ]
    });

    $(window).resize(function () {
        setTimeout(function () {
            $(".variablecomp .competition-view").resizeBoxWithOuterHeight();
        }, 500);
    });

    jQuery(window).load(function () {
        $("#advantagehome .one-tool .col-left .basic-function-loader").hide();

        $(".variablecomp .competition-view").resizeBoxWithOuterHeight();

        $("#advantagehome .one-tool .col-left .variablecomp").show();
    }); 
});

function SpecificPriceClick() {
    $("ul.specificselect li a").click(function (e) {
        //console.log($(this));
        $("ul.specificselect li a").removeClass('active')
        $(this).addClass('active');
        $(".pricedata .row").hide();
        $(".pricedata .row").eq($(this).parent().index()).show();

    });
}
//search event tournament mobile 
function SearchEventTournament() {
    $(".searcheventtournament").keyup(
        function (e) {
            var searchvalue = $(this).val();
            searchvalue = searchvalue.trim();
            $(this).next().find('img').eq(0).hide();
            $(this).next().find('img').eq(1).show();
            if (searchvalue != "" && searchvalue != " ") {
                currentRequest = $.ajax({
                    type: "POST",
                    url: "/search/searchforeventtournament",
                    beforeSend: function () {
                        if (currentRequest != null) {
                            currentRequest.abort();
                        }
                    },
                    data: { q: searchvalue },
                    success: function (data) {
                        if (data == "") {
                            $(".eventtournamentsearch").hide();
                            $(".eventtournamentsearch").html('');
                        }
                        else {
                            $(".eventtournamentsearch").show();
                            $(".eventtournamentsearch").html('');
                            $(".eventtournamentsearch").append(data);
                        }
                    },
                    error: function () {
                    }
                });
            }
            else {
                $(".eventtournamentsearch").hide();
                $(".eventtournamentsearch").html('');
            }
            if (searchvalue == "") {
                $(this).next().find('img').eq(0).show();
                $(this).next().find('img').eq(1).hide();
            }

        });
}
//search for event tournament desktop 
function SearchEventTournamentDesktop() {
    $(".searcheventtournamentdesktop").keyup(
        function (e) {
            var searchvalue = $(this).val();
            searchvalue = searchvalue.trim();
            $(this).next().find('img').eq(0).hide();
            $(this).next().find('img').eq(1).show();
            if (searchvalue != "" && searchvalue != " ") {
                currentRequest = $.ajax({
                    type: "POST",
                    url: "/search/searchforeventtournament",
                    beforeSend: function () {
                        if (currentRequest != null) {
                            currentRequest.abort();
                        }
                    },
                    data: { q: searchvalue },
                    success: function (data) {
                        if (data == "") {
                            $(".eventtournamentsearchdesktop").hide();
                            $(".eventtournamentsearchdesktop").html('');
                        }
                        else {
                            $(".eventtournamentsearchdesktop").show();
                            $(".eventtournamentsearchdesktop").html('');
                            $(".eventtournamentsearchdesktop").append(data);
                        }
                    },
                    error: function () {
                    }
                });
            }
            else {
                $(".eventtournamentsearchdesktop").hide();
                $(".eventtournamentsearchdesktop").html('');
            }
            if (searchvalue == "") {
                $(this).next().find('img').eq(0).show();
                $(this).next().find('img').eq(1).hide();
            }

        });
}
//search for all mobile 
function SearchForAll() {
    $(".searchallinput").keyup(
        function (e) {
            $(this).next().find('img').eq(0).hide();
            $(this).next().find('img').eq(1).show();
            var searchvalue = $(this).val();
            searchvalue = searchvalue.trim();
            if (searchvalue != "") {
                currentRequest = $.ajax({
                    type: "POST",
                    url: "/search/searchforall",
                    beforeSend: function () {
                        if (currentRequest != null) {
                            currentRequest.abort();
                        }
                    },
                    data: { q: searchvalue },
                    success: function (data) {
                        if (data == "") {
                            $(".searchalltype").hide();
                            $(".searchalltype").html('');
                        }
                        else {
                            $(".searchalltype").show();
                            $(".searchalltype").html('');
                            $(".searchalltype").append(data);
                        }
                    },
                    error: function () {
                        $(".searchalltype").hide();
                        $(".searchalltype").html('');
                    }
                });
            }
            else {
                $(".searchalltype").hide();
                $(".searchalltype").html('');
            }
            if (searchvalue == "") {
                $(this).next().find('img').eq(0).show();
                $(this).next().find('img').eq(1).hide();
            }
        });
}
//search all fighters 
function SearchForFighters() {
    $(".searchfightersinput").keyup(
        function (e) {
            $(this).next().find('img').eq(0).hide();
            $(this).next().find('img').eq(1).show();
            var searchvalue = $(this).val();
            searchvalue = searchvalue.trim();
            if (searchvalue != "") {
                currentRequest = $.ajax({
                    type: "POST",
                    url: "/search/searchforfighters",
                    beforeSend: function () {
                        if (currentRequest != null) {
                            currentRequest.abort();
                        }
                    },
                    data: { q: searchvalue },
                    success: function (data) {
                        if (data == "") {
                            $(".searchfighters").hide();
                            $(".searchfighters").html('');
                        }
                        else {
                            $(".searchfighters").show();
                            $(".searchfighters").html('');
                            $(".searchfighters").append(data);
                        }
                    },
                    error: function () {
                    }
                });
            }
            else {
                $(".searchfighters").hide();
                $(".searchfighters").html('');
            }
            if (searchvalue == "") {
                $(this).next().find('img').eq(0).show();
                $(this).next().find('img').eq(1).hide();
            }
        });
}
//search for all desktop
function SearchForAllDesktop() {
    $(".searchallinputdesktopbox").keyup(
        function (e) {
            var searchvalue = $(this).val();
            searchvalue = searchvalue.trim();
            $(this).next().find('img').eq(0).hide();
            $(this).next().find('img').eq(1).show();
            if (searchvalue != "") {
                currentRequest = $.ajax({
                    type: "POST",
                    url: "/search/searchforall",
                    beforeSend: function () {
                        if (currentRequest != null) {
                            currentRequest.abort();
                        }
                    },
                    data: { q: searchvalue },
                    success: function (data) {
                        if (data == "") {
                            $(".searchalltypedesktop").show();
                            $(".searchalltypedesktop").html('');
                            $(".searchalltypedesktop").append(data);
                        }
                        else {
                            $(".searchalltypedesktop").show();
                            $(".searchalltypedesktop").html('');
                            $(".searchalltypedesktop").append(data);
                        }
                    },
                    error: function () {
                        $(".searchalltypedesktop").hide();
                        $(".searchalltypedesktop").html('');
                    }
                });
            }
            else {
                $(".searchalltypedesktop").hide();
                $(".searchalltypedesktop").html('');
            }
            if (searchvalue == "") {
                $(this).next().find('img').eq(0).show();
                $(this).next().find('img').eq(1).hide();
            }
        });
    $(".searchallinputdesktop").click(function () {
        $("#searchmodaldesktop").show();
        $(".searchallinputdesktopbox").focus();
    });
    $("#closeicon").click(function () {
        $("#searchmodaldesktop").hide();
        $(".searchalltypedesktop").hide();
        $(".searchalltypedesktop").html('');
        $(".searchallinputdesktopbox").val('');
    });

}

//search by clcik icon on search methods
function SearchClickFighter(searchvalue) {
    searchvalue = searchvalue.trim();
    if (searchvalue != "") {
        currentRequest = $.ajax({
            type: "POST",
            url: "/search/searchforfighters",
            beforeSend: function () {
                if (currentRequest != null) {
                    currentRequest.abort();
                }
            },
            data: { q: searchvalue },
            success: function (data) {
                if (data == "") {
                    $(".searchfighters").hide();
                    $(".searchfighters").html('');
                }
                else {
                    $(".searchfighters").show();
                    $(".searchfighters").html('');
                    $(".searchfighters").append(data);
                }
            },
            error: function () {
            }
        });
    }
    else {
        $(".searchfighters").hide();
        $(".searchfighters").html('');
    }
}

function SearchClickEventTournamentMobile(searchvalue) {
    searchvalue = searchvalue.trim();
    if (searchvalue != "" && searchvalue != " ") {
        currentRequest = $.ajax({
            type: "POST",
            url: "/search/searchforeventtournament",
            beforeSend: function () {
                if (currentRequest != null) {
                    currentRequest.abort();
                }
            },
            data: { q: searchvalue },
            success: function (data) {
                if (data == "") {
                    $(".eventtournamentsearch").hide();
                    $(".eventtournamentsearch").html('');
                }
                else {
                    $(".eventtournamentsearch").show();
                    $(".eventtournamentsearch").html('');
                    $(".eventtournamentsearch").append(data);
                }
            },
            error: function () {
            }
        });
    }
    else {
        $(".eventtournamentsearch").hide();
        $(".eventtournamentsearch").html('');
    }
}

function SearchClickEventTournamentDesktop(searchvalue) {
    searchvalue = searchvalue.trim();
    if (searchvalue != "" && searchvalue != " ") {
        currentRequest = $.ajax({
            type: "POST",
            url: "/search/searchforeventtournament",
            beforeSend: function () {
                if (currentRequest != null) {
                    currentRequest.abort();
                }
            },
            data: { q: searchvalue },
            success: function (data) {
                if (data == "") {
                    $(".eventtournamentsearchdesktop").hide();
                    $(".eventtournamentsearchdesktop").html('');
                }
                else {
                    $(".eventtournamentsearchdesktop").show();
                    $(".eventtournamentsearchdesktop").html('');
                    $(".eventtournamentsearchdesktop").append(data);
                }
            },
            error: function () {
            }
        });
    }
    else {
        $(".eventtournamentsearchdesktop").hide();
        $(".eventtournamentsearchdesktop").html('');
    }
}

function SearchClickallDesktop(searchvalue) {
    searchvalue = searchvalue.trim();
    if (searchvalue != "") {
        currentRequest = $.ajax({
            type: "POST",
            url: "/search/searchforall",
            beforeSend: function () {
                if (currentRequest != null) {
                    currentRequest.abort();
                }
            },
            data: { q: searchvalue },
            success: function (data) {
                if (data == "") {
                    $(".searchalltypedesktop").hide();
                    $(".searchalltypedesktop").html('');
                }
                else {
                    $(".searchalltypedesktop").show();
                    $(".searchalltypedesktop").html('');
                    $(".searchalltypedesktop").append(data);
                }
            },
            error: function () {
                $(".searchalltypedesktop").hide();
                $(".searchalltypedesktop").html('');
            }
        });
    }
    else {
        $(".searchalltypedesktop").hide();
        $(".searchalltypedesktop").html('');
    }
}

function SearchClickallMobile(searchvalue) {
    searchvalue = searchvalue.trim();
    if (searchvalue != "") {
        currentRequest = $.ajax({
            type: "POST",
            url: "/search/searchforall",
            beforeSend: function () {
                if (currentRequest != null) {
                    currentRequest.abort();
                }
            },
            data: { q: searchvalue },
            success: function (data) {
                if (data == "") {
                    $(".searchalltype").hide();
                    $(".searchalltype").html('');
                }
                else {
                    $(".searchalltype").show();
                    $(".searchalltype").html('');
                    $(".searchalltype").append(data);
                }
            },
            error: function () {
                $(".searchalltype").hide();
                $(".searchalltype").html('');
            }
        });
    }
    else {
        $(".searchalltype").hide();
        $(".searchalltype").html('');
    }
}