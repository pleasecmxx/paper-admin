import Layout from '@/layout'
// import EmptyLayout from '@/layout/empty'

export default {
    path: '/system-manage',
    component: Layout,
    redirect: '/system-manage/',
    name: '系统管理',
    meta: {
        title: '系统管理',
        icon: 'el-icon-setting',
        auth: ['platform.browse','admin']
    },
    children: [
        {
            path: 'normal-config',
            name: '基础系统配置',
            component: () => import(/* webpackChunkName: 'NormalConfig' */ '@/views/business-platform/system-manage/NormalConfig'),
            meta: {
                title: '基础系统配置',
                auth: ['platform.browse','admin']
            }
        },
        {
            path: 'join-way-manage',
            name: '加盟渠道配置',
            component: () => import(/* webpackChunkName: 'JoinWayManage' */ '@/views/business-platform/system-manage/JoinWayManage'),
            meta: {
                title: '加盟渠道配置',
                auth: ['platform.browse','admin']
            }
        },
        {
            path: 'solution-manage',
            name: '问题解答管理',
            component: () => import(/* webpackChunkName: 'SolutionManage' */ '@/views/business-platform/system-manage/SolutionManage'),
            meta: {
                title: '问题解答管理',
                auth: ['platform.browse','admin']
            }
        },
        {
            path: 'material-manage',
            name: '素材库管理',
            component: () => import(/* webpackChunkName: 'MaterialManage' */ '@/views/business-platform/system-manage/MaterialManage'),
            meta: {
                title: '素材库管理',
                auth: ['platform.browse','admin']
            }
        },
        // {
        //     path: 'template-manage',
        //     name: '推广二维码模版管理',
        //     component: () => import(/* webpackChunkName: 'TemplateManage' */ '@/views/business-platform/system-manage/TemplateManage'),
        //     meta: {
        //         title: '推广二维码模版管理',
        //         auth: ['platform.browse','admin']
        //     }
        // }
    ]
}
