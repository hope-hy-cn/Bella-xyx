<template>
    <div class="cart">
      <div class="cart-main" v-if="isNotEmpty">
        <div class="cart-head">
        <span class="edit" @click="isCollectionsItemDetlete">{{isDelete ?'完成': '管理'}}</span>
      </div>
        <div class="main-products">
          <div
            class="pro-one"
            v-for="pro in cart"
            :key="pro.id"
          >
            <div class="left">
              <input
                type="checkbox"
                :checked="pro.isChecked"
                @click="toggleCartItemChecked(pro.id)"
              >
            </div>
            <div class="center">
              <img :src="pro.img[0].img"/>
            </div>
            <div class="right">
              <div class="desc">
                <span>{{pro.title}}</span>
              </div>
              <div class="size">尺码：{{pro.size}}</div>
              <div class="color">颜色：{{pro.color}}</div>
              <div class="price-count">
                <div class="price">￥{{pro.price}}</div>
                <div class="count">
                  <span class="reduce" @click="reduceCartItemCount(pro.id)">-</span>
                  <span class="amount">{{pro.count}}</span>
                  <span class="add" @click="addCartItemCount(pro.id)">+</span>
                </div>
              </div>
            </div>
          </div>
        </div>

        <div class="cart-foot" v-if="!isDelete">
          <div class="left">
            <label>
              <input
                type="checkbox"
                :checked="isAllCartItemChecked"
                @change="toggleCartAllChecked"
              />全选
              </label>
          </div>
          <div class="center">
            <div class="total">总计:<span class="price">￥{{cartCheckedPrice}}</span></div>
          </div>
          <div class="right"
          @click="isHasChooseItemToSett"
          >结算({{cartCheckedCount}})</div>
        </div>
        <div class="cart-foot-delete" v-else>
          <div class="left">
            <label>
              <input
                type="checkbox"
                :checked="isAllCartItemChecked"
                @change="toggleCartAllChecked"
              >全选
              </label>
          </div>
          <div class="center">
            <div class="total" style="display:none">总计:<span class="price">￥{{cartCheckedPrice}}</span></div>
          </div>
          <div
            class="right"
            :class="isCartActive ? 'delete active':'delete'"
            @click="isRequiredDelete"
          >删除({{cartCheckedCount}})</div>
        </div>
      </div>
      <div class="cart-empty" v-else>
        <div class="img">
          <img src="https://m.youpin.mi.com/youpin/static/m/res/images/cart_grey.png" />
        </div>
        <p>亲购物车还没有商品哦~</p>
        <div class="tohome" @click="handelToHome"><span>去逛逛</span></div>
      </div>
    </div>
</template>

<script>
import { mapState, mapMutations, mapGetters } from 'vuex'
import * as mutationTypes from '../../store/mutationTypes'
export default {
  name: 'cart',
  data () {
    return {
      isDelete: false
    }
  },
  mounted(){
    // 是一个数组，明明是一个对象
    console.log(typeof(this.cartTotalCount))
    console.log('购物车mounted',this.cartTotalCount)
    if(this.cartIsNotEmpty === true){
      this.setTabBarBadge()
      console.log("购物车mounted后",this.cartTotalCount)
    }
  },
  watch:{
    // console.log(typeof(this.cartTotalCount))
    //更新购物车小红点数量
    cartTotalCount(){
      this.setTabBarBadge()
      console.log("购物车watch后111",this.cartTotalCount)
    }
   },
  updated(){
    // 是一个数组，明明是一个对象
    this.setTabBarBadge()
    console.log("购物车updated后111",this.cartTotalCount)
    // if(this.cartIsNotEmpty === true){
    //   this.setTabBarBadge()
    //   console.log("购物车updated后111",this.cartTotalCount)
    // }
  },
  computed: {
    ...mapState(['cart']),
    ...mapGetters([
      // 购物车全选
      'isAllCartItemChecked',
      // 购物车数量
      'cartCheckedCount',
      // 购物车是否有商品选中
      'hasItemCheckedProduct',
       // 购物车总价
      'cartCheckedPrice',
      //购物车否为空
      'cartIsNotEmpty',
      // 购物车总数量
      'cartTotalCount'
    ]),
    // 判断购物车是否为空，用v-if做判断，为空时显示另一个界面
    isNotEmpty () {
      return Array.isArray(this.cart) && this.cart.length !== 0
    }
  },
  methods: {
    ...mapMutations([
      // 购物车加
      mutationTypes.addCartItemCount,
      // 减
      mutationTypes.reduceCartItemCount,
      // 购物车是否选择，状态改变
      mutationTypes.toggleCartItemChecked,
      // 购物车全选
      mutationTypes.toggleCartAllChecked,
      // 购物车商品删除，item.isChecked为true时删除
      mutationTypes.isCartRequiredItemDelete,
      // 去结算
      mutationTypes.cartToSettInfoHandle
    ]),
    //获取购物车数量
     setTabBarBadge(){
      wx.setTabBarBadge({
      index: 2,
      text:this.cartTotalCount.toString()
      })
    },
    isCollectionsItemDetlete () {
      this.isDelete = !this.isDelete
    },
    // 购物车商品删除判断是否已选择商品
    isRequiredDelete () {
      if (!this.hasItemCheckedProduct) {
        wx.showToast({
          title: '亲请选择商品哦！',
          icon: 'none',
          duration: 2000
        })
      } else {
        this.isCartRequiredItemDelete()
        wx.showToast({
          title: '删除成功',
          icon: 'none',
          duration: 2000
        })
      }
    },
    // 当购物车商品为空，点击跳转至首页
      handelToHome() {
        wx.switchTab({
          url: '../index/main'
        })  
      },
    // 购物车根据是否选择商品调整至结算页
    isHasChooseItemToSett () {
      const isHas = this.cart.some(item => item.isChecked === true)
      if (isHas) {
        const settInfo = this.cart.filter(item => item.isChecked === true)
        console.log("cart",settInfo)
        this.isCartRequiredItemDelete()
        this.cartToSettInfoHandle({vm: this, settInfo: settInfo})
      } else {
        wx.showToast({
          icon:'none',
          title: '请选择商品 !',
          duration: 1000
        })
      }
    }
  }
}
</script>

<style lang="scss" scoped>
  @font-face {
    font-family: 'iconfont';  /* project id 921051 */
    src: url('//at.alicdn.com/t/font_921051_7bklkcfeoka.eot');
    src: url('//at.alicdn.com/t/font_921051_7bklkcfeoka.eot?#iefix') format('embedded-opentype'),
    url('//at.alicdn.com/t/font_921051_7bklkcfeoka.woff') format('woff'),
    url('//at.alicdn.com/t/font_921051_7bklkcfeoka.ttf') format('truetype'),
    url('//at.alicdn.com/t/font_921051_7bklkcfeoka.svg#iconfont') format('svg');
  }
  .cart{
    width: 100%;
    height: 100vh;
    display: flex;
    flex-direction: column;
    overflow: hidden;
    &-head{
      width: 100%;
      height: 9vw;
      padding:1vw 0;
      .edit{
        border:0.1vw solid #FF8A65;
        border-radius: 3vw;
        height: 8vw;
        line-height: 8vw;
        font-size: 4vw;
        float: right;
        margin-right: 3vw;
        padding: 0 5vw;
      }
    }
    &-main{
      flex:1;
      overflow: hidden;
      background-color: #f5f5f5;
      display: flex;
      flex-direction: column;
      .main-products{
        flex: 1;
        overflow-x: hidden;
        .pro-one{
          height:30vw;
          margin-bottom:3vw;
          background-color: #fff;
          display: flex;
          .left{
            width: 10%;
            line-height: 30vw;
            text-align: center;
            input{
              width: 5vw;
              height: 5vw;
            }
          }
          .center{
            width: 25%;
            height: 26vw;
            margin: 2vw;
            border-radius: 1vw;
            img{
              border-radius: 1vw;
              width: 100%;
              height: 100%;
            }
          }
          .right{
            flex:1;
            box-sizing: border-box;
            padding:2vw;
            .desc{
              font-size: 4vw;
              height:8vw;
              overflow: hidden;
              white-space: wrap;
              text-overflow: ellipsis;
            }
            .size, .color{
              font-size: 3vw;
              height: 5vw;
              line-height:5vw;
            }
            .price-count{
              height: 10vw;
              line-height: 10vw;
              .price{
                float: left;
                font-size: 4vw;
                color:#ff2337;
                font-weight: 600;
              }
              .count{
                float: right;
                display: flex;
                span{
                  font-size: 3vw;
                  display: inline-block;
                  text-align: center;
                  border: 0.1vw solid #dedede;
                  height: 7vw;
                  line-height: 7vw;
                  padding: 0 3vw;
                }
                .amount{
                  padding: 0 5vw;
                  border-right: 0;
                  border-left: 0;
                }
              }
            }
          }
        }
      }
      .cart-foot, .cart-foot-delete{
        box-sizing: border-box;
        padding-left:3vw;
        height: 13vw;
        border-top: 1px solid #dedede;
        display: flex;
        justify-content: space-between;
        .left, .right{
          width: 30%;
          line-height: 13vw;
        }
        .left{
          font-size: 3vw;
        }
        .right{
          background-color: #FF8A65;
          color:#fff;
          text-align: center;
          font-size: 4vw;
        }
        .center{
          flex:1;
          line-height: 15vw;
          padding-right:3vw;
          text-align: right;
          .total{
            font-size: 4vw;
            font-weight: 550;
            .price{
              color:#f00;
            }
          }
        }
      }
    }
    &-empty{
      width: 100%;
      height: 100%;
      flex: 1;
      .img{
        width: 100%;
        height: 35vw;
        line-height: 35vw;
        margin-top:10vw;
        text-align: center;
        img{
          width: 30%;
          height: 20vh;
        }
      }
      p{
        text-align: center;
        font-size: 4vw;
      }
      .tohome{
        width: 100%;
        height: 20vw;
        line-height: 10vw;
        box-sizing: border-box;
        padding: 5vw 0;
        text-align: center;
        font-size: 5vw;
        span{
          display: inline-block;
          width: 30vw;
          height: 100%;
          color: #fff;
          background-color: #FF8A65;
          border-radius: 5vw;
        }
      }
    }
  }
</style>


