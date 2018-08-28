const meta = { requiresAuth: true }

export const constantRouterMap = [
    // 登陆
    { path: '/login',
        component: resolve => require(['@/views/login/Login'], resolve),
        hidden: true
    },

    {
        path: '/',
        component: resolve => require(['@/views/layout/Layout'], resolve),
        redirect: '/login',
        name: 'projectMgt',
        hidden: true
    },
    // 404
    { path: '/404',
        component: resolve => require(['@/views/404'], resolve),
        hidden: true
    },

    // projectManagement
    {
        path: '/projectMgt',
        component: resolve => require(['@/views/layout/Layout'], resolve),
        children: [
            {
                path: 'index',
                name: 'projectManagement',
                component: resolve => require(['@/views/projectMgt/ProjectList'], resolve),
                meta: {...meta, title: '项目管理', icon: 'project'}
            }
        ]
    },


    { path: '*', redirect: '/404', hidden: true }
]

export default constantRouterMap
