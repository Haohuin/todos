import {getTodoList} from '../api/api'

export const getTodo = ({
  commit
}) => {
  return new Promise((resolve) => {
    getTodoList().then(res => {
      commit('EDITTODE', res.data.todos)
      resolve()
    })
  })
}

export const updateMenu = ({ // 定义一个事件
  commit
}) => {
  commit('MENUOPEN') // 调用 store.js 中的MENUOPEN方法
}
