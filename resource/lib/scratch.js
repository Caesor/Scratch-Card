/**
 * Scratch Mask
 * 
 * A simple and easy to use plugin to create a "Scratch Card" on your pages. 
 *
 * @author Nemo
 * @version 1.0
 * 
 * @param  canvas 		The canvas object which used to draw mask image
 * @param  cover_img 	The url of image which used as mask image
 * @param  width        The width of canvas
 * @param  height		The height of canvas
 * @param  callback    	The function which will be called after Mask has been scratched 30% 	
 */
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
		var transparentNum = 0;
		for( var i = 0; i < pixles.length; i+=4){
			var a = pixles[i+3];
			if(a < 128){
				transparentNum++;
			}
		}
		return (transparentNum / (pixles.length / 4));
	},

	addHandlerToBoard: function(){
		//charge the device
		var hastouch = "ontouchstart" in window ? true : false;
		var tapstart = hastouch ? "touchstart" : "mousedown";
        var tapmove = hastouch ? "touchmove" : "mousemove";
        var tapend = hastouch ? "touchend" : "mouseup";

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
			if(per >= 0.5){
				_this.canvas.parentNode.removeChild(_this.canvas);
				// call callvback function
				if (typeof (_this.callback) == 'function')
					_this.callback();
				console.log("success");
			}
		})
	}
}