import Layout from '@/layout'
// import EmptyLayout from '@/layout/empty'

export default {
    path: '/user-manage',
    component: Layout,
    redirect: '/user-manage/',
    name: '用户管理',
    meta: {
        title: '用户管理',
        icon: 'el-icon-user'
    },
    children: [
        {
            path: 'normal-user',
            name: '用户管理',
            component: () => import(/* webpackChunkName: 'multilevel_menu_example' */ '@/views/business-platform/user-manage/UserManage'),
            meta: {
                title: '用户管理',
                auth: ['platform.browse','admin']
            }
        },
        {
            path: 'shop-manage',
            name: '店铺管理',
            component: () => import(/* webpackChunkName: 'multilevel_menu_example' */ '@/views/business-platform/user-manage/ShopManage'),
            meta: {
                title: '店铺管理',
                auth: ['platform.browse','admin']
            }
        },
        {
            path: 'agent-manage',
            name: '代理管理',
            component: () => import(/* webpackChunkName: 'multilevel_menu_example' */ '@/views/business-platform/user-manage/AgentManage'),
            meta: {
                title: '代理管理',
                auth: ['platform.browse','admin']
            }
        }
    ]
}
