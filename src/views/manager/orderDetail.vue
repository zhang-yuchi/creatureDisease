<!--  -->
<template>
<div class=''>
    <!-- 检测中按钮 -->
    <check-control></check-control>
    <!-- 订单信息 -->
    <order-detail></order-detail>
    <!-- 订单进度 -->
    <order-process></order-process>
    <!-- 订单明细 -->
    <order-line></order-line>
    <!-- 送检信息 -->
    <transport-info></transport-info>
    <!-- 样本信息 -->
    <sample-info></sample-info>
    <!-- 检测报告 -->
    <report></report>
    <!-- 物流信息 -->
    <logistics></logistics>
</div>
</template>

<script>
//这里可以导入其他文件（比如：组件，工具js，第三方插件js，json文件，图片文件等等）
//例如：import 《组件名称》 from '《组件路径》';
import checkControl from '../../components/order-detail/check-control'
import orderDetail from '../../components/order-detail/order-detail'
import orderProcess from '../../components/order-detail/order-process'
import orderLine from '../../components/order-detail/order-line'
import transportInfo from '../../components/order-detail/transport-info'
import sampleInfo from '../../components/order-detail/sample-info'
import report from '../../components/order-detail/report'
import logistics from '../../components/order-detail/logistics'
export default {
//import引入的组件需要注入到对象中才能使用
components: {
    checkControl,
    orderDetail,
    orderProcess,
    orderLine,
    transportInfo,
    sampleInfo,
    report,
    logistics,
},
data() {
//这里存放数据
return {

};
},
//监听属性 类似于data概念
computed: {},
//监控data中的数据变化
watch: {},
//方法集合
methods: {

},
//生命周期 - 创建完成（可以访问当前this实例）
created() {

},
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
deactivated() {}, //如果有keep-alive缓存功能,当该页面撤销使这个函数会触发
}
</script>
<style scoped>

</style>