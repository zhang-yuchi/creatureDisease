<!--  -->
<template>
<div class=''>
    <div class>
    <div class="logtips"><slot name="name"></slot></div>
    <div class="window">
      <slot name="form"></slot>
    </div>
    <div class="control">
      <slot name="login"></slot>
    </div>
    <div class="changepsw">
      <slot name="changestate"></slot>
    </div>
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
return {

};
},
//监听属性 类似于data概念
computed: {},
//监控data中的数据变化
watch: {},
//方法集合
methods: {

},
//生命周期 - 创建完成（可以访问当前this实例）
created() {

},
//生命周期 - 挂载完成（可以访问DOM元素）
mounted() {

},
beforeCreate() {}, //生命周期 - 创建之前
beforeMount() {}, //生命周期 - 挂载之前
beforeUpdate() {}, //生命周期 - 更新之前
updated() {}, //生命周期 - 更新之后
beforeDestroy() {}, //生命周期 - 销毁之前
destroyed() {}, //生命周期 - 销毁完成
activated() {}, //如果页面有keep-alive缓存功能，这个函数会触发
deactivated() {}, //如果有keep-alive缓存功能,当该页面撤销使这个函数会触发
}
</script>
<style scoped>
.control {
  margin-top: 20px;
  text-align: center;
}
.logtips {
  color: #333333;
  font-size: 36px;
  font-weight: bold;
  margin: 70px 0 0 60px;
  letter-spacing: 2px;
}
.loginbtn {
  padding: 10px 30px;
  box-sizing: content-box;
}
.loginbtn:hover {
  background-color: #0484d6;
  border-color: #0484d6;
}
.changepsw {
  margin-top: 20px;
  text-align: center;
}
.pswbtn {
  color: #4b6477;
}
.window {
  margin-left: 60px;
  width: 70%;
}
</style>