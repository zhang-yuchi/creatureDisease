<!-- 管理页面主页面 -->
<template>
  <el-container class="main">
    <el-aside width="242px">
      <el-col :span="24">
        <!-- <h5>自定义颜色</h5> -->
        <div class="logo">ddd</div>
        <el-menu
          :default-active="nowpath"
          class="el-menu-vertical-demo"
          text-color="#b4bbc3"
          background-color="#051f39"
          active-background-color="#000"
          active-text-color="#fff"
          :router=true
        >
          <el-menu-item index="profile">
            <i class="el-icon-menu"></i>
            <span slot="title">个人中心</span>
          </el-menu-item>
          <el-menu-item index="order">
            <i class="el-icon-document-remove"></i>
            <span slot="title">订单管理</span>
          </el-menu-item>
          <el-submenu index="3" class="submenu">
            <template slot="title">
              <i class="el-icon-setting"></i>
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
      <el-header>Header</el-header>
      <el-main>
        
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
  "project-setting": "实验室设置/检测项目配置"
};
export default {
  //import引入的组件需要注入到对象中才能使用
  components: {},
  data() {
    //这里存放数据
    return {
      nowpath: "",
      BreadcrumbList: [],
      routePath: this.$router.history.current.path
    };
  },
  //监听属性 类似于data概念
  computed: {},
  //监控data中的数据变化
  watch: {
    $route(to, from) {
      this.getnowpath();
      this.getBreadcrumbList();
    }
  },
  //方法集合
  methods: {
    getnowpath() {
      this.nowpath = this.$router.history.current.path.split("/")[
        this.$router.history.current.path.split("/").length - 1
      ];
    },
    getBreadcrumbList() {
      this.BreadcrumbList = routeMap[this.nowpath].split("/");
    }
  },
  //生命周期 - 创建完成（可以访问当前this实例）
  created() {},
  //生命周期 - 挂载完成（可以访问DOM元素）
  mounted() {
    console.log(this.$router);
    this.getnowpath();
    this.getBreadcrumbList();
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
.el-header,
.el-footer {
  background-color: #b3c0d1;
  color: #333;
  text-align: center;
  line-height: 60px;
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
  min-height: 700px;
  background-color: #e9eef3;
  color: #333;
  text-align: center;
  line-height: 160px;
}

/* .el-container{
    overflow: hidden;
    height: 100%;
  } */
.el-container,
.main {
  overflow: hidden;
  height: 100%;
}
li[role="menuitem"] {
  width: 242px;
  box-sizing: border-box;
  text-align: left;
}

.logo {
  height: 100px;
}
.el-menu-item,
.el-submenu__title {
  background-color: #051f39;
}
.el-menu-item-group .el-menu-item{
  background-color: #204370 !important;
}
#app .is-active{
  background-color: #0584D7 !important;
}


</style>