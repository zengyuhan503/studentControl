<template>
  <div id="app">
    <router-view></router-view>
  </div>
</template>

<script>
export default {
  data() {
    return {
      defaultActive: "/"
    };
  },
  created() {
    if (this.$route.name == "studentControl") {
      var urls = "/";
    } else {
      var urls = this.$route.path;
    }
    this.defaultActive = urls;
  },
  mounted() {},
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
.mainCont {
  background: #fff;
  padding-bottom: 5%;
}
.el-scrollbar__view > div {
  padding: 3% 6%;
}
.el-scrollbar__wrap {
  overflow-x: hidden !important;
}
.el-form-item__label {
  text-align: center;
}
.el-scrollbar__bar.is-horizontal {
  display: none !important;
}
.block {
  text-align: center;
  padding: 15px;
}
.el-scrollbar__view > div > .el-table {
  min-height: 600px;
  width: 95% !important;
}
.el-submenu .el-menu-item {
  min-width: 150px;
}
</style>
