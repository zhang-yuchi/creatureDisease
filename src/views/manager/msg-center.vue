<!--  -->
<template>
  <div class>
    <div class="msg-control">
      <el-button type="danger" icon="el-icon-delete" class="del-btn" plain>删除</el-button>
      <el-button class="readed-btn" type="primary" plain icon="el-icon-check">标记为已读</el-button>
    </div>
    <el-table
      ref="multipleTable"
      :data="tableData"
      tooltip-effect="dark"
      style="width: 100%"
      header-row-class-name="header-class"
      @selection-change="handleSelectionChange"
    >
      <el-table-column type="selection" width="100"></el-table-column>
      <el-table-column label="消息内容" width="600">
        <template slot-scope="scope"><div class="msg-content" :class="{isNew:scope.row.isNew}" >{{ scope.row.date }}</div></template>
      </el-table-column>
      <el-table-column prop="name" label="时间" width="400"></el-table-column>
      <el-table-column prop="address" label="操作" show-overflow-tooltip>
          <template slot-scope="scope"><el-link type="danger" style="color:#D70505;font-weight:bold;" :id="scope.row.date">删除</el-link></template>
      </el-table-column>
    </el-table>
    <el-pagination background layout="prev, pager, next" :hide-on-single-page="true" :total="1000"></el-pagination>
    <!-- <div style="margin-top: 20px">
      <el-button @click="toggleSelection([tableData[1], tableData[2]])">切换第二、第三行的选中状态</el-button>
      <el-button @click="toggleSelection()">取消选择</el-button>
    </div> -->
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
      tableData: [
        {
          date: "您的新订单: 订单单号4888754545445444,请进入订单管理页面查看",
          name: "2020-03-11 13:34:02",
          address: "上海市普陀区金沙江路 1518 弄",
          isNew:true,
        },
        {
          date: "您的新订单: 订单单号4888754545445444,请进入订单管理页面查看",
          name: "2020-03-11 13:34:02",
          address: "上海市普陀区金沙江路 1518 弄",
          isNew:true,
        },
        {
          date: "您的新订单: 订单单号4888754545445444,请进入订单管理页面查看",
          name: "2020-03-11 13:34:02",
          address: "上海市普陀区金沙江路 1518 弄",
          isNew:true,
        },
        {
          date: "您的新订单: 订单单号4888754545445444,请进入订单管理页面查看",
          name: "2020-03-11 13:34:02",
          address: "上海市普陀区金沙江路 1518 弄",
          isNew:false,
        },
        
      ],
      multipleSelection: []
    };
  },
  //监听属性 类似于data概念
  computed: {},
  //监控data中的数据变化
  watch: {},
  //方法集合
  methods: {
    toggleSelection(rows) {
      if (rows) {
        rows.forEach(row => {
          this.$refs.multipleTable.toggleRowSelection(row);
        });
      } else {
        this.$refs.multipleTable.clearSelection();
      }
    },
    handleSelectionChange(val) {
      console.log(val);
      this.multipleSelection = val;
    }
  },
  //生命周期 - 创建完成（可以访问当前this实例）
  created() {},
  //生命周期 - 挂载完成（可以访问DOM元素）
  mounted() {},
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
<style lang="less">
.el-table__row td:nth-of-type(2) .cell{
    overflow: inherit;
}
.msg-control {
  padding-left: 20px;
  margin-top: 20px;
  margin-bottom: 20px;
}
.readed-btn,
 .del-btn {
  border-radius: 4px;
}
.el-pagination{
    float: right;
    margin-top: 20px;
}
.el-pagination.is-background .btn-prev, .el-pagination.is-background .btn-next, .el-pagination.is-background .el-pager li{
    background-color: #FFFFFF;
    border: 1px solid #DBDFE4;
    font-weight: normal;
}
.msg-control .del-btn {
    color: rgb(215, 5, 5);
    border: 1px solid rgb(215, 5, 5);
    background-color: white;
}
.msg-control .readed-btn {
    color: #0584D7;
    border: 1px solid #0584D7;;
    background-color: white;
}
.del-btn:active {
  color: white !important;
}
.has-gutter .cell:first-of-type {
  padding: 0 14px;
}

.isNew{
    position: relative;
}
.isNew::before{
    content:"";
    width:8px;
    height:8px;
    position: absolute;
    background-color: #D70505;
    top: 50%;
    left: 0;
    transform: translate(-200%,-50%);
    border-radius: 50%;
}
.el-table_1_column_2  .cell{
    overflow: inherit;
}
.msg-content{
    padding: 0 4px;
}
.header-class th{
    background-color: #FAFAFA !important;
}
</style>