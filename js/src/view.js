define(function(require, exports, module){
	var $ = require('../lib/jquery-2.1.4.js');
	var Player = require('./player');
	var Bullet = require('./bullet');
	var Enemy = require('./enemy');
	function View(container){
		this.container = $(container);
		this.startBtn = $("#start");
		this.scoreSpan = $("#score");
		this.height = this.container.height();
		this.width = this.container.width();
		this.enemys = [];
		this.bullets = [];
		this.score = 0;
		this.failed = false;
	}
	module.exports = View;

	View.prototype.makeEnemy = function(){
		var enemy = new Enemy(this);
		this.enemys.push(enemy);
		time = (0.5+Math.random()*2)*1000;//随机1-3秒之内出下一个敌人
		var _this = this;
		setTimeout(function(){!_this.failed&&_this.makeEnemy();},time);
	};

	View.prototype.render = function(){
		var _this = this;
		this.startBtn.on("click",function(){
			_this.startBtn.hide();
			_this.start();
		});
	};
	View.prototype.start =function(){
		this.enemys = [];
		this.bullets = [];
		this.score = 0;
		this.failed = false;
		this.player = new Player(this);
		this.makeEnemy();
		this.refresh();
	};
	View.prototype.refresh = function(){
		var y = 0;
		var _this = this;
		_this.refreshInter = setInterval(function(){
			y++;
			_this.container.css('background-position-y',y+'px');
			_this.score++;
			_this.scoreSpan.text(_this.score);
		},60);
	};

	View.prototype.gameOver = function(){
		this.failed = true;
		this.container.children().hide();
		this.player.destroy();
		var enemys = this.enemys,bullets = this.bullets;
		for(var i=0;i<enemys.length;i++){
			if(enemys[i].ele)enemys[i].destroy();
		}
		for(var i=0;i<bullets.length;i++){
			if(bullets[i].ele)bullets[i].destroy();
		}
		clearInterval(this.refreshInter);
		this.startBtn.show();
	}
});