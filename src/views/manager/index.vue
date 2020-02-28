<!-- 管理页面主页面 -->
<template>
  <el-container class="main">
    <el-aside width="242px">
      <el-col :span="24">
        <!-- <h5>自定义颜色</h5> -->
        <img class="logo" src="../../assets/logo1.png" alt />
        <el-menu
          :default-active="nowpath"
          class="el-menu-vertical-demo"
          text-color="#b4bbc3"
          background-color="#051f39"
          active-background-color="#000"
          active-text-color="#fff"
          :router="true"
        >
          <el-menu-item index="profile">
            <i class="el-icon-menu"></i>
            <span slot="title">个人中心</span>
          </el-menu-item>
          <el-menu-item index="order">
            <i class="el-icon-document-remove"></i>
            <span slot="title">订单管理</span>
          </el-menu-item>
          <el-submenu index="setting" class="submenu">
            <template slot="title">
              <i class="el-icon-setting logout"></i>
              <span>实验室设置</span>
            </template>
            <el-menu-item-group>
              <el-menu-item class="sub-list" index="baseInfo">基础信息</el-menu-item>
              <el-menu-item class="sub-list" index="project-setting">检测项目配置</el-menu-item>
            </el-menu-item-group>
          </el-submenu>
        </el-menu>
      </el-col>
    </el-aside>
    <el-container>
      <el-header>
        <div class="controls">
          <span class="name">{{username}}</span>
          <i @click="logout" class="el-icon-switch-button"></i>
          <!-- <img class="logout" @click="logout" src="../../assets/psw.png" alt /> -->
        </div>
      </el-header>
      <el-main>
        <el-breadcrumb separator=">">
          <el-breadcrumb-item
            v-for="(item,index) in this.BreadcrumbList"
            :to="item=='订单管理'&&index==0?'order':''"
            :key="index"
          >{{item}}</el-breadcrumb-item>
        </el-breadcrumb>
        <keep-alive exclude="orderdetail">
          <router-view />
        </keep-alive>
      </el-main>
    </el-container>
  </el-container>
</template>

<script>
//这里可以导入其他文件（比如：组件，工具js，第三方插件js，json文件，图片文件等等）
//例如：import 《组件名称》 from '《组件路径》';
var routeMap = {
  profile: "个人中心",
  order: "订单管理",
  baseInfo: "实验室设置/基础信息",
  "project-setting": "实验室设置/检测项目配置",
  "order-detail": "订单管理/订单详情"
};
export default {
  //import引入的组件需要注入到对象中才能使用
  components: {},
  data() {
    //这里存放数据
    return {
      nowpath: "",
      BreadcrumbList: [],
      routePath: this.$router.history.current.path,
      username: sessionStorage.getItem("username")
        ? sessionStorage.getItem("username")
        : this.$store.state.username
    };
  },
  //监听属性 类似于data概念
  computed: {},
  //监控data中的数据变化
  watch: {
    $route(to, from) {
      this.getnowpath();
      this.getBreadcrumbList();
      this.beautifyStyle();
    }
  },
  //方法集合
  methods: {
    getnowpath() {
      // console.log(this.$route)
      this.nowpath = this.$router.history.current.path.split("/")[
        this.$router.history.current.path.split("/").length - 1
      ];
    },
    getBreadcrumbList() {
      console.log(this.nowpath);
      if (!routeMap[this.nowpath]) {
        this.BreadcrumbList = [];
        return;
      }
      this.BreadcrumbList = routeMap[this.nowpath].split("/");
      // console.log(this.BreadcrumbList)
    },
    beautifyStyle() {
      this.$nextTick(() => {
        var bread = document.getElementsByClassName("el-breadcrumb__inner");
        // console.log(bread[1])
        var b = bread[bread.length - 1];
        // console.log(b)
        if (bread.length > 1) {
          //找到最后一个面包屑
          b.style.fontWeight = "bold";
        }
      });
    },
    logout() {
      //需要做一个守卫 相当于注销!
      sessionStorage.setItem("token", null);
      this.$router.replace({ path: "/" });
      //replace替换原路由，作用是避免回退死循环
    }
  },
  //生命周期 - 创建完成（可以访问当前this实例）
  created() {},
  //生命周期 - 挂载完成（可以访问DOM元素）
  mounted() {
    //监听回退事件
    // if (window.history && window.history.pushState) {
    //   history.pushState(null, null, document.URL);
    //   window.addEventListener("popstate", this.logout, false);
    // }
    this.beautifyStyle();
    this.getnowpath();
    this.getBreadcrumbList();
  },
  beforeCreate() {}, //生命周期 - 创建之前
  beforeMount() {}, //生命周期 - 挂载之前
  beforeUpdate() {}, //生命周期 - 更新之前
  updated() {}, //生命周期 - 更新之后
  beforeDestroy() {}, //生命周期 - 销毁之前
  destroyed() {
    window.removeEventListener("popstate", this.goBack, false);
  }, //生命周期 - 销毁完成
  activated() {}, //如果页面有keep-alive缓存功能，这个函数会触发
  deactivated() {} //如果有keep-alive缓存功能,当该页面撤销使这个函数会触发
};
</script>
<style scoped>
.el-header,
.el-footer {
  /* background-color: #b3c0d1; */
  background: #fff;
  color: #333;
  text-align: center;
  line-height: 60px;
}
.el-header {
  position: relative;
  border-bottom: 1px solid #dbdfe4;
  height: 60px !important;
}
/* .name,.logout{
  float: left;
} */
.controls {
  line-height: 16px;
  position: absolute;
  right: 16px;
  top: 50%;
  transform: translateY(-50%);
}
.logout {
  cursor: pointer;
}
.name {
  border-radius: 10px;
  margin-right: 21px;
  display: inline-block;
  padding: 0 13px;
  background-color: rgba(221, 221, 221, 0.5);
  line-height: 25px;
}
.el-aside {
  user-select: none;
  /* overflow: hidden; */
  min-height: 100%;
  float: left;
  background-color: #051f39;
  color: #333;
  text-align: center;
  line-height: 200px;
}

.el-main {
  /* min-height: 700px; */
  background-color: #fff;
  color: #333;
  /* text-align: center; */
  padding: 20px 0 5px;
  overflow-y: auto;
  height: 700px;
}
.main {
  overflow: hidden;
  height: 100%;
}
.el-container {
  overflow: hidden;
}
li[role="menuitem"] {
  width: 242px;
  box-sizing: border-box;
  text-align: left;
}
.logout {
  cursor: pointer;
}
.logo {
  height: 70px;
}
.el-menu {
  margin-top: -40px;
}
.el-menu-item,
.el-submenu__title {
  background-color: #051f39;
}
.el-menu-item-group .el-menu-item {
  background-color: #204370 !important;
}
#app .is-active {
  background-color: #0584d7 !important;
}
.el-breadcrumb__item .el-breadcrumb__inner {
  font-weight: bold !important;
}
.bold {
  font-weight: bold;
}
.el-breadcrumb {
  padding: 0 20px;
}
</style>