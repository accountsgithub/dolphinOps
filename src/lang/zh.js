export default {
    route: {
        detailed: '详细信息',
        projectMgt: '项目管理',
        dashboard: 'dashboard',
        projectMor: '项目监控',
        testReport: '查看测试报告 ',
        historyList: '历史纪录'
    },
    common: {
        title: '海豚平台',
        index_title: '海豚运维平台',
        reset_button: '重置',
        search_button: '搜索',
        operate_label: '操作',
        sure_button: '确认',
        cancel_button: '取消',
        // api
        networkError_message: '服务器错误，请重试',
        // constants
        categories_label0: '后端',
        categories_label1: '前端',
        categories_label2: '组件',
        modeType_label0: '基于源码',
        modeType_label1: '基于镜像',
        uploadMode_label0: '在线发布',
        uploadMode_label1: '手动导入',
        uploadType_label0: 'bug修复',
        uploadType_label1: '版本发布',
        logout: '登出' // 变更1
    },
    login: {
        title: '海豚运维平台',
        usernameRules: '项目标识不能为空',
        passwordRules: '项目密钥不能为空',
        loginButton: '登陆'
    },
    projectMgt: {
        // projectList
        name_label: '项目名称',
        name_placeholder: '请输入项目名称',
        mark_label: '项目标识',
        mark_placeholder: '请输入项目标识',
        password_placeholder: '请输入项目密钥', // 变更1
        project_list_title: '项目列表',
        import_button: '导入部署包',
        status_label: '运行状态',
        instanceNumber_label: '实例数',
        memorySize_label: '内存（MB）', // 变更1
        version_label: '当前版本',
        path_label: '外部路径',
        showDetail_button: '查看详情',
        change_button: '变更',
        stop_button: '停止',
        start_button: '启动',
        deploy_button: '开始部署',
        whitelist_set_button: '白名单设置',
        addEmail_button: '添加邮箱',
        stop_data: '已停止',
        running_data: '运行中',
        deploy_data: '待部署',
        start_data: '启动中',
        error_data: '故障',
        init_data: '初始',
        systemError_data: '系统崩溃',
        isDeploy_message: '是否确认部署项目？',
        sureDeploy_message: '确认部署',
        deploying_message: '正在部署请稍后！',
        cancel_message: '操作已取消！',
        isStop_message: '是否确认停止项目？',
        sureStop_message: '确认停止',
        stoping_message: '正在停止请稍后！',
        stop_message: '操作已取消！',
        isStart_message: '是否确认启动项目？',
        sureStart_message: '确认启动',
        starting_message: '正在启动请稍后！',
        start_message: '操作已取消！',
        // DetailedList
        downloadButton: '下载日志', // 变更1
        monitor: '监控', // 变更1
        dataList_label: '实例数列表', // 变更1
        depolyErrorStatusLabel1: 'jenkins失败', // 变更1
        depolyErrorStatusLabel2: 'docker构建失败', // 变更1
        depolyErrorStatusLabel3: '部署失败', // 变更1
        depolyErrorStatusLabel4: '已取消', // 变更1
        statusStop: '已停止',
        statusAgree: '运行中',
        statusBack: '故障',
        statusDefault: '初始',
        statusBegin: '启动中',
        statusError: '系统崩溃',
        importPackage: '导入部署包',
        begin: '启动',
        stop: '停止',
        beiginDeploy: '开始部署',
        monitorcharts: '基础监控',
        whiteIpConfig: '白名单设置',
        modify: '变更',
        instanceNumber: '实例数',
        memorySize: '内存(单位MB)',
        currVersion: '当前版本',
        pathHerf: '外部路径',
        port: '端口',
        operation: '操作',
        deployHistory: '部署历史',
        version: '版本号',
        uploadMode: '发布方式',
        uploadType: '发布类型',
        statusLabel: '状态',
        createTime: '部署时间',
        terminal: '终端',
        changeTypeButton: '版本切换',
        changeTypeTit: '切换后，线上将变更为此版本，是否继续？',
        changeTypeSubTit: '确定将线上版本切换至此版本？',
        changeTypeSussess: '切换版本成功！',
        changeTypeError: '切换版本失败！',
        operationCancel: '操作已取消！',
        confirmButtonText: '确认',
        cancelButtonText: '取消',
        beginDeployTit: '是否确认部署项目？',
        beginDeploySubTit: '确认部署？',
        deployingMes: '正在部署请稍后！',
        beginStartTit: '是否确认启动项目？',
        beginStartSubTit: '确认启动？',
        startMes: '正在启动请稍后！',
        stopStartTit: '是否确认停止项目？',
        stopStartSubTit: '确认停止？',
        stopMes: '正在停止请稍后！'
    },
    part: {
        // EmailList
        addEmail: '添加邮箱',
        email: '邮箱地址:',
        emailPlaceholder: '请添加告警邮箱,多个地址请用逗号 (",") 分隔',
        // EnvModify
        envEditTit: '环境配置-编辑',
        basicTab: '基础信息',
        uploadField: '上传类型',
        bugFix: 'BUG修复',
        versionPub: '版本发布',
        instancePlaceholder: '请选择实例数',
        selectLabel: '请选择内存(单位MB)',
        auditor: '审核人',
        versionDesc: '版本说明',
        varTab: '环境变量',
        variable: '变量',
        varPlaceholder: '请输入变量',
        value: '值',
        valuePlaceholder: '请输入值',
        deleteLabel: '删除',
        addEnv: '添加环境变量',
        ipLabal: 'IP别名',
        ipLabalPlaceholder: '请输入IP别名',
        ipPlaceholder: '请输入IP',
        ipDesc: '别名备注',
        ipDescPlaceholder: '请输入别名备注',
        cancelLabel: '取消',
        saveLabel: '保存',
        instanceMes1: '请输入实例数',
        instanceMes2: '实例数必须是正整数',
        memorySizeMes: '请输入内存大小',
        auditorMes: '请输入审核人',
        uploadFieldMes: '请输入上传类型',
        variableMes: '变量格式不正确！',
        valueMes: '值不能为空！',
        ipMes: 'ip格式不正确！',
        ipLabalMes: 'ip别名不能为空！',
        saveSuccessMes: '保存成功！',
        // ImportPackage
        uploadMes1: '将文件拖到此处，或',
        uploadMes2: '点击上传',
        uploadMes3: '文件上传中，请勿重复上传',
        uploadMes4: '文件上传失败，请删除后重新上传',
        uploadErrMes1: '文件类型只能是 rar/zip 格式!',
        uploadErrMes2: '文件大小不能超过 300MB!',
        uploadErrMes3: '请上传文件!',
        uploadErrMes4: '只允许上传一个文件！',
        // WhiteList
        addWhiteList: '添加白名单',
        whiteIp: '地址:',
        whiteIpPlaceholder: '请填写白名单地址,多个地址请用逗号 (", ") 分隔',
        okLabel: '确定',
        whiteIpSuccessMes: '添加成功！'
    },
    error404: {
        noPage_message: '该页面不存在。。。。',
        error404_message: '请检查您输入的网址是否正确，请点击以下按钮返回主页或者发送错误报告',
        error404_backButton: '返回首页'
    },
    // 版本1.1.7
    // 测试报告页面 变更1
    testPage: {
        apiName_label: '接口名称',
        testResult_label: '测试结果',
        requestPath_label: '请求地址',
        requestType_label: '请求方法',
        requestValue_label: '请求内容',
        responseStatus_label: '返回状态',
        responseValue_label: '返回内容',
        exceptionInfo_label: '异常信息',
        operation: '操作',
        success_message: '成功',
        fail_message: '失败',
        showHistoryRecord_button: '查看历史纪录',
        downloadApiDetail_button: '下载接口明细',
        summarySuccess_label: '成功笔数',
        summaryFail_label: '失败笔数',
        probabilitySuccess_label: '成功率',
        probabilityFail_label: '失败率',
        executeTime_label: '执行时间',
        apiCount_label: '接口笔数',
        autoTest_button: '自动化测试'
    }
}
