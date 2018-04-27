(function ($, root) {
	// 管理索引，通过索引，定位目标数据
	function IndexManager(len) {
		this.index = 0;
		this.lastIndex = 0;
		this.len = len;
	}
	IndexManager.prototype = {
		//改变索引值
		changeIndex(val) {
			var len = this.len;
			this.lastIndex = this.index;
			this.index += val;
			return (this.index = (this.index + len) % len);
		}
	}
	root.IndexManager = IndexManager;
}(window.Zepto, window.player || (window.player = {})))
