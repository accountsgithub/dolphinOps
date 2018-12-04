const meta = { requiresAuth: true }

export const constantRouterMap = [
    // 登陆
    {
        path: '/login',
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
    // 版本1.1.7
    // 测试报告页
    {
        path: '/projectMgt',
        component: resolve => require(['@/views/layout/Layout'], resolve),
        name: 'taskList',
        meta: { title: 'projectMgt', icon: 'project' },
        hidden: true,
        children: [
            {
                path: 'testReport/:mark',
                name: 'testReport',
                component: resolve => require(['@/views/projectMgt/testReport/testReportList'], resolve),
                meta: { ...meta, title: 'testReport' },
                hidden: true
            },
            {
                path: 'historyList/:mark',
                name: 'historyList',
                component: resolve => require(['@/views/projectMgt/testReport/testReportHistory'], resolve),
                meta: { ...meta, title: 'historyList' }
            }
        ]
    },
    // 历史纪录页
    {
        path: '/projectMgt',
        component: resolve => require(['@/views/layout/Layout'], resolve),
        name: 'taskList',
        meta: { title: 'projectMgt', icon: 'project' },
        hidden: true,
        children: [
            {
                path: 'testReport/historyList/:mark',
                name: 'historyList',
                component: resolve => require(['@/views/projectMgt/testReport/testReportHistory'], resolve),
                meta: { ...meta, title: 'historyList' }
            }
        ]
    },
    // projectManagement
    {
        path: '/projectMgt',
        component: resolve => require(['@/views/layout/Layout'], resolve),
        children: [
            {
                path: 'index',
                name: 'projectManagement',
                component: resolve =>
                    require(['@/views/projectMgt/ProjectList'], resolve),
                meta: { ...meta, title: 'projectMgt', icon: 'project' }
            },
            // {
            //     path: 'monitor',
            //     name: 'projectmonitor',
            //     component: resolve =>
            //         require(['@/views/projectMgt/ProjectMonitor'], resolve),
            //     meta: { ...meta, title: 'projectMor', icon: 'project' }
            // }
        ]
    },
    // 详情
    {
        path: '/projectMgt/index',
        component: resolve => require(['@/views/layout/Layout'], resolve),
        name: 'taskList',
        meta: { title: 'projectMgt', icon: 'project' },
        hidden: true,
        children: [
            {
                path: '/detailedList/:id/:proName',
                name: 'detailedList',
                component: resolve =>
                    require(['@/views/projectMgt/DetailedList'], resolve),
                meta: { ...meta, title: 'detailed' }
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
                component: resolve =>
                    require(['@/views/projectMgt/DetailedList'], resolve),
                meta: { ...meta, title: 'detailed' }
            }
        ]
    },
    // 404
    {
        path: '/404',
        component: resolve => require(['@/views/404'], resolve),
        hidden: true
    },

    { path: '*', redirect: '/404', hidden: true }
]

export default constantRouterMap
