import Vue from 'vue'
import Vuex from 'vuex'
import * as actions from './actions'
import * as getters from './getters'

Vue.use(Vuex)

// 初始应用全局状态变量
const state = {
  todoList: [],
  menuOpen: false
}
// 定义所需要的 mutations
const mutations = {
  EDITTODE (state, data) { // 改变todoList 的值
    state.todoList = data
  },
  MENUOPEN (state) { // 改变menuOpen 的值
    state.menuOpen = !state.menuOpen
  }
}

// 创建 store 实例并导出
export default new Vuex.Store({
  actions,
  getters,
  state,
  mutations
})
