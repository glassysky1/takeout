<template>
  <section class="search">
    <HeaderTop title="搜索" />
    <form class="search_form" @submit.prevent="search">
      <input type="search" placeholder="请输入商家名称" class="search_input" v-model="keyword" />
      <input type="submit" class="search_submit" />
    </form>
    <section class="list" v-if="!noSearchShops">
      <ul class="list_container">
        <!-- :to="'/shop?id='+item.id" -->
        <router-link
          :to="{path:'/shop', query:{id:item.id}}"
          tag="li"
          v-for="item in searchShops"
          :key="item.id"
          class="list_li"
        >
          <section class="item_left">
            <img :src="imgBaseUrl + item.image_path" class="restaurant_img" />
          </section>
          <section class="item_right">
            <div class="item_right_text">
              <p>
                <span>{{item.name}}</span>
              </p>
              <p>月售 {{item.month_sales||item.recent_order_num}} 单</p>
              <p>{{item.delivery_fee||item.float_minimum_order_amount}} 元起送 / 距离 {{item.distance}}</p>
            </div>
          </section>
        </router-link>
      </ul>
    </section>
    <div class="search-none" v-else>很抱歉！无搜索结果</div>
  </section>
</template>

<script>
//这里可以导入其他文件（比如：组件，工具js，第三方插件js，json文件，图片文件等等）
//例如：import 《组件名称》 from '《组件路径》';
import HeaderTop from "../../components/HeaderTop/HeaderTop";
import { mapState } from "vuex";
export default {
  //import引入的组件需要注入到对象中才能使用
  components: {
    HeaderTop
  },
  data() {
    //这里存放数据
    return {
      keyword: "",
      imgBaseUrl:'http://cangdu.org:8001/img/',
      noSearchShops:false
    };
  },
  //监听属性 类似于data概念
  computed: {
    ...mapState(["searchShops"])
  },
  //监控data中的数据变化
  watch: {
    searchShops(value){
      if(!value.length){
        this.noSearchShops =true
      }else{
        this.noSearchShops = false
      }
    }
  },
  //方法集合
  methods: {
    search() {
      //得到搜索关键字
      const keyword = this.keyword.trim();
      //进行搜索
      if (keyword) {
        this.$store.dispatch("searchShops", keyword);
      }
    }
  },
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
<style lang="stylus" rel="stylesheet/stylus">
@import '../../commom/stylus/mixins.styl'
.search
  width 100%
  height 100%
  overflow hidden
  .search_form
    clearFix()
    margin-top 45px
    background-color #fff
    padding 12px 8px
    input
      height 35px
      padding 0 4px
      border-radius 2px
      font-weight bold
      outline none
      &.search_input
        float left
        width 79%
        border 4px solid #f2f2f2
        font-size 14px
        color #333
        background-color #f2f2f2
      &.search_submit
        float right
        width 18%
        border 4px solid #02a774
        font-size 16px
        color #fff
        background-color #02a774
  .list
    .list_container
      background-color #fff
      .list_li
        display flex
        justify-content center
        padding 10px
        border-bottom 1px solid $bc
        .item_left
          margin-right 10px
          .restaurant_img
            width 50px
            height 50px
            display block
        .item_right
          font-size 12px
          flex 1
          .item_right_text
            p
              line-height 12px
              margin-bottom 6px
              &:last-child
                margin-bottom 0
  .search_none
    margin 0 auto
    color #333
    background-color #fff
    text-align center
    margin-top 0.125rem
</style>