import Layout from '@/layout'
// import EmptyLayout from '@/layout/empty'

export default {
    path: '/agent-shop-manage',
    component: Layout,
    redirect: '/agent-shop-manage/index',
    name: '代理-店铺管理',
    meta: {
        title: '代理店铺管理',
        icon: 'el-icon-wallet',
    },
    children: [
        {
            path: 'index',
            name: '代理-店铺管理-主页',
            component: () => import(/* webpackChunkName: 'multilevel_menu_example' */ '@/views/business-agent/shop-manage/ShopManage'),
            meta: {
                title: '店铺管理',
                auth: ['agent.browse']
            }
        },
    ]
}
