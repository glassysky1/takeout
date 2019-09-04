<template>
  <div class="star star-24" :class="'star'+size" >
    <span class="star-item" v-for="(sc,index) in starClasses" :class="sc" :key ="index"></span>
  </div>
</template>

<script>
//这里可以导入其他文件（比如：组件，工具js，第三方插件js，json文件，图片文件等等）
//例如：import 《组件名称》 from '《组件路径》';
//类名常量
const CLASS_ON = 'on'
const ClASS_HALF = 'half'
const CLASS_OFF = 'off'
export default {
  //import引入的组件需要注入到对象中才能使用
  components: {},
  data() {
    //这里存放数据
    return {};
  },
  //监听属性 类似于data概念
  computed: {
    /**
     * 3.2:3+0+2
     * 3.5:3+1+1
     */
    starClasses(){
      const {score} = this
      const scs = []
      //向scs添加n个'on'
      const scoreInteger = Math.floor(score)
      for (let i = 0; i < scoreInteger; i++) {
        scs.push(CLASS_ON)
      }
      //向scs添加0/1个'half'
      if (score*10 -scoreInteger*10>=5) {
        scs.push(ClASS_HALF)
      }
      //向scs添加n个'off'
      while (scs.length<5) {
        scs.push(CLASS_OFF)
      }
      return scs
    }
  },
  //监控data中的数据变化
  watch: {},
  props:{
    score:Number,
    size:Number
  },
  //方法集合
  methods: {},
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
  activated() {} //如果页面有keep-alive缓存功能，这个函数会触发
};
</script>
<style lang='stylus' rel='stylesheet/stylus'>
@import '../../commom/stylus/mixins.styl'
.star // 2x图 3x图
  float left
  font-size 0
  .star-item
    display inline-block
    background-repeat no-repeat
  &.star-48
    .star-item
      width 20px
      height 20px
      margin-right 22px
      background-size 20px 20px
      &:last-child
        margin-right 0
      &.on
        bg-image('./images/star48_on')
      &.half
        bg-image('./images/star48_half')
      &.off
        bg-image('./images/star48_off')
  &.star-36
    .star-item
      width 15px
      height 15px
      margin-right 6px
      background-size 15px 15px
      &:last-child
        margin-right 0
      &.on
        bg-image('./images/star36_on')
      &.half
        bg-image('./images/star36_half')
      &.off
        bg-image('./images/star36_off')
  &.star-24
    .star-item
      width 10px
      height 10px
      margin-right 3px
      background-size 10px 10px
      &:last-child
        margin-right 0
      &.on
        bg-image('./images/star24_on')
      &.half
        bg-image('./images/star24_half')
      &.off
        bg-image('./images/star24_off')
</style>