<!--  -->
<template>
  <div class="table">
    <el-table
      :data="tableData"
      style="width: 100%;"
      height="450"
      :cell-style="cellStyle"
      :header-cell-style="headerStyle"
      v-loading="loading"
    >
      <el-table-column label="订单号" width="150" style="padding:30px;">
        <template slot-scope="scope">
          <span style="height:40px">{{ scope.row.orderId }}</span>
        </template>
      </el-table-column>
      <el-table-column label="手机号" width="150">
        <template slot-scope="scope">
          <span>{{ scope.row.phoneNum }}</span>
        </template>
      </el-table-column>
      <el-table-column label="运单号" width="150">
        <template slot-scope="scope">
          <span>{{ scope.row.logisticsNum }}</span>
        </template>
      </el-table-column>
      <el-table-column label="下单时间" width="180">
        <template slot-scope="scope">
          <span>{{ scope.row.updateTime }}</span>
        </template>
      </el-table-column>
      <el-table-column label="订单金额" width="100">
        <template slot-scope="scope">
          <span>￥{{ scope.row.price }}</span>
        </template>
      </el-table-column>
      <el-table-column label="送检单位" width="200">
        <template slot-scope="scope">
          <span>{{ scope.row.to }}</span>
        </template>
      </el-table-column>
      <el-table-column label="订单状态" width="90">
        <template slot-scope="scope">
          <span>{{ scope.row.state }}</span>
        </template>
      </el-table-column>
      <el-table-column label="操作">
        <template slot-scope="scope">
          <el-link
            class="checkbtn"
            style="margin-right:20px;color:#0584D7"
            type="primary"
            @click="handleDetail(scope.$index, scope.row)"
          >查看</el-link>
          <el-link
            class="checkbtn"
            style="color:#0584D7"
            type="primary"
            @click="handleCheck(scope.$index, scope.row)"
            v-if="scope.row.state=='运输中'"
          >确认收货</el-link>
        </template>
      </el-table-column>
      <slot name="operator"></slot>
    </el-table>
    <el-pagination
      background
      @current-change="pagechange"
      layout="prev, pager, next"
      :hide-on-single-page="true"
      :current-page="this.currentPage+1"
      :total="this.totalElements"
    ></el-pagination>
  </div>
</template>

<script>
import baseInfoVue from "../../views/manager/baseInfo.vue";
//这里可以导入其他文件（比如：组件，工具js，第三方插件js，json文件，图片文件等等）
//例如：import 《组件名称》 from '《组件路径》';

export default {
  //import引入的组件需要注入到对象中才能使用
  components: {},
  props: {
    isloading: Boolean,
    list: Array,
    currentPage: Number,
    totalElements: Number
  },
  data() {
    //这里存放数据
    return {
      tableData: [],
      loading: this.isloading //表单加载状态
    };
  },
  //监听属性 类似于data概念
  computed: {},
  //监控data中的数据变化
  watch: {
    isloading(newValue) {
      this.loading = newValue;
    },
    list(newValue) {
      this.initTable(); //动态渲染,样式丢失
      this.tableData = newValue;
    },
    totalElements(newValue) {
      this.totalElements = newValue; //可能不行
    },
    currentPage(newValue) {
      console.log(newValue)
      this.currentPage = newValue;
    }
  },
  //方法集合
  methods: {
    pagechange(cur){
      this.$emit('pagechange',cur)
    },
    cellStyle() {
      return {
        padding: "7px 0"
      };
    },
    headerStyle() {
      return {
        backgroundColor: "#FAFAFA",
        color: "#333333"
      };
    },
    handleDetail(index, row) {
      console.log(row);
      this.$router.push({
        path: "order-detail",
        query: {
          orderSn: row.orderId
        }
      });
      // this.$router.push("order-detail");
    },
    handleCheck(index, row) {
      console.log(index, row);
      // this.$router.go(0)
    },
    initTable() {
      this.$nextTick(() => {
        var tr_cell = document.querySelector("tr .cell");
        tr_cell.style.paddingLeft = 20 + "px";
        var column = 8;
        var times = column;
        var firstitem = document.querySelectorAll(".el-table__row .cell");
        for (let index in firstitem) {
          if (index % times == 0) {
            // console.log(index)
            firstitem[index].style.paddingLeft = "20px";
          }
        }
        //IE兼容
        document.querySelector(".el-table__body").style.width = "100%";
        document.querySelector(".el-table__header").style.width = "100%";
      });
    },
    
  },

  //生命周期 - 创建完成（可以访问当前this实例）
  created() {},
  //生命周期 - 挂载完成（可以访问DOM元素）
  mounted() {
    this.initTable();
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
.el-table__header {
  width: 100%;
}
.cell {
  padding-left: 10px;
}
.check-btn {
  margin-right: 20px;
}
.table {
  overflow: hidden;
  min-height: 500px;
  margin-top: 20px;
}
.el-pagination {
  text-align: right;
}
</style>