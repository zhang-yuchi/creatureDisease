<!--  -->
<template>
  <div class>
    <div class="msg-control">
      <el-button type="danger" @click="deleteAll" icon="el-icon-delete" class="del-btn" plain>删除</el-button>
      <el-button
        class="readed-btn"
        @click="checkAll"
        type="primary"
        plain
        icon="el-icon-check"
      >标记为已读</el-button>
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
        <template slot-scope="scope">
          <div class="msg-content" :class="{isNew:scope.row.isNew}">{{ scope.row.msg }}</div>
        </template>
      </el-table-column>
      <el-table-column prop="create_time" label="时间" width="350"></el-table-column>
      <el-table-column prop="address" label="操作" show-overflow-tooltip>
        <template slot-scope="scope">
          <el-link
            type="danger"
            style="color:#D70505;font-weight:bold;"
            @click="deleteOne(scope.row.id)"
            :id="scope.row.id"
          >删除</el-link>
        </template>
      </el-table-column>
    </el-table>
    <el-pagination background layout="prev, pager, next" :hide-on-single-page="true" :total="total"></el-pagination>
    <!-- <div style="margin-top: 20px">
      <el-button @click="toggleSelection([tableData[1], tableData[2]])">切换第二、第三行的选中状态</el-button>
      <el-button @click="toggleSelection()">取消选择</el-button>
    </div>-->
  </div>
</template>

<script>
//这里可以导入其他文件（比如：组件，工具js，第三方插件js，json文件，图片文件等等）
//例如：import 《组件名称》 from '《组件路径》';
import {
  getNoticeList,
  deleteNotice,
  readNotice
} from "../../network/msg-server";
import moment from "moment";
import { read } from 'fs';
export default {
  //import引入的组件需要注入到对象中才能使用
  components: {},
  data() {
    //这里存放数据
    return {
      tableData: [],
      multipleSelection: [],
      currentPage: 0,
      pageSize: 10,
      total: 0
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
      // console.log(val);
      this.multipleSelection = val;
    },
    deleteAll() {
      // console.log(this.multipleSelection);
      if (this.multipleSelection.length > 0) {
        deleteNotice({
          data: this.multipleSelection
        })
          .then(res => {
            if (res.data.status === 1) {
              // this.success("删除成功")
              this.$message.success("删除成功");
              this.getNewList()
            }
          })
          .catch(err => {
            // console.log(err);
            this.$message.error("删除失败,请重试");
          })
          .finally(() => {
            this.$refs.multipleTable.clearSelection();
          });
      }
    },
    checkAll() {
      if (this.multipleSelection.length > 0) {
        readNotice(
          this.multipleSelection.map(item=>{
            return {id:item.id}
          })
        )
          .then(res => {
            if (res.data.status === 1) {
              // this.success("删除成功")
              console.log(res);
              console.log('读取成功');
              this.getNewList()
              // this.$message.success("删除成功");
            }
          })
          .catch(err => {
            // console.log(err);
            this.$message.error("更新失败,请重试");
          })
          .finally(() => {
            this.$refs.multipleTable.clearSelection();
          });
      }
    },
    //删除一条信息
    deleteOne(id) {
      // console.log(id); 删除使用的是order-id
      this.$confirm("确定要删除此条信息吗?", "", {
        confirmButtonText: "确定",
        cancelButtonText: "取消",
        type: "warning"
      }).then(() => {
        deleteNotice({
          data: [
            {
              id
            }
          ]
        }).then(res => {
          console.log(res);
          if (res.data.status === 1) {
            this.$message.success("删除成功");
            this.getNewList();
          }
        });
      });
    },
    getNewList() {
      getNoticeList({
        pageNum: this.currentPage,
        pageSize: this.pageSize
      }).then(res => {
        // console.log(res);
        if (res.status === 1) {
          // this.tableData = res.data.result
          console.log(res);
          this.total = res.data.totalElements;
          this.tableData = res.data.result.map(item => {
            item.msg = `您的新订单: 订单单号${item.order_sn},请进入订单管理页面查看`;
            item.create_time = moment(item.create_time * 1000).format(
              "YYYY-MM-DD HH:mm:ss"
            );
            item.isNew = !item.if_new;
            // item.id = item.order_id;
            return item;
          });
          // console.log(this.tableData);
        } else {
          this.tableData = [];
        }
      });
    }
  },
  //生命周期 - 创建完成（可以访问当前this实例）
  created() {},
  //生命周期 - 挂载完成（可以访问DOM元素）
  mounted() {
    this.getNewList();
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
<style lang="less">
.el-table__row td:nth-of-type(2) .cell {
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
.el-pagination {
  float: right;
  margin-top: 20px;
}
.el-pagination.is-background .btn-prev,
.el-pagination.is-background .btn-next,
.el-pagination.is-background .el-pager li {
  background-color: #ffffff;
  border: 1px solid #dbdfe4;
  font-weight: normal;
}
.msg-control .del-btn {
  color: rgb(215, 5, 5);
  border: 1px solid rgb(215, 5, 5);
  background-color: white;
}
.msg-control .readed-btn {
  color: #0584d7;
  border: 1px solid #0584d7;
  background-color: white;
}
.del-btn:active {
  color: white !important;
}
.has-gutter .cell:first-of-type {
  padding: 0 14px;
}

.isNew {
  position: relative;
}
.isNew::before {
  content: "";
  width: 8px;
  height: 8px;
  position: absolute;
  background-color: #d70505;
  top: 50%;
  left: 0;
  transform: translate(-200%, -50%);
  border-radius: 50%;
}
.el-table_1_column_2 .cell {
  overflow: inherit;
}
.msg-content {
  padding: 0 4px;
}
.header-class th {
  background-color: #fafafa !important;
}
</style>