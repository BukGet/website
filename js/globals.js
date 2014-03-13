$(document).ready(function () {
  var $header = $('body > header');

  $(window).scroll(function (e) {
    if ($header.offset().top !== 0) {
      if (!$header.hasClass('shadow')) {
        $header.addClass('shadow');
      }
    } else {
      $header.removeClass('shadow');
    }
  });
});