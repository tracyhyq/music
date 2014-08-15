define(function(require, exports, module){
    var $ = require('jquery'),
        audioFun = require('./Audio'), 
        audio = document.getElementById('myMusic'), 	
        audioBox = new audioFun(audio);

    module.exports = {
    	init: function(){
    		var me = this;

    		me.MainControl = $("#MainControl");
    		me.SongName = $(".MusicList .List .Single .SongName");
    		me.LeftControl = $(".LeftControl");
    		me.RightControl = $(".RightControl");
    		me.VoiceEmp = $('.VoiceEmp');
    		me.VoiceFull = $('.VoiceFull');
    		me.Process = $('.Process');
    		me.ProcessYet = $('.ProcessYet');
    		me.VoiceProcess = $('.VoiceProcess');
    		me.VoiceProcessYet = $('.VoiceProcessYet');
    		me.ShowMusicList = $('.ShowMusicList');
    		me.MusicList = $('.MusicList');
    		me.MusicBox = $('.MusicBox');
    		me.BoxSongName = $(".MusicBox .ProcessControl .SongName");

    		me._initEvent();
    	},
    	_initEvent: function(){
    		var me = this;
    		/*me.MainControl.toggle(function(){
    			me._toggleStart($(this));
    		},function(){
    			me._toggleEnd($(this));
    		});*/
    		me.SongName.on('click', function(){
    			me._songListClick($(this));
    		});
    		me.LeftControl.on('click', function(){
    			me._leftControlClick($(this));
    		});
    		me.RightControl.on('click', function(){
    			me._rightControlClick($(this));
    		});
    		me.VoiceEmp.on('click', function(){
    			me._voiceEmpClick();
    		});
    		me.VoiceFull.on('click', function(){
    			me._voiceFullClick();
    		});
    		me.Process.on('click', function(e){
    			me._processClick(e, $(this));
    		});
    		me.ProcessYet.on('click', function(e){
    			me._processYetClick(e, $(this));
    		});
    		me.VoiceProcess.on('click', function(e){
    			me._voiceProcessClick(e, $(this));
    		});
    		me.VoiceProcessYet.on('click', function(e){
    			me._voiceProcessYetClick(e, $(this));
    		});
    		/*me.ShowMusicList.toggle(function(){
    			me._musicListToggleStart();
    		}, function(){
    			me._musicListToggleEnd();
    		});*/
    		//监听媒体文件结束的事件（ended），这边一首歌曲结束就读取下一首歌曲，实现播放上的循环播放
		    audio.addEventListener('ended', me._audioListener, false);
    	},
    	_toggleStart: function(tar){
    		var me = this,
    			defaultsong = '';

    		tar.removeClass("MainControl").addClass("StopControl");
	        if (audio.src == "") {
	            defaultsong = $(".Single .SongName").eq(0).attr("KV");
	            me.BoxSongName.text(defaultsong);
	            $(".Single .SongName").eq(0).css("color", "#7A8093");
	            audio.src = "static/Media/" + defaultsong + ".mp3";
	        }
	        audio.play();
	        me._timeSpan();
    	},
    	_toggleEnd: function(tar){
    		var me = this;
    		tar.removeClass("StopControl").addClass("MainControl");
        	audio.pause();
    	},
    	_songListClick: function(tar){
    		var me = this,
    			SongName = tar.attr("KV");

	        me.MainControl.removeClass("MainControl").addClass("StopControl");
	        tar.css("color", "#7A8093");
	        me.BoxSongName.text(SongName);

	        audio.src = "static/Media/" + SongName + ".mp3";
	        audio.play();
	        me._timeSpan();
    	},
    	_leftControlClick: function(tar){
    		var me = this,
    			isTop,
    			prevSong;

    		me.SongName.each(function () {
	            if ($(this).css("color") == "rgb(122, 128, 147)") {
	                isTop = $(this).parent(".Single").prev(".Single").length == 0 ? true : false;  //检查是否是最顶端的歌曲
	                if (isTop) {
	                    prevSong = $(".Single").last().children(".SongName").attr("KV");
	                    $(".Single").last().children(".SongName").css("color", "#7A8093");
	                }
	                else {
	                    prevSong = $(this).parent(".Single").prev(".Single").children(".SongName").attr("KV");
	                    $(this).parent(".Single").prev(".Single").children(".SongName").css("color", "#7A8093");
	                }

	                audio.src = "static/Media/" + prevSong + ".mp3";
	                me.BoxSongName.text(prevSong);
	                $(this).css("color", "#fff");
	                audio.play();
	                return false; 
	            }
	        });
    	},
    	_rightControlClick: function(tar){
    		var me = this,
    			isBottom,
    			nextSong;

    		me.SongName.each(function () {
	            if ($(this).css("color") == "rgb(122, 128, 147)") {
	                isBottom = $(this).parent(".Single").next(".Single").length == 0 ? true : false;  //检查是否是最尾端的歌曲

	                if (isBottom) {
	                    nextSong = $(".Single").first().children(".SongName").attr("KV");
	                    $(".Single").first().children(".SongName").css("color", "#7A8093");
	                }
	                else {
	                    nextSong = $(this).parent(".Single").next(".Single").children(".SongName").attr("KV");
	                    $(this).parent(".Single").next(".Single").children(".SongName").css("color", "#7A8093");
	                }

	                audio.src = "static/Media/" + nextSong + ".mp3";
	                me.BoxSongName.text(nextSong);
	                $(this).css("color", "#fff");
	                audio.play();
	                return false; 
	            }
	        });
    	},
    	_voiceEmpClick: function(){
            var me = this;
    		me.VoiceProcessYet.css("width", "0");
        	audio.volume = 0;
    	},
    	_voiceFullClick: function(){
            var me = this;
    		me.VoiceProcessYet.css("width", "66px");
        	audio.volume = 1;
    	},
    	_processClick: function(e, tar){
    		var me = this,
    			processOffset,
    			processStart
    			processLength,
    			currentProces;

    		//播放进度条的基准参数
	        processOffset = tar.offset();
	        processStart = processOffset.left;
	        processLength = tar.width();


	        currentProces = e.clientX - processStart;
	        audioBox.DurationProcessRange(currentProces / processLength);
	        me.ProcessYet.css("width", currentProces);
    	},
    	_processYetClick: function(e, tar){
    		var me = this,
    			processOffset,
    			processStart,
    			processLength,
    			currentProces;

    		//播放进度条的基准参数
	        processOffset = me.Process.offset();
	        processStart = processOffset.left;
	        processLength = me.Process.width();

	        currentProces = e.clientX - processStart;
	        audioBox.DurationProcessRange(currentProces / processLength);
	        tar.css("width", currentProces);
    	},
    	_voiceProcessClick: function(e, tar){
    		var me = this,
    			voiceProcessOffset,
    			voiceProcessStart,
    			voiceProcessLength,
    			currentProces;

    		//音量进度条的基准参数
	        voiceProcessOffset = tar.offset();
	        voiceProcessStart = voiceProcessOffset.left;
	        voiceProcessLength = tar.width();

	        currentProces = e.clientX - voiceProcessStart;
	        audioBox.VolumeProcessRange(currentProces / voiceProcessLength);
	        me.VoiceProcessYet.css("width", currentProces);
    	},
    	_voiceProcessYetClick: function(){
    		var me = this,
    			voiceProcessOffset,
    			voiceProcessStart,
    			voiceProcessLength,
    			currentProces;

    		//音量进度条的基准参数
	        voiceProcessOffset = me.VoiceProcess.offset();
	        voiceProcessStart = voiceProcessOffset.left;
	        voiceProcessLength = me.VoiceProcess.width();

	        currentProces = e.clientX - voiceProcessStart;
	        audioBox.VolumeProcessRange(currentProces / voiceProcessLength);
	        tar.css("width", currentProces);
    	},
    	_musicListToggleStart: function(){
    		var me = this,
    			musicBoxRight,
    			musicBoxBottom;

    		me.MusicList.show();
	        musicBoxRight = me.MusicBox.offset().left + me.MusicBox.width();
	        musicBoxBottom = me.MusicBox.offset().top + me.MusicBox.height();

	        me.MusicList.css("left", musicBoxRight - me.MusicList.width());
	        me.MusicList.css("top", musicBoxBottom + 15);
    	},
    	_musicListToggleEnd: function(){
    		var me = this;

    		me.MusicList.hide();
    	},
    	_audioListener: function(){
    		var me = this,
    			isBottom,
    			nextSong;

    		me.SongName.each(function () {
	            if ($(this).css("color") == "rgb(122, 128, 147)") {
	                isBottom = $(this).parent(".Single").next(".Single").length == 0 ? true : false;  //检查是否是最尾端的歌曲

	                if (isBottom) {
	                    nextSong = $(".Single").first().children(".SongName").attr("KV");
	                    $(".Single").first().children(".SongName").css("color", "#7A8093");
	                }
	                else {
	                    nextSong = $(this).parent(".Single").next(".Single").children(".SongName").attr("KV");
	                    $(this).parent(".Single").next(".Single").children(".SongName").css("color", "#7A8093");
	                }

	                audio.src = "static/Media/" + nextSong + ".mp3";
	                me.BoxSongName.text(nextSong);
	                $(this).css("color", "#fff");
	                audio.play();
	                return false; 
	            }
	        });
    	},
    	_timeSpan: function(){
		    var me = this,
                processYet = 0,
		    	currentTime = 0,
		    	timeAll = 0;

		    setInterval(function () {
		        processYet = (audio.currentTime / audio.duration) * 500;
		        me.ProcessYet.css("width", processYet);
		        vcurrentTime = audioBox.TimeDispose(audio.currentTime);
		        timeAll = audioBox.TimeDispose(audioBox.TimeAll());
		        $(".SongTime").html(currentTime + "&nbsp;|&nbsp;" + timeAll);
		    }, 1000);
    	}
    };
});