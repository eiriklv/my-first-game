module.exports = {
  x: 0,
  y: 0,
  ready: false,
  imageSrc: 'img/background.png',
  image: new Image(),
  _init: false,
  _load: function() {
    if (!this._init) {
      this._loadImage();
      this._init = true;
    }
  },
  _loadImage: function() {
    this.image.onload = function() {
      this.ready = true;
    }.bind(this);
    this.image.src = this.imageSrc;
  },
  draw: function(ctx) {
    if (!this.ready) return this._load();
    ctx.drawImage(this.image, 0, 0);
  }
};
