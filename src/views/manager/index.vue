<!-- 管理页面主页面 -->
<template>
  <div class="layout">
    <Row type="flex">
      <i-col span="5" class="layout-menu-left">
        <Menu :active-name="nowpath" theme="dark" width="auto" :open-keys="['1']">
          <div class="layout-logo-left">
            <img src="../../assets/logo.png" alt />
          </div>
          <Menu-item replace to="profile" name="profile" >
            <Icon type="ios-person"></Icon>个人中心
          </Menu-item>
          <Menu-item replace to="order" name="order" >
            <Icon type="ios-list-box-outline"></Icon>订单管理
          </Menu-item>
          <Submenu :name="nowpath" >
            <template slot="title">
              <Icon type="md-flower"></Icon>实验室设置
            </template>
            <Menu-item replace to="baseInfo" name="baseInfo" >基础信息</Menu-item>
            <Menu-item replace to="project-setting" name="project-setting" >检测项目配置</Menu-item>
          </Submenu>
        </Menu>
      </i-col>
      <i-col span="19">
        <div class="layout-header"></div>

        <div class="layout-content">
          <div class="layout-breadcrumb">
            <Breadcrumb separator=">">
              <Breadcrumb-item href="#">首页</Breadcrumb-item>
              <Breadcrumb-item href="#">应用中心</Breadcrumb-item>
              <Breadcrumb-item>某应用</Breadcrumb-item>
            </Breadcrumb>
          </div>
          <router-view />
          <!-- <div class="layout-content-main">内容区域</div> -->
        </div>
      </i-col>
    </Row>
  </div>
</template>

<script>
//这里可以导入其他文件（比如：组件，工具js，第三方插件js，json文件，图片文件等等）
//例如：import 《组件名称》 from '《组件路径》';
var routeMap = {
  "profile":"个人中心",
  "order":"订单管理",
  "baseInfo":"实验室设置/基础信息",
  "project-setting":"实验室设置/检测项目配置",
}
export default {
  //import引入的组件需要注入到对象中才能使用
  components: {},
  data() {
    //这里存放数据
    return {
      nowpath:""
    };
  },
  //监听属性 类似于data概念
  computed: {},
  //监控data中的数据变化
  watch: {},
  //方法集合
  methods: {},
  //生命周期 - 创建完成（可以访问当前this实例）
  created() {},
  //生命周期 - 挂载完成（可以访问DOM元素）
  mounted() {
    console.log(this.$router)
    this.nowpath = this.$router.history.current.path.split('/')[this.$router.history.current.path.split('/').length-1]
    console.log(this.nowpath)
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
.layout-breadcrumb {
  margin-bottom: 10px;
}
.layout {
  height: 100%;
  border: 1px solid #d7dde4;
  background: #f5f7f9;
  position: relative;
}
.layout-breadcrumb {
  padding: 10px 0px 0;
}
.layout-content {
  min-height: 600px;
  /* margin: 15px; */
  padding: 0 15px;
  overflow: hidden;
  background: #fff;
  border-radius: 4px;
}
.layout-content-main {
  padding: 10px;
}
.layout-copy {
  text-align: center;
  padding: 10px 0 20px;
  color: #9ea7b4;
}
.layout-menu-left {
  background: #051F39;
}
.layout-header {
  height: 70px;
  background: #fff;
  border-bottom: 1px solid #dbdfe4;
  box-shadow: 0 1px 1px rgba(0, 0, 0, 0.1);
}
.layout-logo-left {
  width: 90%;
  /* height: 30px; */
  text-align: center;
  /* background: #5b6270; */
  border-radius: 3px;
  margin: 15px auto;
}
.layout-logo-left img{
  width: 200px;
  height: 81px;
}
.ivu-menu-dark{
  background-color: transparent;
}
.ivu-row-flex {
  height: 100%;
}
.ivu-menu-item-selected{
  color: white !important;
  background-color: #0584D7 !important;
}
.ivu-menu-submenu>.ivu-menu-item-active{
  color: white !important;
  background-color: #0584D7;
}


</style>