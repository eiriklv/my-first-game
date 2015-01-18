module.exports = (function() {
  var active = {};

  addEventListener('keydown', function(e) {
    active[e.keyCode] = true;
    return false;
  }, false);

  addEventListener('keyup', function(e) {
    delete active[e.keyCode];
    return false;
  }, false);

  return active;
}());
