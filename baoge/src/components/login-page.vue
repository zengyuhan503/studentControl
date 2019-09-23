<template>
  <div class="login-page">
    <vue-particles
      style="background-color:#1f62b0;"
      color="#FFFFFF"
      :particleOpacity="0.7"
      :particlesNumber="50"
      shapeType="circle"
      :particleSize="4"
      linesColor="#1f62b0"
      :linesWidth="0"
      :lineLinked="false"
      :lineOpacity="0.4"
      :linesDistance="150"
      :moveSpeed="2"
      :hoverEffect="true"
      hoverMode="grab"
      :clickEffect="true"
      clickMode="push"
    ></vue-particles>
    <el-form ref="mForm" :model="formData" :rules="formRules" class="formStyle">
      <div
        style="width: 100%;text-align: center;margin-bottom: 2rem;font-size: 2rem;color: #1f62b0"
      ></div>
      <el-form-item prop="name">
        <el-input v-model="formData.name" placeholder="请输入用户名"></el-input>
      </el-form-item>
      <el-form-item prop="password">
        <el-input type="password" v-model="formData.password" placeholder="请输入密码"></el-input>
      </el-form-item>
      <!-- <el-form-item prop="captcha" v-if="true">
        <el-input v-model="formData.captcha" placeholder="验证码"></el-input>
        <img
          :src="captchaData"
          @click="flushCaptcha"
          style="width: 5rem;height: 100%;position: absolute;right: 0;top:0;cursor: pointer"
        >
      </el-form-item>-->
      <el-form-item>
        <el-button style="width:100%" @click="submitForm('mForm')" :loading="isValidating">登陆</el-button>
      </el-form-item>
    </el-form>
  </div>
</template>

<script>
export default {
  name: "login-page",
  props: ["getlist"],
  data() {
    return {
      formRules: [],
      formData: {},
      captchaData: "",
      isValidating: false,
      aptchaId: "",
      API_ROOT: ""
    };
  },

  created() {
    console.log(process.env.API_ROOT);
    this.API_ROOT = process.env.API_ROOT;
    this.init();
  },
  methods: {
    init() {
      this.formRules = {
        name: [
          { required: true, message: "用户名不能为空", trigger: "blur", min: 1 }
        ],
        password: [
          { required: true, message: "密码不能为空", trigger: "blur" },
          { min: 1, message: "密码不能为空", trigger: "blur" }
        ]
      };
      this.formData = {
        name: "",
        password: "",
        captcha: ""
      };
    },
    fetchData() {
      this.flushCaptcha();
    },
    submitForm(formName) {
      this.$refs[formName].validate(valid => {
        if (valid) {
          this.isValidating = true;
          this.validatePass();
        } else {
          // console.log("error submit!!");
          return false;
        }
      });
    },
    async validatePass() {
      var that = this;
      var formData = new FormData();
      this.formData.aptchaId = this.aptchaId;
      var parm = {
        name: this.formData.name,
        password: this.formData.password
      };
      formData.set("name", parm.name);
      formData.set("password", parm.password);
      // formData.set("validcode", parm.validcode);
      // formData.set("captchaid", parm.captchaid);
      var url = this.API_ROOT + "/account/login";
      console.log(url);
      await this.axios
        .post(url, parm)
        .then(res => {
          this.isValidating = false;
          if (res.data.code == 10000) {
            this.$router.push("/");
          } else {
            this.$message({
              message: res.data.Msg,
              type: "warning"
            });
            //this.flushCaptcha();
          }
        })
        .catch(err => {
          console.log(err);
          this.isValidating = false;
          this.$message({
            message: "登录失败，请刷新页面重新登陆",
            type: "warning"
          });
        });
    },
    flushCaptcha() {
      this.axios.get("/console/admin/getcaptcha").then(res => {
        // console.log(res);
        this.captchaData = res.data.Data.Url;
        this.aptchaId = res.data.Data.Id;
      });
    }
  }
};
</script>

<style >
#particles-js {
  position: fixed;
  width: 100%;
  height: 100%;
  left: 0;
  top: 0;
  background-repeat: no-repeat;
  background-size: cover;
  background-position: 50% 50%;
}
.login-page {
  width: 100%;
  height: 100%;
  position: fixed;
  left: 0;
  top: 0;
  display: flex;
  justify-content: center;
  align-items: center;
  z-index: 1000;
  padding: 0 !important;
}

.formStyle {
  position: absolute;
  background-color: white;
  padding: 2rem 3rem;
  border-radius: 10px;
  width: 15rem;
  box-shadow: 0px 0px 30px rgba(0, 0, 0, 0.1);
}

.appPool {
  width: 20rem;
  height: 15rem;
  background-color: white;
  border-radius: 10px;
  display: flex;
  justify-content: center;
  align-items: center;
  margin: 2rem;
  cursor: pointer;
  font-size: 3rem;
  color: gray;
}
.appPool:hover {
  box-shadow: 0px 0px 40px rgba(0, 0, 0, 0.4);
  color: #3a8ee6;
}
</style>
