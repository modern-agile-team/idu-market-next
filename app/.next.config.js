const withCSS = require("@zeit/next-css");
const withSass = require("@zeit/next-sass");
const withImages = require("next-images");

module.exports = withImages();
module.exports = withSass({
  cssModules: true,
  cssLoaderOptions: {
    url: false,
  },
});

module.exports = withCSS({
  cssLoaderOptions: {
    url: false,
  },
});
