const HtmlWebpackInlineSourcePlugin = require('html-webpack-inline-source-plugin')

process.env.VUE_APP_UI_VERSION = process.env.npm_package_version

class CleanWebpackPlugin {
  apply (compiler) {
    compiler.plugin('emit', function (compilation, callback) {
      Object.keys(compilation.assets)
        .forEach(function (key) {
          if (key != 'index.html.gz') {
            delete compilation.assets[key]
          }
        })

      callback()
    })
  }
}

module.exports = {
  pluginOptions: {
    compression: {
      gzip: {
        filename: '[file].gz[query]',
        algorithm: 'gzip',
        include: /\.(js|css|html|svg|json)(\?.*)?$/i,
        minRatio: 0.8
      }
    }
  },
  productionSourceMap: false,
  css: {
    extract: false
  },
  configureWebpack: {
    optimization: {
      splitChunks: false
    },
    plugins: process.env.NODE_ENV === 'production'
      ? [
          new HtmlWebpackInlineSourcePlugin(),
          new CleanWebpackPlugin()
        ]
      : []
  },
  chainWebpack: config => {
    config.plugins.delete('prefetch')
    config.plugins.delete('preload')
    config
      .plugin('html')
      .tap(args => {
        args[0].inlineSource = '.(js|css)$'
        return args
      })
  }
}
