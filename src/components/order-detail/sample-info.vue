<!-- 样本信息 -->
<template>
  <div class>
    <Ititle title="样本信息"></Ititle>
    <wrap>
      <div class="tip">
        <span class="title">样本及临床说明:</span>
        <span
          class="tips-intro"
        >{{sample.intro}}</span>
      </div>
      <div class="content">
        <span class="title">采样图片:</span>
        <div class="pic-box">
          <img v-for=" (item,index) in sample.images" :key="index" :src="item" alt />
        </div>
      </div>
    </wrap>
  </div>
</template>

<script>
//这里可以导入其他文件（比如：组件，工具js，第三方插件js，json文件，图片文件等等）
//例如：import 《组件名称》 from '《组件路径》';
import Ititle from "../../components/title/index";
import wrap from "./wrap";
export default {
  //import引入的组件需要注入到对象中才能使用
  components: {
    Ititle,
    wrap
  },
  props: {
    sample: Object
  },
  data() {
    //这里存放数据
    return {};
  },
  //监听属性 类似于data概念
  computed: {},
  //监控data中的数据变化
  watch: {
    sample(newValue) {
      this.sample = newValue;
    }
  },
  //方法集合
  methods: {},
  //生命周期 - 创建完成（可以访问当前this实例）
  created() {},
  //生命周期 - 挂载完成（可以访问DOM元素）
  mounted() {
      console.log(this.sample)
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
.title {
  display: inline-block;
  width: 8em;
  text-align: right;
  margin-right: 20px;
}
.tip {
  font-size: 14px;
}
.content {
  margin-top: 19px;
  overflow: hidden;
}
.content .title,
.content .pic-box {
  float: left;
}
.content .title {
  margin-top: 10px;
  font-size: 14px;
}
.pic-box {
  width: 1000px;
}
.tips-intro {
  line-height: 20px;
  display: inline-block;
  width: 1000px;
  vertical-align: top;
}
.pic-box img {
  margin-bottom: 5px;
  border-radius: 4px;
  height: 104px;
  margin-right: 10px;
}
</style>