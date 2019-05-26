
<script>
import { mapGetters } from 'vuex'
import * as mutationTypes from './store/mutationTypes'
export default {
  created () {
    // 调用API从本地缓存中获取数据
    const logs = wx.getStorageSync('logs') || []
    logs.unshift(Date.now())
    wx.setStorageSync('logs', logs)
    //初始化购物车小红点数量
    // 判断，当购物车不为空时，显示小红点
    if(this.cartIsNotEmpty === true){
      this.setTabBarBadge()
    }
  },
  updated(){
    if(this.cartIsNotEmpty === true){
      this.setTabBarBadge()
    }
  },
   computed: {
    ...mapGetters(['cartTotalCount','cartIsNotEmpty'])
   },
   watch:{
    //更新购物车小红点数量
    cartTotalCount(){
      this.setTabBarBadge()
    }
   },
   methods:{
     //小圆点获取购物车数量
     setTabBarBadge(){
      wx.setTabBarBadge({
      index: 2,
      text:this.cartTotalCount.toString()
      })
    }
  }

}
</script>

<style>
.container {
  height: 100%;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: space-between;
  padding: 200rpx 0;
  box-sizing: border-box;
}
/* this rule will be remove */
* {
  transition: width 2s;
  -moz-transition: width 2s;
  -webkit-transition: width 2s;
  -o-transition: width 2s;
}
</style>
