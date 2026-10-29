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
		const pos = $(this).offset().top; // ページ全体から見たオブジェクトのy座標か。
		const scroll = $(window).scrollTop(); // ページ全体から見たウインドウの上端のy座標
		const wHeight = $(window).height();
		if (pos < scroll + wHeight){ // オブジェクト上端のy座標 < ウインドウ下端のy座標
			$(this).addClass('is-inview');
		}
	});
});

// tab切り替え
$(function() {
	// tabボタンがクリックされたとき
	$(".tab").on("click", function() {
		// tab
		$(".tab").removeClass("active");
		$(this).addClass("active");
		// data-target (section)にもクラスを付与
		$(".tab-content").removeClass("active");
		$("#" + $(this).data("target")).addClass("active"); // すごい
	});
});

// スクロール量に応じてヘッダーを透明に
$(window).on("scroll", function() {
  if ($(this).scrollTop() > 80) { // header-height
    $("#header").addClass("scrolled");
  } else {
    $("#header").removeClass("scrolled");
  }
});