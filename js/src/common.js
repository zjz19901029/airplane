define(function(require,exports,module){
	var common = {};
	common.isCollision = function(body1,body2){//判断2 物体相撞
		if(body1.x-body2.width<body2.x&&body1.x+body1.width>body2.x){
			if(body2.y>body1.y-body2.height&&body2.y<body1.y+body1.height){
				return true;
			}
		}
		return false;
	};
	return common;
});