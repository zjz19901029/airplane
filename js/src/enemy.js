define(function(require,exports,module){
	var $ = require('../lib/jquery-2.1.4.js');
	var COMMON = require('./common.js');
	function Enemy(view){
		this.view = view;
		var index = Math.floor(Math.random()*ENEMYS.length);//随机产生敌人
		var enemy = ENEMYS[index];
		this.ele = $("<p class='enemy'></p>");
		this.view.container.append(this.ele);
		this.width = enemy.width;
		this.height = enemy.height;
		this.x = Math.random()*this.view.width-this.width;
		this.x = this.x<0?0:this.x;
		this.y = 0-this.height;
		this.ele.css({
			'left':this.x+'px',
			'top':this.y+'px',
			'width':this.width,
			'height':this.height,
			'background-color':enemy.color,
			'display':'block'
		});
		this.speed = enemy.speed;
		this.score = enemy.score;
		this.health = enemy.health;
		this.fly();
	}
	Enemy.prototype.fly = function(){
		var _this = this;
		this.flyInter = setInterval(function(){
			_this.y = _this.y + _this.speed;
			_this.ele.css({
				'top':_this.y+'px'
			});
			if(COMMON.isCollision(_this,_this.view.player)){//判断是否撞击玩家
				_this.view.gameOver();
			}else if(_this.y>=_this.view.height){
				_this.destroy();
			}
			
		},30);
	};
	Enemy.prototype.destroy = function(){
		clearInterval(this.flyInter);
		this.ele.addClass("boom");
		if(!this.view.failed){
			this.view.score += this.score; 
		}
		var _this = this;
		setTimeout(function(){
			_this.ele.remove();
			_this.ele = null;
		},500)
	};
	module.exports = Enemy;
});