import MOCK from 'mockjs'
import testStatus from './json/testStatus'
import testReportList from './json/testReportList'
import exceptionList from './json/exceptionList'
import login from './json/login'
import projectMgr from './json/projectMgr'
import testHistoryList from './json/testHistoryList'
import cpuUsAge from './json/cpuUsAge'
import transmission from './json/transmission'
import fsStatus from './json/fsStatus'
import memory from './json/memory'
import logout from './json/logout'

MOCK.setup({
    timeout: '300-600'
})

MOCK.mock(new RegExp('/rap_summary/summary', 'i'), 'get', testStatus)
MOCK.mock(new RegExp('/rap_log', 'i'), 'get', testReportList)
MOCK.mock(new RegExp('/comparison/test/errors', 'i'), 'get', exceptionList)
MOCK.mock(new RegExp('/oauth/password', 'i'), 'post', login)
MOCK.mock(new RegExp('/project/list.do', 'i'), 'get', projectMgr)
MOCK.mock(new RegExp('/rap_summary', 'i'), 'get', testHistoryList)
MOCK.mock(new RegExp('/nonTomcat/test/icmp-web-v2/cpu_usage', 'i'), 'get', cpuUsAge)
MOCK.mock(new RegExp('/nonTomcat/test/icmp-web-v2/transmission', 'i'), 'get', transmission)
MOCK.mock(new RegExp('/common/test/icmp-web-v2/fs_status', 'i'), 'get', fsStatus)
MOCK.mock(new RegExp('/nonTomcat/test/icmp-web-v2/memory', 'i'), 'get', memory)
MOCK.mock(new RegExp('/user/logout', 'i'), 'get', logout)

export default MOCK
