<template>
  <div class="home">
    <el-container>
      <el-header>Header</el-header>
      <el-container>
        <el-aside width="200px">
          <el-menu
            default-active="1"
            class="el-menu-vertical-demo"
            background-color="#545c64"
            text-color="#fff"
            active-text-color="#ffd04b"
          >
            <router-link to="/one">
              <el-menu-item index="1">
                <i class="el-icon-menu"></i>
                <span slot="title">
                  列表页
                </span>
              </el-menu-item>
            </router-link>
            <router-link to="/two">
              <el-menu-item index="2">
                <i class="el-icon-document"></i>
                <span slot="title">
                  导航二
                </span>
              </el-menu-item>
            </router-link>
            <router-link to="/three">
              <el-menu-item index="3">
                <i class="el-icon-setting"></i>
                <span slot="title">
                  导航三
                </span>
              </el-menu-item>
            </router-link>
          </el-menu>
        </el-aside>
        <el-main>
          <router-view></router-view>
        </el-main>
      </el-container>
    </el-container>
  </div>
</template>

<script>
// import axios from '../utils/request'

import HelloWorld from "@/components/HelloWorld.vue";

export default {
  name: "Home",
  components: {
    HelloWorld,
  },
};
</script>
<style lang="less">
a {
  color: #fff !important;
}
a:active {
  color: #ffd04b !important;
}
.home {
  width: 100%;
  height: 100%;
}
.el-header {
  background: #f3f3f3;
  color: #333;
  text-align: center;
  line-height: 60px;
}

.el-aside {
  background: #545c64;
  text-align: center;
  line-height: 200px;
}

.el-main {
  color: #333;
  text-align: center;
}

.el-container {
  height: 100% !important;
}

.el-container:nth-child(5) .el-aside,
.el-container:nth-child(6) .el-aside {
  line-height: 260px;
}

.el-container:nth-child(7) .el-aside {
  line-height: 320px;
}
</style>
