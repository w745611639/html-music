(function ($, root) {
	var $body = $(document.body);
	// 渲染时间 
	function renderTime(duration, target) {
		var minutes = Math.floor(duration / 60),
			seconds = duration % 60;
		if(minutes < 10) {
			minutes = '0' + minutes;
		}
		if(seconds < 10) {
			seconds = '0' + seconds;
		}
		$body.find(target).html(minutes + ':' + seconds);
	}
	root.renderTime = renderTime;

}(window.Zepto, window.player || (window.player = {})))
