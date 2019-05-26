<template>
   <div class="order-detail">
      <div class="order-detail-main">
        <div class="order-status">
          <span class="left">订单状态</span>
          <span class="right">{{orderDetail.isStatus}}</span>
        </div>
        <div class="order-num">
          <span class="left">订单编号</span>
          <span class="right">{{orderDetail.orderNum}}</span>
        </div>
        <div class="sumprice">
          <span class="left">订单金额</span>
          <span class="right">￥{{(orderDetail.orderPrice * orderDetail.orderCount)}}</span>
        </div>
        <div class="date">
          <span class="left">订单日期</span>
          <span class="right">{{orderDetail.orderDate}}</span>
        </div>
        <div class="logistics" v-if="isStatus === '待付款'">
          <span class="left">物流信息</span>
          <span class="right">等待买家付款</span>
        </div>
        <div class="logistics" v-if="isStatus === '待发货'">
          <span class="left">物流信息</span>
          <span class="right">等待卖家发货</span>
        </div>
        <div class="logistics" v-if="isStatus === '待收货'">
          <span class="left">物流信息</span>
          <span class="right">快递单号{{orderDetail.orderNum}}(中通快递)</span>
        </div>
        <div class="logistics" v-if="isStatus === '已完成'">
          <span class="left">物流信息</span>
          <span class="right">暂无</span>
        </div>
        <div class="logistics" v-if="isStatus === '退货'">
          <span class="left">物流信息</span>
          <span class="right">交易关闭</span>
        </div>
        <div class="orderinfo">
            <div class="left img">
              <img :src="orderDetail.orderImg" alt="">
            </div>
            <div class="center infos">
              <span class="title">{{orderDetail.orderTitle}}</span>
              <span class="size-color">-{{orderDetail.orderColor}}-{{orderDetail.orderSize}}</span>
            </div>
            <div class="right">
              <span class="price">￥{{orderDetail.orderPrice}}</span>
              <span class="count">x {{orderDetail.orderCount}}</span>
              <span class="total">合计:{{orderDetail.orderPrice * orderDetail.orderCount}}</span>
            </div>
        </div>
        <div class="userinfo" @click="handleToAddress(isStatus)">
          <div class="user">
            <span class="username">{{username}}</span>
            <span class="usertel">{{phone}}</span>
          </div>
          <div class="address">
            <span>{{region}}</span>
          </div>
        </div>
        <div class="other">
          <p>
            <span class="left">运费</span>
            <span class="right">0元</span>
          </p>
          <p>
            <span class="left">发票类型</span>
            <span class="right">不开发票</span>
          </p>
          <p>
            <span class="left">发票信息</span>
            <span class="right">暂无发票信息</span>
          </p>
          <p>
            <span class="left">买家信息</span>
            <span class="right">匿名购买</span>
          </p>
        </div>
      </div>
      <div class="order-detail-foot" v-if="orderDetail.isStatus === '待付款'">
        <div class="service">取消订单</div>
        <div class="aftersale" @click="payWeiXinMoney">去支付</div>
      </div>
      <div class="order-detail-foot" v-if="orderDetail.isStatus === '待发货'">
        <div class="service">联系客服</div>
        <div class="aftersale" @click="alertSellerSendPro">提醒发货</div>
      </div>
      <div class="order-detail-foot" v-if="orderDetail.isStatus === '待收货'">
        <div class="service">查看物流</div>
        <div class="aftersale" @click="confirmProduct">确认收货</div>
      </div>
      <div class="order-detail-foot" v-if="orderDetail.isStatus === '已完成'">
        <div class="service">联系客服</div>
        <div class="aftersale" @click="handleToScoreDetail">申请退货</div>
      </div>
      <div class="order-detail-foot" v-if="orderDetail.isStatus === '退货'">
        <div class="service">lll</div>
        <div class="aftersale" @click="toHomeGoShopping">去逛逛</div>
      </div>
  </div>
</template>

<script>
import { mapState, mapMutations } from 'vuex'
import * as mutationTypes from '../../store/mutationTypes'

export default {
  data () {
    return {
      orderDetail: {},
      orderId: Number,
      username: '', // 收货人姓名
      phone:0, // 联系方式
      region: '', // 地址
      prePages: ''
    }
  },
  computed:{
    ...mapState(['orderIdStorage'])
  },
  mounted() {
    this.orderId = this.orderIdStorage
    if(this.prePages.route === 'pages/Order/main'){
      this.getOrderDetail()
    }
  },
  methods: {
    ...mapMutations([
      mutationTypes.orderSalesReturnInfo,
      mutationTypes.isToOrderDetail
      ]),
    // 订单详情页请求数据 GET
    getOrderDetail () {
      this.$httpWX.get({
        url:`http://rap2api.taobao.org/app/mock/121682/order/order_detail/?user_id=111/orderId=${this.orderId}`,
        data:{
          user_id:2222,
          orderId:this.orderId
        }
      })
      .then(res => {
        this.orderDetail = res.res_body.orders[0]
        this.username = res.res_body.orders[0].orderName
        this.phone = res.res_body.orders[0].orderPhone
        this.region = res.res_body.orders[0].orderAddress
      })
    },
    // 跳转至地址页
    handleToAddress () {
      this.isToOrderDetail()
      if (this.orderDetail.isStatus === '待付款') {
        wx.navigateTo({
          url: '../Address/main'
        })
        this.$httpWX.post({
          url:'http://rap2api.taobao.org/app/mock/121682/order/update/address',
          data:{
            orderId:this.orderIdStorage,
            orderName:this.username,
            orderAddress: this.region,
            orderPhone: this.phone
          }
        })
        .then(res => {
          console.log(res)
        })
      }
    },
    // 跳转至退货页面
    handleToScoreDetail() {
      this.orderSalesReturnInfo(this.orderDetail)
      wx.navigateTo({
        url: '../SalesReturn/main'
      })
    },
    // 调支付接口
    payWeiXinMoney () {
      wx.showModal({
        title: '支付',
        content: '请输入密码',
        success:(res) => {
          if (res.confirm) {
            this.$httpWX.post({
              url:'http://rap2api.taobao.org/app/mock/121682/order/update/to_pay',
              data:{
                orderId:this.orderId
              }
            })
            .then(res => {
              console.log('支付成功')
              if (res.code === 201 || res.msg === 'SUCCESS') {
                // 支付成功之后，重新请求该订单数据，更新
                this.getOrderDetail()
              }
            })
          } else if (res.cancel) {
          }
        }
      })
    },
    // 提醒买家发货
    alertSellerSendPro () {
      wx.showToast({
        title: '提醒成功',
        icon: 'success',
        duration: 2000
      })
    },
    // 确认收货
    confirmProduct() {
      this.$httpWX.post({
        url:'http://rap2api.taobao.org/app/mock/121682/order/update/to_receive',
        data:{
          orderId: this.orderId
        }
      })
      .then(res =>{
        console.log('确认收货成功')
        // 确认收货之后，重新请求订单列表页数据，更新
        this.getOrderDetail()
      })
    },
    // 退货完成去首页逛逛
    toHomeGoShopping() {
      wx.switchTab({
        url: '../Mall/main'
      }) 
    }
  },
  onLoad(options) {
    let pages = getCurrentPages();
    this.prePages = pages[pages.length - 2]
    // 从地址页跳转回来，重新将收货人姓名、联系方式、地址重新赋值渲染
    const { username, phone, region, addsite } = options
      this.username = username
      this.phone = phone
      this.region = region + addsite
      this.orderId = this.orderIdStorage
  },
  // 确定头部的返回按钮返回到订单列表页
  // onUnload() {
  //   wx.reLaunch({
  //     url: '../Order/main'
  //   })
  // }
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
  .order-detail{
    width: 100%;
    height: 100vh;
    display: flex;
    flex-direction: column;
    &-main{
      flex:1;
      background-color: #f3f4f5;
      overflow-x: hidden;
      div {
        background-color: #fff;
        box-sizing: border-box;
        padding: 3vw;
        font-size: 3.5vw;
        .left{
          color:#757575;
        }
      }
      .order-status{
        width: 100%;
        height: 12vw;
        display: flex;
        justify-content: space-between;
        margin-bottom: 1vw;
      }
      .order-num, .sumprice, .date, .logistics{
        .right{
          margin-left: 8vw;
        }
      }
      .date{
        margin-bottom: 2vw;
      }
      .orderinfo{
        margin-bottom: 2vw;
        box-sizing: border-box;
        padding: 0 3vw;
        width: 100%;
        height: 25vw;
        display: flex;
        justify-content: space-around;
        .left{
          width: 25%;
          height: 25vw;
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
          width: 25%;
          text-align: right;
          span{
            display: block;
          }
          span:last-child{
            margin-top:5vw;
            color:#f00;
          }
        }
      }
      .userinfo{
        margin-bottom: 2vw;
        .user{
          width: 100%;
          display: flex;
          justify-content: space-between;
        }
        .address{
          width: 100%;
        }
      }
      .other{
        p{
          display: flex;
          height: 10vw;
          line-height: 10vw;
          justify-content: space-between;
        }
      }
    }
    &-foot{
      width: 100%;
      height: 12vw;
      border-top:0.1vw solid #e7e7e7;
      padding: 2vw 0;
      box-sizing: border-box;

      div{
        display: inline-block;
        box-sizing: border-box;
        width: 25vw;
        height: 8vw;
        line-height: 8vw;
        text-align: center;
        border-radius: 5vw;
        font-size: 4vw;
        margin-right: 5vw;
      }
      div:first-child{
        margin-left: 35vw;
        border: 0.3vw solid #dedede;
      }
      div:last-child{
        color:#FF8A65;
        border: 0.3vw solid #FF8A65;
      }
    }
  }
</style>
