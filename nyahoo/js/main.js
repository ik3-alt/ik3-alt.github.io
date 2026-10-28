$(function () {

  var $images = $('.slide-images img');
  var current = 0;

  // 最初の画像だけ表示
  $images.removeClass('active');
  $images.eq(0).addClass('active');

  setInterval(function () {

    var next = (current + 1) % $images.length;

    $images.eq(current).toggleClass('active');
    $images.eq(next).toggleClass('active');

    current = next;

  }, 5000);

});