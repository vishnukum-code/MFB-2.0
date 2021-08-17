$(document).ready(function () {
    if (navigator.userAgent.indexOf('Safari') != -1 &&
        navigator.userAgent.indexOf('Chrome') == -1) {
        document.body.className += " safari";
    }
});
$('.dropdown-toggle').dropdown();

// Header - expandable submenu
var $elem = $('.expandable-submenu');
$elem.on('click', function (e) {
    $elem.toggleClass('active');
    if ($(e.target).hasClass('dropdown-submenu-link') || $(e.target).parents('.dropdown-submenu-link').length) {
        e.preventDefault();
        e.stopPropagation();
    }
});

var reqAnimationFrame = window.requestAnimationFrame ||
    window.webkitRequestAnimationFrame ||
    window.mozRequestAnimationFrame ||
    window.msRequestAnimationFrame ||
    window.oRequestAnimationFrame ||
    // IE Fallback, you can even fallback to onscroll
    function (callback) { window.setTimeout(callback, 1000 / 60) };
var $globalNav = $('.global-nav');
var $zenegyNav = $('.header_nav');
var $Nav = $('#globalNav');

$blogActionsFooter = $('.blog-footer'),
    $blogContentWrapper = $('.js-blog-content');

function handleScroll() {

    if ($(window).scrollTop() > 450) {
        if (!$globalNav.hasClass('dark-fixed')) {
            $globalNav.addClass('floating');
        }
        if (!$zenegyNav.hasClass('dark_fixed')) {
            $zenegyNav.addClass('floating');
        }
        if ($Nav.hasClass('remove_floating')) {
            $globalNav.removeClass('floating');
            $zenegyNav.removeClass('floating');
        }
        $(".share-bar").addClass("fix");
        $blogActionsFooter.addClass('active');
    }
    else {
        if ($globalNav.hasClass('floating')) {
            $globalNav.addClass('revers').removeClass('floating');
            $(".share-bar").removeClass("fix");
            setTimeout(function () { $globalNav.removeClass('revers'); }, 100);
        }
        if ($zenegyNav.hasClass('floating')) {
            $zenegyNav.addClass('revers').removeClass('floating');
            setTimeout(function () { $zenegyNav.removeClass('revers'); }, 100);
        }
        
        $blogActionsFooter.removeClass('active');

    }
}

$(window).bind('scroll', function () {
    reqAnimationFrame(handleScroll);
});



$(".btn-menu-toggle").click(function () {
    if ($("body").width() <= 768) {
        $('body').toggleClass('body_overflow');
    }
})

$(".burger-container").click(function () {
    if ($("body").width() <= 768) {
        $('body').toggleClass('body_overflow');
    }
})

