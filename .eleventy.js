const pluginRss = require('@11ty/eleventy-plugin-rss')
const pluginSyntaxHighlight = require('@11ty/eleventy-plugin-syntaxhighlight')
const pluginNavigation = require('@11ty/eleventy-navigation')
const pluginSass = require('eleventy-plugin-sass')
const pageAssetsPlugin = require('eleventy-plugin-page-assets')
const CleanCSS = require('clean-css')

const markdown = require('./tools/markdown.js')
const filters = require('./tools/filters.js')

module.exports = function (config) {
  // Constants
  const CONTENT_GLOBS = {
    posts: 'src/posts/**/*.md',
    media: '*.jpg|*.png|*.gif|*.mp4|*.webp|*.webm',
  }

  const SASS_CONFIG = {
    watch: 'src/scss/bundles/*.scss',
    outputDir: 'public/static/style/',
  }

  // Deep merge
  config.setDataDeepMerge(true)

  // Markdown Parsing
  config.setLibrary('md', markdown)

  // Plugins
  config.addPlugin(pluginRss)
  config.addPlugin(pluginSyntaxHighlight)
  config.addPlugin(pluginNavigation)
  config.addPlugin(pluginSass, SASS_CONFIG)
  config.addPlugin(pageAssetsPlugin, {
    mode: 'directory',
    postsMatching: 'src/posts/*/*.md',
    assetsMatching: CONTENT_GLOBS.media,
  })
  config.addFilter('cssmin', (code) => {
    return new CleanCSS({}).minify(code).styles
  })

  // Watch
  config.addWatchTarget('src/scss')

  // Layouts
  config.addLayoutAlias('base', 'base.njk')
  config.addLayoutAlias('post', 'post.njk')

  // Filters
  Object.keys(filters).forEach((filterName) => {
    config.addFilter(filterName, filters[filterName])
  })

  //Collections

  config.addCollection('posts', (collection) => {
    return collection.getFilteredByGlob(CONTENT_GLOBS.posts)
  })

  // Pass-through
  config.addPassthroughCopy('src/static')

  // Config
  return {
    templateFormats: ['md', 'njk', 'html'],
    pathPrefix: '/',
    markdownTemplateEngine: 'njk',
    htmlTemplateEngine: 'njk',
    dir: {
      input: 'src',
      output: 'public',
      includes: 'modules',
      layouts: 'layouts',
      data: 'data',
    },
  }
}
