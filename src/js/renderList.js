(function ($, root) {
	var $body = $(document.body);
	// 渲染播放列表，点击才初始渲染
	function renderList() {
		var html = '';
		list.forEach(function (ele) {
			html += `<li><a href="#"><span class="song">${ele.song}</span>-${ele.singer}</a></li>`;
		});
		$body.find('.list').html(html);
		$body.find('.song-list').css('transform', 'translateY(0%)');
		changeActive();
		// 惰性函数，初始化渲染一次dom，后续控制css transform属性,不重新渲染dom
		root.listmanager.renderList = function () {
			$body.find('.song-list').css('transform', 'translateY(0%)');
		}
	}
	// 根据indexmanager 的index控制播放列表中的选中项,移除lastIndex保存的上次选中项的选中状态
	function changeActive() {
		var $li = $body.find('.song-list li');
		$li.eq(indexmanager.lastIndex).removeClass('on');
		$li.eq(indexmanager.index).addClass('on');
	}
	root.listmanager = {
		renderList,
		changeActive
	}
}(window.Zepto, window.player || (window.player = {})))
