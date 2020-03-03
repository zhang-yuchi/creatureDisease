<!-- 检测报告 -->
<template>
  <div class>
    <Ititle title="检测报告"></Ititle>
    <wrap>
      <div class="upload-window" v-if="state==4">
        <el-upload
          class="upload-demo"
          :action="uploadUrl"
          :file-list="fileList"
          :on-preview="handlePreview"
          :on-success="handleSuccess"
          name="multipartFile"
          :headers="{token:token}"
          :on-remove="removeFile"
          :before-upload="rejectFile"
        >
          <el-button size="small" type="primary">点击上传</el-button>
          <div slot="tip" class="el-upload__tip">请上传检测报告</div>
        </el-upload>
      </div>
      <div class="file-list" v-else>
        <ul class="list">
          <li
            class="list-item"
            @click="checkPdf"
            :data-index="index"
            v-for="(item,index) in fileList"
            :key="index"
          >
            <i class="el-icon-tickets"></i>
            <span class="item-name">{{item.name}}</span>
          </li>
        </ul>
      </div>
    </wrap>
  </div>
</template>

<script>
//这里可以导入其他文件（比如：组件，工具js，第三方插件js，json文件，图片文件等等）
//例如：import 《组件名称》 from '《组件路径》';
import Ititle from "../../components/title/index";
import wrap from "./wrap";
import { PdfUploadUrl, savePdf, delPdf } from "../../network";
export default {
  //import引入的组件需要注入到对象中才能使用
  components: {
    Ititle,
    wrap
  },
  props: {
    state: String,
    report: {
      type: Array
      // default:[]
    },
    orderId: Number
  },
  data() {
    //这里存放数据
    return {
      fileList: [],
      uploadUrl: PdfUploadUrl,
      token: sessionStorage.getItem("token")
    };
  },
  //监听属性 类似于data概念
  computed: {},
  //监控data中的数据变化
  watch: {
    state(newValue) {
      this.state = newValue;
    }
  },
  //方法集合
  methods: {
    handlePreview(file) {
      // console.log(file);
      window.open(file.url);
    },
    handleSuccess(res, file, fileList) {
      // console.log(res);
      // console.log(fileList)
      if (res.status == 1) {
        //成功时
        const url = res.data.url;
        const type = "0";
        const orderId = this.orderId;
        // console.log(file)
        const name = file.name;
        const params = {
          url,
          type,
          orderId,
          name
        };
        fileList[fileList.length - 1].url = url; //需要通过url来删除
        // console.log(this.orderId);

        savePdf(params)
          .then(res => {
            // console.log(res);
            this.$message({
              message: "保存成功",
              type: "success"
            });
          })
          .catch(() => {
            this.$message({
              message: "保存失败!请重试",
              type: "error"
            });
          });
      } else {
        this.$message({
          message: res.message,
          type: "error"
        });
      }
      // console.log(fileList);
    },
    removeFile(file) {
      // console.log(file);
      const params = {
        url: file.url
      };
      delPdf(params).then(res => {
        // console.log(res);
      });
    },
    rejectFile(file) {
      var reg = /.pdf$/;

    },
    checkPdf(e) {
      window.open(this.fileList[parseInt(e.currentTarget.dataset.index)].url);
    }
  },
  //生命周期 - 创建完成（可以访问当前this实例）
  created() {},
  //生命周期 - 挂载完成（可以访问DOM元素）
  mounted() {
    if (this.report) {
      this.report.map((item, index) => {
        var file = {
          name: "检测报告" + (index + 1),
          url: item
        };
        this.fileList.push(file);
      });
    } else {
      this.fileList = [];
    }
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
.upload-window {
  width: 30%;
}
.el-upload__tip {
  color: #666;
  font-size: 14px;
}
li {
  cursor: pointer;
  list-style: none;
}
.list-item {
  padding: 5px 0;
  transition: 0.3s;
}
.list-item:hover {
  background-color: #cce4ff;
}
.item-name {
  display: inline-block;
  margin-left: 5px;
}
ul {
  width: 30%;
  padding: 0;
}
</style>