const withTypescript = require('@zeit/next-typescript')
const withLess = require('@zeit/next-less')
const withCSS = require('@zeit/next-css')

if (typeof require !== 'undefined') {
  require.extensions['.less'] = file => {}
}

module.exports = withTypescript(
  withCSS(
    withLess({
      lessLoaderOptions: {
        javascriptEnabled: true,
        modifyVars: {
          'primary-color': '#ff876c',
          'layout-header-background': '#ffffff',
          'font-family': ['Nunito', 'sans-serif'],
          'code-family': ['Fira Mono', 'Monospace']
        }
      }
    })
  )
)
