<template>
  <el-menu
    default-active="1"
    router
    class="nav-menu-custom"
    mode="horizontal"
    background-color="#fafafa"
    text-color="#000000"
    active-text-color="#000000"
  >
    <li class="pull-left nav-menu-item-custom">Blog</li>

    <el-menu-item index="1" :route="{ path: '/' }">Home</el-menu-item>
    <el-menu-item index="2" :route="{ path: '/about' }">About</el-menu-item>

    <li class="pull-right nav-menu-item-custom">
      <i class="el-icon-s-data"></i>
    </li>
  </el-menu>
</template>

<script>
import { ElMenu, ElMenuItem } from "element-plus";
export default {
  name: "BlogHeader",
  components: {
    ElMenu,
    ElMenuItem
  }
};
</script>

<style scoped lang="scss">
.nav-menu-custom {
  li {
    font-weight: bold;
    float: none;
    display: inline-block;
  }
  .pull-left {
    float: left;
  }
  .pull-right {
    float: right;
  }
  .nav-menu-item-custom {
    cursor: pointer;
    line-height: 60px;
    padding: 0 20px;
    &:focus {
      outline: none;
    }
  }
}
</style>
