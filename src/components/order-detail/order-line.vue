<!-- 订单明细 -->
<template>
  <div class>
    <Ititle title="订单明细"></Ititle>
    <wrap>
      <el-table :data="tableData" style="width: 100%">
        <el-table-column prop="date" label="名称"></el-table-column>
        <el-table-column prop="name" label="单价"></el-table-column>
        <el-table-column prop="address" label="数量"></el-table-column>
        <el-table-column prop="money" label="应付金额"></el-table-column>
      </el-table>
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
    return {
      tableData: [
        {
          date: "非洲猪瘟抗体检测",
          name: "￥128.00",
          address: "1",
          money:"￥128.00"
        },
      ]
    };
  },
  //监听属性 类似于data概念
  computed: {},
  //监控data中的数据变化
  watch: {},
  //方法集合
  methods: {
    initStyle() {
      this.$nextTick(() => {
        var header = document.querySelector(".el-table__header");
        var body = document.querySelector(".el-table__body");
        header.style.borderBottom = "1px solid #DBDFE4"
        header.style.backgroundColor = "#FAFAFA";
        header.style.width = "100%";
        body.style.width = "100%";
      });
    }
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
</style>