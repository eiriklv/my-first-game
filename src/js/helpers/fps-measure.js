module.exports = (function() {
  // fps measuring
  var average = [];
  var averageLength = 5;

  return {
    update: function(measurement) {
      if (average.length >= averageLength) {
        average.shift();
      }
      average.push(measurement);
    },
    getAverage: function() {
      return Math.round((1000 / (average.reduce(function(a, b) {
        return a + b;
      }, 0) / averageLength)));
    }
  }
}());
