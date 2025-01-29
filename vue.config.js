const { defineConfig } = require('@vue/cli-service')
module.exports = defineConfig({
  transpileDependencies: true,
  devServer: {
    proxy: {
      '/api': {
        target: 'https://api.adviceslip.com',
        changeOrigin: true,
        pathRewrite: { '^/api': '' }
      }
    }
  }
});
