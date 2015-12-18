define(function(require,exports,module){
	var $ = require('../lib/jquery-2.1.4.js');
	var Bullet = require('./bullet');
	function Player(view){
		this.view = view;
		this.ele = $("<div id='player'></div>");
		this.view.container.append(this.ele);
		this.width = this.ele.width();
		this.height = this.ele.height();
		this.x = (this.view.width-this.width)/2;
		this.y = this.view.height-this.height;
		this.ele.css({
			'left':this.x+'px',
			'top':this.y+'px'
		});
		this.move = false;
		this.bindEvent();
		this.shot();
	}

	Player.prototype.shot = function(){
		var _this = this;
		this.shotInter = setInterval(function(){
			var bullet = new Bullet(_this);
			_this.view.bullets.push(bullet);
		},200);
	};

	Player.prototype.destroy = function(){
		clearInterval(this.shotInter);
		this.ele.remove();
		$('body').off("touchmove").off("touchend");
		this.ele = null;
	};
	Player.prototype.bindEvent =function(){
		var _this = this;
		this.ele.on("touchstart",function(){
			_this.move = true;
		});
		$('body').on("touchmove",function(){
			window.event.preventDefault();
			if(_this.move){
				var e = window.event;
				var x = (e.touches[0].clientX-_this.width/2);
				var y = (e.touches[0].clientY-_this.height/2);
				if(x<0){
					x = 0;
				} else if(x>_this.view.width-_this.width){
					x = _this.view.width-_this.width;
				}
				if(y<0){
					y=0;
				} else if(y>_this.view.height-_this.height){
					y=_this.view.height-_this.height;
				}
				_this.x = x;
				_this.y = y;
				_this.ele.css({'left':x+'px','top':y+'px'});
			}
		}).on("touchend",function(){
			_this.move = false;
		});
	};
	module.exports = Player;
});