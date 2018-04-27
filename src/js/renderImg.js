(function ($, root) {
	var $body = $(document.body);
	// 渲染图片
	function renderImg(data) {
		var img = new Image();
		// 图片加载完执行模糊操作
		img.onload = function () {
			root.blurImg(img, $body);
		}
		img.src = data.image;
		$body.find('.song-img').html(img);
	}
	root.renderImg = renderImg;
}(window.Zepto, window.player || (window.player = {})))
