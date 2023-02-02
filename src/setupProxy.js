const { createProxyMiddleware } = require('http-proxy-middleware');

module.exports = function(app) {
  app.use(
    '/graph',
    createProxyMiddleware({
      target: process.env.BACKEND_API_ENDPOINT || 'https://test4.qstand.art/',
      changeOrigin: true,
    })
  );
};
