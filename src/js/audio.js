(function ($, root) {
	function AudioManager() {
		this.audio = new Audio();
		this.status = 'pause';

	}
	AudioManager.prototype = {
		play() {
			this.audio.play();
			this.status = 'play'
		},
		pause() {
			this.audio.pause();
			this.status = 'pause';
		},
		reload(src) {
			this.audio.load();
			this.audio.src = src;
			this.status = 'pause';
		}
	}
	root.AudioManager = AudioManager;
}(window.Zepto, window.player || (window.player = {})))