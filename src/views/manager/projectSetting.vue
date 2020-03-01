<!--  -->
<template>
  <div class="project-setting">
    <div class="addForm">
      <el-button type="primary"><i class="el-icon-plus"></i></el-button>
    </div>
    <withTab :tabArray="settingTabArray" @handleTabChange="tabChange" left="40"></withTab>
    <withTable
      :list="this.list"
      :state="this.state"
      :isloading="this.isloading"
      @requestnewList="sendNewList"
    ></withTable>
    <el-dialog class="form-dialog" title="修改用户名" :visible.sync="nameVisible">
          <div class="body">
            <span class="input-title">用户名:</span>
            <el-input class="form-input" v-model="nameForm.name" placeholder="请输入用户名"></el-input>
          </div>
          <div slot="footer" class="dialog-footer">
            <el-button @click="nameVisible = false">取 消</el-button>
            <el-button type="primary" @click="nameVisible = true">确 定</el-button>
          </div>
        </el-dialog>
  </div>
</template>

<script>
//这里可以导入其他文件（比如：组件，工具js，第三方插件js，json文件，图片文件等等）
//例如：import 《组件名称》 from '《组件路径》';
import withTab from "../../components/order/withTab.vue";
import withTable from "../../components/order/withTable2";
import { getOnsaleList, getOffsaleList, errorHandle } from "../../network";
import moment from "moment";
export default {
  //import引入的组件需要注入到对象中才能使用
  components: {
    withTab,
    withTable
  },
  data() {
    //这里存放数据
    return {
      settingTabArray: ["已上架", "未上架"],
      list: [],
      isloading: false,
      state: 0,
      nameVisible:false,
      nameForm:{
        name:""
      }
    };
  },
  //监听属性 类似于data概念
  computed: {},
  //监控data中的数据变化
  watch: {},
  //方法集合
  methods: {
    tabChange(obj) {
      // console.log(obj)
      if (obj == "1") {
        this.isTable = true;
        this.getSecondList();
      } else {
        this.isTable = true;
        this.getNewList();
      }
    },
    createList(item, index) {
      var listItem = {};
      listItem.index = index + 1;
      listItem.id = item.repertory.id;
      listItem.name = item.commodity.name;
      listItem.diseaseName = item.diseaseType.name;
      listItem.price = item.repertory.price.toFixed(2);
      listItem.inventory = item.repertory.inventory;
      listItem.updateTime = moment(item.commodity.updateTime).format(
        "YYYY-MM-DD"
      );
      let time = moment(item.repertory.createTime).format("YYYY-MM-DD");
      listItem.createTime = time;
      return listItem;
    },
    getNewList() {
      this.isloading = true;
      this.state = 0;
      getOnsaleList()
        .then(res => {
          // console.log(res)
          //处理列表并传给子组件
          let temp = res.data;
          var list = [];
          if (temp.length > 0) {
            list = temp.map((item, index) => {
              return this.createList(item, index);
            });
          }
          // console.log(list)
          this.list = list;
        })
        .catch(err => {
          errorHandle();
        })
        .finally(() => {
          this.isloading = false;
        });
    },
    getSecondList() {
      this.isloading = true;
      this.state = 1;
      getOffsaleList()
        .then(res => {
          //处理列表并传给子组件
          let temp = res.data;
          var list = [];
          if (temp.length > 0) {
            list = temp.map((item, index) => {
              return this.createList(item, index);
            });
          }
          // console.log(list)
          this.list = list;
        })
        .catch(err => {
          errorHandle();
        })
        .finally(() => {
          this.isloading = false;
        });
    },
    sendNewList() {
      if (this.state === 0) {
        //处于已上架状态
        this.getNewList();
      } else {
        // console.log(2)
        this.getSecondList();
      }
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
<style scoped>
.project-setting {
  position: relative;
}
.addForm {
  position: absolute;
  z-index: 20;
  left: 20px;
  top: 10px;
}
.el-button{
  width: 50px;
  height: 30px;
  padding: 0;
}
.row {
  margin-bottom: 16px;
  position: relative;
}
.input-title {
  display: inline-block;
  width: 60px;
}
.form-input {
  display: inline-block;
  width: 435px;
}
</style>