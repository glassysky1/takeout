<template>
  <div id="app">
    <router-view v-if="isRouterAlive"/>
    <FooterGuide v-show="$route.meta.showFooter"/>
  </div>
</template>

<script>
import { mapActions } from "vuex";
import FooterGuide from ".//components/FooterGuide/FooterGuide";
export default {
  provide(){
    return{
      reload:this.reload
    }
  },
  data(){
    return{
      isRouterAlive:true
    }
  },
  //异步请求
  async mounted(){
    //发起请求获取getAddress
    // this.$store.dispatch('getAddress')
   this.getAddress()
   this.getUserInfo()
  },
  components:{
    FooterGuide
  },
  methods:{
    ...mapActions(['getAddress','getUserInfo']),
    reload(){
      this.isRouterAlive = false
      this.$nextTick(()=>{
        this.isRouterAlive = true
      })
    }
  }
};
</script>
<style lang="stylus" rel="stylesheet/stylus">
  #app
    width 100%
    height 100%
</style>