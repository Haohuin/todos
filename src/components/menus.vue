<template>
  <div class="list-todos">
    <a class="list-todo list activeListClass" :class="{'active': item.id === todoId }" @click="goList(item.id)" v-for="(item, index) in todoList" :key="index"> <!-- v-for 列表渲染-->
      <span class="icon-lock" v-if="item.locked"></span> <!-- v-if 条件渲染-->
      <span class="count-list" v-if="item.count > 0">{{item.count}}</span>
      {{item.title}}   <!-- 数据绑定，看模板语法-->
    </a>
    <a class=" link-list-new" @click="addTodoList">
      <span class="icon-plus">
      </span>
      新增
    </a>
  </div>
</template>

<script>
import { addTodo } from '../api/api'

export default {
  data () {
    return {
      items: [],
      todoId: '',
      todoNum: 0
    }
  },
  created () {
    // getTodoList({}).then(res => {
    //   debugger
    //   const TODOS = res.data.todos
    //   this.items = TODOS
    //   this.todoId = TODOS[0].id
    // })
    this.$store.dispatch('getTodo').then(() => { // 调用vuex actions.js中的getTodo函数
      this.$nextTick(() => {
        this.goList(this.todoList[0].id)
      })
    })
  },
  computed: {
    todoList: function () {
      const number = this.$store.getters.getTodoList.length
      if (this.$store.getters.getTodoList.length < this.todoNum) {
        this.goList(this.$store.getters.getTodoList[0].id)
      }
      this.computeTodoNum(number)
      return this.$store.getters.getTodoList // 返回vuex getters.js 定义中的getTodoList数据
    }
  },
  watch: {
    'todoId' (id) {
      // 监听用户的点击变化，然后再跳转路由
      this.$router.push({name: 'todo', params: {id: id}})
    }
  },
  methods: {
    computeTodoNum (number) {
      this.todoNum = number
    },
    goList (id) {
      this.todoId = id
    },
    addTodoList () {
      addTodo({}).then(res => {
        // const TODOS = res.data.todos
        // this.todoId = TODOS[TODOS.length - 1].id
        // this.items = TODOS
        this.$store.dispatch('getTodo').then(() => {
          this.$nextTick(() => {
            setTimeout(() => {
              this.goList(this.todoList[this.todoList.length - 1].id)
            }, 100)
          })
        })
      })
    }
  }
}
</script>

<style lang="less">
@import '../common/style/menu.less';
</style>
