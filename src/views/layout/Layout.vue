<template>
  <div :class="classObj" class="app-wrapper">
    <div v-if="device === 'mobile' && sidebar.opened" class="drawer-bg" />
    <!-- <sidebar class="sidebar-container" /> -->
    <div class="main-container">
      <navbar/>
    </div>
  </div>
</template>

<script>
import { Navbar, Sidebar } from './components';

export default {
  name: 'Layout',
  components: {
    Navbar,
    Sidebar
  },
  computed: {
    sidebar() {
      return this.$store.state.app.sidebar;
    },
    device() {
      return this.$store.state.app.device;
    },
    classObj() {
      return {
        hidSidebar: !this.sidebar.opened,
        openSiderbar: this.sidebar.opened,
        withoutAnmation: this.sidebar.withoutAnmation,
        mobile: this.device === 'mobile'
      };
    }
  }
};
</script>

<style rel="stylesheet/scss" lang="scss" scoped>
  .app-wrapper {
    position: relative;
    height: 100%;
    width: 100%;
    &.mobile.openSidebar {
      position: fixed;
      top: 0;
    }
  }

  .drawer-bg {
    background: #000;
    opacity: 0.3;
    width: 100%;
    top: 0;
    height: 100%;
    position: absolute;
    z-index: 999;
  }
</style>

