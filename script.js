$('body').toggleClass(localStorage.toggled);
function darkLight() {
    if (localStorage.toggled != 'nightmode') {
       $('body').toggleClass('nightmode', true);
       $(".nav-bar-nav.scrolled").css({"background-color": "rgb(80, 102, 128)", "transition": "1s all ease"});
       localStorage.toggled = "nightmode";
    } else {
       $('body').toggleClass('nightmode', false).css("transition","1s all ease");
       $(".nav-bar-nav.scrolled").css({"background-color": "white", "transition": "1s all ease"});
       localStorage.toggled = "";
    }
 }
