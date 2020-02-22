<!-- 订单进度 -->
<template>
  <div class>
    <Ititle title="订单进度"></Ititle>
    <wrap>
      <el-steps :active="4">
        <el-step title="提交订单" description="2020/01/10 10:23:56"></el-step>
        <el-step title="完成付款" description="2020/01/10 10:27:06"></el-step>
        <el-step title="寄出样品" description="2020/01/10 10:27:06"></el-step>
        <el-step title="确认收样" description="2020/01/10 10:27:06"></el-step>
        <el-step title="完成订单" description="2020/01/10 10:27:06"></el-step>
      </el-steps>
    </wrap>
  </div>
</template>

<script>
//这里可以导入其他文件（比如：组件，工具js，第三方插件js，json文件，图片文件等等）
//例如：import 《组件名称》 from '《组件路径》';
import Ititle from "../../components/title/index";
import wrap from "./wrap";
export default {
  //import引入的组件需要注入到对象中才能使用
  components: {
    Ititle,
    wrap
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
      initStyle(){
          this.$nextTick(()=>{
              //兼容IE
              var box = document.querySelectorAll('.is-horizontal')
              for(let i = 0;i<box.length-1;i++){
                  box[i].style.width = "20%";
              }
          })
      }
  },
  //生命周期 - 创建完成（可以访问当前this实例）
  created() {},
  //生命周期 - 挂载完成（可以访问DOM元素）
  mounted() {
      this.initStyle()
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
.is-process{
    width: 20%;
}
</style>