<!--  -->
<template>
  <div class="project-setting">
    <div class="addForm">
      <el-button type="primary" class="check-btn" @click="showAddForm">
        <i class="el-icon-plus"></i>
      </el-button>
    </div>
    <withTab :tabArray="settingTabArray" @handleTabChange="tabChange" left="40"></withTab>
    <withTable
      :list="this.list"
      :state="this.state"
      :isloading="this.isloading"
      @requestnewList="sendNewList"
    ></withTable>
    <el-dialog class="form-dialog" title="新增商品" :visible.sync="addVisible">
      <div class="body">
        <div class="row">
          <span class="input-title">商品信息:</span>
          <el-select v-model="addForm.commodityId" :loading="optionsloading" placeholder="请选择">
            <el-option
              v-for="item in options"
              :key="item.value"
              :label="item.label"
              :value="item.value"
            ></el-option>
          </el-select>
        </div>
        <div class="row">
          <span class="input-title">价格:</span>
          <el-input class="form-input" v-model="addForm.price" placeholder="请输入价格"></el-input>
        </div>
        <div class="row">
          <span class="input-title">库存:</span>
          <el-input class="form-input" v-model.number="addForm.inventory" placeholder="请输入库存"></el-input>
        </div>
        <div class="row">
          <span class="input-title">上架状态:</span>
          <el-select v-model="addForm.status" placeholder="请选择">
            <el-option
              v-for="item in stateOptions"
              :key="item.value"
              :label="item.label"
              :value="item.value"
            ></el-option>
          </el-select>
        </div>
        <div class="row">
          <span class="input-title">商品logo:</span>
          <el-upload
            class="avatar-uploader"
            :action="uploadUrl"
            :show-file-list="false"
            :on-success="handleAvatarSuccess"
            :headers="token"
            name="multipartFile"
          >
            <div class="img-box">
              <img v-if="imageUrl" :src="imageUrl" class="avatar" />
              <i v-else class="el-icon-plus avatar-uploader-icon"></i>
            </div>
          </el-upload>
        </div>
      </div>

      <div slot="footer" class="dialog-footer">
        <el-button @click="addVisible = false">取 消</el-button>
        <el-button type="primary" @click="submit">确 定</el-button>
      </div>
    </el-dialog>
  </div>
</template>

<script>
//这里可以导入其他文件（比如：组件，工具js，第三方插件js，json文件，图片文件等等）
//例如：import 《组件名称》 from '《组件路径》';
import withTab from "../../components/order/withTab.vue";
import withTable from "../../components/order/withTable2";
import {
  getOnsaleList,
  getOffsaleList,
  errorHandle,
  getCommodity,
  ImgUploadUrl,
  addCommodity,
} from "../../network";
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
      optionsloading: false,
      state: 0,
      token:{token:sessionStorage.getItem('token')},
      addVisible: false,
      uploadUrl:ImgUploadUrl,
      addForm: {
        commodityId: "",
        price: "",
        inventory: "",
        status: "",
        logo: ""
      },
      options: [],
      stateOptions:[
        {
          value:"1",
          label:"上架",
        },
        {
          value:"0",
          label:"下架",
        }
      ],
      imageUrl: ""
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
    },
    showAddForm() {
      this.addVisible = true;
    },
    getCommdityOptions() {
      this.optionsloading = true;
      getCommodity()
        .then(res => {
          // console.log(res);
          res.data.map(item => {
            var obj = {
              value: item.id,
              label: item.name
            };
            this.options.push(obj);
          });
        })
        .catch(()=>{
          errorHandle()
        })
        .finally(() => {
          this.optionsloading = false;
        });
    },
    handleAvatarSuccess(res) {
      // console.log(res)
      this.imageUrl = res.data.url  
      this.addForm.logo = res.data.id
      this.$message({
        message:"上传成功!",
        type:"success"
      })
    },
    initStyle() {
      this.$nextTick(() => {
        document.querySelectorAll(".el-dialog")[2].style.marginTop = "20px";
      });
    },
    submit(){
      if(!this.addForm.commodityId||!this.addForm.price||!this.addForm.inventory||!this.addForm.status||!this.addForm.logo){
        this.$message({
          message:"您还有信息未填写!请检查!",
          type:"error"
        })
        return
      }
      this.addForm.price = parseFloat(this.addForm.price).toFixed(2)
      // console.log(this.addForm)
      addCommodity(this.addForm)
      .then(res=>{
        // console.log(res)
        if(res.status==1){
          this.$message({
            message:"添加成功!",
            type:"success"
          })
          this.addVisible = false
          this.addForm.commodity = "",
          this.addForm.price = ""
          this.addForm.inventory = ""
          this.addForm.status = ""
          this.addForm.logo = ""
          this.imageUrl = ""
          this.sendNewList()
        }else{
          this.$message({
            message:res.message,
            type:"error"
          })
        }
      })
      .catch(()=>{
        errorHandle()
      })
    }
  },
  //生命周期 - 创建完成（可以访问当前this实例）
  created() {},
  //生命周期 - 挂载完成（可以访问DOM元素）
  mounted() {
    this.getNewList();
    this.getCommdityOptions();
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
.project-setting {
  position: relative;
}
.addForm {
  position: absolute;
  z-index: 20;
  left: 20px;
  top: 8px;
}
.check-btn {
  width: 50px;
  height: 25px;
  padding: 0;
}
.row {
  margin-bottom: 16px;
  position: relative;
}
.input-title {
  display: inline-block;
  width: 63px;
  margin-right: 10px;
  text-align: right;
}
.form-input {
  display: inline-block;
  width: 435px;
}
.avatar-uploader .el-upload {
  border: 1px dashed #d9d9d9;
  border-radius: 6px;
  cursor: pointer;
  position: relative;
  overflow: hidden;
}
.avatar-uploader {
  display: inline-block;
  vertical-align: top;
}
.avatar-uploader .el-upload:hover {
  border-color: #409eff;
}
.avatar-uploader-icon {
  font-size: 28px;
  color: #8c939d;
  width: 178px;
  height: 178px;
  line-height: 178px;
  text-align: center;
}
.avatar {
  width: 178px;
  height: 178px;
  display: block;
}
.img-box {
  transition: 0.3s;
  border: 1px dashed #8c939d;
  border-radius: 10px;
}
.img-box:hover {
  border-color: #409eff;
}
</style>