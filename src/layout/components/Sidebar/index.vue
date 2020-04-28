<template>
  <div :class="{ 'has-logo': showLogo }">
    <logo :collapse="isCollapse" />
  </div>
</template>

<script>
import { mapGetters } from 'vuex';
import Logo from './Logo';

export default {
  name: 'Sidebar',
  components: { Logo },
  computed: {
    ...mapGetters([
      'permission_routes',
      'sidebar'
    ]),
    showLogo() {
      return this.$store.state.settings.sidebarLogo;
    },
    isCollapse() {
      return !this.sidebar.opened;
    }
  }
};
</script>
