<!-- 物流信息 -->
<template>
  <div class>
    <Ititle title="物流信息"></Ititle>
    <wrap>
      <div v-if="hasSuccess">
        <div class="row">
          <span class="title">物流公司:</span>
          {{expDetail.expName}}
        </div>
        <div class="row">
          <span class="title">运单号码:</span>
          {{expDetail.logistics}}
        </div>
        <div class="row">
          <div class="logistics-detail">物流追踪信息</div>
          <div class="detail-list" v-for="(item,index) in expDetail.list" :key="index">
            <span class="time">{{item.time}}</span>
            <span class="content">{{item.status}}</span>
          </div>
        </div>
      </div>
      <div v-else>暂无物流信息!</div>
    </wrap>
  </div>
</template>

<script>
//这里可以导入其他文件（比如：组件，工具js，第三方插件js，json文件，图片文件等等）
//例如：import 《组件名称》 from '《组件路径》';

import Ititle from "../../components/title/index";
import wrap from "./wrap";
import { getLogistics, errorHandle } from "../../network";
export default {
  //import引入的组件需要注入到对象中才能使用
  components: {
    Ititle,
    wrap
  },
  props: {
    logistics: String
  },
  data() {
    //这里存放数据
    return {
      hasSuccess: true,
      expDetail: {}
    };
  },
  //监听属性 类似于data概念
  computed: {},
  //监控data中的数据变化
  watch: {
    logistics(newValue) {
      this.logistics = newValue;
      // console.log(this.logistics);
      getLogistics(this.logistics).then(res => {
        // console.log(res);
        this.hasSuccess = res.data.SUCCESS ? true : false;

        if (this.hasSuccess) {
          const details = res.data.SUCCESS.result;
          const expName = details.expName;
          const logistics = this.logistics;
          const list = details.list;
          this.expDetail = {
            expName,
            logistics,
            list
          };
        }
      })
      .catch(()=>{
        errorHandle()
      })
      ;
    }
  },
  //方法集合
  methods: {},
  //生命周期 - 创建完成（可以访问当前this实例）
  created() {},
  //生命周期 - 挂载完成（可以访问DOM元素）
  mounted() {
    // console.log(this.logistics);
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
  width: 5em;
}
.row {
  color: #333333;
  font-size: 14px;
  margin-bottom: 10px;
}
.logistics-detail {
  margin-bottom: 10px;
}
.detail-list {
  margin-bottom: 10px;
}
.detail-list:last-of-type {
  margin-bottom: 0;
}
.content{
  margin-left: 10px;
  display: inline-block;
  width: 70%;
  line-height: 18px;
  vertical-align: top;
}
</style>