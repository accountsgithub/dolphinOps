import Vue from 'vue'
import Vuex from 'vuex'
import createLogger from 'vuex/dist/logger'
import app from './modules/app/index'
import login from './modules/login'
import project from './modules/projectMgt'
import getters from './getters'

Vue.use(Vuex)
const storeTree = {
    modules: {
        app,
        login,
        project
    },
    getters
}

if (process.env.NODE_ENV === 'development') {
    Object.assign(storeTree, {plugins: [createLogger()]})
}

const store = new Vuex.Store({...storeTree})

export default store
