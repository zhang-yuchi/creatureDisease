<!-- 检测项目配置表格 -->
<template>
  <div class="table">
    <el-table
      :data="showList"
      style="width: 100%;"
      height="450"
      :cell-style="cellStyle"
      :header-cell-style="headerStyle"
      v-loading="loading"
    >
      <el-table-column label="序号" width="120" style="padding:30px;">
        <template slot-scope="scope">
          <span style="height:40px">{{ scope.row.index }}</span>
        </template>
      </el-table-column>
      <el-table-column label="商品编号" width="150">
        <template slot-scope="scope">
          <span>{{ scope.row.id }}</span>
        </template>
      </el-table-column>
      <el-table-column label="商品名称" width="200">
        <template slot-scope="scope">
          <span>{{ scope.row.name }}</span>
        </template>
      </el-table-column>
      <el-table-column label="疫病种类名称" width="180">
        <template slot-scope="scope">
          <span>{{ scope.row.diseaseName }}</span>
        </template>
      </el-table-column>
      <el-table-column label="供应价格" width="100">
        <template slot-scope="scope">
          <span>￥{{ scope.row.price }}</span>
        </template>
      </el-table-column>
      <el-table-column label="库存" width="150">
        <template slot-scope="scope">
          <span>{{ scope.row.inventory }}</span>
        </template>
      </el-table-column>
      <el-table-column v-if="changeState==0" label="上架时间" width="150">
        <template slot-scope="scope">
          <span>{{ scope.row.createTime }}</span>
        </template>
      </el-table-column>
      <el-table-column v-if="changeState==1" label="下架时间" width="150">
        <template slot-scope="scope">
          <span>{{ scope.row.updateTime }}</span>
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
            @click="handleOnSale(scope.$index, scope.row)"
            v-if="changeState == 1"
          >上架</el-link>
          <el-link
            class="checkbtn"
            style="color:#0584D7"
            type="primary"
            @click="handleOffSale(scope.$index, scope.row)"
            v-if="changeState == 0"
          >下架</el-link>
        </template>
      </el-table-column>
      <slot name="operator"></slot>
    </el-table>
    <el-pagination
      background
      layout="prev, pager, next"
      :hide-on-single-page="true"
      @current-change="pageChange"
      :current-page="this.offset+1"
      :total="this.list.length"
    ></el-pagination>
    <el-dialog title="编辑商品" :visible.sync="EditFormVisible">
      <div class="tips">
        <span class="item-title">商品编号:</span>
        {{editForm.id}}
      </div>
      <div class="tips" style="margin-bottom:10px;">
        <span class="item-title">商品名称:</span>
        {{editForm.name}}
      </div>
      <el-form :model="editForm">
        <el-form-item label="供货价格:" :label-width="'72px'">
          <el-input v-model="editForm.price" placeholder="请输入供货价格" autocomplete="off"></el-input>
        </el-form-item>
        <el-form-item label="库存:" :label-width="'72px'">
          <el-input v-model.number="editForm.inventory" placeholder="请输入库存数量" autocomplete="off"></el-input>
        </el-form-item>
      </el-form>
      <div slot="footer" class="dialog-footer">
        <el-button @click="EditFormVisible = false">取 消</el-button>
        <el-button type="primary" :loading="btnloading" @click="editItem">确 定</el-button>
      </div>
    </el-dialog>
    <!-- 商品详情弹框 -->
    <el-dialog title="商品详情" v-loading="windowloading" :visible.sync="detailVisible" width="30%">
      <div class="text-row">
        <span class="detail-name">商品名称:</span>
        <span class="text-content">{{singleForm.name}}</span>
      </div>
      <div class="text-row">
        <span class="detail-name">商品编号:</span>
        <span class="text-content">{{singleForm.id}}</span>
      </div>
      <div class="text-row">
        <span class="detail-name">疫病种类名称:</span>
        <span class="text-content">{{singleForm.diseaseName}}</span>
      </div>
      <div class="text-row">
        <span class="detail-name">价格:</span>￥
        <span class="text-content">{{singleForm.price}}</span>
      </div>
      <div class="text-row">
        <span class="detail-name">总库存:</span>
        <span class="text-content">{{singleForm.inventory}}</span>
      </div>
      <div class="text-row" v-if="changeState==0">
        <span class="detail-name">上架时间:</span>
        <span class="text-content">{{singleForm.createTime}}</span>
      </div>
      <div class="text-row" v-if="changeState==1">
        <span class="detail-name">下架时间:</span>
        <span class="text-content">{{singleForm.createTime}}</span>
      </div>
      <div class="text-row">
        <span class="detail-name">采样说明:</span>
        <span class="text-content mulit-row">{{singleForm.samplingInstruction}}</span>
      </div>
      <div class="text-row">
        <span class="detail-name">检测说明:</span>
        <span class="text-content mulit-row">{{singleForm.deletectionInstruction}}</span>
      </div>
      <span slot="footer" class="dialog-footer">
        <el-button type="primary" @click="detailVisible = false">关闭</el-button>
      </span>
    </el-dialog>
  </div>
</template>

<script>
//这里可以导入其他文件（比如：组件，工具js，第三方插件js，json文件，图片文件等等）
//例如：import 《组件名称》 from '《组件路径》';
import baseInfoVue from "../../views/manager/baseInfo.vue";
import moment from "moment";
import { initDg } from '../../assets/utils'
import {
  editLabItem,
  errorHandle,
  offSaleItem,
  onSaleItem,
  getSingleItem
} from "../../network";
export default {
  //import引入的组件需要注入到对象中才能使用
  components: {},
  props: {
    list: {
      type: Array,
      default: []
    },
    isloading: {
      type: Boolean
    },
    state: {
      type: Number,
      default: 0,
      required: true
    }
  },
  data() {
    //这里存放数据
    return {
      tableData: this.list,
      loading: false,
      btnloading: false,
      showList: [],
      offset: 0,
      maxpage: 10,
      changeState: this.state,
      //编辑商品数据
      EditFormVisible: false,
      editForm: {
        name: "",
        id: "",
        price: "",
        inventory: ""
      },
      formLabelWidth: "120px",
      windowloading: false,
      detailVisible: false,
      singleForm: {
        name: "",
        id: "",
        diseaseName: "",
        price: "",
        inventory: "",
        createTime: "",
        deletectionInstruction: "",
        samplingInstruction: ""
      }
    };
  },
  //监听属性 类似于data概念
  computed: {},
  //监控data中的数据变化
  watch: {
    list(newValue) {
      this.tableData = newValue;
      this.getShowList();
      this.initTable()
    },
    isloading(newValue) {
      this.loading = newValue;
    },
    state(newValue) {
      this.changeState = newValue;
    }
  },
  //方法集合
  methods: {
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
      // this.$router.push("order-detail");
      this.detailVisible = true;
      this.windowloading = true;
      getSingleItem({ id: row.id })
        .then(res => {
          const item = res.data;
          this.singleForm.id = item.repertory.id;
          this.singleForm.name = item.commodity.name;
          this.singleForm.diseaseName = item.diseaseType.name;
          this.singleForm.price = item.repertory.price.toFixed(2);
          this.singleForm.inventory = item.repertory.inventory;
          let time = moment(item.repertory.createTime).format(
            "YYYY-MM-DD hh:mm:ss"
          );
          this.singleForm.createTime = time;
          this.singleForm.deletectionInstruction =
            item.commodity.deletectionInstruction;
          this.singleForm.samplingInstruction =
            item.commodity.samplingInstruction;
        })
        .finally(() => {
          this.windowloading = false;
        });
    },
    handleCheck(index, row) {
      this.editForm.name = row.name;
      this.editForm.id = row.id;
      this.editForm.price = row.price;
      this.editForm.inventory = row.inventory;
      this.EditFormVisible = true;
      // this.$router.go(0)
    },
    initTable() {
      this.$nextTick(() => {
        var tr_cell = document.querySelector("tr .cell");
        tr_cell.style.paddingLeft = 20 + "px";
        // var times = Object.keys(this.tableData[0]).length;
        var times = 8; //列数为8
        // console.log(tr_cell)
        var firstitem = document.querySelectorAll(
          ".el-table__row td"
        );
        // console.log(firstitem)
        // console.log(firstitem)
        for (let index in firstitem) {
          if (index % times == 0) {
            firstitem[index].style.paddingLeft = "10px";
          }
        }

        //IE兼容
        document.querySelector(".el-table__body").style.width = "100%";
        document.querySelector(".el-table__header").style.width = "100%";

        //修改弹窗样式
        initDg()  
      });
    },
    getShowList() {
      this.showList = [];
      for (
        let i = this.offset * this.maxpage;
        i < this.offset * this.maxpage + this.maxpage;
        i++
      ) {
        if (i >= this.tableData.length) {
          break;
        }
        this.showList.push(this.tableData[i]);
      }
    },
    pageChange(page) {
      this.offset = page - 1;
      this.getShowList();
    },
    handleOnSale(index, row) {
      //上架商品
      this.$confirm("确定要上架商品 " + row.name + " 吗", "", {
        confirmButtonText: "确定",
        cancelButtonText: "取消",
        type: "warning"
      })
        .then(() => {
          onSaleItem({ id: row.id }).then(res => {
            this.$message({
              type: "success",
              message: "上架成功!"
            });
            this.$emit("requestnewList"); //请求新的列表
          });
        })
        .catch(() => {
          this.$message({
            message: "上架已取消"
          });
        });
    },
    handleOffSale(index, row) {
      //下架商品
      this.$confirm("确定要下架商品 " + row.name + " 吗", "", {
        confirmButtonText: "确定",
        cancelButtonText: "取消",
        type: "warning"
      })
        .then(() => {
          offSaleItem({ id: row.id }).then(res => {
            this.$message({
              type: "success",
              message: "下架成功!"
            });
            this.$emit("requestnewList"); //请求新的列表
          });
        })
        .catch(() => {
          this.$message({
            message: "下架已取消"
          });
        });
    },
    editItem() {
      this.btnloading = true;
      let query = {
        id: this.editForm.id,
        price: parseFloat(this.editForm.price),
        inventory: this.editForm.inventory
      };
      // console.log(query)
      //编辑商品
      editLabItem(query)
        .then(res => {
          if (res.status == 1) {
            this.$message({
              message: "编辑成功",
              type: "success"
            });
            this.EditFormVisible = false;
            this.$emit("requestnewList");
          } else {
            this.$message({
              message: "编辑失败" + res.message
            });
          }
        })
        .catch(() => {
          // errorHandle()
        })
        .finally(() => {
          this.btnloading = false;
        });
    }
  },
  //生命周期 - 创建完成（可以访问当前this实例）
  created() {},
  //生命周期 - 挂载完成（可以访问DOM元素）
  mounted() {
    this.initTable();
    this.getShowList();
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
.item-title {
  display: inline-block;
  width: 5em;
  padding-right: 12px;
  /* text-align: right; */
  line-height: 40px;
}
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
.text-row {
  margin-bottom: 18px;
}
.detail-name {
  display: inline-block;
  width: 88px;
  text-align: right;
  margin-right: 10px;
  font-weight: bold;
  color: #333;
}
.text-content {
  width: 280px;
  display: inline-block;
  vertical-align: top;
}
.mulit-row {
  line-height: 36px;
  margin-top: -10px;
}
</style>