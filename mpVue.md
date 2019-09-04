# 建立一个项目

src/

app.vue

```javascript
<script>
    export default{

    }
</script>

<style>
</style>
```

app.json

```javascript
{
    "pages":[
        "pages/index/main"
    ],
     "window":{
        "navigationBarBackgroundColor": "#489B81"
    }
}
```



main.js

```javascript
import Vue from 'vue'
import App from "./app.vue"

//设置vue的提示功能关闭
Vue.config.productionTip = false;

//声明当前组件的类型
App.mpType ='app'

//生成应用的实例
const app = new Vue(App)

//挂载整个应用
app.$mount()
```

src/pages/index/

main.js

```javascript
import Vue from 'vue'
import Index from "./index.vue";

const index =new Vue(Index)

//挂载当前的页面
index.$mount()
```

index.vue

```javascript
<!--  -->
<template lang>
<div>
<p>Index组件</p>
</div>
</template>

<script>

export default {

}
</script>
<style  scoped>

</style>
```

删掉dist，cnpm start



## index的导航颜色

main.json

```javascript
{
    "navigationBarBackgroundColor": "#8ed145",
    "navigationBarTitleText": "WeChat"
}
```

## 模板必须加main.js

## mpVue_Vuex

安装：

```shell
cnpm install vuex
```

src/store下

store.js

```javascript
import Vue from 'vue'
import Vuex from 'vuex'
import store from './store'
import state from './state'
import actions from './actions'
import mutations from './mutaions'
import getters from './getters'

//声明使用vuex
Vue.use(Vuex)

export default new Vuex.Store({
    state,
    actions,
    getters,
    mutations
})


```

src下main.js

```javascript
import Vue from 'vue'
import store from "./store/store";
import App from "./app.vue"

//设置vue的提示功能关闭
Vue.config.productionTip = false;

//声明当前组件的类型
App.mpType ='app'

//将store对象放置在Vue的原型上，为的是每个实例都可以使用
Vue.prototype.$store = store

//生成应用的实例
const app = new Vue(App)

//挂载整个应用
app.$mount()
```

src/store下

actions.js

```javascript
import { RECEIVE_LIST,MOVIES_ARR } from "./mutation-type";
import listData from '../datas/list-data'
export default{
    getList({commit}){
        console.log('actions');
        //触发mutations
        commit(RECEIVE_LIST,listData)
    },
    getMoviesArr({commit},data){
        commit(MOVIES_ARR,data)
    }
}
```

mutation-type.js

```javascript
export const RECEIVE_LIST = 'receive_list'
export const MOVIES_ARR = 'movies_arr'
```

mutations.js

```javascript
import { RECEIVE_LIST ,MOVIES_ARR } from "./mutation-type";

export default {
    [RECEIVE_LIST](state,{list_data}){
        state.listTmp = list_data
        
    },
    [MOVIES_ARR](state, data) {
        state.moviesArr = data
        console.log(state);

    },
}
```

state.js

```javascript
export default{
    listTmp:[]
}
```

list.vue

```javascript
<template>
    <div class="listContainer">
        <swiper indicator-dots autoplay circular>
            <swiper-item>
               <img src="/static/images/detail/carousel/01.jpg" alt="">
            </swiper-item>
            <swiper-item>
               <img src="/static/images/detail/carousel/02.jpg" alt="">
            </swiper-item>
            <swiper-item>
               <img src="/static/images/detail/carousel/03.jpg" alt="">
            </swiper-item>
            <swiper-item>
               <img src="/static/images/detail/carousel/04.jpg" alt="">
            </swiper-item>
        </swiper>
        <ListTmp  v-for="(item,index) in listTmp" :key="index" :item="item" :index="index"/>
    </div>
</template>

<script>
    import { mapState,mapActions } from "vuex";//引入
    import ListTmp from "../list_template/list_template.vue";
    export default {
        //import引入的组件需要注入到对象中才能使用
        components: {
            ListTmp
        },
        data() {
            //这里存放数据
            return {

            };
        },
        //监听属性 类似于data概念
        computed: {
            //映射状态到本组件
            ...mapState(['listTmp'])
        },
        beforeMount() {
            //分发action修改状态
            this.$store.dispatch('getList')

         }, //生命周期 - 挂载之前
    }
</script>
<style>
    .listContainer swiper{
        width: 100%;
        height: 400rpx;
    }
    .listContainer swiper img{
        width: 100%;
        height: 100%;
    }
</style>
```

