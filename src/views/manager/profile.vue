<!--  -->
<template>
  <div class="profile">
    <div class="window">
      <el-card class="box-card" v-loading="isloading">
        <div class="text item">
          <span class="item-text">手机号</span>
          <span class="item-text">{{phone}}</span>
          <el-link type="primary" @click="phoneVisible = true" style="color:#0584D7;">修改</el-link>
        </div>
        <el-dialog class="form-dialog" title="修改手机号码" :visible.sync="phoneVisible">
          <el-form class="form" :model="phoneForm">
            <el-form-item label="新手机号" :label-width="formLabelWidth">
              <el-input v-model="phoneForm.num" placeholder="请输入新手机号" autocomplete="off"></el-input>
            </el-form-item>
            <el-form-item label="验证码" :label-width="formLabelWidth">
              <el-input v-model="phoneForm.check" autocomplete="off"></el-input>
            </el-form-item>
          </el-form>
          <div slot="footer" class="dialog-footer">
            <el-button @click="phoneVisible = false">取 消</el-button>
            <el-button type="primary" @click="changePhone">确 定</el-button>
          </div>
        </el-dialog>
        <div class="text item">
          <span class="item-text">用户名</span>
          <span class="item-text">{{userName}}</span>
          <el-link type="primary" style="color:#0584D7;" @click="nameVisible = true">修改</el-link>
        </div>
        <el-dialog class="form-dialog" title="修改用户名" :visible.sync="nameVisible">
          <el-form class="form" :model="nameForm">
            <el-form-item label="用户名" :label-width="formLabelWidth">
              <el-input v-model="nameForm.name" placeholder="请输入用户名" autocomplete="off"></el-input>
            </el-form-item>
          </el-form>
          <div slot="footer" class="dialog-footer">
            <el-button @click="nameVisible = false">取 消</el-button>
            <el-button type="primary" @click="nameVisible = false">确 定</el-button>
          </div>
        </el-dialog>
        <div class="text item">
          <span class="item-text">密码</span>
          <span class="item-text">******</span>
          <el-link type="primary" style="color:#0584D7;" @click="pswVisible = true">修改</el-link>
        </div>
        <el-dialog class="form-dialog"  title="修改密码" :visible.sync="pswVisible">
          <el-form class="form" :model="pswForm" :rules="rules" ref="pswForm">
            <el-form-item label="获取验证码" :label-width="formLabelWidth">
              <el-input v-model="checkNum" placeholder="请输入图中验证码" autocomplete="off"></el-input>
              <img :src="checkUrl" class="checkImg" @click="changeImg" alt />
            </el-form-item>
            <el-form-item label="手机号" :label-width="formLabelWidth">
              <el-input v-model="checkPhone" placeholder="请输入手机号" autocomplete="off"></el-input>
              <el-button style="margin-top:10px;" @click="getVerifyCode">获取验证码</el-button>
            </el-form-item>
            <el-form-item label="验证码" :label-width="formLabelWidth">
              <el-input v-model="pswForm.check" placeholder="请输入验证码" autocomplete="off"></el-input>
            </el-form-item>
            <el-form-item label="新密码" :label-width="formLabelWidth" prop="psw">
              <el-input v-model="pswForm.psw" type="password" placeholder="请输入新密码" autocomplete="off"></el-input>
            </el-form-item>
            <el-form-item label="重复密码" :label-width="formLabelWidth" prop="checkpsw">
              <el-input v-model="pswForm.checkpsw" type="password" placeholder="请再次输入新密码" autocomplete="off"></el-input>
            </el-form-item>
          </el-form>
          <div slot="footer" class="dialog-footer">
            <el-button @click="pswVisible = false">取 消</el-button>
            <el-button type="primary" @click="pswVisible = false">确 定</el-button>
          </div>
        </el-dialog>
        <div class="text item">
          <span class="item-text">注册日期</span>
          <span class="item-text">{{createTime}}</span>
        </div>
      </el-card>
    </div>
  </div>
</template>

<script>
//这里可以导入其他文件（比如：组件，工具js，第三方插件js，json文件，图片文件等等）
//例如：import 《组件名称》 from '《组件路径》';
import {
  getUserInfo,
  errorHandle,
  modifyPassword,
  modifyPhone,
  modifyUsername,
  getCheck,
  getPhoneCode
} from "../../network";
import moment from "moment";
import Myinput from "../../components/input/input";
export default {
  //import引入的组件需要注入到对象中才能使用
  components: {
    Myinput
  },
  data() {
    //这里存放数据
    var validatePass = (rule, value, callback) => {
      if (value === "") {
        callback(new Error("请输入密码"));
      } else {
        if (this.pswForm.newNum !== "") {
          this.$refs.pswForm.validateField("checkPass");
        }
        callback();
      }
    };
    var validatePass2 = (rule, value, callback) => {
      if (value === "") {
        callback(new Error("请再次输入密码"));
      } else if (value !== this.pswForm.psw) {
        callback(new Error("两次输入密码不一致!"));
      } else {
        callback();
      }
    };
    return {
      phoneVisible: false,
      phoneForm: {
        num: "",
        check: ""
      },
      nameVisible: false,
      nameForm: {
        name: ""
      },
      pswVisible: false,
      pswForm: {
        psw: "",
        checkpsw: "",
        check: ""
      },
      userName: "",
      phone: "",
      createTime: "",
      formLabelWidth: "120px",
      isloading: false,
      checkUrl: "",
      checkPhone: "",
      checkNum: "",
      rules: {
          psw: [
            { validator: validatePass, trigger: 'blur' }
          ],
          checkpsw: [
            { validator: validatePass2, trigger: 'blur' }
          ],
        }
    };
  },
  //监听属性 类似于data概念
  computed: {},
  //监控data中的数据变化
  watch: {},
  //方法集合
  methods: {
    changePhone() {
      console.log(this.phoneForm.num);
    },
    changePsw() {},
    getVerifyCode() {
      var obj = {
        phone: this.checkPhone,
        verifyCode: this.checkNum
      };
      if (!this.checkPhone || !this.checkNum) {
        this.$message({
          message: "请填写验证码和手机号获取校验码!",
          type: "error"
        });
        this.getCheckImg();
        return;
      }
      getPhoneCode(obj)
        .then(res => {
          if (res.data.CODE) {
            this.$message({
              message: `您的验证码为 ${res.data.CODE}`,
              type: "success"
            });
          } else {
            this.$message({
              message: res.data.ERROR,
              type: "error"
            });
          }
        })
        .catch(() => {
          this.$message({
            message: "服务器繁忙!请重试",
            type: "error"
          });
        })
        .finally(()=>{
          this.getCheckImg();
        })
    },
    changeImg() {
      this.getCheckImg();
    },
    getCheckImg() {
      getCheck().then(data => {
        let blob = data.data;
        let src = window.URL.createObjectURL(blob);
        this.checkUrl = src;
      });
    },
    getUser() {
      this.isloading = true;
      getUserInfo()
        .then(res => {
          (this.userName = res.data.userName),
            (this.phone = res.data.phone),
            (this.createTime = moment(res.data.createTime).format(
              "YYYY/MM/DD"
            ));
          this.$store.commit({
            type: "changeUsername",
            name: this.userName
          });
        })
        .catch(() => {
          errorHandle();
        })
        .finally(() => {
          this.isloading = false;
        });
    }
  },
  //生命周期 - 创建完成（可以访问当前this实例）
  created() {},
  //生命周期 - 挂载完成（可以访问DOM元素）
  mounted() {
    this.getUser();
    this.getCheckImg();
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
.text {
  font-size: 14px;
}

.item {
  padding: 18px 0;
}

.box-card {
  width: 700px;
  margin: 70px auto 0;
  border: none;
  box-shadow: none;
}
.item-text {
  width: 100px;
  display: inline-block;
  margin-right: 200px;
  color: #666666;
}
.form {
  width: 70%;
  /* display: inline-block; */
  margin: 0 auto;
}
.checkImg {
  position: absolute;
  right: 0px;
  cursor: pointer;
}
</style>