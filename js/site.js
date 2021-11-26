$(document).ready(function () {

    // Variables
    var $codeSnippets = $('.code-example-body'),
        $nav = $('.navbar'),
        $body = $('body'),
        $window = $(window),
        $popoverLink = $('[data-popover]'),
        navOffsetTop = $nav.offset().top,
        $document = $(document),
        entityMap = {
            "&": "&amp;",
            "<": "&lt;",
            ">": "&gt;",
            '"': '&quot;',
            "'": '&#39;',
            "/": '&#x2F;'
        }

    var details1 = document.getElementById("details1")
    var details2 = document.getElementById("details2")
    var details3 = document.getElementById("details3")
    var details4 = document.getElementById("details4")
    var smallName = document.getElementById("smallName")


    function init() {
        $window.on('scroll', onScroll)
        $window.on('resize', resize)
        $popoverLink.on('click', openPopover)
        $document.on('click', closePopover)
        $('a[href^="#"]').on('click', smoothScroll)
        buildSnippets();

        var element = document.createElement("details");
        var isSupported = element.constructor !== window.HTMLUnknownElement && element.constructor !== window.HTMLElement
        if (isSupported == false) { document.getElementById("divMenu1").style.display = 'none';}

        onScroll();
    }

    function smoothScroll(e) {
        e.preventDefault();
        $(document).off("scroll");
        var target = this.hash,
            menu = target;
        $target = $(target);
        $('html, body').stop().animate({
            'scrollTop': $target.offset().top - 40
        }, 0, 'swing', function () {
            window.location.hash = target;
            $(document).on("scroll", onScroll);
        });
    }

    function openPopover(e) {
        e.preventDefault()
        closePopover();
        var popover = $($(this).data('popover'));
        popover.toggleClass('open')
        e.stopImmediatePropagation();
    }

    function closePopover(e) {
        if ($('.popover.open').length > 0) {
            $('.popover').removeClass('open')
        }
    }

    $("#button").click(function () {
        $('html, body').animate({
            scrollTop: $("#elementtoScrollToID").offset().top
        }, 2000);
    });

    function resize() {
        $body.removeClass('has-docked-nav')
        navOffsetTop = $nav.offset().top
        onScroll()
    }

    function onScroll() {

        var w = 0
        if (window.outerHeight) { w = window.outerWidth } else { w = document.body.clientWidth }
        console.log(w)
        
        if (w < 1250) { details4.style.display = 'none' } else { details4.style.display = '' }
        if (w < 1170) { details3.style.display = 'none' } else { details3.style.display = '' }
        if (w < 1000) { details2.style.display = 'none' } else { details2.style.display = '' }

        $body.addClass('has-docked-nav')
        ShowLogo()

        return

        if (navOffsetTop < $window.scrollTop() && !$body.hasClass('has-docked-nav')) {
            $body.addClass('has-docked-nav')
            ShowLogo()
        }
        if (navOffsetTop > $window.scrollTop() && $body.hasClass('has-docked-nav')) {
            $body.removeClass('has-docked-nav')
            HideLogo()
        }
    }

    function escapeHtml(string) {
        return String(string).replace(/[&<>"'\/]/g, function (s) {
            return entityMap[s];
        });
    }

    function buildSnippets() {
        $codeSnippets.each(function () {
            var newContent = escapeHtml($(this).html())
            $(this).html(newContent)
        })
    }

    var Overlaps = (function () {
        function getPositions(elem) {
            var pos, width, height;
            pos = $(elem).position();
            width = $(elem).width() / 2;
            height = $(elem).height();
            return [[pos.left, pos.left + width], [pos.top, pos.top + height]];
        }

        function comparePositions(p1, p2) {
            var r1, r2;
            r1 = p1[0] < p2[0] ? p1 : p2;
            r2 = p1[0] < p2[0] ? p2 : p1;
            return r1[1] > r2[0] || r1[0] === r2[0];
        }

        return function (a, b) {
            var pos1 = getPositions(a),
                pos2 = getPositions(b);
            return comparePositions(pos1[0], pos2[0]) && comparePositions(pos1[1], pos2[1]);
        };
    })();

    init();

});