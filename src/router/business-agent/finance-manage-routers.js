import Layout from '@/layout'
// import EmptyLayout from '@/layout/empty'

export default {
    path: '/agent-finace-manage',
    component: Layout,
    redirect: '/agent-finace-manage/take-cash',
    name: '代理-财务管理',
    meta: {
        title: '代理财务管理',
        icon: 'el-icon-wallet',
    },
    children: [
        {
            path: 'take-cash',
            name: '代理-财务提现',
            component: () => import(/* webpackChunkName: 'multilevel_menu_example' */ '@/views/business-agent/finance-manage/TakeCashManage'),
            meta: {
                title: '财务提现',
                auth: ['agent.browse']
            }
        },
    ]
}
