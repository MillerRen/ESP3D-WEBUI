// simple translate directive
import messages from '../assets/languages/zh_CN'

export default function (el, binding) {
  let key = binding.value || el.textContent
  key = key.trim()
  el.textContent = messages[key] || key // translate and fallback
}