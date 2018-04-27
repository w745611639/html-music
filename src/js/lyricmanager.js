(function ($, root) {
	var $body = $(document.body);
	var index = 0;
	var lastIndex = 0;
	var $lyric = $body.find('.lyric-wrapper');
	var $pList;
	var _top = 0;
	function getLyric (data) {
		var text = data[indexmanager.index].text,
			html = '',
			tempArr = text.split("[");
			tempArr.shift();
		tempArr.forEach(function (ele, index) {
			var temp = ele.split(']');
			var time = temp[0].split(":");
			html += `<p data-time="${parseInt(time[0] *  60) +  parseFloat(time[1])}">${temp[1]}</p>`;
		})
		$lyric.html(html);
		$pList = $lyric.find('p');
	}
	function moveLyric(curTime) {
		var _timer = Math.abs($pList.eq(index).attr('data-time') - curTime);
		console.log(_timer);
		if(_timer <= 0.5) {
			$pList.eq(lastIndex).removeClass('active');
			_top -= 50;
			$lyric.css('top', _top + 'px');
			$pList.eq(index).addClass('active');
			lastIndex = index;
			index ++;
		}
	}
	function changeIndex(val) {
		index = val;
		lastIndex = val;
		_top = -val * 50;
		$lyric.css('top', _top + 'px');
	}
	root.lyricmanager = {
		getLyric: getLyric,
		moveLyric: moveLyric,
		changeIndex: changeIndex
	}
}(window.Zepto, window.player || (window.player = {})))
