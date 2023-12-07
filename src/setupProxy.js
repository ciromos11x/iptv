const { createProxyMiddleware } = require('http-proxy-middleware');

module.exports = function(app) {
  app.use(
    '/api',
    createProxyMiddleware({
      target: 'http://iptv.bestitalian.org',
      changeOrigin: true,
      pathRewrite: {
        '^/api': '',  // Rimuovi /api dal percorso
      },
    })
  );
};
