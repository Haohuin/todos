<template>
  <div class="page lists-show" v-show="!todo.isDelete">
    <nav><!--导航容器-->
      <div class="form list-edit-form" v-show="isUpdate">
        <input type="text" v-model="todo.title" @keyup.enter="updateTitle" :disabled="todo.locked">
        <div class="nav-group right">
          <a class="nav-item" @click="isUpdate = false">
            <span class="icon-close">
            </span>
          </a>
        </div>
      </div>
      <div class="nav-group" @click="$store.dispatch('updateMenu')" v-show="!isUpdate">
        <a class="nav-item">
          <span class="icon-list-unordered"></span>
        </a>
      </div>
      <h1 class="title-page" v-show="!isUpdate" @click="isUpdate = true">
        <span class="title-wrapper">{{todo.title}}</span><!--标题-->
        <span class="count-list">{{todo.count || 0}}</span><!--数目-->
      </h1>
      <div class="nav-group right" v-show="!isUpdate">
        <div class="options-web">
          <a class="nav-item" @click="onLock">
            <span class="icon-lock" v-if="todo.locked"></span>
            <span class="icon-unlock" v-else></span>
          </a>
          <a class="nav-item">
            <span class="icon-trash" @click="onDelete"></span>
          </a>
        </div>
      </div>
      <!--新增input的模块-->
      <div class="form todo-new input-symbol">
        <input type="text" v-model="text" placeholder="请输入" @keyup.enter="onAdd" :disabled="todo.locked">
        <span class="icon-add"></span>
      </div>
    </nav>
    <div class="content-scrollable list-items">
      <div  v-for="(item, index) in items" :key="index">
        <item :item="item"
              :index="index"
              :id="todo.id"
              :init="init"
              :locked="todo.locked"
        ></item>
      </div>
    </div>
  </div>
</template>

<script>

import Item from './item'
import {getTodo, addRecord, editTodo} from '../api/api'
export default {
  name: 'todo',
  components: {Item},
  watch: {
    '$route.params.id' () {
      this.init()
    }
  },
  created () {
    this.init()
  },
  data () {
    return {
      todo: {},
      items: [], // 代办单项列表
      text: '',
      isUpdate: false
    }
  },
  methods: {
    init () {
      const ID = this.$route.params.id
      getTodo({id: ID}).then(res => {
        let {
          id,
          title,
          count,
          isDelete,
          locked,
          record
        } = res.data.todo
        this.items = record
        this.todo = {
          id: id,
          title: title,
          count: count,
          locked: locked,
          isDelete: isDelete
        }
      })
    },
    onAdd () {
      const ID = this.$route.params.id
      addRecord({ id: ID, text: this.text }).then(res => {
        this.text = ''
        this.init()
      })
    },
    updateTitle () {
      this.updateTodo()
      this.isUpdate = false
    },
    updateTodo () {
      let _this = this
      editTodo({
        todo: this.todo
      }).then(data => {
        _this.$store.dispatch('getTodo')
      })
    },
    onDelete () {
      this.todo.isDelete = true
      this.updateTodo()
    },
    onLock () {
      this.todo.locked = !this.todo.locked
      this.updateTodo()
    }
  }
}
</script>

<style lang="less">
@import "../common/style/nav.less";
@import "../common/style/form.less";
@import "../common/style/todo.less";
</style>
