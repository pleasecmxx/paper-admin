import Layout from '@/layout'
// import EmptyLayout from '@/layout/empty'

export default {
    path: '/agent-order',
    component: Layout,
    redirect: '/agent-order/paper-order-manage',
    name: '代理-订单管理',
    meta: {
        title: '代理订单管理',
        icon: 'el-icon-printer',
        auth: ['agent.browse']
    },
    children: [
        {
            path: 'paper-order-manage',
            name: '代理-查重订单',
            component: () => import(/* webpackChunkName: 'multilevel_menu_example' */ '@/views/business-agent/order-manage/PaperOrderManage'),
            meta: {
                title: '查重订单管理',
                auth: ['agent.browse']
            } //我爱你呀！
        }
    ]
}
