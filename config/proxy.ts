export default {
  dev: {
    '/admin-api': {
      target: 'http://localhost:8888',
      changeOrigin: true,
    },
  },
  test: {},
  prod: {},
};
