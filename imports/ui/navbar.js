
import "./navbar.html";
import "./i18nSelector.js";

Template.navbar.onCreated(function() {
  Session.set('Errors', {});
});

Template.navbar.helpers({
  errorClass (field) {
    return !!Session.get('Errors')[field] ? 'has-error' : '';
  }
});



    Template.navbar.onRendered(function() {
        var template = this;

        console.log('---------- FeedHeader Rendered ----------');
        $('.navbar').affix({
  offset: { top: function (){
    return $('.greetings').height();
  }}
})



        console.log('Navbar Rendered!',);
        console.log('-----------------------------------------');


    });


    // jQuery to collapse the navbar on scroll
    function collapseNavbar() {
        if ($(".navbar").offset().top > 500) {
            $(".navbar").addClass("top-nav-collapse");

        } else {
            $(".navbar").removeClass("top-nav-collapse");
        }
    }

    $(window).scroll(collapseNavbar);
    $(document).ready(collapseNavbar);

    // jQuery for page scrolling feature - requires jQuery Easing plugin
    $(function() {
        $('a.page-scroll').bind('click', function(event) {
            var $anchor = $(this);
            $('html, body').stop().animate({
                scrollTop: $($anchor.attr('href')).offset().top
            }, 1500, 'easeInOutExpo');
            event.preventDefault();
        });
    });

    // Closes the Responsive Menu on Menu Item Click
    $('.navbar-collapse ul li a').click(function() {
      if ($(this).attr('class') != 'dropdown-toggle active' && $(this).attr('class') != 'dropdown-toggle') {
        $('.navbar-toggle:visible').click();
      }
    });
