<!--  -->
<template>
  <div class="cover">
    <img class="not-fount" src="../../assets/500.png" alt />
    <div class="controller">
      <div class="tip-header">500</div>
      <div class="intro">抱歉,服务器出错了</div>
      <el-button type="primary" @click="toBack">点击刷新</el-button>
    </div>
  </div>
</template>

<script>
//这里可以导入其他文件（比如：组件，工具js，第三方插件js，json文件，图片文件等等）
//例如：import 《组件名称》 from '《组件路径》';

export default {
  //import引入的组件需要注入到对象中才能使用
  components: {},
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
    toBack() {
      this.$router.go(-1);
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
.cover {
  background-color: #f0f2f5;
  height: 657px;
  margin-top: -20px;
  position: relative;
}
.not-fount {
  position: absolute;
  top: 200px;
  width: 350px;
  height: 200px;
  left: 150px;
}
.controller {
  position: absolute;
  right: 400px;
  top: 200px;
}
.tip-header {
  color: #434e59;
  font-size: 80px;
  margin-bottom: 16px;
}
.intro {
  font-size: 20px;
  color: rgba(0, 0, 0, 0.45);
  margin-bottom: 16px;
}
</style>