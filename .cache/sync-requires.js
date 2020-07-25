const { hot } = require("react-hot-loader/root")

// prefer default export if available
const preferDefault = m => m && m.default || m


exports.components = {
  "component---src-pages-404-js": hot(preferDefault(require("/Users/hodrobond/git/gatsby-starter-blog/src/pages/404.js"))),
  "component---src-pages-index-js": hot(preferDefault(require("/Users/hodrobond/git/gatsby-starter-blog/src/pages/index.js"))),
  "component---src-pages-test-js": hot(preferDefault(require("/Users/hodrobond/git/gatsby-starter-blog/src/pages/test.js"))),
  "component---src-pages-using-typescript-tsx": hot(preferDefault(require("/Users/hodrobond/git/gatsby-starter-blog/src/pages/using-typescript.tsx"))),
  "component---src-templates-blog-post-js": hot(preferDefault(require("/Users/hodrobond/git/gatsby-starter-blog/src/templates/blog-post.js")))
}
