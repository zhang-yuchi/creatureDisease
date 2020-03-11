<!--  -->
<template>
  <div class="profile">
    <div class="window">
      <el-card class="box-card" v-loading="isloading">
        <!-- 手机 -->
        <div class="text item">
          <span class="item-text">手机号码</span>
          <span class="item-text">{{serectPhone}}</span>
          <el-link type="primary" @click="phoneVisible = true" style="color:#0584D7;">修改</el-link>
        </div>

        <!-- 手机对话框--验证码 -->
        <el-dialog class="form-dialog" title="修改手机号码" :visible.sync="phoneVisible">
          <div class="body">
            <div class="phone-tips">发送验证码到手机{{serectPhone}}</div>
            <div class="row">
              <span class="input-title">验证码:</span>
              <el-input class="form-input" v-model="phoneForm.check" placeholder="请输入验证码"></el-input>
              <verifycode @sendverify="sendToMdfPhone" :givecheckmsg="checkPhoneRight"></verifycode>
            </div>
          </div>
          <div slot="footer" class="dialog-footer">
            <el-button @click="phoneVisible = false">取 消</el-button>
            <el-button type="primary" @click="changePhone">确 定</el-button>
          </div>
        </el-dialog>

        <!-- 手机对话框--修改手机号 -->
        <el-dialog class="form-dialog" title="修改手机号码" :visible.sync="phoneBoxVisible">
          <div class="body">
            
            <div class="row">
              <span class="input-title" style="text-align:right;">新手机号:</span>
              <el-input
                style="margin-left:10px;"
                class="form-input"
                v-model="phoneBox.newphone"
                placeholder="请输入新手机号"
              ></el-input>
            </div>
            <div class="row">
              <span class="input-title">验证码:</span>
              <el-input
                class="form-input"
                style="margin-left:10px;"
                v-model="phoneBox.check"
                placeholder="请输入验证码"
              ></el-input>
              <verifycode @sendverify="sendTONewPhone" :givecheckmsg="changePhoneRight"></verifycode>
            </div>
          </div>
          <div slot="footer" class="dialog-footer">
            <el-button @click="phoneBoxVisible = false">取 消</el-button>
            <el-button type="primary" @click="submitPhone">确 定</el-button>
          </div>
        </el-dialog>
        <!-- 用户名 -->
        <div class="text item">
          <span class="item-text">用户名</span>
          <span class="item-text">{{nickName}}</span>
          <el-link type="primary" style="color:#0584D7;" @click="nameVisible = true">修改</el-link>
        </div>

        <!-- 修改用户名弹窗 -->
        <el-dialog class="form-dialog" title="修改用户名" :visible.sync="nameVisible">
          <div class="body">
            <span class="input-title">用户名:</span>
            <el-input class="form-input" v-model="nameForm.name" placeholder="请输入用户名"></el-input>
          </div>
          <div slot="footer" class="dialog-footer">
            <el-button @click="nameVisible = false">取 消</el-button>
            <el-button type="primary" @click="userchange">确 定</el-button>
          </div>
        </el-dialog>
        <!-- 密码 -->
        <div class="text item">
          <span class="item-text">密码</span>
          <span class="item-text">******</span>
          <el-link type="primary" style="color:#0584D7;" @click="pswBoxVisible = true">修改</el-link>
        </div>
        <!-- 修改密码--获取验证码 -->
        <el-dialog class="form-dialog" title="修改密码" :visible.sync="pswBoxVisible">
          <div class="body">
            <div class="phone-tips">发送验证码到手机{{serectPhone}}</div>
            <div class="row">
              <span class="input-title">验证码:</span>
              <el-input
                class="form-input"
                style="margin-left:10px;"
                v-model="pswBox.check"
                placeholder="请输入验证码"
              ></el-input>
              <verifycode @sendverify="sendToMdfPsw" :givecheckmsg="checkPswRight"></verifycode>
            </div>
          </div>
          <div slot="footer" class="dialog-footer">
            <el-button @click="pswBoxVisible = false">取 消</el-button>
            <el-button type="primary" @click="pswNextStep">确 定</el-button>
          </div>
        </el-dialog>
        <!-- 修改密码弹窗 -->
        <el-dialog class="form-dialog" title="修改密码" :visible.sync="pswVisible">
          <div class="body">
            
            <div class="row">
              <span class="input-title" style="text-align:right;">新密码:</span>
              <el-input
                style="margin-left:10px;"
                class="form-input"
                v-model="pswForm.psw"
                placeholder="请输入新密码"
                type="password"
              ></el-input>
            </div>
            <div class="row">
              <span class="input-title">重复密码:</span>
              <el-input
                class="form-input"
                style="margin-left:10px;"
                v-model="pswForm.checkpsw"
                placeholder="请再次输入新密码"
                type="password"
              ></el-input>
            </div>
          </div>
          <div slot="footer" class="dialog-footer">
            <el-button @click="pswVisible = false">取 消</el-button>
            <el-button type="primary" @click="submitPsw">确 定</el-button>
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
  getPhoneCode,
  checkToken,
  modifyNickName,
  vaildCode,
  getNewPhoneCode
} from "../../network";
import moment from "moment";
import Myinput from "../../components/input/input";
import { initDg } from "../../assets/utils";
import verifycode from "../../components/verifycode";
export default {
  //import引入的组件需要注入到对象中才能使用
  components: {
    Myinput,
    verifycode
  },
  data() {
    //这里存放数据
    return {
      //手机验证码
      checkPhoneRight: false,
      checkPswRight: false,
      changePhoneRight: false,
      phoneVisible: false,
      phoneForm: {
        check: ""
      },
      phoneBoxVisible: false,
      phoneBox: {
        newphone: "",
        check: ""
      },
      nameVisible: false,
      nameForm: {
        name: ""
      },
      pswVisible: false,
      pswForm: {
        psw: "",
        checkpsw: ""
        // check: ""
      },
      pswBoxVisible: false,
      pswBox: {
        check: ""
      },
      userName: "",
      nickName: "",
      phone: "",
      createTime: "",
      formLabelWidth: "120px",
      isloading: false
    };
  },
  //监听属性 类似于data概念
  computed: {
    serectPhone(){
      return this.phone.slice(0,3) + "****" + this.phone.slice(7)
    }
  },
  //监控data中的数据变化
  watch: {},
  //方法集合
  methods: {
    sendTONewPhone() {
      getNewPhoneCode({ phone: this.phoneBox.newphone })
        .then(res => {
          console.log("您的模拟验证码为" + res.data.CODE);
          this.changePhoneRight = true;
        })
        .finally(() => {
          this.changePhoneRight = false;
        });
    },
    sendToMdfPhone() {
      // console.log(123);
      getPhoneCode({ phone: this.phone })
        .then(res => {
          this.checkPhoneRight = true;
          console.log("模拟验证码为:" + res.data.CODE);
        })
        .finally(() => {
          this.checkPhoneRight = false;
        });
    },
    sendToMdfPsw() {
      getPhoneCode({ phone: this.phone })
        .then(res => {
          // console.log(res);
          if (res.data.SUCCESS) {
            this.checkPswRight = true;
            console.log("模拟验证码为:" + res.data.CODE);
          }
        })
        .finally(() => {
          this.checkPswRight = false;
        });
    },
    changePhone() {
      if (this.phoneForm.check.length !== 4) {
        this.$message({
          message: "请输入有效的验证码!",
          type: "error"
        });
        return;
      }
      vaildCode({ phoneCode: this.phoneForm.check }).then(res => {
        // console.log(res);
        if (res.status === 1) {
          this.phoneVisible = false;
          this.phoneBoxVisible = true;
          this.phoneForm.check = "";
        } else {
          this.$message({
            message: "验证码有误",
            type: "error"
          });
        }
      });
    },
    pswNextStep() {
      //校验
      if (this.pswBox.check.length !== 4) {
        this.$message({
          message: "请输入正确验证码!",
          type: "error"
        });
        return;
      }
      vaildCode({ phoneCode: this.pswBox.check }).then(res => {
        // console.log(res);
        if (res.status == 1) {
          this.pswBoxVisible = false;
          this.pswVisible = true;
          this.pswBox.check = "";
        }
      });
    },
    submitPsw() {
      if (!this.pswForm.psw) {
        this.$message({
          message: "请输入密码!",
          type: "error"
        });
        return;
      }
      if (this.pswForm.psw.length > 16 || this.pswForm.psw.length < 6) {
        this.$message({
          message: "密码长度在6-16位之间!",
          type: "error"
        });
        return;
      }
      if (this.pswForm.psw !== this.pswForm.checkpsw) {
        this.$message({
          message: "两次密码不一致!",
          type: "error"
        });
        return;
      }
      modifyPassword({ newPassword: this.pswForm.psw }).then(res => {
        // console.log(res)
        if (res.status == 1) {
          this.$message({
            message: "修改成功!",
            type: "success"
          });
          this.pswVisible = false;
          this.pswForm.psw = "";
          this.pswForm.checkpsw = "";
        }
      });
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
          // console.log(res.data)
          if (res.status == 1) {
            (this.userName = res.data.userName),
              (this.phone = res.data.phone),
              (this.nickName = res.data.nickName),
              (this.createTime = moment(res.data.createTime).format(
                "YYYY/MM/DD"
              ));
            this.$store.commit({
              type: "changeUsername",
              name: this.nickName
            });
            sessionStorage.setItem("username", this.nickName);
          } else {
            errorHandle();
          }
        })
        .catch(() => {
          errorHandle();
        })
        .finally(() => {
          this.isloading = false;
        });
    },
    submitPhone() {
      //校验
      if (this.phoneBox.check.length !== 4) {
        this.$message({
          message: "请输入有效验证码!",
          type: "error"
        });
        return;
      }
      if (!/^1[3456789]\d{9}$/.test(this.phoneBox.newphone)) {
        this.$message({
          message: "请输入有效手机号!",
          type: "error"
        });
        return;
      }
      // console.log("成功!可以发送请求了!");
      modifyPhone({
        phone: this.phoneBox.newphone,
        phoneCode: this.phoneBox.check
      }).then(res => {
        // console.log(res);
        if (res.status == 1) {
          this.$message({
            message: "修改成功!",
            type: "success"
          });
          this.phoneBoxVisible = false;
          this.phoneBox.newphone = "";
          this.phoneBox.check = "";
          this.getUser();
        }
      });
    },
    userchange() {
      if (this.nameForm.name === "") {
        this.$message({
          message: "用户名不能为空!",
          type: "error"
        });
        return;
      }
      // console.log("可以修改用户名了!");
      //调用
      const params = { nickName: this.nameForm.name };
      modifyNickName(params).then(res => {
        this.nickName = res.status == 1 ? params.nickName : this.nickName;
      });
      this.nameVisible = false;
      this.nameForm.name = "";
    }
  },
  //生命周期 - 创建完成（可以访问当前this实例）
  created() {},
  //生命周期 - 挂载完成（可以访问DOM元素）
  mounted() {
    this.getUser();
    this.getCheckImg();
    initDg();
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
.phone-tips{
  margin:0px 0px 18px 0px;
  text-align: center;
}
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
.input-title {
  display: inline-block;
  width: 60px;
}
.form-input {
  display: inline-block;
  width: 435px;
}
.row {
  margin-bottom: 16px;
  position: relative;
}
</style>