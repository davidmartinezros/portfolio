'use strict';
(function () {
  $(document).ready(function () {

    // bootstrap 4 smooth scrollspy 
    $(".nav-item a").on('click', function (event) {
      if (this.hash !== "") {
        event.preventDefault();
        var hash = this.hash;
        $('html, body').animate({
          scrollTop: $(hash).offset().top -30
        }, 400, function () {
          window.location.hash = hash;
        });
      }
    });
  });
  
})();
