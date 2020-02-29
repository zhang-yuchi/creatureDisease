<!--  -->
<template>
  <div class v-loading="isloading">
    <!-- 检测中按钮 -->
    <check-control :state="state" :orderSn="orderNo" v-if="state=='3'||state=='4'"></check-control>
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
    <report :report="report" v-if="state=='4'||state=='5'"></report>
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
import moment from 'moment'
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
      orderNo:"",
      orderDetail: {}, //订单信息
      orderProcess: {}, //订单进度
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
    const orderSn = this.$route.query.orderSn;
    const stateMap = {
        "0": "已取消",
        "1": "待付款",
        "2": "待寄样",
        "3": "运输中",
        "4": "检测中",
        "5": "已完成",
        "6": "退款中"
      };
    // console.log(this.$route)
    this.isloading = true;
    singleOrderList(orderSn)
      .then(res => {
        console.log(res);
        const details = res.data
        // console.log(details.order_sn)
        // 订单信息
        var tempInfo = Object.assign({},details.info,{
          status:stateMap[details.info.status]
        })
        for(let key in tempInfo){
          if(!tempInfo[key]){
            tempInfo[key] = "暂无"
          }
        }
        this.orderNo = tempInfo.order_sn
        this.orderDetail = tempInfo

        //状态分析
        this.state = res.data.info.status
        //订单明细
        this.commodities = res.data.commodities;
        //样本信息
        //无,需要另外使用接口
        //订单进度
        var list = res.data.statuses.sort((a,b)=>{
          return parseInt(a.type<b.type)
        }).map((item)=>{
          item.time = moment(item).format('YYYY/MM/DD hh:mm:ss')
          return item
        })
        .filter((item)=>{
          return item.type!=="0"
        })
        var obj = {}
        list.map(item=>{
          obj[item.type] = item.time
        })
        let arr = Object.keys(obj)
        // console.log(arr)
        let maxNum = arr[arr.length-1]
        // console.log(maxNum)
        obj.maxSize = maxNum
        this.orderProcess = obj
        //样本信息
        this.sample = Object.assign({},{},{
          images:details.images,
          intro:""
        })
        // 物流快递

        // 检测报告
        
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