const markdownIt = require('markdown-it')

const markdown = markdownIt({
    html: true,
    breaks: true,
    typographer: true
})

module.exports = markdown