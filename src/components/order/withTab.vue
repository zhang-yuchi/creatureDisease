<!-- 标签 -->
<template>
  <div class>
    <el-tabs v-model="activeName" @tab-click="handleClick">
      <el-tab-pane
        v-for="(item,index) in tabArray"
        :key="index"
        :label="item"
        :name="index.toString()"
      ></el-tab-pane>
    </el-tabs>
  </div>
</template>

<script>
//这里可以导入其他文件（比如：组件，工具js，第三方插件js，json文件，图片文件等等）
//例如：import 《组件名称》 from '《组件路径》';
const itemMap = {
  "0": 0,
  "1": 1,
  "2": 2,
  "3": 3,
  "4": 4,
  "5": 5,
  "6": 6
};
//对应后台接口
const valueMap = {
  "0": "",
  "1": "1",
  "2": "2",
  "3": "3",
  "4": "4",
  "5": "5",
  "6": "0"
};
const primaryColor = "#0584D7";
export default {
  //import引入的组件需要注入到对象中才能使用
  components: {},
  props: {
    tabArray: Array,
    left: {
      type: String,
      default: "25"
    }
  },
  data() {
    //这里存放数据
    return {
      activeName: "0"
    };
  },
  //监听属性 类似于data概念
  computed: {},
  //监控data中的数据变化
  watch: {},
  //方法集合
  methods: {
    handleClick(obj) {
      this.getActiveStyle(itemMap[obj.name]);
      this.$emit("handleTabChange", valueMap[obj.index]);
    },
    getActiveStyle(index) {
      var itemList_item = document.getElementsByClassName("el-tabs__item");
      for (let i = 0; i < itemList_item.length; i++) {
        if (i == index) {
          itemList_item[i].style.fontSize = "16px";
          itemList_item[i].style.color = primaryColor;
          itemList_item[i].style.fontWeight = "bold";
        } else {
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
        var active_bar = document.querySelector(".el-tabs__active-bar");

        active_bar.style.backgroundColor = primaryColor;
        var firstBox = document.querySelector("#tab-0");
        firstBox.style.paddingRight = "20px";
        var padding = 20;
        var initLength = firstBox.offsetWidth - padding / 2; //初始为64
        active_bar.style.width = initLength + "px";

        //使tab居中
        var itemList = document.querySelector(".el-tabs__nav");
        var i = itemList;
        i.style.transition = "none";
        i.style.position = "relative";
        i.style.left = this.left + "%";
        i.style.fontSize = "14px";
        this.getActiveStyle(0);
      });
    }
  },
  //生命周期 - 创建完成（可以访问当前this实例）
  created() {},
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
  deactivated() {} //如果有keep-alive缓存功能,当该页面撤销使这个函数会触发
};
</script>
<style scoped>
.el-tabs__nav {
  float: none;
}
.el-tabs__header {
  margin-top: 30px;
}
.is-active {
  font-weight: bold;
}
</style>