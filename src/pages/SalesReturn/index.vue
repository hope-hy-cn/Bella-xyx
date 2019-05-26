<template>
  <div class="main">
    <div class="product">
      <div class="orderinfo">
        <div class="left img">
          <img :src="orderDetail.orderImg" alt="">
        </div>
        <div class="center infos">
          <span class="title">{{orderDetail.orderTitle}}</span>
          <span class="size-color">{{orderDetail.orderSize}}-{{orderDetail.orderColor}}</span>
        </div>
        <div class="right">
          <span class="price">￥{{orderDetail.orderPrice}}</span>
          <span class="count">x {{orderDetail.orderCount}}</span>
        </div>
      </div>
      <div class="orderAllMoney">
        订单总计:￥{{orderAllMoney}}
        </div>
      <div class="returnMoney">
        <div class="wrap">
          <p>退款金额*</p>
          <span>{{orderAllMoney}}</span>
        </div>
      </div>
    </div>

     <div class="footer">
    <radio-group class="radio-group" @change="radioChange">
      <label class="radio" v-for="item in items" :key="item.name">
        <div class="content">
          <div>
            <radio :value="item.name" :checked="item.checked" class="radio"/>
            <p>{{item.value}}</p>
            <span>{{item.font}}</span>
          </div>
        </div>
      </label>
  </radio-group>
    <span class="submit" @click="submit">提交申请</span>
 </div>
  </div>
</template>

<script>
import { mapState } from 'vuex'
export default {
  data() {
    return {
      items: [
        {
          name: 'JTK', 
          value: '仅退款', 
          font:'未收到货(包含未签收),或卖家协商同意前提下'
          },
        {
          name: 'THTK',
          value: '退货退款',
          font:'已收到货,需要退掉已收到的货物',
          checked: 'true'
          }
      ],
      orderDetail:{}, // Vuex传递过来的退货商品信息
      orderAllMoney: Number
    };
  },
  computed:{
    ...mapState(['orderSalesReturnInfo'])
  },
   mounted() {
     this.orderDetail = this.orderSalesReturnInfo
    console.log("222",this.orderSalesReturnInfo);
    this.orderAllMoney = Number((this.orderDetail.orderPrice * this.orderDetail.orderCount).toFixed(2))
    // orderDetail.orderPrice*orderDetail.orderCount)
  },
  methods: {
    submit() {
      console.log(112)
    },
    radioChange(e) {
      console.log(e.mp)
    }
  }
};
</script>

<style lang="scss" scoped>
  *{
    box-sizing: border-box;
  }
  .main{
    // display: flex;
    flex-direction: column;
    height: 100vh;
    width: 100%;
    background-color: #f3f4f5;
    // justify-content: space-between;
    .product{
      flex: 1;
      // background: rgba(204, 204, 204, 0.74);
      .orderinfo{
        // background: red;
        margin-bottom: 2vw;
        box-sizing: border-box;
        padding: 3vw 3vw;
        width: 100%;
        height: 30vw;
        display: flex;
        justify-content: space-around;  
        // border: 1px solid green;
        .left{
          // border: 1px solid green;
          width: 20%;
          height: 25vw;
          img{
            width: 100%;
            height: 100%;
          }
        }
        .center{
          // border: 1px solid pink;
          flex:1;
          padding: 4vw 2vw;
          font-size: 4vw;
          word-wrap:break-word;
        }
        .right{
          padding: 4vw 0;
          width: 25%;
          text-align: right;
          // border:1px solid white;
          span{
            display: block;
            // border: 1px solid yellow;
          }
        }
      }
      .orderAllMoney{
        padding: 1vw 0;
        // border:1px solid red;
        text-align: right;
        font-size: 4vw;
      }
      .returnMoney{
        // background: rgba(204, 204, 204, 0.74);
        width: 100%;
        margin-top:6vw; 
        // padding: 2vw 4vw;
       .wrap{
        //  border:2px solid #cccccc; 
        height: 8vw;
        //  padding: 0 0 2vw 0;
         display: flex;
          p{
            font-size: 4vw;
            margin-left: 2vw;
            // border: 1px solid red;
            line-height: 8vw;
            display: inline-block;
          }
          span{
            height: 8vw;
            background: rgba(204, 204, 204, 0.74);
            display: block;
            width: 70%;
            font-size: 4vw;
            line-height: 8vw;
            // margin-top: 2vw;
            padding: 0vw 4vw;
            border-radius: 2vw;
            // margin-left: 2vw;
            margin: 0 auto;
          }
       }
      }
    }
    .content{
      height: 20vw;
      // border: 1px solid red;
      div{
        // border: 1px solid blue;
    
        padding: 2vw 0 2vw 3vw;
        .radio{
          // border: 1px solid green;
          float: left;
        }
        p{
          font-size: 5vw;
          width: 30vw;
          // border: 1px solid pink;
          margin-left: 10vw;
          // float: left;
        }
        span{
          font-size: 4vw;
          margin-left: 1.5vw;
        }
      }
    }
    .footer{
      // border: 1px solid blue;
      padding: 2vw 0;
      overflow: hidden;
      .submit{
        border: 1px solid red;
        font-size: 4vw;
        padding: 1.5vw;
        border-radius: 2vw;
        color: red;
        float: right;
        margin-right: 8vw;
      }
    }

  }
</style>
