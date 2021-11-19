// simple translate directive
const lang = process.env.VUE_APP_LANG
const messages = require(`../languages/${lang}`).default

function translate (el, binding) {
  let key = binding.value || el.textContent
  el.textContent = messages[key] || key // translate and fallback
}

export default {
  bind () {
    translate.apply(this,arguments)
  },
  update() {
    translate.apply(this,arguments)
  }
}