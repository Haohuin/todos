<template>
  <section class="container" :class="{'menu-open': menuOpen}">
      <section class="menu">
        <menus></menus>
      </section>
      <div class="content-overlay" @click="$store.dispatch('updateMenu')"></div>
      <div class="content-container">
        <router-view></router-view>
      </div>
  </section>
</template>

<script>
import Menus from './menus'
import Todo from './todo'
export default {
  components: {Todo, Menus},
  computed: {
    menuOpen () {
      // return this.$store.state.menuOpen
      return this.$store.state.menuOpen
    }
  }
}
</script>

<style lang="less">
@import '../common/style/layouts.less';
</style>
