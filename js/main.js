// JavaScript Document

// ハンバーガーメニュー
$(function(){
	$("#nav-btn, #nav-bg").on("click", function(){
		$("#nav-bg, #nav, .line").toggleClass("open");
	});
});

// スムーズスクロール
$(function () {
	$('a[href^="#"]').click(function() { // a href=が#で始まるもの
		var href = $(this).attr('href'); // 代入
		var target = $(href == '#' || href == '' ? 'html' : href); // 例外処理？
		var position = target.offset().top - 80 - 20; // targetの位置。header-height考慮
 
		$('html, body').animate({
			scrollTop: position // viewportのtopまでスクロール？
		}, 500, 'swing');

		return false; // リンクをクリックした際に、URLにIDが付与されてしまうのを防ぐ(?)
	});
});

// ふわっと表示
$(window).scroll(function() {
	$('.js-fade-in').each(function() { // それぞれに操作を適用？
		// 図:https://codingwonderland.net/jquery-scroll-fade/がわかりやすい
		const pos = $(this).offset().top; // うん。ページ全体から見たオブジェクトのy座標か。
		const scroll = $(window).scrollTop(); // ページ全体から見たウインドウの上端のy座標
		const wHeight = $(window).height();
		if (pos < scroll + wHeight){ // オブジェクト上端のy座標 < ウインドウ下端のy座標
			$(this).addClass('is-inview');
		}
	});
});
// ふわっと表示。最初から表示されてるアイテムがスクロールしないと表示されないのを解消しようとした
$(function() {
	$('.js-fade-in').each(function() { // それぞれに操作を適用？
		// 図:https://codingwonderland.net/jquery-scroll-fade/がわかりやすい
		const pos = $(this).offset().top; // うん。ページ全体から見たオブジェクトのy座標か。
		const scroll = $(window).scrollTop(); // ページ全体から見たウインドウの上端のy座標
		const wHeight = $(window).height();
		if (pos < scroll + wHeight){ // オブジェクト上端のy座標 < ウインドウ下端のy座標
			$(this).addClass('is-inview');
		}
	});
});

// mainvisual動画スライドショー
$(function () {
  const $slides = $(".slide");
  let currentIndex = 0;
  let timer;
  let isSwitching = false;

  function showNext() {
    // 二重実行を防ぐ
    if (isSwitching) return;
    isSwitching = true;

    clearTimeout(timer);

    const currentVideo = $slides.eq(currentIndex).get(0);

    // 現在の動画を停止
    if (currentVideo) {
      currentVideo.pause();
      $(currentVideo).off("ended.slideshow");
    }

    $slides.eq(currentIndex).removeClass("active");

    currentIndex = (currentIndex + 1) % $slides.length;

    const $next = $slides.eq(currentIndex);
    const nextVideo = $next.get(0);

    $next.addClass("active");

    if (nextVideo) {
      nextVideo.currentTime = 0;

      // 次の動画のイベントを設定
      $(nextVideo).off("ended.slideshow").on(
        "ended.slideshow",
        showNext
      );

      nextVideo.play().catch(function (error) {
        console.log("動画の再生に失敗:", error);
      });

      timer = setTimeout(showNext, 15000);
    }

    isSwitching = false;
  }

  const firstVideo = $slides.eq(0).get(0);

  if (firstVideo) {
    firstVideo.play().catch(function (error) {
      console.log("動画の再生に失敗:", error);
    });

    $(firstVideo).on("ended.slideshow", showNext);

    timer = setTimeout(showNext, 15000);
  }
});