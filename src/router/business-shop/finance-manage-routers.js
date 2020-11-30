import Layout from '@/layout'
// import EmptyLayout from '@/layout/empty'

export default {
    path: '/shop-finace-manage',
    component: Layout,
    redirect: '/finace-manage/take-cash-manage',
    name: '店铺-财务管理',
    meta: {
        title: '店铺财务管理',
        icon: 'el-icon-wallet'
    },
    children: [
        {
            path: 'take-cash-manage',
            name: '店铺-财务提现',
            component: () => import(/* webpackChunkName: 'multilevel_menu_example' */ '@/views/business-shop/finance-manage/TakeCashManage'),
            meta: {
                title: '财务提现'
            }
        },
    ]
}
