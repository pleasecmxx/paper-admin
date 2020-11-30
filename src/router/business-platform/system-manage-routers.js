import Layout from '@/layout'
// import EmptyLayout from '@/layout/empty'

export default {
    path: '/system-manage',
    component: Layout,
    redirect: '/system-manage/',
    name: '系统管理',
    meta: {
        title: '系统管理',
        icon: 'el-icon-setting'
    },
    children: [
        {
            path: 'normal-config',
            name: '基础系统配置',
            component: () => import(/* webpackChunkName: 'multilevel_menu_example' */ '@/views/business-platform/system-manage/NormalConfig'),
            meta: {
                title: '基础系统配置'
            }
        },
        {
            path: 'join-way-manage',
            name: '加盟渠道配置',
            component: () => import(/* webpackChunkName: 'multilevel_menu_example' */ '@/views/business-platform/system-manage/JoinWayManage'),
            meta: {
                title: '加盟渠道配置'
            }
        },
        {
            path: 'solution-manage',
            name: '问题解答管理',
            component: () => import(/* webpackChunkName: 'multilevel_menu_example' */ '@/views/business-platform/system-manage/SolutionManage'),
            meta: {
                title: '问题解答管理'
            }
        }
    ]
}
