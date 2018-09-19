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
    // 详情
    {
        path: '/detailed',
        component: resolve => require(['@/views/layout/Layout'], resolve),
        hidden: true,
        children: [
            {
                path: '/detailedList/:id/:proName',
                name: 'detailedList',
                component: resolve => require(['@/views/projectMgt/DetailedList'], resolve),
                meta: {...meta, title: '详细信息'}
            }
        ]
    },
    // 项目详情
    {
        path: '/project',
        component: resolve => require(['@/views/layout/Layout'], resolve),
        hidden: true,
        children: [
            {
                path: '/projectItem',
                name: 'projectItem',
                component: resolve => require(['@/views/projectMgt/DetailedList'], resolve),
                meta: {...meta, title: '详细信息'}
            }
        ]
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
