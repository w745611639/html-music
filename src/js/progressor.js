(function ($, root) {
	var $body = $(document.body);
	var requestId = null;
	var audio;
	var duration;
	var area = 215;
	var percent;
	// 开启动画
	function start() {	
		audio = audiomanager.audio;
		duration = audio.duration;
		// 执行动画 利用requestAnimation
		function update() {
			if(curTime >= duration) {
				cancelAnimationFrame(requestId);
			}
			var curTime = audio.currentTime;
			percent = curTime / duration;
			$body.find('.control-bar').css({
				'left': area * percent  - 5 + 'px'
			});
			$body.find('.play-pro-bar').css({
				'max-width': percent * 100 + '%'
			});
			root.lyricmanager.moveLyric(curTime);
			$body.find('.lyric-wrapper')
			root.renderTime(Math.round(curTime), '.cur-time');
			requestId = requestAnimationFrame(update);
		}
		update();
	}
	function stop() {
		if(requestId) {
			cancelAnimationFrame(requestId);
		}
		
	}
	// 初始化，将动画的元素回归到初始状态
	function init() {
		$body.find('.control-bar').css({
			'left': '-5px'
		});
		$body.find('.cur-time').html('00:00');
		$body.find('.play-pro-bar').css('max-width', 0);
	}
	function moveCurTime(curtime) {
		audiomanager.audio.currentTime = curtime;
	}
	root.progressor = {
		start,
		stop,
		init,
		moveCurTime
	}
}(window.Zepto, window.player || (window.player = {})))