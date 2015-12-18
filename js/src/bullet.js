define(function(require,exports,module){
	var $ = require('../lib/jquery-2.1.4.js');
	var COMMON = require('./common.js');
	function Bullet(player){
		this.player = player;
		this.ele = $("<p class='bullet'></p>");
		this.player.view.container.append(this.ele);
		this.width = this.ele.width();
		this.height = this.ele.height();
		this.x = player.x+player.width/2-this.width/2;
		this.y = player.y-this.height;
		this.ele.css({
			'left':this.x+'px',
			'top':this.y+'px',
			'display':'block'
		});
		this.speed = 10;
		this.fly();
	}
	Bullet.prototype.fly = function(){
		var _this = this;
		this.flyInter = setInterval(function(){
			_this.y = _this.y - _this.speed;
			_this.ele.css({
				'top':_this.y+'px'
			});
			if(_this.y+_this.height<=0){
				_this.destroy();
			} else {
				var enemys = _this.player.view.enemys;
				for(var i=0;i<enemys.length;){
					if(enemys[i].ele==null){//判断敌机是否存在
						enemys.splice(i,1);
						continue;
					}
					if(COMMON.isCollision(enemys[i],_this)){//判断是否撞击敌机
						enemys[i].health--;
						_this.destroy();
						if(enemys[i].health ==0){
							enemys[i].destroy();
							break;
						}
					}
					i++;
				}
			}
		},30);
	};
	Bullet.prototype.destroy = function(){
		clearInterval(this.flyInter);
		this.ele.remove();
		this.ele = null;
	};
	module.exports = Bullet;
});