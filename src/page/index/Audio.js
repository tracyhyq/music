define(function(require, exports, module){
    var AudioFun = function(audio){
    		this.audio = audio;
    	},
    	proto = AudioFun.prototype;

    proto = {
    	//音量进度条的转变事件
    	VolumeProcessRange: function(rangeVal){
    		this.audio.volume = parseFloat(rangeVal);
    	},
    	//播放进度条的转变事件
    	DurationProcessRange: function(rangeVal){
    		this.audio.currentTime = rangeVal * audio.duration;
    		this.audio.play();
    	},
    	//播放事件
    	Play: function(SongUrl, callback){
    		this.audio.src = SongUrl;
		    this.audio.play();
		    callback && callback();
    	},
    	//暂停事件
    	Pause: function(callback){
    		this.audio.pause();
    		callback && callback(this.audio.currentTime);
    	},
    	//时间格式处理
    	TimeDispose: function(number){
    		var minute = parseInt(number / 60),
		    	second = parseInt(number % 60);

		    minute = minute >= 10 ? minute : "0" + minute;
		    second = second >= 10 ? second : "0" + second;
		    return minute + ":" + second;
    	},
    	//当前歌曲的总时间
    	TimeAll: function(){
    		return this.audio.duration;
    	}
    };
    module.exports = AudioFun;
});