<!-- 检测项目配置表格 -->
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
      <el-table-column label="序号" width="150" style="padding:30px;">
        <template slot-scope="scope">
          <span style="height:40px">{{ scope.row.id }}</span>
        </template>
      </el-table-column>
      <el-table-column label="商品编号" width="150">
        <template slot-scope="scope">
          <span>{{ scope.row.phone }}</span>
        </template>
      </el-table-column>
      <el-table-column label="商品名称" width="150">
        <template slot-scope="scope">
          <span>{{ scope.row.transport }}</span>
        </template>
      </el-table-column>
      <el-table-column label="疫病种类名称" width="180">
        <template slot-scope="scope">
          <span>{{ scope.row.time }}</span>
        </template>
      </el-table-column>
      <el-table-column label="供应价格" width="100">
        <template slot-scope="scope">
          <span>${{ scope.row.money }}</span>
        </template>
      </el-table-column>
      <el-table-column label="库存" width="200">
        <template slot-scope="scope">
          <span>{{ scope.row.address }}</span>
        </template>
      </el-table-column>
      <el-table-column label="下架时间" width="90">
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
            style="margin-right:20px;color:#0584D7"
            type="primary"
            @click="handleCheck(scope.$index, scope.row)"
          >编辑</el-link>
          <el-link
            class="checkbtn"
            style="color:#0584D7"
            type="primary"
            @click="handleCheck(scope.$index, scope.row)"
          >上架</el-link>
        </template>
      </el-table-column>
      <slot name="operator"></slot>
    </el-table>
    <el-pagination background layout="prev, pager, next" :hide-on-single-page="true" :total="1000"></el-pagination>
  </div>
</template>

<script>
//这里可以导入其他文件（比如：组件，工具js，第三方插件js，json文件，图片文件等等）
//例如：import 《组件名称》 from '《组件路径》';
import baseInfoVue from "../../views/manager/baseInfo.vue";
export default {
//import引入的组件需要注入到对象中才能使用
components: {},
data() {
//这里存放数据
return {
tableData: [
        {
          id: "201906012345",
          name: "王小虎",
          address: "四川分县农业有限公司",
          money: 1280,
          time: "2019/12/20 12:20:58",
          transport: "1316328914",
          phone: "18702896918",
          state: "待付款"
        }
      ],
      loading: false
};
},
//监听属性 类似于data概念
computed: {},
//监控data中的数据变化
watch: {},
//方法集合
methods: {
 cellStyle() {
      return {
        padding: "7px 0"
      };
    },
    headerStyle() {
      return {
        backgroundColor: "#DBDFE4",
        color: "#333333"
      };
    },
    handleDetail(index, row) {
      this.$router.push("order-detail");
    },
    handleCheck(index, row) {
      console.log(index, row);
      // this.$router.go(0)
    },
    initTable() {
      this.$nextTick(() => {
        var tr_cell = document.querySelector("tr .cell");
        tr_cell.style.paddingLeft = 20 + "px";
        var times = Object.keys(this.tableData[0]).length;
        var firstitem = document.querySelectorAll(
          ".el-table__row .cell:first-of-type"
        );
        for (let index in firstitem) {
          if (index % times == 0) {
              console.log(firstitem[index])
            firstitem[index].style.paddingLeft = "20px";
          }
        }
        //IE兼容
        document.querySelector(".el-table__body").style.width = "100%";
        document.querySelector(".el-table__header").style.width = "100%";
      });
    }
},
//生命周期 - 创建完成（可以访问当前this实例）
created() {

},
//生命周期 - 挂载完成（可以访问DOM元素）
mounted() {
    this.initTable()
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