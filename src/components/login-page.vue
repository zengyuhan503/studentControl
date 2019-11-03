<template>
  <div class="login-page">
    <vue-particles style="background-color:#1f62b0;" color="#FFFFFF" :particleOpacity="0.7" :particlesNumber="50"
      shapeType="circle" :particleSize="4" linesColor="#1f62b0" :linesWidth="0" :lineLinked="false" :lineOpacity="0.4"
      :linesDistance="150" :moveSpeed="2" :hoverEffect="true" hoverMode="grab" :clickEffect="true" clickMode="push">
    </vue-particles>
    <el-form ref="mForm" :model="formData" :rules="formRules" class="formStyle" v-if="formVisible">
      <div style="width: 100%;text-align: center;margin-bottom: 2rem;font-size: 2rem;color: #1f62b0">后台控制页面</div>
      <el-form-item prop="uname">
        <el-input v-model="formData.uname" placeholder="用户名"></el-input>
      </el-form-item>
      <el-form-item prop="pwd">
        <el-input type="password" v-model="formData.pwd" placeholder="密码"></el-input>
      </el-form-item>
      <el-form-item>
        <el-button style="width:100%" @click="submitForm('mForm')" :loading="isValidating">登陆</el-button>
      </el-form-item>
    </el-form>
  </div>
</template>

<script>
  export default {
    name: "login-page",
    data() {
      return {
        formRules: [],
        formData: {},
        captchaData: "",
        isValidating: false,
        formVisible: true,
        appPools: [],
        appPoolsVisible: false
      };
    },
    created() {
      this.init();
    },
    mounted() { },
    methods: {
      init() {
        this.formRules = {
          name: [
            { required: true, message: "用户名不能为空", trigger: "blur", min: 1 }
          ],
          password: [
            { required: true, message: "密码不能为空", trigger: "blur" },
            { min: 1, message: "密码不能为空", trigger: "blur" }
          ],
          captcha: [
            { required: true, message: "请输入验证码", trigger: "blur" },
            { min: 6, max: 6, message: "请输入正确的验证码", trigger: "blur" }
          ]
        };
        this.formData = {
          uname: "",
          pwd: "",
        };
        this.fetchData();
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
            console.log("error submit!!");
            return false;
          }
        });
      },
      async validatePass() {
        let formData = new FormData();
        //formData.set('validcode', this.formData.captcha);
        //formData.set('captchaid', this.captchaData.Id);
        var params = {
          'uname': this.formData.uname,
          'pwd': this.formData.pwd
        }
        this.axios.get("/public/index.php/getLogin", { params: params }).then(res => {
         
          var code = res.data.code;
          this.isValidating = false;
          if (code !== 200) {
            this.$message.error("登录失败，账号名或者密码错误，请重试");
            return false;
          }
          this.appPoolOnSelect()
          // this.$router.push("/");
          // this.isValidating = false;
          // if (res.data.Result == 0) {
          //   this.formVisible = false;
          //   this.axios.post("/user/getLogin").then(res => {
          //     this.appPoolsVisible = true;
          //     this.appPools = res.data.Items;
          //     this.appPoolsVisible = true;
          //   });
          // } else {
          //   this.$message({
          //     message: "密码错误",
          //     type: "warning"
          //   });
          //   //this.flushCaptcha();
          // }
        });
      },
      flushCaptcha() {
        /*this.axios.get('/ssnwtweb/api/admins/getcaptcha').then((res) => {
            this.captchaData = res.data;
          });*/
      },
      appPoolOnSelect(appPool) {
        localStorage.setItem("appPool", JSON.stringify(appPool));
        let userInfo = {
          Name: this.formData.uname,
          loginTime: Date.now()
        };
        localStorage.setItem("userInfo", JSON.stringify(userInfo));
        this.$router.push("/");
      }
    }
  };
</script>

<style scoped>
  #particles-js {
    position: fixed;
    width: 100%;
    height: 100%;
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
    padding: 0;
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