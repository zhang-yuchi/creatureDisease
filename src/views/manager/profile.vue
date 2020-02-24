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
          <el-form class="form" :model="phone">
            <el-form-item label="新手机号" :label-width="formLabelWidth">
              <el-input v-model="phone.name" placeholder="请输入新手机号" autocomplete="off"></el-input>
            </el-form-item>
            <el-form-item label="验证码" :label-width="formLabelWidth">
              <el-input v-model="phone.check" autocomplete="off"></el-input>
            </el-form-item>
          </el-form>
          <div slot="footer" class="dialog-footer">
            <el-button @click="phoneVisible = false">取 消</el-button>
            <el-button type="primary" @click="phoneVisible = false">确 定</el-button>
          </div>
        </el-dialog>
        <div class="text item">
          <span class="item-text">用户名</span>
          <span class="item-text">{{userName}}</span>
          <el-link type="primary" style="color:#0584D7;" @click="nameVisible = true">修改</el-link>
        </div>
        <el-dialog class="form-dialog" title="修改用户名" :visible.sync="nameVisible">
          <el-form class="form" :model="name">
            <el-form-item label="用户名" :label-width="formLabelWidth">
              <el-input v-model="name.name" placeholder="请输入用户名" autocomplete="off"></el-input>
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
        <el-dialog class="form-dialog" title="修改密码" :visible.sync="pswVisible">
          <el-form class="form" :model="psw">
            <el-form-item label="验证码" :label-width="formLabelWidth">
              <el-input v-model="psw.check" placeholder="请输入验证码" autocomplete="off"></el-input>
            </el-form-item>
            <el-form-item label="新密码" :label-width="formLabelWidth">
              <el-input v-model="psw.num" placeholder="请输入新密码" autocomplete="off"></el-input>
            </el-form-item>
            <el-form-item label="重复密码" :label-width="formLabelWidth">
              <el-input v-model="psw.newNum" placeholder="请再次输入新密码" autocomplete="off"></el-input>
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
import { getUserInfo, errorHandle } from "../../network";
export default {
  //import引入的组件需要注入到对象中才能使用
  components: {},
  data() {
    //这里存放数据
    return {
      phoneVisible: false,
      phone: {
        num: "",
        check: ""
      },
      nameVisible: false,
      name: {
        name: ""
      },
      pswVisible: false,
      psw: {
        num: "",
        newNum: "",
        check: ""
      },
      userName: "",
      phone: "",
      createTime: "",
      formLabelWidth: "120px",
      isloading: false
    };
  },
  //监听属性 类似于data概念
  computed: {},
  //监控data中的数据变化
  watch: {},
  //方法集合
  methods: {
    changePhone() {},
    getUser() {
      this.isloading = true;
      getUserInfo()
        .then(res => {
          (this.userName = res.data.userName),
            (this.phone = res.data.phone),
            (this.createTime = res.data.createTime);
            this.$store.commit({
              type:"changeUsername",
              name:this.userName
            })
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
</style>