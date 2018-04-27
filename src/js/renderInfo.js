(function ($, root) {
	var $body = $(document.body);
	function renderInfo(data) {
		// 渲染歌曲相关信息
		var html = `<h2 class="song-name">${data.song}</h2>
					<div class="singer-name">${data.singer}</div>
					<div class="special">${data.album}</div>`;
		$body.find('.song-info').html(html);

		// 渲染是否喜爱
		if(data.isLike) {
			$body.find('.like-btn').addClass('like-click')
		} else {
			$body.find('.like-btn').removeClass('like-click');
		}
	}
	root.renderInfo = renderInfo;
}(window.Zepto, window.player || (window.player = {})));

