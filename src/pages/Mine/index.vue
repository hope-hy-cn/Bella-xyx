<template>
  <div class="j-mine">
    <!-- 头部 -->
    <!-- 头像、用户名 -->
    <div class="user-title">  
          <img class="userinfo-avatar img" :src="userInfo.avatarUrl" alt="我的信息" type="userAvatarUrl">
          <span class="userinfo-nickname user-name">{{userInfo.nickName}}</span>
          <span class="user-grade">等级：0</span>
          <span class="user-score"> 我的积分：0</span>
    </div>
      
      <!-- 分类栏 -->
    <div class="nav">
        <ul class="nav-cls">
          <li class="my-order" @click="handleOrder()">   <i class="icon-left">&#xe67b;</i> <span>我的订单</span></li>
          <li class="my-collection" @click="collection()"><i class="icon-left">&#xe698;</i> <span> 我的收藏</span></li>
          <li class="recev-address" @click="address()"> <i class="icon-left">&#xe67f;</i><span> 我的地址</span></li>
        </ul>
        <ul class="nav-cls"> 
          <li class="about-us" @click="aboutUs()"> <i class="icon-left">&#xe69f;</i> <span>关于我们</span></li>
          <li class="my-order"> <i class="icon-left">&#xe63f;</i> <span>马上退款</span></li>
          <li class="my-collection"><i class="icon-left">&#xe651;</i> <span> 售后服务</span></li>
        </ul>
        <ul class="nav-cls"> 
          <li class="about-us"> 
            <contact-button class="contact-button"></contact-button>
              <i class="icon-left">&#xe646;</i>
             <span>联系客服</span>
           </li>
          <li class="about-us" @click="toMap()">
            <i class="icon-left">&#xe61f;</i>
            <span>商户地址</span>
          </li>
          <li class="about-us" @click="call()">
            <i class="icon-left">&#xe60d;</i>
            <span>商家电话</span>
          </li>
        </ul>
    </div>
    <!-- 积分商品兑换列表 -->
    <div class="nav-display">
      <p class="shop-exchange">
        <span style="padding: 2px 5px; border: 1px solid #000;">积分商品兑换区</span>
      </p>
      <ul class="shop-text">
          <li
            v-for="score in productScore"
            tag="li"
            :key="score.productID"
            @click="showList(score.productID)"
          >
            <img :src="score.img" alt="">
              <p style="font-size:12px;">{{score.productName}}</p>
              <div> 
                <span style="font-size:12px;">价格: <span style="text-decoration: line-through;">{{score.productPrice}}</span></span>
                <span style="font-size:12px;">积分: <span style="color:red;">{{score.productScore}}</span></span>
                <p class="prod-exchange">去兑换</p>
            </div>
          </li>
      </ul>
    </div>
  </div>
</template>

<script>
import { mapState, mapMutations } from "vuex";
import * as mutationTypes from '../../store/mutationTypes';

export default {
  name: 'mine',
  data () {
    return {
      userInfo: {},
      productScore: [],
      typeInfo: 404,
      phone: '15607114155',
    }
  },
  created () {
    this.getUserInfo()
  },
  mounted () {
    this.$httpWX.get({
      url: 'http://rap2api.taobao.org/app/mock/121839/api/v1/user',
      data: {}
    }).then(res => {
        // console.log(res.res_body)
       this.userinfo = res.res_body
        this.$httpWX.get({
          // 积分商品请求
          url: `http://rap2api.taobao.org/app/mock/121839/api/v1/user/scoreProduct`,
          data: {}
          }).then(res => {
            //  console.log(res.res_body[0])
            this.productScore = res.res_body
          })
    })
  },
  computed: {
  ...mapState(["toAddressType"]),
  },
  methods: {
    ...mapMutations([mutationTypes.handleToAddressType]),
    handleOrder(){
      wx.navigateTo({
      url: '../Order/main'
    })
    },
    collection() {
      wx.navigateTo({
      url: '../Collection/main'
    })
    },
    address() {
      // 改变状态，进入地址页
      this.handleToAddressType(this.typeInfo)
      console.log(this.toAddressType)
      wx.navigateTo({
      url: '../Address/main'
      })
    },
    toMap() {
      // 进入地图
      wx.navigateTo({
      url: '../Map/main'
      })
    },
    aboutUs() {
      wx.navigateTo({
      url: '../AboutUs/main'
    })
    },
    showList(id) {
      //  console.log(id)
      wx.navigateTo({
      url: `../ScoreDetail/main?ScoreID=${id}`
      })
    },
    getUserInfo () {
        // 调用登录接口
        wx.login({
          success: (lres) => {
            console.log(lres,'lres')
            let _code = lres.code
            wx.request({
                // 通过此 url ，获取 openid 与 unionid
                url: 'http://localhost/PHPLx/openid.php',
                data: { code: _code},
                header: {
                  'content-type': 'application/json' //默认值
                },
                success: (lres) => {
                  // 返回的 openid
                  console.log(lres)
                }
              })
            // getUserInfo 获取用户信息
            wx.getUserInfo({
              success: (res) => {
                // console.log(res,'res')
                this.userInfo = res.userInfo
              }
            })            
          }
        })
      },
      call() {
        wx.makePhoneCall({
          phoneNumber: this.phone,
          success: function(res) {
            console.log(res)
          },
          fail: function(res) {},
          complete: function(res) {},
        })
      },
    }
  }
</script>
<style lang="scss" scoped>
@font-face {
  font-family: 'iconfont';  /* project id 974053 */
  src: url('http://at.alicdn.com/t/font_974053_z3w990y82tc.eot');
  src: url('http://at.alicdn.com/t/font_974053_z3w990y82tc.eot?#iefix') format('embedded-opentype'),
  url('http://at.alicdn.com/t/font_974053_z3w990y82tc.woff2') format('woff2'),
  url('http://at.alicdn.com/t/font_974053_z3w990y82tc.woff') format('woff'),
  url('http://at.alicdn.com/t/font_974053_z3w990y82tc.ttf') format('truetype'),
  url('http://at.alicdn.com/t/font_974053_z3w990y82tc.svg#iconfont') format('svg');
}

*{
 font-size: 3vw;
 margin: 0;
 padding: 0;
}
 .j-mine{
   background-color: #e9e9e9;
   .contact-button{
     position: absolute;
     top: 0;
     left: 0;
     right: 0;
     bottom: 0;
    border: 1px solid red;
     height:19vw !important;
     width: 19vw !important;
     margin:auto;
     opacity: 0;
   }
   .user-title{
     position: relative;
     height: 30vw;
     box-sizing: border-box;
     padding: 3vw;
     vertical-align: middle;
     background-color: #424242;
     text-align: left;
     color: #fff;
      .img{
        width: 24vw;
        height: 24vw;
        border-radius: 50%;
      }
      .user-name{
        position: absolute;
        top: 10vw;
        left: 28vw;
      }
      .user-grade{
        position: absolute;
        top: 18vw;
        left: 28vw;
        font-size: 3vw;
      }
      .user-score{
        position: absolute;
        top: 18vw;
        left: 50vw;
        font-size: 3vw;
      }
   }
   .nav{
       .nav-cls{
          display: flex;
          flex-direction: row;
        li{
          height: 19vw;
          width: 33vw;
          line-height: 10vw;
          text-align: center;
          background-color: #fff;
          border-bottom: 1px solid #ccc;
          position: relative;
          font-size: 4vw;
          i{
          // vertical-align: middle;
          font-family: "iconfont";
          font-size: 8vw;
          }
        }
       }
   }
   .nav-display{
     .shop-exchange{
      padding: 5vw;
      text-align: center;
      font-size: 5vw; 
      // border: 1px solid #000;
     }
     .shop-text{
        >li{
          float: left;
          width: 49%;
          height: 50vw;
          // background-color: #bfa;
          // border: 1px solid #ccc;
          margin-right:1px; 
          margin-bottom:1px;
          box-sizing: border-box;
          padding: 0 1vw;
          
          img{
            width: 180px;
            height: 100px;
          }
        }
        .prod-exchange{
          font-size: 4vw;
          border: 1px solid #ccc;
          width:15vw;
          background: #FF8A65;
          color:#fff;
          padding:1vw;
          border-radius:2vw;
          text-align:center;
        }
      }
   }
 }
</style>


