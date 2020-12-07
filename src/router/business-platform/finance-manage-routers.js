import Layout from '@/layout'
// import EmptyLayout from '@/layout/empty'

export default {
    path: '/finace-manage',
    component: Layout,
    redirect: '/finace-manage/take-cash-manage',
    name: '财务管理',
    meta: {
        title: '财务管理',
        icon: 'el-icon-wallet',
        auth: ['platform.browse','admin']
    },
    children: [
        {
            path: 'take-cash-manage',
            name: '提现审核',
            component: () => import(/* webpackChunkName: 'multilevel_menu_example' */ '@/views/business-platform/finance-manage/TakeCashManage'),
            meta: {
                title: '提现审核',
                auth: ['platform.browse','admin']
            }
        },
    ]
}
