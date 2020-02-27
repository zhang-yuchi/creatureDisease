<!--  -->
<template>
  <div class>
    <withTab :tabArray="orderTabArray" @handleTabChange="tabChange"></withTab>
    <withSearch @handlesearch="toSearch"></withSearch>
    <with-table :isloading="isloading" :list="list" />
  </div>
</template>

<script>
//这里可以导入其他文件（比如：组件，工具js，第三方插件js，json文件，图片文件等等）
//例如：import 《组件名称》 from '《组件路径》';
import withTab from "../../components/order/withTab.vue";
import withSearch from "../../components/order/search";
import withTable from "../../components/order/withTable";
import { getOrderList, errorHandle } from "../../network/index";
import moment from "moment";
export default {
  //import引入的组件需要注入到对象中才能使用
  components: {
    withTab,
    withSearch,
    withTable
  },
  name: "order",
  data() {
    //这里存放数据
    return {
      orderTabArray: [
        "所有订单",
        "待付款",
        "待寄样",
        "运输中",
        "检测中",
        "已完成",
        "已取消"
      ],
      isloading: false,
      totalElements: 0,
      currentPage: 0,
      list: [],
      state: "",
      startTime: "",
      endTime: "",
      key: "orderSn",
      searchValue: ""
    };
  },
  //监听属性 类似于data概念
  computed: {},
  //监控data中的数据变化
  watch: {},
  //方法集合
  methods: {
    tabChange(status) {
      this.state = status;
      this.getList()
    },
    toSearch(searchDetail) {
      //filter
      console.log(searchDetail);
      this.startTime = searchDetail.startTime;
      this.endTime = searchDetail.endTime;
      this.key = searchDetail.key;
      this.searchValue = searchDetail.searchValue;
      this.getList();
    },
    formatListToTable(item) {
      let single = {};
      const stateMap = {
        "0": "已取消",
        "1": "待付款",
        "2": "待寄样",
        "3": "运输中",
        "4": "检测中",
        "5": "已完成",
        "6": "退款中"
      };
      single.orderId = item.order_sn;
      single.phoneNum = 123456;
      single.logisticsNum = item.logistics_sn ? item.logistics_sn : "暂无";
      single.updateTime = moment(item.updateTime).format("YYYY/MM/DD hh:mm:ss");
      single.price = item.payable;
      single.to = item.company;
      single.state = stateMap[item.status];
      this.list.push(single);
    },
    getList() {
      this.isloading = true;
      this.list = [];
      var params = {
        pageSize: 10,
        pageNum: this.currentPage
      };
      if (this.startTime && this.endTime) {
        params = Object.assign({}, params, {
          startTime: this.startTime,
          endTime: this.endTime
        });
      }
      if (this.searchValue) {
        params[this.key] = this.searchValue;
      }
      if(this.state){
        params.status = this.state
      }
      getOrderList(params)
        .then(res => {
          // console.log(res)
          if (res.status === 1) {
            const result = res.data;
            const list = result.result;
            this.totalElements = result.totalElements;
            this.currentPage = result.currentPage;
            list.map(item => {
              this.formatListToTable(item);
            });
          } else {
            // this.$message({
            //   message: res.message,
            //   type: "error"
            // });
          }
        })
        .catch(() => {
          errorHandle();
        })
        .finally(() => {
          this.isloading = false;
        });
    }
  },
  //生命周期 - 创建完成（可以访问当前this实例）
  created() {},
  //生命周期 - 挂载完成（可以访问DOM元素）
  mounted() {
    this.getList();
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