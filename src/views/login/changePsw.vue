<!--  -->
<template>
  <logintemplate>
    <div slot="name">忘记密码</div>
    <div slot="form">
      <myinput
        type="phone"
        placeholder="请输入你的手机号"
        :err="phoneErr"
        :errorMsg="phoneErrMsg"
        @rulecheck="checkphone"
        :formValue="form.phone"
      ></myinput>
      <myinput
        type="check"
        placeholder="请输入验证码"
        :errorMsg="checkErrMsg"
        :err="checkErr"
        :checkUrl="checkUrl"
        @rulecheck="checkNum"
        :formValue="form.check"
        @repeatcheck="checkonce"
      ></myinput>
    </div>
    <div slot="login">
      <el-button type="primary" @click="next" :loading="isLoading" class="loginbtn">下一步</el-button>
    </div>
    <div slot="changestate">
      <el-link class="pswbtn" type="info" @click="back">返回登录</el-link>
    </div>
  </logintemplate>
</template>

<script>
//这里可以导入其他文件（比如：组件，工具js，第三方插件js，json文件，图片文件等等）
//例如：import 《组件名称》 from '《组件路径》';
import logintemplate from "../../components/logintemplate";
import myinput from "../../components/input/input";
import { getCheck, getPhoneCode } from "../../network";
export default {
  //import引入的组件需要注入到对象中才能使用
  components: {
    logintemplate,
    myinput
  },
  data() {
    //这里存放数据
    return {
      phoneErr: false,
      phoneErrMsg: "",
      checkErr: false,
      checkErrMsg: "",
      form: {
        phone: "",
        check: ""
      },
      checkUrl: "",
      isLoading: false,
      checkErr: false
    };
  },
  //监听属性 类似于data概念
  computed: {},
  //监控data中的数据变化
  watch: {},
  //方法集合
  methods: {
    next() {
      // console.log(this.form.check);
      // console.log(this.form.phone);
      if(this.phoneErr||this.checkErr){
        return
      }
      getPhoneCode({
        verifyCode: this.form.check,
        phone: this.form.phone
      }).then(res => {
        // console.log(res);
        if (res.data.STATUS==='SUCCESS') {
          console.log("模拟验证码为" + res.data.CODE);
          this.$router.push("step2");
        } else {
          const phoneReg = /手机|用户/;
          const check = /验证/;
          if (phoneReg.test(res.data.ERROR)) {
            this.phoneErr = true;
            this.phoneErrMsg = res.data.ERROR;
          } else {
            this.checkErr = true;
            this.checkErrMsg = res.data.ERROR;
          }
        }

        this.checkonce();
      });
    },
    back() {
      //清空redux中的缓存
      this.$router.push("index");
    },
    checkNum(value) {
      this.form.check = value;
      if (value.length !== 4) {
        this.checkErr = true;
      } else {
        this.checkErr = false;
      }
    },
    checkonce() {
      getCheck().then(data => {
        let blob = data.data;
        let src = window.URL.createObjectURL(blob);
        this.checkUrl = src;
      });
    },
    checkphone(value) {
      this.form.phone = value;
      if(!/^1[3456789]\d{9}$/.test(value)){
        this.phoneErr = true
        this.phoneErrMsg = "请输入正确的手机号"
      }else{
        this.phoneErr = false
      }
    }
  },
  //生命周期 - 创建完成（可以访问当前this实例）
  created() {},
  //生命周期 - 挂载完成（可以访问DOM元素）
  mounted() {
    getCheck().then(data => {
      let blob = data.data;
      let src = window.URL.createObjectURL(blob);
      this.checkUrl = src;
    });
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
</style>