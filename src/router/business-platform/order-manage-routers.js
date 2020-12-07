import Layout from '@/layout'
// import EmptyLayout from '@/layout/empty'

export default {
    path: '/order-manage',
    component: Layout,
    redirect: '/order-manage/paper-order-manage',
    name: '订单管理',
    meta: {
        title: '订单管理',
        icon: 'el-icon-tickets',
        auth: ['platform.browse','admin']
    },
    children: [
        {
            path: 'paper-order-manage',
            name: '查重订单管理',
            component: () => import(/* webpackChunkName: 'multilevel_menu_example' */ '@/views/business-platform/order-manage/PaperOrderManage'),
            meta: {
                title: '查重订单管理',
                auth: ['platform.browse','admin']
            }
        },
        {
            path: 'print-order-manage',
            name: '打印订单管理',
            component: () => import(/* webpackChunkName: 'multilevel_menu_example' */ '@/views/business-platform/order-manage/PrintOrderManage'),
            meta: {
                title: '打印订单管理',
                auth: ['platform.browse','admin']
            }
        },
    ]
}
