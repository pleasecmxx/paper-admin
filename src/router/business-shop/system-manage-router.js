import Layout from '@/layout'
// import EmptyLayout from '@/layout/empty'

export default {
    path: '/shop-system-manage',
    component: Layout,
    redirect: '/shop-system-manage/normal-config',
    name: '店铺系统配置',
    meta: {
        title: '店铺系统配置',
        icon: 'el-icon-setting',
        auth: ['shop.browse']
    },
    children: [
        {
            path: 'normal-config',
            name: '店铺-基础配置',
            component: () => import(/* webpackChunkName: 'NormalConfig' */ '@/views/business-shop/system-manage/NormalConfig'),
            meta: {
                title: '基础配置',
                auth: ['shop.browse']
            }
        },
        {
            path: 'channle-list-config',
            name: '店铺-渠道配置',
            component: () => import(/* webpackChunkName: 'channel.list.config' */ '@/views/business-shop/system-manage/channel.list.config'),
            meta: {
                title: '查重产品',
                auth: ['shop.browse']
            }
        },
        {
            path: 'edit-password',
            name: '店铺-修改密码',
            component: () => import(/* webpackChunkName: 'EditPassword' */ '@/views/business-shop/system-manage/EditPassword'),
            meta: {
                title: '修改密码',
                auth: ['shop.browse']
            }
        }
    ]
}
