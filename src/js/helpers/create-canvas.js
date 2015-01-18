module.exports = function(width, height) {
  // Create the canvas
  var canvas = document.createElement('canvas');

  // set canvas size;
  canvas.width = width;
  canvas.height = height;

  // append canvas to body
  document.body.appendChild(canvas);

  // get canvas context
  return canvas.getContext('2d');
};
