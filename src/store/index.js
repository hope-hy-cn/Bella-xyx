import Vue from 'vue'
import Vuex from 'vuex'
import state from './state'
import mutations from './mutations'
import getters from './getters'

// 用户添加地址存储
const syncAddressInfo = store => {
  store.subscribe((mutation, state) => {
    wx.setStorageSync('bella-address', JSON.stringify(state.address))
  })
}
// 添加商品至购物车
const syncProductInfo = store => {
  store.subscribe((mutation, state) => {
    wx.setStorageSync('bella-cart', JSON.stringify(state.cart))
  })
}

// 添加商品至收藏
const syncCollectionInfo = store => {
  store.subscribe((mutation, state) => {
    wx.setStorageSync('bella-collection', JSON.stringify(state.collections))
  })
}
// 添加订单状态
const syncOrderId = store => {
  store.subscribe((mutation, state) => {
    wx.setStorageSync('bella-orderId', JSON.stringify(state.orderStatusStorage))
  })
}

Vue.use(Vuex)

export default new Vuex.Store({
  strict: true,
  state,
  mutations,
  getters,
  plugins: [syncAddressInfo, syncProductInfo, syncCollectionInfo, syncOrderId]
})