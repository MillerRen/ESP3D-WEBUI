// simple translate directive
const lang = process.env.VUE_APP_LANG
const trans = require(`../languages/${lang}`).default

export default {
  bind (el) {
    el.textContent = trans[el.textContent]
  },
  update(el) {
    el.textContent = trans[el.textContent]
  }
}