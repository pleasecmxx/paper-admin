import Layout from '@/layout'
// import EmptyLayout from '@/layout/empty'

export default {
    path: '/agent-system-manage',
    component: Layout,
    redirect: '/agent-system-manage/edit-password',
    name: '代理-系统管理',
    meta: {
        title: '系统管理',
        icon: 'el-icon-setting',
        auth: ['agent.browse']
    },
    children: [
        {
            path: 'edit-password',
            name: '代理-修改密码',
            component: () => import(/* webpackChunkName: 'multilevel_menu_example' */ '@/views/business-agent/system-manage/EditPassword'),
            meta: {
                title: '修改密码',
                auth: ['agent.browse']
            }
        },
    ]
}
