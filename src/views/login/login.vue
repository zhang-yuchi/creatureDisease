<!--  -->
<template>
  <logintemplate>
    <span slot="name">登录</span>
    <div slot="form">
      <myInput
        type="phone"
        :formValue="form.username"
        @rulecheck="checkaccount"
        :err="accounterr"
        :errorMsg="this.accountErrMsg"
        placeholder="请输入手机号"
      ></myInput>
      <myInput
        type="password"
        placeholder="请输入密码"
        :formValue="form.password"
        @rulecheck="checkpsw"
        :errorMsg="this.pswErrMsg"
        :err="this.pswerr"
      ></myInput>
      <myInput
        type="check"
        placeholder="请输入验证码"
        :formValue="form.check"
        :errorMsg="checkErrMsg"
        :err="this.checkerr"
        @rulecheck="checkNum"
        v-if="needCheck"
        :checkUrl="checkUrl"
        @repeatcheck="OnceCheck"
      ></myInput>
      <!-- <img :src="checkUrl" alt /> -->
    </div>

    <div slot="login">
      <el-button type="primary" @click="login" :loading="isLoading" class="loginbtn">登录</el-button>
    </div>
    <div slot="changestate">
      <el-link class="pswbtn phonebtn" type="info" @click="loginByPhone">手机登录</el-link>
      <el-link class="pswbtn" type="info" @click="changePsw">忘记密码?</el-link>
    </div>
  </logintemplate>
</template>

<script>
//这里可以导入其他文件（比如：组件，工具js，第三方插件js，json文件，图片文件等等）
//例如：import 《组件名称》 from '《组件路径》';
import myInput from "../../components/input/input";
import logintemplate from "../../components/logintemplate";
import { Login, needCheck, getCheck } from "../../network";

export default {
  //import引入的组件需要注入到对象中才能使用
  components: {
    myInput,
    logintemplate
  },
  data() {
    //这里存放数据
    return {
      form: {
        username: "",
        password: "",
        check: ""
      },
      pswerr: false,
      pswErrMsg: "",
      accounterr: false,
      accountErrMsg: "",
      checkerr: false,
      isLoading: false,
      needCheck: false,
      checkUrl: "",
      checkErrMsg:""
    };
  },
  //监听属性 类似于data概念
  computed: {},
  //监控data中的数据变化
  watch: {},
  //方法集合
  methods: {
    ifCheck() {
      needCheck()
        .then(res => {
          // console.log(res);
          this.needCheck = res.data;
        })
        .catch(() => {
          this.$message.error("网络不畅,请稍后重试!");
        })
        .then(() => {
          if (this.needCheck) {
            //需要验证码
            getCheck().then(data => {
              let blob = data.data;
              let src = window.URL.createObjectURL(blob);
              this.checkUrl = src;
            });
            // console.log(this.checkUrl)
          }
        });
    },
    checkNum(value) {
      this.form.check = value;
      if (value.length !== 4) {
        this.checkerr = true;
        this.checkErrMsg = "请输入四位验证码"
      } else {
        this.checkerr = false;
      }
    },
    checkaccount(value) {
      this.form.username = value;
      if (!value) {
        this.accounterr = true;
        this.accountErrMsg = "手机号不能为空";
      } else if(!/^1[3456789]\d{9}$/.test(value)){
        this.accounterr = true;
        this.accountErrMsg = "请输入正确的手机号";
      }
      else {
        this.accounterr = false;
      }
    },
    checkpsw(value) {
      this.form.password = value;
      if (!value) {
        //验证失败
        this.pswerr = true;
        this.pswErrMsg = "密码不能为空";
      } else {
        this.pswerr = false;
      }
      // return true
    },
    login() {
      this.isLoading = true;
      // console.log(this.form);
      const SUCCESS = 1;
      const SUCCESS_MSG = "响应成功";
      //一系列验证之后

      Login({
        verifyCode: this.form.check,
        username: this.form.username,
        password: this.form.password
      })
        .then(res => {
          if (res.status == 1) {
            sessionStorage.setItem("token", res.data);
            this.$router.push("/manager");
          } else {
            const err = res.data.message;
            const accountReg = /用户/
            const pswReg = /密码/
            const checkReg = /验证码/
            if(accountReg.test(err)){
              // console.log(err)
              this.accounterr = true
              this.accountErrMsg = err
            }else if(pswReg.test(err)){
              this.pswerr = true
              this.pswErrMsg = err
            }else{
              this.checkerr = true
              this.checkErrMsg = err
            }
            this.ifCheck();
          }
        })
        .catch(err => {
          this.$message({
            message: "服务器错误,请稍后重试",
            type: "error"
          });
        })
        .finally(() => {
          this.isLoading = false;
        });
      // this.$router.replace('/manager')
    },
    changePsw() {
      this.$router.push("step1");
    },
    OnceCheck() {
      //进行一次校验
      this.ifCheck();
    },
    loginByPhone(){
      this.$router.push('byPhone')
    }
  },

  //生命周期 - 创建完成（可以访问当前this实例）
  created() {},
  //生命周期 - 挂载完成（可以访问DOM元素）
  mounted() {
    this.OnceCheck();
  },
  beforeCreate() {}, //生命周期 - 创建之前
  beforeMount() {}, //生命周期 - 挂载之前
  beforeUpdate() {}, //生命周期 - 更新之前
  updated() {}, //生命周期 - 更新之后
  beforeDestroy() {}, //生命周期 - 销毁之前
  destroyed() {}, //生命周期 - 销毁完成
  activated() {}, //如果页面有keep-alive缓存功能，这个函数会触发
  deactivated() {} //如果有keep-alive缓存功能,当该页面撤销使这个函数会触发
};
</script>
<style scoped>
.loginbtn {
  background-color: #318ff9;
  width: 100%;
  padding: 0 !important;
  line-height: 40px;
  box-sizing: border-box;
}
.loginbtn:hover {
  background-color: #0484d6;
  transition: background-color 0.3s;
}
.total-error{
  color: #df1c1c;
  margin-top: -10px;
  margin-bottom: 10px;
  line-height: 20px;
  height: 20px;
}
.input{
  margin-top: 20px;
}
.input:first-of-type{
  margin-top: 30px;
}
</style>