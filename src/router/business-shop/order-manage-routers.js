import Layout from '@/layout'
// import EmptyLayout from '@/layout/empty'

export default {
    path: '/shop-order',
    component: Layout,
    redirect: '/shop-order/print-order-manage',
    name: '店铺-打印订单管理',
    meta: {
        title: '店铺订单管理',
        icon: 'el-icon-printer',
        auth: ['shop.browse']
    },
    children: [
        {
            path: 'print-order-manage',
            name: '店铺-打印订单',
            component: () => import(/* webpackChunkName: 'multilevel_menu_example' */ '@/views/business-shop/order-manage/PrintOrderManage'),
            meta: {
                title: '打印订单管理',
                auth: ['shop.browse']
            }
        },
        {
            path: 'paper-order-manage',
            name: '店铺-查重订单',
            component: () => import(/* webpackChunkName: 'multilevel_menu_example' */ '@/views/business-shop/order-manage/PaperOrderManage'),
            meta: {
                title: '查重订单管理',
                auth: ['shop.browse']
            } //我爱你呀！
        }
    ]
}
