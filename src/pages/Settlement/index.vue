<template>
  <div class="j-settlement">
    <!-- 头部 -->
    <!-- 收货地址 -->
    <div class="settlement-main">
      <div class="recv-address" @click="handleAddress()" v-if="isNotEmpty">
        <img class="rowimg" src="https://static.epetbar.com//mpet/images/deliver-top.png" alt>
        <dl v-if="username">
          <dt class="recv-name">{{username}}</dt>
          <dt class="recv-tel">{{phone}}</dt>
          <dd class="recv-cities">{{region}}</dd>
          <!-- <dd class="recv-area">{{userAddInfo[0].region[1]}}</dd>
          <dd class="recv-ads">{{userAddInfo[0].region[2]}}</dd> -->
          <dd class="recv-postal-code">{{addsite}}</dd>
          <span class="recv-iconfont">
            <i>&#xe693;</i>
          </span>
        </dl>
        <dl v-else>
          <dt class="recv-name">{{userAddInfo[0].username}}</dt>
          <dt class="recv-tel">{{userAddInfo[0].phone}}</dt>
          <dd class="recv-cities">{{userAddInfo[0].region[0]}},</dd>
          <dd class="recv-area">{{userAddInfo[0].region[1]}},</dd>
          <dd class="recv-ads">{{userAddInfo[0].region[2]}},</dd>
          <dd class="recv-postal-code">{{addsite}}</dd>
          <span class="recv-iconfont">
            <i>&#xe693;</i>
          </span>
        </dl>
        <img class="rowimg" src="https://static.epetbar.com//mpet/images/deliver-top.png" alt>
      </div>

      <div class="recv-address empty" @click="handleAddress()" v-else>
        <img class="rowimg" src="https://static.epetbar.com//mpet/images/deliver-top.png" alt>
        <dl>
          <dt class="recv-name">收货人姓名</dt>
          <dt class="recv-tel">手机号码</dt>
          <dd class="recv-cities">选择省市</dd>
          <dd class="recv-area">选择区域</dd>
          <dd class="recv-ads">街道地址</dd>
          <dd class="recv-postal-code">邮政编码</dd>
          <span class="recv-iconfont"><i>&#xe693;</i></span>
        </dl>
        <img class="rowimg" src="https://static.epetbar.com//mpet/images/deliver-top.png" alt>
      </div>

      <!-- 普通结算信息 -->
      <div class="j-settlement-inform" v-if="settlementInfo">
        <div class="settle-content" v-for="item in settlementInfo" :key="item.orderId">
          <ul>
            <li class="j-settlement-img">
               <img :src="item.img[0].img">
            </li>
            <li class="j-settlement-title">
              {{item.title}}
              <span class="j-settlement-size">颜色：{{item.color}}</span>
              <span class="j-settlement-size">尺码：{{item.size}}</span>
            </li>
            <li class="j-settlement-price">￥{{item.price}}</li>
            <li class="j-settlement-num">{{item.count}}件</li>
          </ul>
          <div class="j-settlement-setting">
            <ol>
              <li> 配送方式<span>快递配送</span></li>
              <li>积分:<span>1000</span></li>
              <li>发票类型:<span>不开票</span></li>
              <li>买家留言:  <input type="text" placeholder="填写的内容需与商家协商并确认,45字以内"></li>
              <li> 邮费: 0.00元<span> 共计{{item.count}}件商品，小计：<span>{{item.count * item.price}}元</span></span></li>
            </ol>
          </div>
        </div>
      </div>
      <!-- 积分商品结算信息 -->
      <div class="j-settlement-inform" v-else>
        <div class="settle-content" v-for="item in ScoreSettle" :key="item.id">
          <ul>
            <li class="j-settlement-img">
               <img :src="item.swiper[0].img">
            </li>
            <li class="j-settlement-title">{{item.productDetailName}}</li>
            <li class="j-settlement-price">价格：0</li>
            <li class="j-settlement-num">1 件</li>
          </ul>
          <div class="j-settlement-setting">
            <ol>
              <li> 配送方式<span>快递配送</span></li>
              <li>积分:<span>{{item.scorePrice}}</span></li>
              <li>发票类型:<span>不开票</span></li>
              <li>买家留言:  <input type="text" placeholder="填写的内容需与商家协商并确认,45字以内"></li>
              <li> 邮费: 0.00元<span> 共计1件商品，小计：<span>0元</span></span></li>
            </ol>
          </div>
        </div>
      </div>

      <!-- 商品总价/运费/优惠 -->
      <div class="j-settlement-discount">
        <p>商品总价<span>￥{{priceAll}}</span></p>
        <p> 运费<span>￥0.00</span></p>
        <p>优惠<span>￥0.00</span></p>
      </div>
    </div>
    <!-- 合计、去支付 -->
    <div class="j-settlement-pay">
      <span class="count">合计：￥{{priceAll}}</span>
      <button class="pay" @click="handleOrder()">去支付</button>
    </div>
  </div>
</template>
<script>
import { mapState, mapMutations } from "vuex";
import * as mutationTypes from '../../store/mutationTypes'

export default {
  name: "settlement",
  data() {
    return {
      settlementInfo: [],
      priceAll: null,
      userAddInfo: [],
      typeInfo: 100,
      username: '',
      phone: null,
      region: '',
      addsite: '',
      ScoreSettle: []
    };
  },
  computed: {
    ...mapState([
      // 购物车结算按钮的商品信息
      "cartToSettInfo",
      // 用户地址
      "address",
      // 传递到添加地址页的地址类别
      "toAddressType",
      // 积分商品详情页的结算信息
      "cartToScoreSettInfo"
      ]),
    isNotEmpty() {
      return Array.isArray(this.userAddInfo) && this.userAddInfo.length !== 0;
    }
  },
  mounted() {
    console.log('普通商品信息',this.settlementInfo)
    console.log('积分商品信息',this.cartToScoreSettInfo)
    this.ScoreSettle = this.cartToScoreSettInfo
    this.userAddInfo = this.address
    this.settlementInfo = [] // 清空上一次的商品信息
    this.priceAll = null // 清空上一次的商品价格
    this.settlementInfo = this.settlementInfo.concat(this.cartToSettInfo)
    // this.settlementInfo = this.cartToSettInfo;
    this.settlementInfo.map(item => {
      // 从购物车过去，存在商品数量
      if(item.count){
        this.priceAll += item.count * item.price
      } else{ // 商品详情页立即购买，没有商品数量
        this.priceAll = item.price
      }
      return this.priceAll;
    });
  },
  methods: {
    ...mapMutations([mutationTypes.handleToAddressType]),
    handleAddress() {
      //将  this.type 传到 Address 页面
    this.handleToAddressType(this.typeInfo)
      wx.navigateTo({
        url: '../Address/main'
      })
    },
    handleOrder() {
      wx.navigateTo({
      url: '../Order/main'
      })
    }
  },
  onLoad(options) {
    const { username, phone, region, addsite } = options
    this.username = username;
    this.phone = phone;
    this.region = region;
    this.addsite = addsite;
  }
};
</script>
<style  lang="scss" scoped>
@font-face {
  font-family: "iconfont"; /* project id 974053 */
  src: url("http://at.alicdn.com/t/font_974053_117j0vicezc.eot");
  src: url("http://at.alicdn.com/t/font_974053_117j0vicezc.eot?#iefix")
      format("embedded-opentype"),
    url("http://at.alicdn.com/t/font_974053_117j0vicezc.woff") format("woff"),
    url("http://at.alicdn.com/t/font_974053_117j0vicezc.ttf") format("truetype"),
    url("http://at.alicdn.com/t/font_974053_117j0vicezc.svg#iconfont")
      format("svg");
}
* {
  font-size: 3vw;
}
.j-settlement {
  width: 100%;
  height: 100%;
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  background-color: #f3f4f5;
  .settlement-main {
    width: 100%;
    flex: 1;
    overflow-x: hidden;
    .recv-address {
      width: 100%;
      height: 25vw;
      font-size: 4vw;
      background-color: #fff;
      margin-bottom: 3vw;
      .rowimg {
        width: 100%;
        height: 2vw;
      }
      dl {
        height: 9vw;
        vertical-align: middle;
        padding: 2vw 0 2vw 2vw;
        dt {
          float: left;
          width: 50%;
        }
        dd {
          float: left;
          margin-right: 3vw;
        }
        .recv-iconfont {
          margin-top: -2vw;
          float: right;
          i {
            font-family: "iconfont";
            font-size: 5vw;
          }
        }
      }
    }
    .j-settlement-inform {
      .settle-content {
        width: 100%;
        border: 1px solid #ccc;
        border-width: 1px 0;
        margin: 3vw 0;
        background-color: #fff;
        font-size: 4vw;
        ul {
          padding: 1vw;
          border: 1px solid #f5f5f5;
          overflow: hidden;
        }
        ul > li {
          float: left;
          img {
            width: 12vw;
            height: 12vw;
            margin-right: 2vw;
          }
        }
        .j-settlement-title {
          width: 75vw;
        }
        .j-settlement-price {
          margin-right: 60vw;
          float: left;
          color: #f00;
        }
        .j-settlement-size {
          font-size: 3vw;
        }
        .j-settlement-setting {
          padding: 0 3vw;
          ol > li {
            position: relative;
            height: 12vw;
            line-height: 12vw;
            border: 1px solid #f5f5f5;
            span {
              float: right;
              color: rgba(88, 87, 87, 0.933);
              i {
                color: #c00;
              }
            }
            input {
              position: absolute;
              top: 3vw;
              left: 20vw;
              border: none;
              width: 75vw;
              height: 7vw;
              display: inline-block;
              font-size: 4vw;
            }
          }
        }
      }
    }
    .j-settlement-discount {
      padding: 0 3vw;
      height: 20vw;
      box-sizing: border-box;
      width: 100%;
      font-size: 3.5vw;
      p {
        border: 1px solid #f5f5f5;
        height: 6vw;
        line-height: 6vw;
      }
      p > span {
        float: right;
      }
    }
  }
  .j-settlement-pay {
    width: 100%;
    height: 12vw;
    display: flex;
    font-size: 4vw;
    position: fixed;
    bottom: 0;
    left: 0;
    .count {
      width: 72vw;
      height: 12vw;
      line-height: 12vw;
      background-color: #ccc;
      padding-left: 3vw;
    }
    .pay {
      border: none;
      width: 25vw;
      height: 12vw;
      background: #f44336;
      color: #fff;
      font-size: 5vw;
    }
  }
}
</style>
