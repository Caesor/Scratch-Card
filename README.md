# Scratch-Card

A simple and easy to use plugin to create a "Scratch Card" on your pages.

See demo here:[http://caesor.github.io/Scratch-Card/](http://caesor.github.io/Scratch-Card/)

##Introduction

There are a lot of scene to use Scratch Card. Such as lottery, an invitation card on mobile and so on. It makes user fell more interesting to scratch a mask and see the information or picture below it.

##Compatibility

scratch.js is fully functional on all modern browers which must support Html5 Canvas API. It works as well on your mobile device.

##Usage

As you can see in demo file, you will only need to include:

The Javascript file `scratch.js`
  <script src="<your file system>/scratch.js"></script>

##Initialization

All you need to do is new a object named `ScratchMask`

  /**
   * @param canvas    The canvas object 
   * @param url       The url of image you want to use as a mask layer
   * @param width     The width of canvas
   * @param height    The height of canvas
   * @param callback  The function will be called after mask has been scratched about 30%
   */
  var scratch_layer = new ScratchMask(canvas, imgurl, width, height, callback());

 
