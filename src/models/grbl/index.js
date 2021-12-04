import status from './middleware/status'
import success from './middleware/success'
import reset from './middleware/reset'
import alarm from './middleware/alarm'
import error from './middleware/error'
import settings from './middleware/settings'
import buildVersion from './middleware/build-version'
import buildOption from './middleware/build-option'
import help from './middleware/help'
import probe from './middleware/probe'
import echo from './middleware/echo'
import startup from './middleware/startup'
import gcodeState from './middleware/gcode-state'
import gcodeSystem from './middleware/gcode-system'
import feedback from './middleware/feedback'

export default {
  fns: [
    status,
    success,
    reset,
    alarm,
    error,
    settings,
    buildVersion,
    buildOption,
    help,
    probe,
    echo,
    startup,
    gcodeState,
    gcodeSystem,
    feedback
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
