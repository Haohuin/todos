<template>
  <div class="list-item editingClass editing" :class="{checked: item.checked}" v-show="!item.isDelete">
    <label class="checkbox">
      <input type="checkbox" v-model="item.checked" name="checked" @change="onChange" :disabled="locked">
      <span class="checkbox-custom"></span>
    </label>
    <input type="text" v-model="item.text" placeholder="写点什么东西。。。" :disabled="item.checked || locked" @keyup.enter="onChange">
    <a class="delete-item" v-if="item.checked && !locked" @click="item.isDelete = true; onChange">
      <span class="icon-trash"></span>
    </a>
  </div>
</template>

<script>
import {editRecord} from '../api/api'

export default {
  name: 'item',
  props: {
    item: {
      type: Object,
      default: () => {
        return {
          checked: false,
          text: '第一次的item'
        }
      }
    },
    index: {},
    id: {},
    init: {},
    locked: {}
  },
  methods: {
    onChange () {
      editRecord({
        id: this.id,
        record: this.item,
        index: this.index
      })
    }
  }
}
</script>

<style lang="less">
@import "../common/style/list-items.less";
</style>
