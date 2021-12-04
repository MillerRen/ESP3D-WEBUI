export default {
  fns: [
  ],
  use (fn) {
    this.fns.push(fn)
  },
  run (ctx) {
    var index = 0
    var next = function () {
      index++
    }
    this.fns.map((fn,i)=> {
      if(index == i) {
        fn(ctx, next)
      }
    })
    return ctx
  }
}
