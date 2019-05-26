<template>
  <div class="detail">
    <!-- 上面 -->
    <div class="detail-main">
      <!-- 轮播图 -->
      <swiper class="swiper" :indicator-dots="indicatorDots" :autoplay="autoplay" :interval="interval" :duration="duration" :circular="circular">
        <block v-for="item in details.swiper" :key="item.id">
            <swiper-item>
                <image :src="item.img" class="slide-image" mode="aspectFill"/>
            </swiper-item>
        </block>
      </swiper>
       <!-- 商品名称、价格、描述、销量 -->
      <div class="desc">
        <h3>{{details.title}}</h3>
        <p>{{details.desc}}</p>
        <span>￥{{details.prices}}</span>
        <span class="sales">销量{{details.sales}}</span>
      </div>
      <!-- 商品颜色 -->
      <div class="color">
          <p>颜色</p>
          <span
            v-for="item in details.colors"
            @click="colorhandle(item.colorid)"
            :class="{'red': item.isActive}"
            :key="item.colorid"
          >{{item.color}}</span>
      </div>
      <!-- 商品的尺码 -->
      <div class="size">
        <p>尺码</p>
        <span
          v-for="item in details.sizes"
          @click="sizehandle(item.sizeid)"
          :class="{'red':item.isActive}"
          :key="item.sizeid"
        >{{item.size}}</span>
      </div>
       <!-- 商品的服务 (handleserver)-->
       <!-- 底部还有一个弹框，已去掉 -->
      <div class="serve">
        <p>服务：<span class="span1">></span></p>
        <p class="conent" v-for="item in details.server" :key="item.serid"><span class="icon">&#xe63c;</span>{{item.ser}}</p>
      </div>
      <!-- 商品的大图简介 -->
      <div class="imgs" v-for="item in details.imgs" :key="item.imgid">
        <img :src="item.img" :alt="item.imgid">
      </div>
      <!-- 商品的搭配列表 -->
      <div class="match">
        <h2>搭配商品</h2>
        <div 
        class="product"
        v-for="item in details.match"
         @click="handleToMatch(item.id)"
        :key="item.id"
        >
        <img :src="item.img" :alt="item.title">
          <h3>{{item.title}}</h3>
          <p class="desc">{{item.desc}}</p>
          <p class="prices">￥{{item.prices}}<span>销量:{{item.sales}}</span></p>
        </div>
      </div>
    </div>
    <!-- 尾部 -->
    <div class="detail-footer">
      <!-- 底部按钮 -->
      <ul>
        <!-- 跳转去首页 -->
        <li @click="handleToHome">
          <span class="icon">&#xe601;</span>
          <span class="title">首页</span>
        </li>
        <!-- 收藏 -->
        <li @click.stop="handleCollection({info: collecInfo})">
          <!-- <span v-html="isNoCollection" :class="{'icon':true,'color':color}"></span> -->
          <span v-html="isActive ? '&#xe603;':'&#xe6ed;'" :class="{'icon':true,'color':color}"></span>

          <span class="title">收藏</span>
        </li>
        <!-- 查看购物车 -->
        <li @click="handleToCart">
          <span class="badge" v-if="cartIsNotEmpty === true">{{cartTotalCount}}</span>
          <span class="icon">&#xe602;</span>
          <span class="title">购物车</span>
        </li>
        <!-- 立即购买 -->
        <li class="big" @click="gotoSettlement">
          <span class="gotobuy">立即购买</span>
        </li>
        <!-- 加入购物车 -->
        <li class="big">
          <span
          class="addtocart"
          @click.stop="judge"
          >加入购物车</span>
        </li>
      </ul>
    </div>
  </div>
</template>

<script>
import { mapMutations, mapGetters } from 'vuex'
import * as mutationTypes from '@/store/mutationTypes'

export default {
  data() {
    return {
    // 商品的id
     Productid:Number,
    // 请求回来数据
     details: {},
    // 轮播图参数
     indicatorDots: false,
     autoplay: true,
     interval: 2000,
     duration: 1000,
     circular:true,
      // 收藏星星的样式
      color: false,
      isActive: false,
     collecInfo: { // 添加至收藏页的信息
      id: '',
      desc: '',
      imgs: [{}],
      prices: Number
     },
     cartInfo: { // 添加至购物车信息
        id: '1',
        img: [{}],
        title: '',
        price: Number,
        size: Number,
        color: String
      }
    };
  },
  // 利用vue本身的生命周期做数据请求，优化通过keep-alive
  mounted(){
    // 获取List页面传过来的Productid,用来在mounted做request请求
    console.log(this)
    this.Productid = this.$mp.query.Productid
    //请求Deatil页面数据
    this.$httpWX.get({
      // url: `http://rap2api.taobao.org/app/mock/121682/api/v1.0/detail/${this.Productid}`,
      url: `http://rap2api.taobao.org/app/mock/121682/api/v1.0/detail/1`,
      data: {}
    }).then(res => {
      // console.log(res.res_body)
      this.details = res.res_body.data
    })
  },
  methods:{
    ...mapMutations([
      // 添加至购物车
      mutationTypes.addProductToCart,
      // 加入收藏
      mutationTypes.addProductToCollection,
      // 立即购买
      mutationTypes.cartToSettInfoHandle
    ]),
    //点击搭配列表，渲染该数据的详情，页面重新渲染
    handleToMatch(id){
      console.log(id)
      // 重新跳转详情页
      this.isActive=false,
      this.color= false,
      wx.navigateTo({
      url: `../Detail/main?Productid=${id}`,
      })
      //重新做request请求,页面不会全部刷新，所以底部的星星状态有问题
      // console.log(id)
      // this.$httpWX.get({
      // url: `http://rap2api.taobao.org/app/mock/121682/api/v1.0/detail/${id}`,
      // data: {}
      // }).then(res => {
      //   this.details = res.res_body.data
      //   this.isActive=false,
      //   // 回到顶部
      //   wx.pageScrollTo({
      //     scrollTop: 0,
      //   })
      //   // 页面重新加载
      //   window.location.reload()
      //   onLoad(){
      //     Object.assign(this.$data, this.$options.data())
      //   }
      // })
    },
    // 颜色选择，设置样式，并更新cartInfo的值
    colorhandle (id) {
      // 筛选出该id，然后设置边框颜色为红色，将其他边框颜色设置为灰色
      // 想法：假数据定义一个状态，isColorSelect,默认都为false
      // 根据id，筛选出点击的元素，将其isColorSelect状态设为true
      // console.log(id)
      this.details.colors = this.details.colors.map((current) => {
        if ( Number(current.colorid) === Number(id)) {
          current.isActive = true
          // 加入购物车的数据
          this.cartInfo.id = this.details.id
          this.cartInfo.img = this.details.imgs
          this.cartInfo.title = this.details.title
          this.cartInfo.price = this.details.prices
          this.cartInfo.color = current.color
          // console.log(current)
        } else {
          current.isActive = false
        }
        return current
      })
      // 当颜色与尺码都选择时，提示选择尺码与颜色的框消失
      const color = this.details.colors.some(current => current.isActive === true)
      const size = this.details.sizes.some(current => current.isActive === true)
      if (color === true && size === true) {
        this.ishidden = true
      }
    },
    // 尺码选择，设置样式，并更新cartInfo的值
    sizehandle (id) {
      // console.log(id)
      this.details.sizes = this.details.sizes.map((current) => {
        if (current.sizeid === id) {
          current.isActive = true
          // 加入购物车的数据
          this.cartInfo.id = this.details.id
          this.cartInfo.img = this.details.imgs
          this.cartInfo.title = this.details.title
          this.cartInfo.price = this.details.prices
          this.cartInfo.size = current.size
          // console.log(typeof(current.size))
          // console.log(this.cartInfo)
        } else {
          current.isActive = false
        }
        return current
      })
      // 当颜色与尺码都选择时，提示选择尺码与颜色的框消失
      const color = this.details.colors.some(current => current.isActive === true)
      const size = this.details.sizes.some(current => current.isActive === true)
      if (color === true && size === true) {
        this.ishidden = true
      }
    },
    // 点击首页，回到首页
    handleToHome() {
      wx.switchTab({
      url: '../index/main',
      })
    },
    // 立即结算
    gotoSettlement () {
      // 立即结算，要将当前商品添加到结算页中
      // console.log(this.cartInfo)
      const color = this.details.colors.some(current => current.isActive === true)
      // console.log(color)
      const size = this.details.sizes.some(current => current.isActive === true)
      // console.log(size)
      if (color === true && size === true) {
        this.cartToSettInfoHandle({vm: this, settInfo: this.cartInfo})
      } else {
        wx.showToast({
          icon:'none',
          title: '请选择颜色和尺码 !',
          duration: 2000
        })
      }
    },
    // 点击加入购物车，判断颜色与尺码是否选择，没选择时提醒选择
    judge () {
      const color = this.details.colors.some(current => current.isActive === true)
      // console.log(color)
      const size = this.details.sizes.some(current => current.isActive === true)
      // console.log(size)
      if (color === true && size === true) {
        this.addProductToCart(this.cartInfo)
      } else {
         wx.showToast({
          icon:'none',
          title: '请选择颜色和尺码 !',
          duration: 2000
        })
      }
    },
    // 点击购物车，跳转到购物车
    handleToCart() {
      wx.switchTab({
      url: '../Cart/main',
      })
    },
    // 添加商品至收藏页,这里有bug，商品搭配页不会重新刷新页面，上一个的收藏，这个页面依旧是红色的
    handleCollection ({info: collecInfo}) {
      // 变颜色没有效果，设计V-html,之后再想办法，再加一个color,让颜色变红
      //加入收藏页的数据
      this.collecInfo.id=this.details.id
      this.collecInfo.desc=this.details.title
      this.collecInfo.imgs=this.details.imgs
      this.collecInfo.prices=this.details.prices
      // 收藏时的状态，isActive为false时表示取消收藏
      this.isActive = !this.isActive
      this.color = !this.color
      // 点击就会执行addProductToCollection这个方法，当id在时，表示取消收藏，通过id过滤掉
      this.addProductToCollection({info: collecInfo, isActive: this.isActive})
    }
  },
  computed: {
    ...mapGetters(['cartIsNotEmpty', 'cartTotalCount'])
  }
}
</script>

<style lang="scss" scoped>
@font-face {
  font-family: 'iconfont';  /* project id 974921 */
  src: url('http://at.alicdn.com/t/font_974921_3ov103t6et.eot');
  src: url('http://at.alicdn.com/t/font_974921_3ov103t6et.eot?#iefix') format('embedded-opentype'),
  url('http://at.alicdn.com/t/font_974921_3ov103t6et.woff') format('woff'),
  url('http://at.alicdn.com/t/font_974921_3ov103t6et.ttf') format('truetype'),
  url('http://at.alicdn.com/t/font_974921_3ov103t6et.svg#iconfont') format('svg');
}
.detail{
  width: 100%;
  display: flex;
  height: 100vh;
  flex-direction: column;
  position: relative;
  &-main{
    flex: 1;
    overflow-x: hidden;
    .swiper {
      height: 376rpx !important;
      image {
        height: 100%;
        width: 100%;
      }
    }
    .desc{
      padding: 0 3vw;
      background-color: white;
      padding-top: 1vw;
      h3{
        font-size: 5.5vw;
        margin-bottom: 1vw;
      }
      p{
        font-size: 3.5vw;
        margin-bottom: 2vw;
      }
      span{
        font-size: 5.5vw;
        color: red;
      }
      .sales{
        float: right;
        font-size: 4vw;
      }
    }
    .color{
        border-top: 1px solid #EEEEEE;
        padding: 3vw 4vw;
        p{
          margin-bottom: 3vw;
          font-size: 4vw;
        }
        span{
          font-size: 4vw;
          display: inline-block;
          border: 1px solid #EEEEEE;
          padding: 2vw 2vw;
          margin-right: 2vw;
        }
        .red{
          border-color: #f44336;
        }
      }
    .size{
        border-top: 1px solid #EEEEEE;
        padding: 3vw 4vw;
        p{
          margin-bottom: 3vw;
          font-size: 4vw;
        }
        span{
          font-size: 4vw;
          display: inline-block;
          border: 1px solid #EEEEEE;
          padding: 2vw 2vw;
          margin-right: 2vw;
        }
        .red{
          border-color: #f44336;
        }
      }
    .serve{
      border-top:1px solid #EEEEEE;
      padding: 1vw 4vw;
      background-color: white;
      font-size: 4vw;
      .span1{
        float: right;
        font-size: 5.5vw;
        height: 5vw;
        line-height: 5vw;
      }
      .conent{
        margin: 1vw 0;
        padding-left: 10vw;
        .icon{
          font-family: 'iconfont';
          color: red;
          font-size: 4.5vw;
          padding: 0 2vw;
        }
      }
      .imgs{
        width: 100%;
        height: 0;
        padding-top: percentage( 2160 / 1080 );
        img{
          width: 100%;
          position: absolute;
          top: 0;
          left: 0;
        }
      }
    }
    .match{
      h2{
        font-size: 5.5vw;
      }
      .product{
       width: 49%;
       height: 62vw;
       border-right: 1px solid #dedede;
       border-bottom: 1px solid #dedede;
       float: left;
       background-color: white;
       margin-bottom: 2vw;
       z-index: 999999;
       img{
         display: block;
         width: 100%;
         height: 40vw;
         background-color: orange;
       }
       h3{
         margin:1vw 0;
         text-align: center;
         font-size: 4.5vw;
       }
       .desc{
         font-size: 4vw;
         text-align: center;
       }
       .prices{
         margin-top: 1vw;
         font-size: 4.8vw;
         color: #f48fb1;
         margin-left: 2vw;
         span{
           float: right;
           height: 100%;
           margin-right: 2vw;
           font-size: 3.8vw;
           line-height: 6vw;
         }
       }
     }
    }
  }
  &-footer{
    height: 15vw;
    background: #dedede;
    ul{
      display: flex;
      li{
        width: 16.7%;
        height: 15vw;
        display: flex;
        flex-direction: column;
        position: relative;
        span{
          display: inline-block;
        }
        .icon{
          font-family: 'iconfont';
          font-size: 7vw;
          height: 9vw;
          text-align: center;
          line-height: 9vw;
        }
        .color{
          color: red;
        }
        .title{
          height: 6vw;
          line-height: 6vw;
          font-size: 4vw;
          text-align: center;
        }
        .gotobuy{
          width: 100%;
          height: 100%;
          text-align: center;
          line-height: 15vw;
          background-color: #f44336;
          color: white;
          font-size: 4.5vw;
        }
        .addtocart{
          width: 100%;
          height: 100%;
          text-align: center;
          line-height: 15vw;
          color: white;
          font-size: 4.5vw;
          background-color: #FFAB00;
        }

        //购物车小红点
        .badge {
          background-color: red;
          color: #dedede;
          width: 6vw;
          height: 5vw;
          line-height: 5vw;
          font-size: 4vw;
          position: absolute;
          top: -2vw;
          left: 7vw;
          z-index: 9999;
          text-align: center;
          border-radius: 3vw;
        }
      }
      .red{
        background-color:red;
      }
      .big{
        width: 35%;
      }
    }
  }
  // .serverconent{
  //   z-index: 999999 !important;
  //   display: block;
  //   width: 100%;
  //   .conent{
  //     background: white;
  //     padding: 2vw 3vw;
  //     h3{
  //       text-align: center;
  //       padding: 1vw 0;
  //       font-size: 5vw;
  //     }
  //     p{
  //       line-height: 6vw;
  //       white-space: pre-wrap;
  //     }
  //   }
  // }
}
</style>
