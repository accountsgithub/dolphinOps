import Vue from 'vue'
import Vuex from 'vuex'
import app from './modules/app/index'
import login from './modules/login'
import project from './modules/projectMgt'
import getters from './getters'
// 版本1.1.7
import testReport from './modules/testReport'
import createLogger from 'vuex/dist/logger'

Vue.use(Vuex)
const store = new Vuex.Store({
    modules: {
        app,
        login,
        project,
        testReport
    },
    getters
})

if (process.env.NODE_ENV === 'development') {
    Object.assign(store, {plugins: [createLogger()]})
}

export default store
