function ScratchMask(canvas, cover_img, width, height, callback){
	this.canvas = canvas;
	this.context = this.canvas.getContext("2d");

	this.width = width;
	this.height = height;

	this.cover_img = cover_img;

	this.isErasuring = false;

	this.callback = callback;

	this.init();
}

ScratchMask.prototype = {
	init: function(){
		//alert(1)
		var _this = this;

		var image = new Image();
		image.src = this.cover_img;
		image.onload = function(){
			_this.context.drawImage(image, 0, 0, _this.width, _this.height);	
		}

		this.addHandlerToBoard();
		
	},

	checkEnd: function(){	
		var imgData = this.context.getImageData(0, 0, this.width, this.height);
		var pixles = imgData.data;
		var transPixs = [];
		for( var i = 0; i < pixles.length; i+=4){
			var a = pixles[i+3];
			if(a < 128){
				transPixs.push(i);
			}
		}
		//console.log(transPixs.length / (pixles.length / 4))
		return (transPixs.length / (pixles.length / 4));
	},

	addHandlerToBoard: function(){
		//charge the device
		var hastouch = "ontouchstart" in window ? true : false;
		var tapstart = hastouch ? "touchstart" : "mousedown";
        var tapmove = hastouch ? "touchmove" : "mousemove";
        var tapend = hastouch ? "touchend" : "mouseup";

        console.log(tapstart)

		var _this = this;
		var ctx = _this.context;
		var startPosition = {};
		// mousedown
		this.canvas.addEventListener(tapstart, function(e){
			//important!!! for Smooth as silk
			e.preventDefault();

			if(hastouch){
				var mouseX = e.targetTouches[0].pageX;
				var mouseY = e.targetTouches[0].pageY;
			}else{
				var e = window.event || e;
				var rect = this.getBoundingClientRect();
				var mouseX = e.clientX - rect.left;
				var mouseY = e.clientY - rect.top;
			}
			

			_this.isErasuring = true;
			startPosition.x = mouseX;
			startPosition.y = mouseY;
			console.log(startPosition)
		}),
		//mousemove
		this.canvas.addEventListener(tapmove, function(e){
			//important!!! for Smooth as silk
			e.preventDefault();

			if(hastouch){
				var mouseX = e.targetTouches[0].pageX;
				var mouseY = e.targetTouches[0].pageY;
			}else{
				var e = window.event || e;
				var rect = this.getBoundingClientRect();
				var mouseX = e.clientX - rect.left;
				var mouseY = e.clientY - rect.top;
			}

			if(_this.isErasuring){

				_this.context.lineCap = "round";
				_this.context.lineJoin = "round";
				_this.context.lineWidth = 60;
				_this.context.globalCompositeOperation = "destination-out";
				
				ctx.save();
				ctx.moveTo(startPosition.x, startPosition.y);
				ctx.lineTo(mouseX, mouseY);
				ctx.stroke();
				ctx.restore();

				startPosition.x = mouseX;
				startPosition.y = mouseY;
			}
		}),
		//mouseup
		this.canvas.addEventListener(tapend, function(e){
			_this.isErasuring = false;

			var per = _this.checkEnd();
			if(per >= 0.3){
				_this.canvas.parentNode.removeChild(_this.canvas);
				// call callvback function
				if (typeof (_this.callback) == 'function')
					_this.callback();
				console.log("success");
			}
			console.log("up")
		})
	}

}