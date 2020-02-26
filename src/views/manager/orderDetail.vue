<!--  -->
<template>
  <div class v-loading="isloading">
    <!-- 检测中按钮 -->
    <check-control :state="state" v-if="state=='3'||state=='4'"></check-control>
    <!-- 订单信息 -->
    <order-detail :orderDetail="orderDetail"></order-detail>
    <!-- 订单进度 -->
    <order-process :orderProcess="orderProcess"></order-process>
    <!-- 订单明细 -->
    <order-line :list="commodities"></order-line>
    <!-- 送检信息 -->
    <transport-info :sendMsg="sendMsg"></transport-info>
    <!-- 样本信息 -->
    <sample-info :sample="sample"></sample-info>
    <!-- 物流信息 -->
    <logistics :logistics="logistics"></logistics>
    <!-- 检测报告 -->
    <report :report="report"></report>
  </div>
</template>

<script>
//这里可以导入其他文件（比如：组件，工具js，第三方插件js，json文件，图片文件等等）
//例如：import 《组件名称》 from '《组件路径》';
import checkControl from "../../components/order-detail/check-control";
import orderDetail from "../../components/order-detail/order-detail";
import orderProcess from "../../components/order-detail/order-process";
import orderLine from "../../components/order-detail/order-line";
import transportInfo from "../../components/order-detail/transport-info";
import sampleInfo from "../../components/order-detail/sample-info";
import report from "../../components/order-detail/report";
import logistics from "../../components/order-detail/logistics";
import { errorHandle, singleOrderList } from "../../network";

export default {
  //import引入的组件需要注入到对象中才能使用
  name: "orderdetail",
  components: {
    checkControl,
    orderDetail,
    orderProcess,
    orderLine,
    transportInfo,
    sampleInfo,
    report,
    logistics
  },
  data() {
    //这里存放数据
    return {
      state: "",
      orderDetail: {}, //订单信息
      orderProcess: [], //订单进度
      commodities: [], //订单明细
      sendMsg: {}, //送检消息
      sample: {}, //样本信息
      logistics: {}, //物流信息

      report: {}, //检测报告

      isloading: false
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
    const orderSn = this.$route.params.orderSn;
    // console.log(this.$route)
    this.isloading = true;
    singleOrderList(orderSn)
      .then(res => {
        console.log(res);
        //状态分析
        this.state = res.data.info.status
        //订单明细
        this.commodities = res.data.commodities;
        //样本信息
      })
      .finally(() => {
        this.isloading = false;
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