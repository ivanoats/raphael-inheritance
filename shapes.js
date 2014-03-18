/* jshint browser:true */
/* global Raphael */

'use strict';

var Point = function (xloc,yloc) {
  var x = xloc;
  var y = yloc;
  var Constructor = function(){ };

  Constructor.prototype.getX = function() { return x; };
  Constructor.prototype.getY = function() { return y; };
  Constructor.prototype.translate =
    function(xdelta,ydelta) {
      x = x + xdelta;
      y = y + ydelta;
    };

  Constructor.prototype.toString = function() {
    return '(' + x + ',' + y + ')';
  };

  return new Constructor();
};

var Shape = function (point) {
  var anchor = point;
  var Constructor = function() { };

  Constructor.prototype.move = function(xdelta,ydelta) {
    anchor.translate(xdelta,ydelta);
  };

  Constructor.prototype.getAnchor = function() {
    return anchor;
  };

  Constructor.prototype.render = function(paper) {
    console.log(paper);
  };

  return new Constructor();
};

var Rectangle = function (point,width,height) {
  var _width = width;
  var _height = height;
  var Constructor = function() {};

  Constructor.prototype = new Shape(point);

  Constructor.prototype.area = function() {
    return _width * _height;
  };

  Constructor.prototype.render = function(paper) {
    paper.rect( point.getX(), point.getY(), _width, _height ).attr({
      fill: '#ff0000',
      stroke: '#000099',
      'stroke-width': 3
    });
  };

  return new Constructor();
};

var Circle = function (point, radius) {
  var Constructor = function() {};

  Constructor.prototype = new Shape(point);
  Constructor.prototype.area = function() {
    return 2 * Math.PI * radius ;
  };

  Constructor.prototype.render = function(paper) {
    paper.circle( point.getX(), point.getY(), radius ).attr({
      fill: '#88ff00',
      stroke: '#000099',
      'stroke-width': 3
    });
  };

  return new Constructor();

};

// exports for CommonJS (Node or Browserify)
/*

module.exports.Point = Point;
module.exports.Shape = Shape;
module.exports.Rectangle = Rectangle;

*/

var paper = new Raphael('container', 500, 1000);

var shapes = [];

var rect = new Rectangle( new Point(200,200), 100, 200);
shapes.push(rect);

var rect2 = new Rectangle( new Point(30,30), 40, 50);
shapes.push(rect2);

var circle1 = new Circle( new Point(190,190), 35);
shapes.push(circle1);

shapes.forEach(function(shape) {
  shape.render(paper);
});
