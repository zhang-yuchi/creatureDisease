<!--  -->
<template>
  <div class="form-box" :v-loading="true">
    <Ititle title="实验室信息" :hasBottom="true"></Ititle>
    <div class="form">
      <el-form
        :model="ruleForm"
        status-icon
        :rules="rules"
        ref="ruleForm"
        label-width="100px"
        class="demo-ruleForm"
        v-loading="formloading"
      >
        <el-form-item label="实验室名称" prop="laboratory">
          <el-input type="text" v-model="ruleForm.laboratory" autocomplete="off"></el-input>
        </el-form-item>
        <el-form-item label="公司名称" prop="company">
          <el-input type="text" v-model="ruleForm.company" autocomplete="off"></el-input>
        </el-form-item>
        <el-form-item label="详细地址" prop="address">
          <el-input v-model="ruleForm.address" placeholder="请输入内容"></el-input>
        </el-form-item>
        <el-form-item label="联系电话" prop="contactNum">
          <el-input v-model="ruleForm.contactNum"></el-input>
        </el-form-item>
        <el-form-item label="实验室简介" class="intro" prop="intro">
          <el-input type="textarea" resize="none" v-model.number="ruleForm.intro"></el-input>
        </el-form-item>
        <el-form-item label="实验室logo" prop="logo">
          <el-upload
            class="logo-upload"
            :action="actionUrl"
            :show-file-list="false"
            :on-success="handleLogoSuccess"
            :before-upload="beforeLogoUpload"
            :headers="{token:token}"
            name="multipartFile"
          >
            <img v-if="logoUrl" :src="logoUrl" class="avatar" />
            <i v-else class="el-icon-plus avatar-uploader-icon"></i>
            <div slot="tip" class="el-upload__tip">建议使用宽200像素*高60像素内的PNG透明图片</div>
          </el-upload>
        </el-form-item>
        <el-form-item label="营业执照">
          <el-upload
            class="logo-upload"
            :action="actionUrl"
            :show-file-list="false"
            :on-success="handleLicenseSuccess"
            :before-upload="beforeLicenseUpload"
            :headers="{token:token}"
            name="multipartFile"
          >
            <img v-if="licenseUrl" :src="licenseUrl" class="avatar" />
            <i v-else class="el-icon-plus avatar-uploader-icon"></i>
          </el-upload>
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
        v-loading="formloading"
      >
        <el-form-item label="收货人" prop="receiver">
          <el-input v-model="ruleForm.receiver" placeholder="请输入收货人姓名"></el-input>
        </el-form-item>
        <el-form-item label="所在地区" prop="district">
          <el-select
            style="width:32%;margin-right:1.8%;"
            v-model="ruleForm.province"
            placeholder="请选择省"
          >
            <el-option v-for="item in lv1" :key="item.code" :label="item.label" :value="item.value"></el-option>
          </el-select>
          <el-select
            style="width:32%;margin-right:1.8%;"
            v-model="ruleForm.city"
            @change="changeCity"
            placeholder="请选择市"
          >
            <el-option v-for="item in lv2" :key="item.code" :label="item.label" :value="item.value"></el-option>
          </el-select>
          <el-select style="width:32%;" v-model="ruleForm.district" placeholder="请选择区">
            <el-option v-for="item in lv3" :key="item.code" :label="item.label" :value="item.value"></el-option>
          </el-select>
        </el-form-item>
        <el-form-item label="详细地址" prop="receiverAddress">
          <el-input v-model="ruleForm.receiverAddress" placeholder="请输入收货详细地址"></el-input>
        </el-form-item>
        <el-form-item label="手机号码" prop="phone">
          <el-input v-model="ruleForm.phone" placeholder="请输入手机号"></el-input>
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
import {
  getLaboratory,
  ImgUploadUrl,
  getImage,
  modifyLaboratory,
  errorHandle,
  getLevel,
  getGecoding
} from "../../network/index";

export default {
  //import引入的组件需要注入到对象中才能使用
  components: {
    Ititle
  },
  data() {
    //这里存放数据
    var validateNull = (rule, value, callback) => {
      if (value === "") {
        callback(new Error("必填项不能为空!"));
      } else {
        callback();
      }
    };
    return {
      ruleForm: {
        laboratory: "",
        company: "",
        location: "",
        address: "",
        contactNum: "",
        intro: "",
        logo: "",
        businessLicense: "",
        receiver: "",
        receiverAddress: "",
        phone: "",
        createTime: 0,
        updateTime: 0,
        userId: "",
        status: "",
        province: "",
        city: "",
        district: "",
        longitudeAndLatitude: ""
      },
      lv1: [],
      lv2: [],
      lv3: [],
      value: "",
      rules: {
        laboratory: [
          { required: true, validator: validateNull, trigger: "blur" }
        ],
        address: [{ required: true, validator: validateNull, trigger: "blur" }],
        receiver: [
          { required: true, validator: validateNull, trigger: "blur" }
        ],
        district: [
          { required: true, validator: validateNull, trigger: "blur" }
        ],
        receiverAddress: [
          { required: true, validator: validateNull, trigger: "blur" }
        ],
        phone: [{ required: true, validator: validateNull, trigger: "blur" }]
      },
      formloading: true,
      token: sessionStorage.getItem("token"),
      actionUrl: ImgUploadUrl,
      logoUrl: "",
      licenseUrl: "",
      P2C: "" //省份到城市
    };
  },
  //监听属性 类似于data概念
  computed: {
    province() {
      return this.ruleForm.province;
    },
    city() {
      return this.ruleForm.city;
    },
    district() {
      return this.ruleForm.district;
    }
  },
  //监控data中的数据变化
  watch: {
    province(newValue) {
      getLevel({ level: 2 }).then(res => {
        // console.log(res);
        if (!this.ruleForm.province) {
          return;
        }
        this.lv1 = [];
        let codeLv1 = "";
        const data = res.data;
        for (let item of data) {
          const obj = {
            label: item.name,
            value: item.name
          };
          if (this.ruleForm.province == item.name) {
            codeLv1 = item.code;
          }
          this.lv1.push(obj);
        }
        getLevel({ level: 3, parentCode: codeLv1 }).then(res => {
          this.lv2 = [];
          let codeLv2 = "";
          const data = res.data;
          this.P2C = data;
          for (let item of data) {
            const obj = {
              label: item.name,
              value: item.name
            };
            this.lv2.push(obj);
          }
          if (!this.ruleForm.city) {
            //如果没有城市
            return;
          }
          for (let item of data) {
            if (this.ruleForm.city == item.name) {
              codeLv2 = item.code;
            }
          }
          if (!codeLv2) {
            if (this.lv2.length != 0) {
              this.ruleForm.city = this.lv2[0].label;
            } else {
              this.ruleForm.city = "";
              this.ruleForm.district = "";
            }
          }
        });
      });
    },
    P2C(newValue) {
      if (newValue.length == 0) {
        this.ruleForm.district = "";
        this.lv3 = [];
        this.ruleForm.city = "";
        return;
      }
      let codeLv2 = "";
      for (let item of newValue) {
        if (this.ruleForm.city == item.name) {
          codeLv2 = item.code;
        }
      }
      getLevel({ level: 4, parentCode: codeLv2 }).then(res => {
        this.lv3 = [];
        let districtData = res.data;
        for (let item of districtData) {
          let obj = {
            label: item.name,
            value: item.name
          };
          this.lv3.push(obj);
        }
        if (this.ruleForm.city) {
          this.ruleForm.district = this.lv3[0].label;
        }
      });
    }
  },
  //方法集合
  methods: {
    changeCity(value) {
      // console.log(this.P2C)
      let codeLv3 = ""
      for(let item of this.P2C){
        if(value==item.name){
          codeLv3 = item.code
        }
      }
      // console.log(codeLv3)
      getLevel({level:4,parentCode:codeLv3})
      .then(res=>{
        // console.log(res)
        const data = res.data
        this.lv3 = []
        for(let item of data){
          let obj = {
            label:item.name,
            value:item.name,
          }
          this.lv3.push(obj)
        }
          this.ruleForm.district = this.lv3[0].label
      })
    },
    submitForm(formName) {
      this.$refs[formName].validate(valid => {
        if (valid) {
          // alert("submit!");
          // console.log(this.ruleForm);
          // console.log(getGecoding);
          getGecoding(
            this.ruleForm.province +
              this.ruleForm.city +
              this.ruleForm.district +
              this.ruleForm.address
          )
            .then(res => {
              // console.log("first")
              // console.log(res);
              if (res.status == 1) {
                const result = res.data.SUCCESS.result.location;
                const address = result.lng + "," + result.lat;
                // console.log(address);
                this.ruleForm.longitudeAndLatitude = address;
                // console.log(this.ruleForm)
              }
            })
            .catch(() => {})
            .then(() => {
              // console.log("second")
              modifyLaboratory(this.ruleForm).then(res => {
                // console.log(res)
                this.$message({
                  type: "success",
                  message: "保存成功!"
                });
                this.initData();
              });
            });
          // modifyLaboratory(this.ruleForm).then(res => {
          //   // console.log(res)
          //   this.$message({
          //     type: "success",
          //     message: "保存成功!"
          //   });
          //   this.initData();
          // });
        } else {
          // console.log("error submit!!");
          this.$message({
            message: "还有信息填写未完毕",
            type: "error"
          });
          return false;
        }
      });
    },
    handleChange() {},
    handleLogoSuccess(res, file) {
      this.$message({
        message: "上传实验室logo成功",
        type: "success"
      });
      this.logoUrl = res.data.url;
      this.ruleForm.logo = res.data.id;
    },
    handleLicenseSuccess(res) {
      this.$message({
        message: "上传执照成功",
        type: "success"
      });
      this.licenseUrl = res.data.url;
      this.ruleForm.businessLicense = res.data.id;
    },
    beforeLogoUpload(file) {
      // console.log(file);
      var formdata = new FormData();
      // console.log(formdata);
      formdata.append("multipartFile", file);
      this.$message({
        message: "上传中,请等侯"
      });
      return formdata;
    },
    beforeLicenseUpload(file) {
      // console.log(file);
      var formdata = new FormData();
      // console.log(formdata);
      formdata.append("multipartFile", file);
      this.$message({
        message: "上传中,请等侯"
      });
      return formdata;
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
    initTextarea() {
      var el = document.querySelector(".el-textarea__inner");
      el.style.height = "120px";
    },
    initData() {
      getLaboratory()
        .then(res => {
          this.ruleForm = res.data;
          this.formloading = false;
        })
        .catch(() => {
          //单独处理错误
          errorHandle();
        })
        .then(() => {
          getImage({ id: this.ruleForm.logo }).then(res => {
            this.logoUrl = res.data.url;
          });
        })
        .then(() => {
          getImage({ id: this.ruleForm.businessLicense }).then(res => {
            this.licenseUrl = res.data.url;
          });
        })
        .catch(() => {
          this.$message({
            message: "获取图片失败,请刷新重试",
            type: "error"
          });
        })
        .finally(() => {
          // console.log("最后了");
          this.formloading = false;
        });
    }
  },
  //生命周期 - 创建完成（可以访问当前this实例）
  created() {},
  //生命周期 - 挂载完成（可以访问DOM元素）
  mounted() {
    this.initUploadStyle();
    this.initTextarea();
    this.initData();
    // this.getGeo();
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
  margin-top: -20px;
}
</style>