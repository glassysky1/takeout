<template>
  <div>
    <div class="goods">
      <div class="menu-wrapper" ref="menuWrapper">
        <ul>
          <li
            class="menu-item"
            v-for="(good,index) in goods"
            :key="index"
            :class="{current:index ===currentIndex}"
            @click="clickMenuItem(index)"
          >
            <span class="text bottom-border-1px">
              <img class="icon" :src="good.icon" v-if="good.icon" />
              {{good.name}}
            </span>
          </li>
        </ul>
      </div>
      <div class="foods-wrapper" ref="foodsWrapper">
        <ul ref="foodsUl">
          <li class="food-list-hook" v-for="(good,index) in goods" :key="index">
            <h1 class="title">{{good.name}}</h1>
            <ul>
              <li
                class="food-item bottom-border-1px"
                v-for="(food,index) in good.foods"
                :key="index"
                @click="showFood(food)"
              >
                <div class="icon">
                  <img width="57" height="57" :src="food.icon" />
                </div>
                <div class="content">
                  <h2 class="name">{{food.name}}</h2>
                  <p class="desc">{{food.description}}</p>
                  <div class="extra">
                    <span class="count">月售 {{food.sellCount}} 份</span>
                    <span>好评率 {{food.rating}}%</span>
                  </div>
                  <div class="price">
                    <span class="now">￥{{food.price}}</span>
                    <span class="old" v-if="food.oldPrice">￥{{food.oldPrice}}</span>
                  </div>
                  <div class="cartcontrol-wrapper">
                    <CartControl :food="food"/>
                  </div>
                </div>
              </li>
            </ul>
          </li>
        </ul>
      </div>
      <ShopCart/>
    </div>
      <Food :food="food" ref="food"/>
  </div>
</template>
<script>
//这里可以导入其他文件（比如：组件，工具js，第三方插件js，json文件，图片文件等等）
//例如：import 《组件名称》 from '《组件路径》';
import { mapState } from "vuex";
import BScroll from "@better-scroll/core";
import CartControl from  '../../../components/CartControl/CartControl'
import Food from "../../../components/Food/Food";
import ShopCart from "../../../components/ShopCart/ShopCart";
export default {
  //import引入的组件需要注入到对象中才能使用
  components: {
    CartControl,
    Food,
    ShopCart
  },
  data() {
    //这里存放数据
    return {
      scrollY: 0, //右侧滑动的Y轴坐标(滑动过程时变化)
      tops: [], //所有右侧分类li的top组成的数组(列表第一次显示后就不再变化)
      food:{}//需要显示的food
    };
  },
  //监听属性 类似于data概念
  computed: {
    ...mapState(["goods"]),
    //计算得到当前分类的下标
    currentIndex() {
      //得到条件数据
      const { scrollY, tops } = this;
      //根据条件计算产生一个结果
      const index = tops.findIndex((top, index) => {
        //scrollY>=top && scrollY<下一个top

        return scrollY >= top && scrollY < tops[index + 1];
      });
      //返回结果
      return index;
    }
  },
  //监控data中的数据变化
  watch: {},
  //方法集合
  methods: {
    //初始化滚动
    _initScroll() {
      //列表更新显示后执行
      //列表显示之后创建
      const menuScroll = new BScroll(".menu-wrapper", {
        scrollY: true,
        click: true
      });
      this.foodsScroll = new BScroll(".foods-wrapper", {
        click: true,
        probeType: 3
      });
      //右侧列表绑定scrool监听
      this.foodsScroll.on("scroll", ({ x, y }) => {
        //收集scrollY
        this.scrollY = Math.abs(y);
      });
    },
    //初始化tops
    _initTops() {
      //1.初始化tops
      const tops = [];
      let top = 0;
      tops.push(top);
      //2.找到所有分类的li
      const lis = this.$refs.foodsUl.getElementsByClassName("food-list-hook");
      Array.prototype.slice.call(lis).forEach(li => {
        top += li.clientHeight;
        tops.push(top);
      });
      //3.更新数据
      this.tops = tops;
    },
    //
    clickMenuItem(index) {
      //使用右侧列表滑动到对应的位置
      //得到目标位置的scrollY
      const scrollY = -this.tops[index]
      //立即更新scrollY
      this.scrollY = scrollY
     this.foodsScroll.scrollTo(0,scrollY,300)
    },
    //显示点击的food
    showFood(food){
      //设置food
      this.food = food
      //显示food组件(父组件调用子组件对象的方法)
      this.$refs.food.toggleShow()
    }
  },
  //生命周期 - 创建完成（可以访问当前this实例）
  created() {},
  //生命周期 - 挂载完成（可以访问DOM元素）
  mounted() {
    this.$store.dispatch("getShopGoods", () => {
      //数据更新后执行
      //列表显示后创建
      this.$nextTick(() => {
        this._initScroll();
        this._initTops();
      });
    });
  },
  beforeCreate() {}, //生命周期 - 创建之前
  beforeMount() {}, //生命周期 - 挂载之前
  beforeUpdate() {}, //生命周期 - 更新之前
  updated() {}, //生命周期 - 更新之后
  beforeDestroy() {}, //生命周期 - 销毁之前
  destroyed() {}, //生命周期 - 销毁完成
  activated() {} //如果页面有keep-alive缓存功能，这个函数会触发
};
</script>
<style lang="stylus" rel="stylesheet/stylus">
@import '../../../commom/stylus/mixins.styl'
.goods
  display flex
  position absolute
  top 195px
  bottom 46px
  width 100%
  background #fff
  overflow hidden
  .menu-wrapper
    flex 0 0 80px
    width 80px
    background #f3f5f7
    .menu-item
      display table
      height 54px
      width 56px
      padding 0 12px
      line-height 14px
      &.current
        position relative
        z-index 10
        margin-top -1px
        background #fff
        color $green
        font-weight 700
        .text
          border-none()
      .icon
        display inline-block
        vertical-align top
        width 12px
        height 12px
        margin-right 2px
        background-size 12px 12px
        background-repeat no-repeat
      .text
        display table-cell
        width 56px
        vertical-align middle
        bottom-border-1px(rgba(7, 17, 27, 0.1))
        font-size 12px
  .foods-wrapper
    flex 1
    .title
      padding-left 14px
      height 26px
      line-height 26px
      border-left 2px solid #d9dde1
      font-size 12px
      color rgb(147, 153, 159)
      background #f3f5f7
    .food-item
      display flex
      margin 18px
      padding-bottom 18px
      bottom-border-1px(rgba(7, 17, 27, 0.1))
      &:last-child
        border-none()
        margin-bottom 0
      .icon
        flex 0 0 57px
        margin-right 10px
      .content
        flex 1
        .name
          margin 2px 0 8px 0
          height 14px
          line-height 14px
          font-size 14px
          color rgb(7, 17, 27)
        .desc, .extra
          line-height 10px
          font-size 10px
          color rgb(147, 153, 159)
        .desc
          line-height 12px
          margin-bottom 8px
        .extra
          .count
            margin-right 12px
        .price
          font-weight 700
          line-height 24px
          .now
            margin-right 8px
            font-size 14px
            color rgb(240, 20, 20)
          .old
            text-decoration line-through
            font-size 10px
            color rgb(147, 153, 159)
        .cartcontrol-wrapper
          position absolute
          right 0
          bottom 12px
</style>

