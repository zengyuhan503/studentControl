<template>
  <div id="app">
    <el-header style="background-color: #23262e;height:61px;">
      <el-row :span="3">
        <el-col class="logcontMain" :span="3">
          <el-col class="grid-content bg-purple-dark logcont">后台控制页面</el-col>
        </el-col>
        <el-col :span="4" :push="16">
          <span style="color: rgb(255, 255, 255);
    display: inline-block;
    height: 50px;
    line-height: 57px;">
            <el-button @click="reloadthsi" type="primary" size="mini" icon="el-icon-refresh-right">更新缓存</el-button>
          </span>
        </el-col>
        <el-col :span="4" :push="13">
          <div class="grid-content heaimg bg-purple-light">
            <el-col :span="4" :push="8">
              <el-dropdown @command="handleCommand">
                <span class="el-dropdown-link">
                  <img src="./assets/img/headimg.png" style="width:70%" alt />
                </span>
                <el-dropdown-menu slot="dropdown">
                  <el-dropdown-item command="a">登出</el-dropdown-item>
                  <el-dropdown-item command="c">修改密码</el-dropdown-item>
                </el-dropdown-menu>
              </el-dropdown>
            </el-col>
          </div>
        </el-col>
      </el-row>
    </el-header>
    <el-row class="tac">
      <el-col :span="3">
        <el-menu class="el-menu-vertical-demo" background-color="#545c64" text-color="#fff" :router="true"
          :default-active="defaultActive" active-text-color="#ffd04b">
          <el-submenu index="1">
            <template slot="title">
              <i class="el-icon-user-solid"></i>
              <span>流量统计</span>
            </template>
            <el-menu-item-group>
              <el-menu-item index="/">日流量</el-menu-item>
            </el-menu-item-group>
            <el-menu-item-group>
              <el-menu-item index="/weekflow">周流量</el-menu-item>
            </el-menu-item-group>
            <el-menu-item-group>
              <el-menu-item index="/mousflow">月流量</el-menu-item>
            </el-menu-item-group>
            <el-menu-item-group>
              <el-menu-item index="/yearflow">年流量</el-menu-item>
            </el-menu-item-group>
            <el-menu-item-group>
              <el-menu-item index="/serachlist">流量查询</el-menu-item>
            </el-menu-item-group>
          </el-submenu>
          <el-submenu index="2">
            <template slot="title">
              <i class="el-icon-document"></i>
              <span>下载统计</span>
            </template>
            <el-menu-item-group>
              <el-menu-item index="/daydownload">日下载</el-menu-item>
            </el-menu-item-group>
            <el-menu-item-group>
              <el-menu-item index="/weekdownload">周下载</el-menu-item>
            </el-menu-item-group>
            <el-menu-item-group>
              <el-menu-item index="/monthdownload">月下载</el-menu-item>
            </el-menu-item-group>
            <el-menu-item-group>
              <el-menu-item index="/yeardownload">年下载</el-menu-item>
            </el-menu-item-group>
            <el-menu-item-group>
              <el-menu-item index="/serechload">下载查询</el-menu-item>
            </el-menu-item-group>
          </el-submenu>
          <el-submenu index="3">
            <template slot="title">
              <i class="el-icon-message-solid"></i>
              <span>渠道统计</span>
            </template>
            <el-menu-item-group>
              <el-menu-item index="/daychannel">日渠道</el-menu-item>
            </el-menu-item-group>
            <el-menu-item-group>
              <el-menu-item index="/weekchannel">周渠道</el-menu-item>
            </el-menu-item-group>
            <el-menu-item-group>
              <el-menu-item index="/mouschanel">月渠道</el-menu-item>
            </el-menu-item-group>
            <el-menu-item-group>
              <el-menu-item index="/yearchanels">年渠道</el-menu-item>
            </el-menu-item-group>
            <el-menu-item-group>
              <el-menu-item index="/serachchanl">渠道查询</el-menu-item>
            </el-menu-item-group>
          </el-submenu>

          <el-menu-item index="/channeslist">
            <i class="el-icon-s-platform"></i>
            <span slot="title">渠道列表</span>
          </el-menu-item>
          <el-menu-item index="/business">
            <i class="el-icon-s-platform"></i>
            <span slot="title">业务管理</span>
          </el-menu-item>
          <el-menu-item index="/errorlist">
            <i class="el-icon-s-platform"></i>
            <span slot="title">错误信息反馈</span>
          </el-menu-item>
          <el-menu-item index="/cleardatas">
            <i class="el-icon-s-platform"></i>
            <span slot="title">数据清空</span>
          </el-menu-item>
        </el-menu>
      </el-col>
      <el-col :span="21" class="mainCont">
        <el-scrollbar  style="height:100%">
          <router-view></router-view>
        </el-scrollbar>
      </el-col>
    </el-row>
    <el-dialog title="修改密码" :visible.sync="editDialogVisible" width="30rem">
      <div style="width: 100%;position: relative;">
        <el-form ref="form" :model="form" label-width="180px">
          <el-form-item label="输入新密码">
            <el-input v-model="form.pwd"></el-input>
          </el-form-item>
          <!-- <el-form-item label="再次输入新密码">
            <el-input v-model="form.name"></el-input>
          </el-form-item> -->
        </el-form>
      </div>
      <span slot="footer" class="dialog-footer">
        <el-button type="primary" @click="submitpost">完成</el-button>
      </span>
    </el-dialog>
  </div>
</template>

<script>
  export default {
    data() {
      return {
        form: {},
        editDialogVisible: false,
        defaultActive: "/"
      };
    },
    created() {
      if (this.$route.name == "dayflow") {
        var urls = "/";
      } else {
        var urls = this.$route.path;
      }
      this.defaultActive = urls;
    },
    mounted() { },
    watch: {},
    methods: {
      handleCommand(command) {
        if (command == "a") {
          this.axios.get('/public/index.php/logout')
            .then(res => {
              console.log(res)
            })
            .catch(err => {
              console.error(err);
            })
          localStorage.removeItem("userInfo");
          this.$router.push("/loginpage");
        } else {
          this.editDialogVisible = true;
        }
      },
      submitpost() {
        var params = {
          pwd: this.form.pwd
        }
        this.axios.get('/public/index.php/setAdminPass', { params: params })
          .then(res => {
            console.log(res)
            var code = res.data.code;
            this.editDialogVisible = false;
            if (code !== 200) {
              this.$message.error("密码重置失败，请重试");
              return false;
            }
            this.$message({
              type: 'success',
              message: "密码重置成功，请重新登录"
            });
            this.$router.push("/loginpage");
          })
          .catch(err => {
            console.error(err);
          })
      },
      reloadthsi() {
        location.reload();
      }
    }
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
  #app .el-row>div {
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

  .el-scrollbar__view>div {
    padding: 3% 6%;
  }

  p {
    margin: 0;
  }

  ul,
  li {
    padding: 0;
    margin: 0;
    list-style: none;
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

  .el-scrollbar__view>div>.el-table {
    min-height: 600px;
    width: 95% !important;
  }

  .el-submenu .el-menu-item {
    min-width: 150px;
  }

  .el-select-dropdown__list {
    margin: 19px 0;
  }

  .titile {
    color: #000000 !important;
    font-weight: 600 !important;
  }

  .titile {
    font-size: 14px;
    color: #928282;
  }

  .nums {
    color: #e89c4b;
    font-size: 18px;
    line-height: 25px;
    margin: 0;
    font-weight: 600;
  }

  .listflow li {
    float: left;
    margin: 0 9px;
    text-align: center;
  }

  .titile {
    font-size: 14px;
    color: #928282;
  }

  .nums {
    color: #e89c4b;
    font-size: 18px;
    line-height: 25px;
    margin: 0;
    font-weight: 600;
  }

  .listflow li {
    float: left;
    margin: 0 9px;
    text-align: center;
  }

  .flowinfos {
    font-size: 1px;
    color: #a29797;
  }

  #app .heaimg {
    line-height: 60px;
    text-align: center;
  }

  #app .heaimg img {
    vertical-align: middle;
  }
</style>