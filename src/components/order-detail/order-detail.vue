<!-- 订单信息组件 -->
<template>
  <div class>
    <Ititle title="订单信息"></Ititle>
    <wrap>
      <div class="row">
        <div class="row-item">
          <span class="row-title length5">订单编号:</span>
          <span class="row-content">{{orderDetail.order_sn}}</span>
        </div>
        <div class="row-item">
          <span class="row-title length4">微信号:</span>
          <span class="row-content">{{orderDetail.wechat}}</span>
        </div>
        <div class="row-item">
          <span class="row-title length6">姓名:</span>
          <span class="row-content">{{orderDetail.name}}</span>
        </div>
        <div class="row-item last">
          <span class="row-title">手机号:</span>
          <span class="row-content">{{orderDetail.phone}}</span>
        </div>
      </div>
      <div class="row">
        <div class="row-item">
          <span class="row-title length5">支付方式:</span>
          <span class="row-content">{{orderDetail.pay_type}}</span>
        </div>
        <div class="row-item">
          <span class="row-title length4">状态:</span>
          <span class="row-content" style="color:#0584D7;font-weight:bold;">{{orderDetail.status}}</span>
        </div>
        <div class="row-item">
          <span class="row-title length6">订单总金额:</span>
          <span class="row-content">
            ￥
            <span style="color:rgb(243, 110, 99);font-weight:bold;">{{orderDetail.payable}}</span>元
          </span>
        </div>
      </div>
    </wrap>
  </div>
</template>

<script>
//这里可以导入其他文件（比如：组件，工具js，第三方插件js，json文件，图片文件等等）
//例如：import 《组件名称》 from '《组件路径》';
import Ititle from "../title/index";
import wrap from "./wrap";
export default {
  //import引入的组件需要注入到对象中才能使用
  components: {
    Ititle,
    wrap
  },
  props:{
    orderDetail:Object,
  },
  data() {
    //这里存放数据
    return {};
  },
  //监听属性 类似于data概念
  computed: {},
  //监控data中的数据变化
  watch: {
    orderDetail(newValue){
      this.orderDetail = newValue
    }
  },
  //方法集合
  methods: {
    initStyle() {}
  },
  //生命周期 - 创建完成（可以访问当前this实例）
  created() {},

  //生命周期 - 挂载完成（可以访问DOM元素）
  mounted() {
    this.initStyle();
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
</style>