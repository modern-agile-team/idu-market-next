// const withImages = require("next-images");
const withCSS = require("@zeit/next-css");
// const { styles } = require("@ckeditor/ckeditor5-dev-utils");
const withSass = require("@zeit/next-sass");

module.exports = withSass({
  cssModules: true,
});

module.exports = withCSS({
  cssLoaderOptions: {
    url: false,
  },
});
