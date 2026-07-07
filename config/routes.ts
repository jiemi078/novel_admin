export default [
  {
    path: '/user',
    layout: false,
    routes: [
      {
        path: '/user/login',
        component: './user/login',
      },
      {
        path: '/user',
        redirect: '/user/login',
      },
    ],
  },
  {
    path: '/',
    redirect: '/monetization/novel/product',
  },
  {
    path: '/material',
    name: '素材管理',
    icon: 'picture',
    routes: [
      {
        path: '/material/media',
        name: '素材库',
        component: './material/media',
      },
    ],
  },
  {
    path: '/ad-material',
    name: '投放素材管理',
    icon: 'rocket',
    routes: [
      {
        path: '/ad-material/push',
        name: '素材推送列表',
        component: './ad-material/push',
      },
    ],
  },
  {
    path: '/content',
    name: '小说内容管理',
    icon: 'book',
    routes: [
      {
        path: '/content/novel',
        name: '小说管理',
        component: './content/novel',
      },
      {
        path: '/content/novel/price-template',
        name: '小说价格模板',
        component: './content/price-template',
      },
      {
        path: '/content/novel/genre',
        name: '小说题材管理',
        component: './content/genre',
      },
      {
        path: '/content/novel/tag',
        name: '小说标签管理',
        component: './content/tag',
      },
    ],
  },
  {
    path: '/data-report',
    name: '小说数据报表',
    icon: 'line-chart',
    routes: [
      {
        path: '/data-report/novel-new-user-roi',
        name: '用户roi',
        component: './data-report/novel-new-user-roi',
      },
      {
        path: '/data-report/novel-performance',
        name: '投放效果',
        component: './data-report/novel-performance',
      },
      {
        path: '/data-report/novel-total-roi',
        name: '总 ROI',
        component: './data-report/novel-total-roi',
      },
      {
        path: '/data-report/novel-recovery',
        name: '投放回收报表',
        component: './data-report/novel-recovery',
      },
      {
        path: '/data-report/novel-subscription',
        name: '订阅报表',
        component: './data-report/novel-subscription',
      },
    ],
  },
  {
    path: '/novel-transaction',
    name: '小说交易管理',
    icon: 'transaction',
    routes: [
      {
        path: '/novel-transaction/orders',
        name: '支付订单',
        component: './novel-transaction/orders',
      },
      {
        path: '/novel-transaction/subscriptions',
        name: '订阅记录',
        component: './novel-transaction/subscriptions',
      },
      {
        path: '/novel-transaction/accounts',
        name: '用户账户',
        component: './novel-transaction/accounts',
      },
      {
        path: '/novel-transaction/read-history',
        name: '阅读历史',
        component: './novel-transaction/read-history',
      },
      {
        path: '/novel-transaction/unlock-records',
        name: '解锁记录',
        component: './novel-transaction/unlock-records',
      },
    ],
  },
  {
    path: '/app-config',
    name: '应用配置',
    icon: 'appstore',
    routes: [
      {
        path: '/app-config/novel-homepage',
        name: '小说系统首页布局',
        component: './app-config/novel-homepage',
      },
    ],
  },
  {
    name: '合作管理',
    icon: 'team',
    routes: [
      {
        path: '/content/partner',
        name: '合作方管理',
        component: './content/partner',
      },
      {
        path: '/content/revenue-share',
        name: '分账管理',
        component: './content/revenue-share',
      },
    ],
  },
  {
    path: '/monetization/novel',
    name: '小说变现管理',
    icon: 'gift',
    routes: [
      {
        path: '/monetization/novel/product',
        name: '小说金币包管理',
        component: './novel/package',
      },
      {
        path: '/monetization/novel/sku-template',
        name: '小说SKU模板',
        component: './novel/sku-template',
      },
      {
        path: '/monetization/novel/subscription',
        name: '小说订阅管理',
        component: './novel/subscription',
      },
      {
        path: '/monetization/novel/benefit',
        name: '小说权益管理',
        component: './novel/benefit',
      },
    ],
  },
  {
    path: '/ads',
    name: '广告投放',
    icon: 'fund',
    routes: [
      {
        path: '/ads/pixel',
        name: 'Pixel管理',
        component: './ads/pixel',
      },
      {
        path: '/ads/ad-account',
        name: '广告账户',
        component: './ads/ad-account',
      },
      {
        path: '/ads/ad-link',
        name: '投放配置',
        component: './ads/ad-link',
      },
      {
        path: '/ads/ad-domain',
        name: '域名管理',
        component: './ads/ad-domain',
      },
      {
        path: '/ads/campaign',
        name: '广告投放',
        component: './ads/campaign',
      },
      {
        path: '/ads/platform-config',
        name: '平台配置',
        component: './ads/platform-config',
      },
      {
        path: '/ads/attribution-config',
        name: '归因配置列表',
        component: './ads/attribution-config',
      },
    ],
  },
  {
    path: '/novel/reward-center',
    name: '小说奖励中心',
    icon: 'gift',
    routes: [
      {
        path: '/novel/reward-center/signin',
        name: '签到配置',
        component: './reward-center/signin',
      },
      {
        path: '/novel/reward-center/tasks',
        name: '日常任务',
        component: './reward-center/tasks',
      },
    ],
  },
  {
    path: '/operation',
    name: '运营管理',
    icon: 'customer-service',
    routes: [
      {
        path: '/operation/feedback',
        name: '用户反馈',
        component: './operation/feedback',
      },
    ],
  },
  {
    path: '/system',
    name: '系统管理',
    icon: 'setting',
    routes: [
      {
        path: '/system/user',
        name: '用户管理',
        component: './system/user',
      },
      {
        path: '/system/role',
        name: '角色管理',
        component: './system/role',
      },
      {
        path: '/system/language',
        name: '语言管理',
        component: './system/language',
      },
      {
        path: '/system/country',
        name: '国家管理',
        component: './system/country',
      },
    ],
  },
  {
    path: '/*',
    component: '404',
    layout: false,
  },
];
