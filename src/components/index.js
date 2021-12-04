import Vue from 'vue'

require(`./${process.env.VUE_APP_TARGET_ENV}`)

const basename = (path, extension = '') => path.split('/').reverse()[0].replace(extension, '')
const globalComponentsContext = require.context('./', true, /[a-zA-Z0-9-]+\.vue/)


globalComponentsContext.keys().map(path => {
    const name = basename(path, '.vue')
    const component = globalComponentsContext(path)

    Vue.component(name, component.default || component)
})




