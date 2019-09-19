<template>
  <div id="app">
    <!--
      导航头部+log
    -->
    <el-header style="background-color: #23262e;height:61px;">
      <el-row :span="3">
        <el-col class="logcontMain" :span="3">
          <el-col class="grid-content bg-purple-dark logcont">O M S</el-col>
        </el-col>
      </el-row>
    </el-header>
    <el-row class="tac">
      <el-col :span="3">
        <el-menu
          class="el-menu-vertical-demo"
          background-color="#545c64"
          text-color="#fff"
          active-text-color="#ffd04b"
        >
          <el-submenu index="1">
            <template slot="title">
              <i class="el-icon-user-solid"></i>
              <span>账户管理</span>
            </template>
            <el-menu-item-group>
              <el-menu-item index="/studentinfo">学生信息管理</el-menu-item>
            </el-menu-item-group>
            <el-menu-item-group>
              <el-menu-item index="/teacherinfo">老师信息管理</el-menu-item>
            </el-menu-item-group>
          </el-submenu>
          <el-submenu index="2">
            <template slot="title">
              <i class="el-icon-document"></i>
              <span>统计信息</span>
            </template>
            <el-menu-item-group>
              <el-menu-item index="/studentinfo">信息列表</el-menu-item>
            </el-menu-item-group>
          </el-submenu>
          <el-submenu index="3">
            <template slot="title">
              <i class="el-icon-message-solid"></i>
              <span>报警设置</span>
            </template>
            <el-menu-item-group>
              <el-menu-item index="/studentinfo">报警列表</el-menu-item>
            </el-menu-item-group>
          </el-submenu>
          <el-menu-item index="2">
            <i class="el-icon-s-platform"></i>
            <span slot="title">充值设置</span>
          </el-menu-item>
        </el-menu>
      </el-col>
      <el-col :span="21" class="mainCont">
        <el-scrollbar style="height:100%">
          <router-view></router-view>
        </el-scrollbar>
      </el-col>
    </el-row>
  </div>
</template>

<script>
export default {
  data() {
    return {};
  },
  created() {},
  watch: {},
  methods: {}
};
</script>
<style>
body,
html {
  width: 100%;
  height: 100%;
  overflow: hidden;
}

body,
html,
div {
  margin: 0;
  padding: 0;
}

#app {
  width: 100%;
  height: 100%;
}
body,
#app .el-header {
  margin: 0;
  padding: 0;
}

#app .logcont {
  background: #23262e;
  height: 60px;
  line-height: 60px;
  text-align: center;
  color: #fff;
  width: 100%;
  color: #009688;
  font-size: 27px;
}

#app .tac,
#app .el-row > div {
  height: 100%;
}
#app .el-menu-vertical-demo:not(.el-menu--collapse) {
  height: 100%;
  width: 100%;
  min-height: 400px;
}
</style>
