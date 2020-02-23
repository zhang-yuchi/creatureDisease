<!-- 登录页面 -->
<template>
  <div class="root">
      <div class="login">
          <div class="banner">
              <img src="../../assets/logo.png" alt="">
              <div class="version">版本V1.0.1</div>
          </div>
          <div class="logwindow">
              <router-view />
          </div>
      </div>
  </div>
</template>

<script>
//这里可以导入其他文件（比如：组件，工具js，第三方插件js，json文件，图片文件等等）
//例如：import 《组件名称》 from '《组件路径》';
import login from "./login"
import changePsw from './changePsw'

export default {
  //import引入的组件需要注入到对象中才能使用
  
  components: {
      login,
      changePsw,
  },
  data() {
    //这里存放数据
    return {
        state:"login"
    };
  },
  //监听属性 类似于data概念
  computed: {},
  //监控data中的数据变化
  watch: {},
  //方法集合
  methods: {
      changetoPsw(){
          this.state = "password"
      }
  },
  //生命周期 - 创建完成（可以访问当前this实例）
  created() {},
  //生命周期 - 挂载完成（可以访问DOM元素）
  mounted() {
      
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
    .root{
        position: relative;
        width: 100%;
        height: 100%;
        /* ie兼容 */
        overflow: hidden;
        
        background-image: url('../../assets/bg.png');
        background-size: 100% 100%;
    }
    .login{
        width: 1000px;
        position: absolute;
        transform: translate(-50%,-50%);
        top: 50%;
        left: 50%;
        overflow: hidden;
        /* display: flex; */
        /* margin-top: 163px; */
        height: 550px;
    }
    .banner{
        user-select: none;
        float: left;
        background-image:url('../../assets/login.png');
        width: 506px;
        position: relative;
        height: 100%;
        background-size: 514px;
        background-position: 0 0;
        background-repeat: no-repeat;
    }
    .banner img{
        position: absolute;
        left: 50%;
        top: 50%;
        transform: translate(-50%,-60%);
    }
    .banner .version{
        position: absolute;
        bottom: 20px;
        left: 50%;
        transform: translateX(-50%);
        color: #fff;
    }
    .logwindow{
        float: left;
        background-color: #FDFEFE;
        width: 490px;
        height: 100%;
    }

</style>