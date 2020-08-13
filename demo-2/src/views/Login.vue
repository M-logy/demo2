<template>
  <div class="login">
    <img
      src="https://timgsa.baidu.com/timg?image&quality=80&size=b9999_10000&sec=1597223775026&di=30d9ffa43b1984727625e3fd45b0a31d&imgtype=0&src=http%3A%2F%2Fbpic.588ku.com%2Fback_pic%2F02%2F67%2F93%2F99578f40af7a29e.jpg"
      alt=""
    />
    <div class="box">
      <p>后台管理系统</p>
      <el-form
        :model="ruleForm"
        status-icon
        :rules="rules"
        ref="ruleForm"
        class="demo-ruleForm"
        size="medium"
      >
        <el-form-item prop="username" label-width="60px" label="用户名">
          <el-input
            type="text"
            v-model="ruleForm.username"
            autocomplete="off"
          ></el-input>
        </el-form-item>
        <el-form-item prop="password" label-width="60px" label="密码">
          <el-input
            type="password"
            v-model="ruleForm.password"
            autocomplete="off"
          ></el-input>
        </el-form-item>
        <el-form-item label-position="left" label-width="60px">
          <el-button type="primary" @click="submitForm('ruleForm')"
            >登录</el-button
          >
        </el-form-item>
      </el-form>
    </div>
  </div>
</template>
<script>
import { loginPost } from "../api/index";

export default {
  data() {
    var validatePass = (rule, value, callback) => {
      if (value === "") {
        callback(new Error("请输入用户名"));
      } else {
        callback();
      }
    };
    var validatePass2 = (rule, value, callback) => {
      if (value === "") {
        callback(new Error("请输入密码"));
      } else {
        callback();
      }
    };
    return {
      ruleForm: {
        username: "",
        password: "",
      },
      rules: {
        username: [{ validator: validatePass, trigger: "blur" }],
        password: [{ validator: validatePass2, trigger: "blur" }],
      },
    };
  },
  methods: {
    submitForm(formName) {
      this.$refs[formName].validate((valid) => {
        if (valid) {
          loginPost({
            username: this.ruleForm.username,
            pwd: this.ruleForm.password,
          }).then((res) => {
            if (res.data.status === "200") {
              this.$message({
                message: res.data.message,
                type: "success",
              });
              sessionStorage.setItem('isLogin',JSON.stringify(res.data.data.user_name))
              this.$router.push('/')
            }else{
              this.$message({
                message: res.data.message,
                type: "error",
              });
            }
          });
        } else {
          console.log("error submit!!");
          return false;
        }
      });
    },
  },
};
</script>

<style>
.login {
  width: 100%;
  height: 100%;
  display: flex;
  align-items: center;
  justify-content: center;
}
.login > img {
  width: 100%;
  height: 100%;
  position: fixed;
  left: 0;
  top: 0;
  z-index: 1;
}
.box {
  width: 450px;
  height: 280px;
  background: white;
  z-index: 100;
  display: flex;
  align-items: center;
  flex-direction: column;
  justify-content: center;
}
.el-form {
  width: 70%;
}
.box > p {
  font-weight: bold;
  padding-bottom: 20px;
  box-sizing: border-box;
  font-size: 25px;
}
</style>
