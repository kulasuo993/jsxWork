// 官方给的用例 用createProxyMiddleware
const { createProxyMiddleware } = require('http-proxy-middleware')

// module.exports = function (app) {
//     app.use(
//         createProxyMiddleware('/ml', { //遇见/api1前缀的请求，就会触发该代理配置
//             target: 'http://8.218.112.99', //请求转发给谁
//             changeOrigin: true,//控制服务器收到的请求头中Host的值
//             pathRewrite: { '^/ml': '' } //重写请求路径(必须)
//         })
//     )
// }
module.exports = function (app) {
    app.use(
        createProxyMiddleware('/api', { //遇见/api1前缀的请求，就会触发该代理配置
            target: 'https://admin-api-test.iyingdi.com', //请求转发给谁
            changeOrigin: true,//控制服务器收到的请求头中Host的值
            pathRewrite: { '^/api': '' } //重写请求路径(必须)
        })
    )
}