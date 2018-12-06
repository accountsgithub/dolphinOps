import MOCK from 'mockjs'
import testStatus from './json/testStatus'
import testReportList from './json/testReportList'
import exceptionList from './json/exceptionList'

MOCK.setup({
    timeout: '300-600'
})

MOCK.mock(new RegExp('/rap_summary/summary', 'i'), 'get', testStatus)
MOCK.mock(new RegExp('/rap_log', 'i'), 'get', testReportList)
MOCK.mock(new RegExp('/comparison/test/errors', 'i'), 'get', exceptionList)

export default MOCK
