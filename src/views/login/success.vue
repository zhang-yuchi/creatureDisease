<!--  -->
<template>
  <logintemplate>
    <span slot="name">忘记密码</span>
    <div slot="other">
      <div class="success-window">
        <img class="success-sign" src="../../assets/success.png" alt />
        <div class="tips">
          <span class="tips-text">密码重置成功!</span>
          <el-link class="back-btn" :underline="false" @click="login" type="primary">去登录</el-link>
        </div>
      </div>
    </div>
  </logintemplate>
</template>

<script>
//这里可以导入其他文件（比如：组件，工具js，第三方插件js，json文件，图片文件等等）
//例如：import 《组件名称》 from '《组件路径》';
import myInput from "../../components/input/input";
import logintemplate from "../../components/logintemplate";
export default {
  //import引入的组件需要注入到对象中才能使用
  components: {
    logintemplate
  },
  data() {
    //这里存放数据
    return {};
  },
  //监听属性 类似于data概念
  computed: {},
  //监控data中的数据变化
  watch: {},
  //方法集合
  methods: {
      login(){
          this.$router.push('index')
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
.tips-text {
  /* margin-top: 3px; */
  display: inline-block;
  color: #333333;
}
.success-sign{
    width: 100px;
    display: block;
    margin: 80px auto 30px;
}
.back-btn {
    margin-left: 18px;
  font-weight: bold;
  /* margin-top: -4px; */
  display: inline-block;
  font-size: 16px;
  color: #0584d7;
}
.tips {
  text-align: center;
  vertical-align: top;
}
</style>