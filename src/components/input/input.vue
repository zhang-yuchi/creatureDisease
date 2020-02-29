<!-- input -->
<template>
  <div class="input">
    <img class="icon" :src="icon_src" alt="没有icon" />
    <img class="reset" src="../../assets/reset.png" @click="reset" v-if="resetHidden" alt />
    <input
      autocomplete="off"
      class="inner-input"
      :class="isErr?'error':''"
      :placeholder="this.$props.placeholder"
      @input="onInput"
      v-model="value"
      :type="this.$props.type"
      @focus="borderChange"
      :style="{borderColor:borderColor}"
      @blur="cancel"
    />
    <verifyCode v-if="hasVerifyCode"></verifyCode>
    <div class="msg">{{isErr?errMsg:""}}</div>
    <!-- <div class="stack"></div> -->
    <img :src="checkUrl" class="checking" @click="checkOnce" alt />
  </div>
</template>

<script>
//这里可以导入其他文件（比如：组件，工具js，第三方插件js，json文件，图片文件等等）
//例如：import 《组件名称》 from '《组件路径》';
import verifyCode from '../verifycode/index'
export default {
  //import引入的组件需要注入到对象中才能使用
  components: {
    verifyCode
  },
  props: {
    formValue: {
      type: String,
      required: true
    },
    errorMsg: {
      type: String,
      default: ""
    },
    type: String,
    placeholder: String,
    rule: String,
    err: Boolean,
    checkUrl: String,
    hasVerifyCode:Boolean
  },
  data() {
    //这里存放数据
    return {
      value: this.$props.formValue,
      borderColor: "#979797",
      resetHidden: false,
      icon_src: "",
      isErr: false,
      errMsg: this.$props.errorMsg,
      img: "",
      activeImg: ""
    };
  },
  //监听属性 类似于data概念
  computed: {},
  //监控data中的数据变化
  watch: {
    value(pre, cur) {
      if (cur && !pre) {
        this.resetHidden = false;
      } else if (!cur && pre) {
        this.resetHidden = true;
      }
    },
    err(newVal) {
      this.isErr = newVal;
    },
    errorMsg(newVal) {
      this.errMsg = newVal;
    },
    checkUrl(newValue) {
      this.checkUrl = newValue;
    }
  },
  //方法集合
  methods: {
    onInput() {
      //表单验证
      //   console.log("in on input")
      this.$emit("rulecheck", this.value);
      //   if (!this.$props.rule(this.value)) {
      //     //验证失败
      //     this.isErr = true;
      //   } else {
      //     this.isErr = false;
      //   }
    },
    borderChange() {
      this.icon_src = this.activeImg;
      this.borderColor = "#0784D8";
      if (!this.value) {
        this.resetHidden = false;
        return;
      }
      this.resetHidden = true;
      // console.log(this.activeImg)

      // console.log(this.icon_src)
    },
    cancel() {
      if (!this.value) {
        this.resetHidden = false;
      }
      //颜色控制 最基本功能
      this.borderColor = "#979797";
      this.icon_src = this.img;
      // console.log(this.icon_src)
    },
    reset() {
      this.resetHidden = false;
      this.value = "";
      this.isErr = false;
    },
    checkOnce() {
      this.$emit("repeatcheck");
    }
  },
  //生命周期 - 创建完成（可以访问当前this实例）
  created() {},
  //生命周期 - 挂载完成（可以访问DOM元素）
  mounted() {
    var url = "";
    var activeUrl = "";
    // console.log(this.$props.icon)
    // this.icon_src = require(this.$props.icon)
    switch (this.$props.type) {
      case "password":
        url = "/psw.png";
        activeUrl = "/psw-active.png";
        break;
      case "username":
        url = "/account.png";
        activeUrl = "/account-active.png";
        break;
      case "check":
        url = "/checkicon.png";
        activeUrl = "/checkicon-active.png";
        break;
      case "phone":
        url = "/phone.png";
        activeUrl = "/phone-active.png";
        break;
      default:
        break;
    }
    // var url = "/psw.png"

    this.img = require("../../assets" + url);
    this.activeImg = require("../../assets" + activeUrl);
    this.icon_src = this.img;
    // console.log(this.img)
    // console.log(this.activeImg)
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
.input {
  position: relative;
  overflow: hidden;
  padding: 10px 0 0;
  width: 100%;
}
.input input {
  box-sizing: border-box;
  transition: 0.3s;
  padding-left: 40px;
  padding-top: 10px;
  padding-bottom: 10px;
  padding-right: 15px;
  width: 100%;
  border: none;
  border-bottom: 1px solid #979797;
  outline: none;
}
.msg {
  float: right;
  color: #df1c1c;
}
.stack {
  height: 18px;
  width: 100%;
}
.icon {
  position: relative;
  top: 30px;
  left: 10px;
}
.reset {
  position: absolute;
  right: 0;
  cursor: pointer;
  width: 18px;
  top: 41px;
}
.msg {
  /* float: right; */
  text-align: right;
  padding-top: 5px;
  font-size: 15px;
  height: 22px;
  width: 100%;
}
.error {
  border-color: #df1c1c !important;
}
.checking {
  position: absolute;
  right: 20px;
  height: 35px;
  cursor: pointer;
}
input:-webkit-autofill,
textarea:-webkit-autofill,
select:-webkit-autofill {
  box-shadow: 0 0 0px 1000px white inset;
  /* border: 1px solid #ccc !important; */
}
.get-msg{
  top: 27px;
  right: 0px;
}
</style>