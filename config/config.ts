import { defineConfig } from '@umijs/max';
import defaultSettings from './defaultSettings';
import proxy from './proxy';
import routes from './routes';

const { UMI_ENV = 'dev' } = process.env;

export default defineConfig({
  hash: false,
  publicPath: '/',
  targets: {
    chrome: 111,
    edge: 111,
    firefox: 115,
    safari: 16,
  },
  routes,
  ignoreMomentLocale: true,
  proxy: proxy[UMI_ENV as keyof typeof proxy] ?? {},
  fastRefresh: true,
  model: {},
  initialState: {},
  title: 'reelforce',
  layout: {
    locale: false,
    ...defaultSettings,
  },
  moment2dayjs: {
    preset: 'antd',
    plugins: ['duration'],
  },
  locale: false,
  antd: {
    appConfig: {},
    configProvider: {
      variant: 'filled',
      theme: {
        token: {
          fontFamily:
            '-apple-system, BlinkMacSystemFont, Segoe UI, PingFang SC, Hiragino Sans GB, Microsoft YaHei, Helvetica Neue, Arial, Noto Sans, sans-serif',
        },
      },
    },
  },
  request: {},
  access: {},
  mock: false,
  utoopack: false,
  define: {
    'process.env.UMI_APP_ADMIN_API_BASE': process.env.UMI_APP_ADMIN_API_BASE || '',
  },
  esbuildMinifyIIFE: true,
});
