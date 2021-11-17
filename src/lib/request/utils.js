export function typeOf(any) {
  return Object.prototype.toString.call(any).slice(8, -1)
}