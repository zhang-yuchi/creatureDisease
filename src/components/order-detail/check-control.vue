<!-- 检测中   完成订单和取消订单按钮 -->
<template>
  <div class="control">

      <el-button
      v-if="state==3"
        style="line-height:10px;"
        @click="sureReceive"
        v-loading="sureloading"
        :disabled="disable"
        type="primary"
      >确认收样</el-button>
      <el-button
        v-if="state==4"
        style="line-height:10px;"
        @click="finishOrder"
        v-loading="sureloading"
        type="primary"
        :disabled="disable"
      >完成订单</el-button>
      <el-button
        style="line-height:10px;"
        @click="cancelOrder"
        :disabled="disable"
        v-loading="cancelloading"
        v-if="state==1||state==2||state==3"
      >取消订单</el-button>

  </div>
</template>

<script>
//这里可以导入其他文件（比如：组件，工具js，第三方插件js，json文件，图片文件等等）
//例如：import 《组件名称》 from '《组件路径》';
import { sureOrderList, cannelOrderList, finishOrderList } from "../../network";
export default {
  //import引入的组件需要注入到对象中才能使用
  components: {},
  props: {
    state: String,
    orderSn: String,
    nowfile: {
      type: Array,
      default: []
    }
  },
  data() {
    //这里存放数据
    return {
      sureloading: false,
      cancelloading: false,
      disable: false
    };
  },
  //监听属性 类似于data概念
  computed: {},
  //监控data中的数据变化
  watch: {
    state(newValue) {
      this.state = newValue;
    },
    orderSn(newValue) {
      this.orderSn = newValue;
    }
  },
  //方法集合
  methods: {
    sureReceive() {
      this.sureloading = true;
      this.cancelloading = true;
      this.disable = true;
      sureOrderList(this.orderSn)
        .then(res => {
          // console.log(res);
          this.$message({
            message: "确定收样成功!",
            type: "success"
          });
          this.$emit("refresh");
        })
        .catch(() => {})
        .finally(() => {
          this.sureloading = false;
          this.cancelloading = false;
          this.disable = false;
        });
    },
    finishOrder() {
      if (this.nowfile.length <= 0) {
        this.$message.warning("请先上传检测报告");
        return;
      }
      this.sureloading = true;
      this.disable = true;

      finishOrderList(this.orderSn)
        .then(res => {
          // console.log(res);
          this.$message({
            message: "完成订单成功!",
            type: "success"
          });
          this.$emit("refresh");
          // this.$router.push({
          //   name: "订单管理",
          //   params: {
          //     needFresh: true
          //   }
          // });
        })
        .catch(() => {})
        .finally(() => {
          this.sureloading = false;
          this.cancelloading = false;
          this.disable = false;
        });
    },
    cancelOrder() {
      this.cancelloading = true;
      this.disable = true;
      cannelOrderList(this.orderSn)
        .then(res => {
          // console.log(res);
          this.$message({
            message: "取消订单成功!",
            type: "success"
          });

          this.$router.push({
            name: "订单管理",
            params: {
              needFresh: true
            }
          });
        })
        .catch(() => {})
        .finally(() => {
          this.sureloading = false;
          this.cancelloading = false;
          this.disable = false;
        });
    }
  },
  //生命周期 - 创建完成（可以访问当前this实例）
  created() {},
  //生命周期 - 挂载完成（可以访问DOM元素）
  mounted() {
    // console.log(this.report)
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
.control {
  padding: 20px;
  text-align: right;
}
</style>