<!--  -->
<template>
  <div class="get-msg">
      <el-button v-if="state==0" :loading="isloading" @click="sendVerifyCode">获取验证码</el-button>
      <el-button v-if="state==1" >{{timer}}秒后重发</el-button>
    <!-- <span v-if="state==0" @click="sendVerifyCode">获取验证码</span> -->
    <!-- <span v-if="state==1"  @click="waiting">60秒后重发</span> -->
  </div>
</template>

<script>
//这里可以导入其他文件（比如：组件，工具js，第三方插件js，json文件，图片文件等等）
//例如：import 《组件名称》 from '《组件路径》';
const totalTime = 60 //总时间
export default {
  //import引入的组件需要注入到对象中才能使用
  components: {},
  data() {
    //这里存放数据
    return {
        state:0,
        isloading:false,
        timer:totalTime,
    };
  },
  //监听属性 类似于data概念
  computed: {},
  //监控data中的数据变化
  watch: {},
  //方法集合
  methods: {
    sendVerifyCode() {
        this.state = 1
        this.timer = totalTime
        var t = setInterval(()=>{
            if(this.timer==0){
                clearInterval(t)
                this.state = 0
            }
            this.timer--
            
        },1000)
    },

    
  },
  //生命周期 - 创建完成（可以访问当前this实例）
  created() {},
  //生命周期 - 挂载完成（可以访问DOM元素）
  mounted() {},
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
.get-msg {
  color: #0584d7;
  position: absolute;
  right: 16px;
  top: 0px;
  cursor: pointer;
  line-height: 40px;
  user-select: none;
}
.get-msg span {
  display: inline-block;
  height: 100%;
}
.el-button{
    color: #0584d7;
    border: none;
    background-color: white !important;
}
.el-button:hover{
    background-color: white;
}
</style>