<!--  -->
<template>
  <div class="form-box">
    <Ititle title="实验室信息" :hasBottom="true"></Ititle>
    <div class="form">
      <el-form
        :model="ruleForm"
        status-icon
        :rules="rules"
        ref="ruleForm"
        label-width="100px"
        class="demo-ruleForm"
      >
        <el-form-item label="实验室名称" prop="pass" :required="true">
          <el-input type="password" v-model="ruleForm.pass" autocomplete="off"></el-input>
        </el-form-item>
        <el-form-item label="公司名称" prop="checkPass">
          <el-input type="password" v-model="ruleForm.checkPass" autocomplete="off"></el-input>
        </el-form-item>
        <el-form-item label="所在地区" required>
          <el-cascader
            style="margin-right:38px;width:250px"
            v-model="value"
            placeholder="请选择城市"
            :options="options"
            @change="handleChange"
          ></el-cascader>
          <el-cascader
            style="width:250px"
            v-model="value"
            placeholder="请选择区"
            :options="options"
            @change="handleChange"
          ></el-cascader>
        </el-form-item>
        <el-form-item label="详细地址" required>
          <el-input v-model="input" placeholder="请输入内容"></el-input>
        </el-form-item>
        <el-form-item label="联系电话" prop="age">
          <el-input v-model.number="ruleForm.age"></el-input>
        </el-form-item>
        <el-form-item label="实验室简介" class="intro" prop="age">
          <el-input type="textarea" resize="none" v-model.number="ruleForm.age"></el-input>
        </el-form-item>
        <el-form-item label="实验室logo" prop="age">
          <el-upload
            class="logo-upload"
            action="https://jsonplaceholder.typicode.com/posts/"
            :show-file-list="false"
            :on-success="handleAvatarSuccess"
            :before-upload="beforeAvatarUpload"
          >
            <img v-if="imageUrl" :src="imageUrl" class="avatar" />
            <i v-else class="el-icon-plus avatar-uploader-icon"></i>
            <div slot="tip" class="el-upload__tip">建议使用宽200像素*高60像素内的PNG透明图片</div>
          </el-upload>
          <el-dialog :visible.sync="dialogVisible">
            <img width="100%" :src="dialogImageUrl" alt />
          </el-dialog>
        </el-form-item>
        <el-form-item label="营业执照" prop="age">
          <el-upload
            class="logo-upload"
            action="https://jsonplaceholder.typicode.com/posts/"
            :show-file-list="false"
            :on-success="handleAvatarSuccess"
            :before-upload="beforeAvatarUpload"
          >
            <img v-if="imageUrl" :src="imageUrl" class="avatar" />
            <i v-else class="el-icon-plus avatar-uploader-icon"></i>
          </el-upload>
          <el-dialog :visible.sync="dialogVisible">
            <img width="100%" :src="dialogImageUrl" alt />
          </el-dialog>
        </el-form-item>
      </el-form>
    </div>
    <Ititle title="样品邮寄信息" :hasBottom="true"></Ititle>
    <div class="form">
      <el-form
        :model="ruleForm"
        status-icon
        :rules="rules"
        ref="ruleForm"
        label-width="100px"
        class="demo-ruleForm"
      >
        <el-form-item label="收货人" required>
          <el-input v-model="input" placeholder="请输入收货人姓名"></el-input>
        </el-form-item>
        <el-form-item label="所在地区" required>
          <el-cascader v-model="value" style="margin-right:10px;width:173px" :options="options" @change="handleChange"></el-cascader>
          <el-cascader v-model="value" style="margin-right:10px;width:172px" :options="options" @change="handleChange"></el-cascader>
          <el-cascader v-model="value" style="width:172px" :options="options" @change="handleChange"></el-cascader>
        </el-form-item>
        <el-form-item label="详细地址" required>
          <el-input v-model="input" placeholder="请输入收货详细地址"></el-input>
        </el-form-item>
        <el-form-item label="手机号码" required>
          <el-input v-model="input" placeholder="请输入手机号"></el-input>
        </el-form-item>

        <el-form-item>
          <el-button type="primary" @click="submitForm('ruleForm')">保存信息</el-button>
        </el-form-item>
      </el-form>
    </div>
  </div>
</template>

<script>
//这里可以导入其他文件（比如：组件，工具js，第三方插件js，json文件，图片文件等等）
//例如：import 《组件名称》 from '《组件路径》';
import Ititle from "../title/index";
export default {
  //import引入的组件需要注入到对象中才能使用
  components: {
    Ititle
  },
  data() {
    //这里存放数据
    var checkAge = (rule, value, callback) => {
      if (!value) {
        return callback(new Error("年龄不能为空"));
      }
      setTimeout(() => {
        if (!Number.isInteger(value)) {
          callback(new Error("请输入数字值"));
        } else {
          if (value < 18) {
            callback(new Error("必须年满18岁"));
          } else {
            callback();
          }
        }
      }, 1000);
    };
    var validatePass = (rule, value, callback) => {
      if (value === "") {
        callback(new Error("请输入密码"));
      } else {
        if (this.ruleForm.checkPass !== "") {
          this.$refs.ruleForm.validateField("checkPass");
        }
        callback();
      }
    };
    var validatePass2 = (rule, value, callback) => {
      if (value === "") {
        callback(new Error("请再次输入密码"));
      } else if (value !== this.ruleForm.pass) {
        callback(new Error("两次输入密码不一致!"));
      } else {
        callback();
      }
    };
    return {
      ruleForm: {
        pass: "",
        checkPass: "",
        age: "",
        imageUrl: ""
      },
      rules: {
        pass: [{ validator: validatePass, trigger: "blur" }],
        checkPass: [{ validator: validatePass2, trigger: "blur" }],
        age: [{ validator: checkAge, trigger: "blur" }]
      }
    };
  },
  //监听属性 类似于data概念
  computed: {},
  //监控data中的数据变化
  watch: {},
  //方法集合
  methods: {
    submitForm(formName) {
      this.$refs[formName].validate(valid => {
        if (valid) {
          alert("submit!");
        } else {
          console.log("error submit!!");
          return false;
        }
      });
    },
    handleAvatarSuccess(res, file) {
      this.imageUrl = URL.createObjectURL(file.raw);
    },
    beforeAvatarUpload(file) {
      const isJPG = file.type === "image/jpeg";
      const isLt2M = file.size / 1024 / 1024 < 2;

      if (!isJPG) {
        this.$message.error("上传头像图片只能是 JPG 格式!");
      }
      if (!isLt2M) {
        this.$message.error("上传头像图片大小不能超过 2MB!");
      }
      return isJPG && isLt2M;
    },
    initUploadStyle() {
      this.$nextTick(() => {
        var uploadList = document.querySelectorAll(".el-upload");
        for (let i = 0; i < uploadList.length; i++) {
          var upload = uploadList[i];
          upload.style.borderRadius = "6px";
          upload.style.transition = "all 0.3s";
          uploadInit(upload);
          upload.onmouseenter = function() {
            uploadActive(this);
          };
          upload.onmouseleave = function() {
            uploadInit(this);
          };
        }
      });
      function uploadActive(upload) {
        upload.style.border = "1px dashed #0584D7";
      }
      function uploadInit(upload) {
        upload.style.border = "1px dashed #d9d9d9";
      }
    },
    initTextarea(){
        var el = document.querySelector('.el-textarea__inner')
        el.style.height = "120px"
    }
  },
  //生命周期 - 创建完成（可以访问当前this实例）
  created() {},
  //生命周期 - 挂载完成（可以访问DOM元素）
  mounted() {
    this.initUploadStyle();
    this.initTextarea()
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
.form {
  width: 50%;
  margin: 30px auto;
}
.avatar-uploader .logo-upload {
  border: 1px dashed #d9d9d9 !important;
  border-radius: 6px;
  cursor: pointer;
  position: relative;
  overflow: hidden;
}
.avatar-uploader .logo-upload:hover {
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
.el-upload__tip {
  color: rgba(0, 0, 0, 0.45);
}
</style>