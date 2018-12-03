import MOCK from 'mockjs'
import testStatus from './json/testStatus'

MOCK.setup({
    timeout: '300-600'
})

MOCK.mock(new RegExp('/rap_summary/summary', 'i'), 'get', testStatus)

export default MOCK
