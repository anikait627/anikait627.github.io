$("#heart-beat").on('click', function() {
    if($("body").hasClass("nightmode")){
        $("body").removeClass("nightmode").css("transition", "1s all ease");
        $(".nav-bar-nav.scrolled").css({"background-color": "white", "transition": "1s all ease"});
        $(".nav-bar-link:hover").css("color", "#3581B8");
    } else {
        $("body").addClass("nightmode");
        $(".nav-bar-nav.scrolled").css({"background-color": "rgb(80, 102, 128)", "transition": "1s all ease"});
        $(".nav-bar-link:hover").css("color", "white");
    }
});
