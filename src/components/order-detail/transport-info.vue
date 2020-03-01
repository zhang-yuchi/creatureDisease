<!-- 送检消息 -->
<template>
  <div class v-loading="isloading">
    <Ititle title="送检消息"></Ititle>
    <wrap>
      <div class="row">
        <div class="row-item">
          <span class="row-title length6">送检单位:</span>
          <span class="row-content">{{msg.company}}</span>
        </div>
        <div class="row-item">
          <span class="row-title length6">所在地区:</span>
          <span class="row-content">{{msg.location}}</span>
        </div>
        <div class="row-item">
          <span class="row-title length6">详细地址:</span>
          <span class="row-content">{{msg.receiverAddress}}</span>
        </div>
        <div class="row-item last">
          <span class="row-title">送检人:</span>
          <span class="row-content">{{msg.receiver}}</span>
        </div>
      </div>
      <div class="row">
        <div class="row-item">
          <span class="row-title length6">送检人电话:</span>
          <span class="row-content">{{msg.phone}}</span>
        </div>
      </div>
    </wrap>
  </div>
</template>

<script>
//这里可以导入其他文件（比如：组件，工具js，第三方插件js，json文件，图片文件等等）
//例如：import 《组件名称》 from '《组件路径》';
import Ititle from "../../components/title/index";
import wrap from "./wrap";
import { getLaboratory } from '../../network'
export default {
  //import引入的组件需要注入到对象中才能使用
  components: {
    Ititle,
    wrap,
  },
  props:{
    msg:{
      type:Object
    }
  },
  data() {
    //这里存放数据
    return {
      isloading:false,
    };
  },
  //监听属性 类似于data概念
  computed: {},
  //监控data中的数据变化
  watch: {},
  //方法集合
  methods: {},
  //生命周期 - 创建完成（可以访问当前this实例）
  created() {},
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
  deactivated() {} //如果有keep-alive缓存功能,当该页面撤销使这个函数会触发
};
</script>
<style scoped>
.row {
  margin-bottom: 15px;
}
.row:last-of-type {
  margin-bottom: 0;
}
.row-item {
  vertical-align: top;
  display: inline-block;
  width: 25%;
}
.row-content {
  margin-left: 15px;
  display: inline-block;
  width: 180px;
  vertical-align: top;
}
.row-title {
  display: inline-block;
  /* width: 6em; */
  text-align: right;
}
.length3 {
  width: 3em;
}
.length4 {
  width: 4em;
}
.length5 {
  width: 5em;
}
.length6 {
  width: 6em;
}
.last {
  text-align: right;
}
.last .row-content{
  text-align: left;
}
</style>