/*
	1.初始化渲染
		a. body背景（高斯模糊处理）
		b. 图片渲染
		c.歌曲信息渲染
		d.歌曲时间渲染
		e.音频资源引入
		f.是否喜欢

	2. 事件驱动
		a. 点击播放按钮，播放音频，再次点击暂停播放（初始状态为暂停）
			i: 在播放状态下：执行动画：已播放时间更新，播放进度条更新；歌词向下运动
				(控制这些行为的核心在于 计算当前音频播放的时间与音频总时长之间的比例)
			ii: 在暂停状态下，停止动画；当再次播放时，从上次播放的进度开始播放
		b.点击下一首/上一首重新渲染数据
		c.点击列表按钮，显示获取的歌曲信息
		d: 进度条有拖拽操作，可以根据拖拽的距离跳转音频播放的位置(根据拖拽的距离更新播放的时间)
		e: 歌词区域有上下拖拽操作，同理，可以根据上下滑动的距离 重新计算进度条的位置和播放的时间

		那么现在有三个入口可以操作音频的播放进度
				1. 播放状态下，自动更新播放的时间，滚动条和歌词 三者是联动状态(核心是音频当前的播放时间)
				2. 拖拽进度条，作用同上（核心是left的值变化）
				3.滚动歌词,作用也同上(核心是top的值变化)

*/
var $ = window.Zepto;
var $body = $(document.body);
var list = null;
var indexmanager = null;
var audiomanager = null;
var lyricmanager = null;
function getData(url, callback) {
	$.ajax({
		type: 'GET',
		url: url,
		success: function (data) {
			callback(data);
		},
		error: function (data) {
			console.log('error')
		}
	})
}
function renderData(list, index) {
	var data = list[index];
	audiomanager.reload(data.audio);
	player.renderInfo(data);
	player.renderImg(data);
	player.renderTime(data.duration, '.all-time');
	$('.play-btn span').removeClass('play');
	player.progressor.stop();
	player.progressor.init();
	player.listmanager.changeActive();
	player.lyricmanager.changeIndex(0);
	player.lyricmanager.getLyric(lyricmanager);
	
}
// 绑定事件函数，集中管理事件
function bindEvent() {
	// 点击前一首按钮 index--   (indexmanager.index属性控制渲染歌曲信息)
	$body.find('.prev-btn span').on('click', function () {
		renderData(list, indexmanager.changeIndex(-1));
	});

	// 点击下一首按钮 index++ 
	$body.find('.next-btn span').on('click', function () {
		renderData(list, indexmanager.changeIndex(1));
	});

	// 播放按钮  通过监听audiomanager.status的变化，执行对应的播放/暂停操作
	$body.find('.play-btn span').on('click', function () {
		if(audiomanager.status == 'pause') {
			audiomanager.play();
			$(this).addClass('play');
			player.progressor.start();
		} else {
			audiomanager.pause();
			$(this).removeClass('play');
			player.progressor.stop();
		}
	});
	var offsets = $body.find('.pro-bar').offset();
	var min = offsets.left - 5;
	var max = offsets.left + offsets.width -5;
	var area = max - min;

	console.log(area, min, max);
	// 进度条 滑动事件
	$body.find('.control-bar').on('touchstart', function (event) {
		var percent;
		var duration = audiomanager.audio.duration;
		$(document).on('touchmove', function (event) {
			var left = event.changedTouches[0].clientX;
			var temp;
			percent = (left - min) / area;
			if(percent < 1 && percent > 0) {
				left = area * percent;
			} else if(percent >= 1) {
				left = 210;
				percent = 1;
			} else {
				left = -5;
				percent = 0;
			}
			$('.control-bar').css({
				'left': left - 5 + 'px'
			});
			$('.play-pro-bar').css({
				'max-width': percent * 100 + '%'
			});
			player.renderTime(Math.floor(duration * percent), '.cur-time');
			// $('.cur-time').html(player.renderTime(duration * percent));
		});
		$(document).on('touchend', function () {
			$(this).off('touchmove');
			$(this).off('touchend');
			player.progressor.moveCurTime( duration * percent);
		})
	});

	// 点击列表按钮，展开播放列表
	$body.find('.list-btn span').on('click', function () {
		player.listmanager.renderList();
	});

	// 点击关闭按钮，隐藏播放列表，通过transform: translateY 控制
	$body.find('.song-list .close').on('click', function () {
		$('.song-list').css('transform', 'translateY(100%)');
	});

	// 点击播放列表中的项， index = 当前项的index();
	$body.find('.song-list .list').on('click', function (event) {
		var target = event.target, $li, index;
		// 如果事件源对象不是li,则往上找到li标签
		if(target.nodeName != 'LI') {
			$li = $(target).parent('li');
		} else {
			$li = $(target);
		}
		index = indexmanager.index;
		renderData(list, indexmanager.changeIndex($li.index() - index));
	})
}

getData('../mock/lrc.json', function (data) {
	lyricmanager = data;
	// player.lyricmanager.getLyric(data);
})


// 初始化函数;
getData('../mock/data.json', function (data) {
	list = data;
	indexmanager = new player.IndexManager(data.length);
	audiomanager = new player.AudioManager();
	bindEvent();
	renderData(list, indexmanager.index);
});


