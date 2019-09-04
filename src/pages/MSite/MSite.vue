<template>
  <div class="msite">
    <!--首页头部-->
    <headerTop :title="address.name">
      <router-link class="header_search" slot="left" to="/search">
        <i class="iconfont icon-sousuo"></i>
      </router-link>
      <router-link class="header_login" slot="right" :to="userInfo._id? '/userinfo':'/login'">
        <span class="header_login_text" v-if="!userInfo._id">登录|注册</span>
        <span class="header_login_text" v-else>
          <i class="iconfont icon-dingdan"></i>
        </span>
      </router-link>
    </headerTop>
    <!--首页导航-->
    <nav class="msite_nav" >
      <swiper :options="swiperOption" class="swiper-container" v-if="categorys.length">
        <swiper-slide class="swiper-slide" v-for="(categorys,index) in categorysArr" :key="index">
          <a
            href="javascript:"
            class="link_to_food"
            v-for="(category,index) in categorys"
            :key="index"
          >
            <div class="food_container">
              <img :src="baseImageUrl+category.image_url" />
            </div>
            <span>{{category.title}}</span>
          </a>
        </swiper-slide>
        <!-- Add Pagination -->
        <div class="swiper-pagination" slot="pagination"></div>
      </swiper>
      <img src="./images/msite_back.svg" v-else>
    </nav>
    <!--首页附近商家-->
    <div class="msite_shop_list">
      <div class="shop_header">
        <i class="iconfont icon-sousuo"></i>
        <span class="shop_header_title">附近商家</span>
      </div>
      <ShopList></ShopList>
    </div>
  </div>
</template>

<script>
//这里可以导入其他文件（比如：组件，工具js，第三方插件js，json文件，图片文件等等）
//例如：import 《组件名称》 from '《组件路径》';
import HeaderTop from "../../components/HeaderTop/HeaderTop";
import "swiper/dist/css/swiper.css";
import { swiper, swiperSlide } from "vue-awesome-swiper";
import ShopList from "../../components/ShopList/ShopList";
import { mapState } from "vuex";
export default {
  //import引入的组件需要注入到对象中才能使用
  components: {
    HeaderTop,
    swiper,
    swiperSlide,
    ShopList,
  },
  data() {
    //这里存放数据
    return {
      //这个应该在计算属性后面
      swiperOption: {
        autoplay: true,
        loop: true,
        pagination: {
          el: ".swiper-pagination"
        }
      },
      baseImageUrl:'https://fuss10.elemecdn.com'
    };
  },
  //监听属性 类似于data概念
  computed: {
    ...mapState(["address", "categorys","userInfo"]),
    /**
     * 根据categorys一位数组生成一个2维数组
     * 小数组中的元素个数最大是8
     */
    categorysArr() {
      const { categorys } = this;
      
      //准备空的2维数组
      //准备一个大数组
      const arr = [];
      //准备一个小数组(最大长度为8)
      let minArr = [];
      //遍历categorys
      categorys.forEach(c => {
        //如果当前小数组已经满了，创建一个新的
        if (minArr.length === 8) {
          minArr = [];
        }
        //如果minArr是空的，将小数组保存到大数组中
        if (minArr.length === 0) {
          arr.push(minArr);
        }
        //将当前分类汇总保存小数组中
        //保证小数组关联到大数组中
        //保证小数组不能满
        minArr.push(c);
      });
      return arr
    }
  },
  //监控data中的数据变化
  watch: {},
  //方法集合
  methods: {},
  //生命周期 - 创建完成（可以访问当前this实例）
  created() {},
  //生命周期 - 挂载完成（可以访问DOM元素）
  mounted() {
    this.$store.dispatch("getCategorys")
    this.$store.dispatch("getShops")
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
@import '../../commom/stylus/mixins.styl'
.msite // 首页
  width 100%
  .header
    background-color #02a774
    position fixed
    z-index 100
    left 0
    top 0
    width 100%
    height 45px
    .header_search
      position absolute
      left 15px
      top 50%
      transform translateY(-50%)
      width 10%
      height 50%
      .icon-sousuo
        font-size 25px
        color #fff
    .header_title
      position absolute
      top 50%
      left 50%
      transform translate(-50%, -50%)
      width 50%
      color #fff
      text-align center
      .header_title_text
        font-size 20px
        color #fff
        display block
    .header_login
      font-size 14px
      color #fff
      position absolute
      right 15px
      top 50%
      transform translateY(-50%)
      .header_login_text
        color #fff
  .msite_nav
    bottom-border-1px(#e4e4e4)
    margin-top 45px
    height 200px
    background #fff
    .swiper-container
      width 100%
      height 100%
      .swiper-wrapper
        width 100%
        height 100%
        .swiper-slide
          display flex
          justify-content center
          align-items flex-start
          flex-wrap wrap
          .link_to_food
            width 25%
            .food_container
              display block
              width 100%
              text-align center
              padding-bottom 10px
              font-size 0
              img
                display inline-block
                width 50px
                height 50px
            span
              display block
              width 100%
              text-align center
              font-size 13px
              color #666
      .swiper-pagination
        >span.swiper-pagination-bullet-active
          background #02a774
  .msite_shop_list
    top-border-1px(#e4e4e4)
    margin-top 10px
    background #fff
    .shop_header
      padding 10px 10px 0
      .shop_icon
        margin-left 5px
        color #999
      .shop_header_title
        color #999
        font-size 14px
        line-height 20px
</style>