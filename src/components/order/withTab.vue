<!-- 标签 -->
<template>
  <div class>
    <el-tabs v-model="activeName" @tab-click="handleClick">
      <el-tab-pane label="所有订单" name="first"></el-tab-pane>
      <el-tab-pane label="待付款" name="second"></el-tab-pane>
      <el-tab-pane label="待寄样" name="third"></el-tab-pane>
      <el-tab-pane label="运输中" name="fourth"></el-tab-pane>
      <el-tab-pane label="检测中" name="fifth"></el-tab-pane>
      <el-tab-pane label="已完成" name="sixth"></el-tab-pane>
      <el-tab-pane label="已取消" name="seventh"></el-tab-pane>
    </el-tabs>
  </div>
</template>

<script>
//这里可以导入其他文件（比如：组件，工具js，第三方插件js，json文件，图片文件等等）
//例如：import 《组件名称》 from '《组件路径》';
const itemMap = {
  "first":0,
  "second":1,
  "third":2,
  "fourth":3,
  "fifth":4,
  "sixth":5,
  "seventh":6,
}
const primaryColor = "#0584D7"
export default {
//import引入的组件需要注入到对象中才能使用
components: {},
data() {
//这里存放数据
return {
    activeName: "first"
};
},
//监听属性 类似于data概念
computed: {},
//监控data中的数据变化
watch: {},
//方法集合
methods: {
    handleClick(obj) {
      this.getActiveStyle(itemMap[obj.name])
      this.$emit("handleTabChange",obj)
    },
    getActiveStyle(index) {
      var itemList_item = document.getElementsByClassName("el-tabs__item");
      for (let i = 0; i < itemList_item.length; i++) {
        if (i == index) {
          itemList_item[i].style.fontSize = "16px";
          itemList_item[i].style.color = primaryColor
          itemList_item[i].style.fontWeight = "bold";
        }else{
          itemList_item[i].style.fontSize = "14px";
          itemList_item[i].style.color = "#333";
          itemList_item[i].style.fontWeight = "normal";
        }
      }
    },
    initItemStyle() {
      this.$nextTick(() => {
        //增加margin
        // var tab = document.querySelector('.el-tabs')
        // tab.style.marginTop = "10px"

        //小蓝条长度矫正
        var active_bar = document.querySelector('.el-tabs__active-bar')
        active_bar.style.backgroundColor = primaryColor
        var firstBox = document.querySelector('#tab-first')
        firstBox.style.paddingRight = "20px"
        var padding = 20
        var initLength = firstBox.offsetWidth - padding/2 //初始为64
        active_bar.style.width = initLength+"px"

        //使tab居中
        var itemList = document.getElementsByClassName("el-tabs__nav is-top");
        var i = itemList[0];
        i.style.transition = "none";
        i.style.position = "relative"
        i.style.left = "25%"
        i.style.fontSize = "14px";
        this.getActiveStyle(0)
      });
    }
},
//生命周期 - 创建完成（可以访问当前this实例）
created() {

},
//生命周期 - 挂载完成（可以访问DOM元素）
mounted() {
    this.initItemStyle();
},
beforeCreate() {}, //生命周期 - 创建之前
beforeMount() {}, //生命周期 - 挂载之前
beforeUpdate() {}, //生命周期 - 更新之前
updated() {}, //生命周期 - 更新之后
beforeDestroy() {}, //生命周期 - 销毁之前
destroyed() {}, //生命周期 - 销毁完成
activated() {}, //如果页面有keep-alive缓存功能，这个函数会触发
deactivated() {}, //如果有keep-alive缓存功能,当该页面撤销使这个函数会触发
}
</script>
<style scoped>
.el-tabs__nav {
  float: none;
}
.el-tabs__header{
  margin-top: 30px;
}
.is-active {
  font-weight: bold;
}
</style>