const path = require('path');

module.exports = {
  resources: path.resolve(__dirname, '../resources'), // source files
  public: path.resolve(__dirname, '../public'), // production build files
  imageDest: path.resolve(__dirname, '../public/images'), // image src files
  imageSrc: path.resolve(__dirname, '../resources/images/**/*.{png,jpg}'), // image files optimized by gulp
};
