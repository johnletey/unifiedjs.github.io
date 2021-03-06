var h = require('hastscript')
var findAndReplace = require('hast-util-find-and-replace')
var singular = require('pluralize').singular

module.exports = link

var re = /\b([A-Z]\.?[A-Z][\w.]*)\b/g

var ignore = findAndReplace.ignore.concat(['pre', 'code'])

function link(titles) {
  return transform

  function transform(tree, file) {
    var cache = []

    findAndReplace(tree, re, replace, {ignore: ignore})

    function replace($0) {
      var id = singular($0)
      var first = !cache.includes(id)
      var title = titles[id]
      var props

      if (title === null) {
        return $0
      }

      if (!title) {
        file.message('Missing abbreviation title for `' + id + '`')
        return $0
      }

      if (first) {
        cache.push(id)
      }

      props = {title: title}

      if (first) {
        props.className = ['first']
      }

      return h('abbr', props, $0)
    }
  }
}
