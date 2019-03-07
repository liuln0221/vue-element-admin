<template>
  <div :class="classObj" class="app-wrapper">1
    <div v-if="device === 'mobile' && sidebar.opened" class="drower-bg" @click="handleClickOutside" />
    <!-- </div> -->
    <sidebar class="sidebar-container"/>
  </div>
</template>
<script>
import { Sidebar } from './components';
export default {
  name: 'Layout',
  components: {
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
        hideSidebar: !this.sidebar.opened,
        openSidebar: this.sidebar.opened,
        withoutAnimation: this.sidebar.withoutAnimation,
        mobile: this.device === 'mobile'
      };
    }
  },
  methods: {
    handleClickOutside() {
      this.$store.dispatch('closeSideBar', { withoutAnimation: false });
    }
  }
};
</script>
<style rel='stylesheet/scss' lang='scss' scoped>
@import "src/styles/mixin.scss";
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
  height: 10%;
  position: absolute;
  z-index: 999;
}
</style>
