/**
 直接更新state的多个方法的对象
 */
import Vue from "vue";
import {
  RECEIVE_ADDRESS,
  RECEIVE_CATEGORYS,
  RECEIVE_SHOPS,
  RECEIVE_USER_INFO,
  RESET_USER_INFO,
  RECEIVE_GOODS,
  RECEIVE_RATINGS,
  RECEIVE_INFO,
  INCREMENT_FOOD_COUNT,
  DECREMENT_FOOD_COUNT,
  CLEAR_CART,
  RECEIVE_SEARCH_SHOPS
} from './mutation-types'
export default {
  //传包含address对象
  [RECEIVE_ADDRESS](state, { address }) {
    state.address = address
  },
  [RECEIVE_CATEGORYS](state, { categorys }) {
    state.categorys = categorys
  },
  [RECEIVE_SHOPS](state, { shops }) {
    state.shops = shops
  },
  [RECEIVE_USER_INFO](state, { userInfo }) {
    state.userInfo = userInfo
  },
  //登出把用户清空
  [RESET_USER_INFO](state, { userInfo }) {
    state.userInfo = {}
  },

  [RECEIVE_INFO](state, { info }) {
    state.info = info
  },
  [RECEIVE_RATINGS](state, { ratings }) {
    state.ratings = ratings
  },
  [RECEIVE_GOODS](state, { goods }) {
    state.goods = goods
  },
  [RECEIVE_GOODS](state, { goods }) {
    state.goods = goods
  },
  [INCREMENT_FOOD_COUNT](state, { food }) {
    if (!food.count) {//第一次增加
      // food.count = 1//新增加属性是无法进行数据绑定的
      /**
       对象
       属性名
       属性值
       */
      Vue.set(food,'count',1)//让新增的属性也有数据绑定
      state.cartFoods.push(food)//添加food到cartFoods当food.count++cartFoods数据更新，因为是引用类型，cartFoods存放的是地址
    } else {
      food.count++
    }
  },
  [DECREMENT_FOOD_COUNT](state, { food }) {
    if(food.count){//为真是大于0
      food.count--
      if(food.count ===0){
        //将food从cartFoods中移除
        state.cartFoods.splice(state.cartFoods.indexOf(food),1)
      }
    }
  },
  [CLEAR_CART](state){
    //清除food中的count
    state.cartFoods.forEach(food => {
      food.count =0
    });
    //移除购物车中所有购物项
    state.cartFoods = []
  },

  [RECEIVE_SEARCH_SHOPS](state,{searchShops}){
    state.searchShops = searchShops
  }
}