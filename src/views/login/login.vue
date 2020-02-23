<!--  -->
<template>
  <logintemplate>
    <span slot="name">登录</span>
    <div slot="form">
      <myInput
        type="username"
        :formValue="form.username"
        @rulecheck="checkaccount"
        :err="accounterr"
        :errorMsg="this.accountErrMsg"
        placeholder="请输入用户名"
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
        errorMsg="请输入四位验证码"
        :err="this.checkerr"
        @rulecheck="checkNum"
      ></myInput>
    </div>
    <div slot="login">
      <el-button type="primary" @click="login" :loading="isLoading" class="loginbtn">登录</el-button>
    </div>
    <div slot="changestate">
      <el-link class="pswbtn" type="info" @click="changePsw">忘记密码?</el-link>
    </div>
  </logintemplate>
</template>

<script>
//这里可以导入其他文件（比如：组件，工具js，第三方插件js，json文件，图片文件等等）
//例如：import 《组件名称》 from '《组件路径》';
import myInput from "../../components/input/input";
import logintemplate from "../../components/logintemplate";
import {Login} from '../../network'
export default {
  //import引入的组件需要注入到对象中才能使用
  components: {
    myInput,
    logintemplate,
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
      isLoading: false
    };
  },
  //监听属性 类似于data概念
  computed: {},
  //监控data中的数据变化
  watch: {},
  //方法集合
  methods: {
    checkNum(value) {
      console.log(value);
      this.form.check = value;
      if (value.length !== 4) {
        this.checkerr = true;
      } else {
        this.checkerr = false;
      }
    },
    checkaccount(value) {
      this.form.username = value;
      if (!value) {
        this.accounterr = true;
        this.accountErrMsg = "用户名不能为空";
      } else {
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
      const SUCCESS = 1
      const SUCCESS_MSG = "响应成功"
      //一系列验证之后
      Login({
          username:this.form.username,
          password:this.form.password
      })
      .then((res)=>{
          console.log(res)
          if(res.status == 1){
            sessionStorage.setItem('token',res.data)
            this.$router.push('/manager')
          }else{
            this.$message.error(res.data.message)
          }
      })
      .catch((err)=>{
        
      })
      .finally(()=>{
        this.isLoading = false
      })
      // this.$router.replace('/manager')
    },
    changePsw() {
      this.$router.push("step1");
    }
  },
  //生命周期 - 创建完成（可以访问当前this实例）
  created() {},
  //生命周期 - 挂载完成（可以访问DOM元素）
  mounted() {},
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
.loginbtn{
  background-color: #318FF9;
}
.loginbtn:hover{
  background-color: #0484D6;
  transition: background-color 0.3s
}
</style>