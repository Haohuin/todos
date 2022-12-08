import axios from 'axios'
import MockAdapter from 'axios-mock-adapter'
import Mock from 'mockjs'
import {
  Todos
} from './data/todoList'
export default {
  start () {
    let mock = new MockAdapter(axios)
    // get请求，获取todo列表数据
    mock.onGet('/todo/list').reply(config => {
      let mockTodo = Todos.map(tode => {
        return {
          id: tode.id,
          title: tode.title,
          count: tode.record.filter((data) => {
            return data.checked === false
          }).length,
          locked: tode.locked,
          isDelete: tode.isDelete
        }
      }).filter(tode => {
        return tode.isDelete !== true
      })
      return new Promise((resolve, reject) => {
        setTimeout(() => {
          resolve([200, {
            todos: mockTodo
          }])
        }, 200)
      })
    })
    // post 请求，新增todo列表数据
    mock.onPost('/todo/addTodo').reply(config => {
      Todos.push({
        id: Mock.Random.guid(),
        title: 'newList',
        isDelete: false,
        locked: false,
        record: []
      })
      return new Promise((resolve, reject) => {
        setTimeout(() => {
          resolve([200])
        }, 200)
      })
    })
    // 获取todo单个列表
    mock.onGet('/todo/listId').reply(config => {
      let { id } = config.params
      let todo = Todos.find(todo => {
        return id && todo.id === id
      })
      // 待完成的列表数目
      todo.count = todo.record.filter((data) => {
        return data.checked === false
      }).length
      return new Promise((resolve, reject) => {
        setTimeout(() => {
          resolve([200, {
            todo: todo
          }])
        }, 200)
      })
    })
    // 新增一条代办事项
    mock.onPost('/todo/addRecord').reply(config => {
      let {
        id,
        text
      } = JSON.parse(config.data)
      // 唯一的id,和用户输入的数据
      Todos.some((t, index) => {
        if (t.id === id) {
          t.record.push({
            text: text,
            isDelete: false,
            checked: false
          })
          return true
        }
      })
      return new Promise((resolve, reject) => {
        setTimeout(() => {
          resolve([200])
        }, 200)
      })
    })
    // 修改相关记录
    mock.onPost('/todo/editRecord').reply(config => {
      let {
        id,
        record,
        index
      } = JSON.parse(config.data)
      Todos.some((t) => {
        if (t.id === id) {
          t.record[index] = record
          return true
        }
      })
      return new Promise((resolve, reject) => {
        setTimeout(() => {
          resolve([200])
        }, 200)
      })
    })
    // 修改标题
    mock.onPost('/todo/editTodo').reply(config => {
      let {
        todo
      } = JSON.parse(config.data)
      Todos.some((t, index) => {
        if (t.id === todo.id) {
          t.title = todo.title
          t.locked = todo.locked
          t.isDelete = todo.isDelete
          return true
        }
      })
      return new Promise((resolve, reject) => {
        setTimeout(() => {
          resolve([200])
        }, 200)
      })
    })
  }
}
