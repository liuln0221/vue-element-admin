<template>
  <div v-if="!item.hidden && item.children" class="menu-wrapper">
    <template
      v-if="hasOneShowingChild(item.children, item) && (!onlyOneChild.children || onlyOneChild.noShowingChildren) && !item.alwaysShow"
    >
      <app-link :to="resolvePath(onlyOneChild.path)">
        <el-menu-item
          :index="resolvePath(onlyOneChild.path)"
          :class="{'submenu-title-noDropdown': !isNext}"
        >
          <item
            v-if="onlyOneChild.meta"
            :icon="onlyOneChild.meta.icon || item.meta.icon"
            :title="generateTitle(onlyOneChild.meta.tiitle)"
          />
        </el-menu-item>
      </app-link>
    </template>
  </div>
</template>
<script>
import path from 'path';
import { isExternal } from '@/utils';

import Item from './Item';
export default {
  name: 'SidebarItem',
  components: {
    Item
  },
  methods: {
    resolvePath(routePath) {
      if (this.isExternalLink(routePath)) {
        return routePath;
      }
      return path.resolve(this.basePath, routePath);
    },
    isExternalLink(routePath) {
      return isExternal(routePath);
    }
  }
};
</script>
