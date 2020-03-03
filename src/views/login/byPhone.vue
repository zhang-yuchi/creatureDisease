<!-- 手机登录 -->
<template>
  <logintemplate>
    <span slot="name">登录</span>
    <div slot="form">
      <myinput
        type="phone"
        :err="phoneErr"
        :errorMsg="phoneErrMsg"
        :formValue="form.phone"
        placeholder="请输入手机号"
        @rulecheck="checkphone"
      ></myinput>
      <myinput
        type="check"
        placeholder="请输入验证码"
        :err="checkErr"
        :errorMsg="checkErrMsg"
        @rulecheck="checkRule"
        :hasVerifyCode="true"
        :formValue="form.check"
        @sendverify="sendCheck"
        :givecheckmsg="givecheckmsg"
      ></myinput>
    </div>
    <div slot="login">
      <!-- <div class="total-error">{{totalError}}</div> -->
      <el-button type="primary" @click="login" :loading="isLoading" class="loginbtn">登录</el-button>
    </div>
    <div slot="changestate">
      <el-link class="pswbtn" type="info" @click="back">账号密码登录</el-link>
    </div>
  </logintemplate>
</template>

<script>
//这里可以导入其他文件（比如：组件，工具js，第三方插件js，json文件，图片文件等等）
//例如：import 《组件名称》 from '《组件路径》';
import logintemplate from "../../components/logintemplate";
import myinput from "../../components/input/input";
import { getPhoneCode, getNewPhoneCode,loginByPhone } from "../../network";
export default {
  //import引入的组件需要注入到对象中才能使用
  components: {
    logintemplate,
    myinput
  },
  data() {
    //这里存放数据
    return {
      isLoading: false,
      // totalError: "",
      phoneErr: false,
      phoneErrMsg: "请输入正确的手机号",
      checkErr: false,
      checkErrMsg: "请输入正确的验证码",
      form: {
        check: "",
        phone: ""
      },
      givecheckmsg:false
    };
  },
  //监听属性 类似于data概念
  computed: {},
  //监控data中的数据变化
  watch: {},
  //方法集合
  methods: {
    login() {
      if (this.phoneErr || this.checkErr) {
        return;
      }
      loginByPhone({phone:this.form.phone,phoneCode:this.form.check})
      .then(res=>{
        // console.log(res)
        if(res.status==1){
          sessionStorage.setItem('token',res.data)
          this.$router.push('/manager')
        }else{
          const userReg = /用户/
          const checkReg = /验证/
          if(userReg.test(res.data.message)){
            this.phoneErr = true
            this.phoneErrMsg = res.data.message
          }else{
            this.checkErr = true
            this.checkErrMsg = res.data.message
          }
        }
      })
    },
    back() {
      this.$router.push("index");
    },
    checkphone(value) {
      this.form.phone = value
      if (!/^1[3456789]\d{9}$/.test(value)) {
        this.phoneErr = true;
      } else {
        this.phoneErr = false;
      }
    },
    checkRule(value) {
      this.form.check = value
      if (value.length !== 4) {
        this.checkErr = true;
      } else {
        this.checkErr = false;
      }
    },
    sendCheck() {
      //发送验证码
      // console.log(this.phoneErr)
      // console.log(this.form.phone)
      if (!this.phoneErr && this.form.phone!=="") {
        getNewPhoneCode({phone:this.form.phone})
        .then(res=>{
          // console.log(res)
          // if(res.data.SUCCESS){
          //   this.givecheckmsg = true
          // }else{
          //   const phoneReg = /手机|用户/
          //   const checkReg = /验证/
          //   if(phoneReg.test(res.data.ERROR)){
          //     this.phoneErr = true
          //     this.phoneErrMsg = res.data.ERROR
          //   }else{
          //     this.checkErr = true
          //     this.checkErrMsg = res.data.ERROR
          //   }
          // }
          this.givecheckmsg = true
          console.log("模拟验证码为"+res.data.CODE)
        })
        .finally(()=>{
          this.givecheckmsg = false
        });
      }else{
        this.givecheckmsg = false//拒绝发送验证码
      }
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
.loginbtn {
  background-color: #318ff9;
}
.loginbtn:hover {
  background-color: #0484d6;
  transition: background-color 0.3s;
}
.total-error {
  color: #df1c1c;
  margin-top: -10px;
  margin-bottom: 10px;
  line-height: 20px;
  height: 20px;
}
</style>