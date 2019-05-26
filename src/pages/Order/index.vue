<template>
  <div class="order">
    <div class="order-filter">
      <ul>
        <li
          v-for="filter in filters"
          :key="filter"
          @click="filterItemClick(filter)"
          :class="filter === active ? 'active' : ''"
        >
          {{filter}}
        </li>
      </ul>
    </div>
    <div
      class="order-main"
      v-if="isNotEmpty"
    >
      <div
        class="order-one"
        v-for="order in orders"
        :key="order.orderId"
        @click="handleToOrderDetail({orderId:order.orderId})"
      >
        <div class="date">
          <span class="order-time">订单日期：{{order.orderDate}}</span>
          <span class="status">{{order.isStatus}}</span>
        </div>
        <div class="desc">
          <div class="left img">
            <img :src="order.orderImg" :alt="order.orderTitle" />
          </div>
          <div class="center infos">
            <span class="title">{{order.orderTitle}}</span>
            <span class="size-color">-{{order.orderColor}}-{{order.orderSize}}</span>
          </div>
          <div class="right">
            <span class="price">￥{{order.orderPrice}}</span>
            <span class="count">x {{order.orderCount}}</span>
          </div>
        </div>
        <div class="sum">
          共{{order.orderCount}}件商品，
          总计:
          <span class="total-price">{{(order.orderPrice*order.orderCount)}}元</span>
        </div>
      </div>
      <div v-if="active === '全部订单'" @click="morePostOrderList">加载更多……</div>
    </div>
    <div class="order-empty" v-else>
        <div class="img">
          <img src="https://m.youpin.mi.com/youpin/static/m/res/images/std_shop_details_icon_wrong.png" />
        </div>
        <p>目前没有订单哦~</p>
    </div>
  </div>
</template>

<script>
import { mapState, mapMutations } from 'vuex'
import * as mutationTypes from '../../store/mutationTypes'

export default {
  name: 'order',
  data () {
    return {
      filters: ['全部订单', '待付款', '待发货', '待收货', '已完成','退货'], // 订单分类导航栏
      active: '全部订单', // 默认选中第一个全部订单
      page:1, // 当前页
      resOrders: [], // 返回所有订单数据
      orders: [] // 每个导航栏下的订单数据
    }
  },
  computed: {
    ...mapState(['orderIdStorage']),
    // 判断订单是否为空，为空显示页面与有订单显示页面不一样
    isNotEmpty () {
      return Array.isArray(this.orders) && this.orders.length !== 0
    }
  },
  // 请求订单数据
  mounted () {
    // 第一次默认请求,默认第一次加载后端第一页数据 POST
    this.postOrderLists(this.page)
  },
  methods: {
    ...mapMutations([mutationTypes.orderIdSaveToStorage]),
    // 订单列表接口，POST,不按订单状态分
    postOrderLists (page) {
        this.$httpWX.post({
        url:'http://rap2api.taobao.org/app/mock/121682/order/order_list',
        data:{
          user_id:100000000,
          page,
        }
      })
      .then(res => {
        this.resOrders = this.resOrders.concat(res.res_body.orders)
        this.orders = this.orders.concat(this.resOrders)
      })
    },
    // 分页加载
    morePostOrderList() {
      this.page += 1
      this.postOrderLists(this.page)
    },
    // 根据订单状态不同，而渲染不同订单
    filterItemClick (filter) {
      this.active = filter
      switch (filter) {
        case '全部订单':
          this.orders = this.resOrders
          break
        case '待付款':
          this.orders = this.resOrders.filter((order) => {
            if (order.isStatus === '待付款') {
              return order
            } else {
              this.orders = []
            }
          })
          break
        case '待发货':
          this.orders = this.resOrders.filter((order) => {
            if (order.isStatus === '待发货') {
              return order
            } else {
              this.orders = []
            }
          })
          break
        case '待收货':
          this.orders = this.resOrders.filter((order) => {
            if (order.isStatus === '待收货') {
              return order
            } else {
              this.orders = []
            }
          })
          break
        case '已完成':
          this.orders = this.resOrders.filter((order) => {
            if (order.isStatus === '已完成') {
              return order
            } else {
              this.orders = []
            }
          })
          break
        case '退货':
          this.orders = this.resOrders.filter((order) => {
            if (order.isStatus === '退货') {
              return order
            } else {
              this.orders = []
            }
          })
          break
      }
    },
    // 跳转至订单详情页
    handleToOrderDetail(e) {
      const { orderId } = e
      this.orderIdSaveToStorage(e.orderId)
      wx.navigateTo({
        url: `../OrderDetail/main?user_id=10000&orderId=${orderId}`
      })
    }
  }    
}
</script>

<style lang="scss" scoped>
  @font-face {
  font-family: 'iconfont';  /* project id 921051 */
  src: url('//at.alicdn.com/t/font_921051_x0r4ansbu6.eot');
  src: url('//at.alicdn.com/t/font_921051_x0r4ansbu6.eot?#iefix') format('embedded-opentype'),
  url('//at.alicdn.com/t/font_921051_x0r4ansbu6.woff') format('woff'),
  url('//at.alicdn.com/t/font_921051_x0r4ansbu6.ttf') format('truetype'),
  url('//at.alicdn.com/t/font_921051_x0r4ansbu6.svg#iconfont') format('svg');
}
  .order{
    width: 100%;
    height: 100vh;
    display: flex;
    flex-direction: column;
    &-filter{
        width: 100%;
        height: 12vw;
        line-height: 8vw;
        color:#5e5e5e;
        position: fixed;
        font-size: 4vw;
        background-color: #fff;
        box-sizing: border-box;
        padding: 2vw 1vw;
        border-bottom:0.1vw solid #e7e7e7;
        ul{
          display: flex;
          justify-content: space-around;
         li{
            width: calc(100% /5);
            text-align: center;
            border-right: 0.1vw solid #e7e7e7;
          }
          li:last-child{
            border:none;
          }
          .active{
            color:#FF8A65;
          }
        }
      }
    &-main{
      width: 100%;
      overflow-x: hidden;
      margin-top: 12vw;
      background-color: #eaeaea;
      flex: 1;
      .order-one{
        width: 100%;
        font-size: 4vw;
        padding: 2vw 3vw;
        box-sizing: border-box;
        background-color: #fff;
        margin-bottom: 5vw;
        .date{
          height: 12vw;
          line-height: 12vw;
          border-bottom:0.1vw solid #e7e7e7;
          display: flex;
          justify-content: space-between;
          .status{
            color:#f00;
          }
        }
        .desc{
          width: 100%;
          height: 25vw;
          border-bottom:0.1vw solid #e7e7e7;
          display: flex;
          justify-content: space-around;
          .left{
            width: 20%;
            height: 25vw;
            box-sizing: border-box;
            padding: 2vw 0;
            img{
              width: 100%;
              height: 100%;
            }
          }
          .center{
            flex:1;
            padding: 4vw 2vw;
            font-size: 4vw;
            word-wrap:break-word;
          }
          .right{
            padding: 4vw 0;
            width: 20%;
            text-align: right;
          }
        }
        .sum{
          width: 100%;
          height: 8vw;
          line-height: 8vw;
          text-align: right;
          .total-price{
            color:#f00;
          }
        }
      }
    }
    &-empty{
      width: 100%;
      flex:1;
      .img{
        width: 100%;
        height: 35vw;
        line-height: 35vw;
        margin-top:35vw;
        text-align: center;
        img{
          width: 30%;
          height: 100%;
        }
      }
      p{
        text-align: center;
        color: #5e5e5e;
      }
    }
  }
</style>
