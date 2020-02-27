<!--  -->
<template>
  <div class="block">
    <span class="tips">下单时间:</span>
    <el-date-picker v-model="startTime" type="datetime" placeholder="请输入开始时间"></el-date-picker>
    <span class="sperator">一</span>
    <el-date-picker v-model="endTime" type="datetime" placeholder="请输入结束时间"></el-date-picker>
    <span class="holder"></span>
    <el-select v-model="searchSelect" @change="selectChange" placeholder="请选择">
      <el-option v-for="item in options" :key="item.value" :label="item.label" :value="item.value"></el-option>
    </el-select>
    <el-input v-model="input" class="searchinput" placeholder="请输入搜索内容"></el-input>
    <el-button type="primary" @click="handleSearch" class="query">查询</el-button>
  </div>
</template>

<script>
//这里可以导入其他文件（比如：组件，工具js，第三方插件js，json文件，图片文件等等）
//例如：import 《组件名称》 from '《组件路径》';
import moment from 'moment'
export default {
  //import引入的组件需要注入到对象中才能使用
  components: {},
  data() {
    //这里存放数据
    return {
      startTime: "",
      endTime: "",
      options: [
        {
          value: "orderSn",
          label: "订单编号"
        },
        {
          value: "phone",
          label: "手机号"
        },
        {
          value: "logisticsSn",
          label: "运单号"
        },
        {
          value: "payable",
          label: "订单金额"
        },
        {
          value: "company",
          label: "送检单位"
        }
      ],
      searchSelect: "订单编号",
      defaultValue:"orderSn",
      input: ""
    };
  },
  //监听属性 类似于data概念
  computed: {},
  //监控data中的数据变化
  watch: {},
  //方法集合
  methods: {
    initStyle() {
      this.$nextTick(() => {
        initSearchInput();
      });
      function initSearchInput() {
        var input = document.querySelectorAll(".el-input__inner");
        for (let i = 0; i < input.length; i++) {
          input[i].style.height = 35 + "px";
        }
      }
    },
    handleSearch(){
      if((this.startTime&&!this.endTime)||(!this.startTime&&this.endTime)){
        this.$message({
          message:"日期需成对输入才会生效",
          type:"warning"
        })
        this.startTime = ""
        this.endTime = ""
      }else if(this.startTime&&this.endTime){
        this.startTime = moment(this.startTime,'YYYY-MM-DD hh:mm:ss').valueOf()/1000
        this.endTime = moment(this.endTime,'YYYY-MM-DD hh:mm:ss').valueOf()/1000
      }

      this.$emit("handlesearch",{
        startTime:this.startTime,
        endTime:this.endTime,
        searchValue:this.input,
        key:this.defaultValue,
      })
    },
    selectChange(value){
      this.defaultValue = value
    }
  },
  //生命周期 - 创建完成（可以访问当前this实例）
  created() {},
  //生命周期 - 挂载完成（可以访问DOM元素）
  mounted() {
    this.initStyle();
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
.block {
  padding: 10px 20px 0 20px;
  text-align: left;
}
.el-input__inner {
  height: 35px;
}
.sperator {
  color: #979797;
  font-weight: bold;
  margin: 0 5px;
  font-size: 8px;
}
.el-select{
  width:170px;
}
.tips {
  margin-right: 8px;
  color: #333;
}
.holder {
  display: inline-block;
  width: 30px;
}
.searchinput {
  margin-left: 20px;
  width: 220px;
}
.query {
  margin-left: 20px;
  background-color: rgb(5, 132, 215);
  padding: 9px 25px;
}
</style>