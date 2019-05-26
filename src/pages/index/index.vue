<template>
<div class="x-home">
  <!-- slide 滑动-->
  <div class="slide">
    <ul class="slideUl">
      <li
        v-for="item in slideList"
        :key="item.id"
        class="slideLi"
        @click="handleSlideToList(item.id)"
      >{{item.title}}</li>
    </ul>
  </div>
  <div class="main">
      <!-- banner 轮播-->
      <div class="banner">
        <swiper
          indicator-dots
          autoplay
          :interval="interval"
          :duration="duration"
          circular
          class="bannerImg"
        >
          <block v-for="item in imgUrls" :key="item.id">
            <swiper-item>
              <image :src="item" class="slide-image bannerImg" />
            </swiper-item>
          </block>
        </swiper>      
      </div>
      <!-- 品牌缩略图 -->
      <div class="brandShrink">
        <ul>
          <li
            v-for="item in brandShrinkList"
            :key="item+1"
          ><img :src="item"></li>
          <!-- 判断brandShrinkList 里面有几个，如果是奇数个则补一个 全部 -->
          <li v-if="(brandShrinkList.length)%2===1">全部商品</li>
        </ul>
      </div>
      <float></float>
      <!-- 明星风范 -->
      <div class="star">
        <h3>明星风范</h3>
        <view class='bannerWrap'>
          <swiper
            class='bannerSwiper'
            previous-margin="54rpx"
            next-margin='54rpx'
            indicator-color='#B5B5B5'
            indicator-active-color='#fff'
            display-multiple-items='2'
            duration='500'
            circular
            @change='StarOnChange'
          >
            <block  v-for="item in imgUrls" :key="item.id">
              <swiper-item class="swiper-item">
                <image 
                  class="imageBanner_small"
                  :src="item" 
                  :id='item.url' 
                  bindtap='imageClick'
                  >
                  </image>
              </swiper-item>
            </block>
          </swiper>
          </view>
      </div>

        <!-- solo品牌大图 + 当前品牌热销商品-->
      <div
        class="brandAddHot"
        v-for="(itemb, i) in brandAddHotList"
        :key="itemb.brandImg"
        :id="i"
        :index='i'
      >
        <div class="brand">
          <img :src="itemb.brandImg">
        </div>
        <div class="swiper-container hotSwiper">
          <swiper 
            class="swiper-wrapper"
            autoplay="autoplay"
            circular
            previous-margin="54rpx"
            next-margin='54rpx'           
            display-multiple-items='2.2'
            >
            <block
              v-for="list in itemb.brand"
              :key="list.img"
              >
              <swiper-item class="swiper-item">
                <div class="productImg">
                  <div class="wrap">
                    <img 
                    :src="list.img"
                    class="imageBanner_small" 
                    >                    
                  </div>
                </div>
              </swiper-item>
            </block>
          </swiper>
        </div>
      </div>

  </div>
</div>
</template>

<script>
import { mapGetters } from 'vuex'
import * as mutationTypes from '../../store/mutationTypes'
import float from '../../components/float'
export default {
  data () {
    return {
      // 类型滑动
      slideList: [],

      // 第一个轮播图资料
      imgUrls: [
        'https://goss1.veer.com/creative/vcg/veer/612/veer-153467745.jpg',
        'https://goss2.veer.com/creative/vcg/veer/612/veer-320661157.jpg',
        'https://goss2.veer.com/creative/vcg/veer/612/veer-153467848.jpg'
      ],
      interval: 5000,
      duration:1000,

      // 品牌缩略图
      brandShrinkList: [
        'https://goss1.veer.com/creative/vcg/veer/612/veer-153467745.jpg',
        'https://goss2.veer.com/creative/vcg/veer/612/veer-320661157.jpg',
        'https://goss2.veer.com/creative/vcg/veer/612/veer-153467848.jpg',
        'https://goss1.veer.com/creative/vcg/veer/612/veer-153467745.jpg',
        'https://goss2.veer.com/creative/vcg/veer/612/veer-320661157.jpg',
        'https://goss2.veer.com/creative/vcg/veer/612/veer-153467848.jpg'
        ],
      // 第二个轮播图 star
      StarImgUrls: [
      'https://goss.veer.com/creative/vcg/veer/612/veer-309018297.jpg',
      'https://goss1.veer.com/creative/vcg/veer/612/veer-311375360.jpg',
      'https://goss.veer.com/creative/vcg/veer/612/veer-309018297.jpg',
      'https://goss1.veer.com/creative/vcg/veer/612/veer-311375360.jpg',
      'https://goss.veer.com/creative/vcg/veer/612/veer-309018297.jpg',
      'https://goss1.veer.com/creative/vcg/veer/612/veer-311375360.jpg',
      'https://goss2.veer.com/creative/vcg/veer/612/veer-304970859.jpg'
      ],

      // 大图+热销商品
      brandAddHotList: [],

      // 储存用户信息
      userInfo: {}
    }
  },
  computed:{
    ...mapGetters([
      'cartIsNotEmpty',
      'cartTotalCount'
    ])
  },
  // 组件
  components: {
    float
  },
  // 方法
  methods: {
    handleSlideToList(id=this.slideList[0].id) {
      wx.navigateTo({
      url: `../List/main?Categoryid=${id}`,
      })
    },
    StarOnChange (event) {
      console.log(event)
    },
     //获取购物车数量
     setTabBarBadge(){
      wx.setTabBarBadge({
      index: 2,
      text:this.cartTotalCount.toString()
      })
    }
  },

  created () {
   
  },
  mounted() {
    // 渲染顶部商品类型滑动条
    this.$httpWX.get({
      url: 'http://rap2api.taobao.org/app/mock/121837/api/vi/slide',
      data: {}
    }).then(res => {
      // console.log(res)
      res.res_body.data.map((curr, index) => {
        this.slideList.push(curr)
      })
    })

    // 处理热销产品和轮播图数据
    this.$httpWX.get({
      url: 'http://rap2api.taobao.org/app/mock/121837/api/vi/hot',
      data: {}
    }).then(res => {
      // console.log(res)
      res.res_body.data.map((curr, index) => {
        this.brandAddHotList.push(curr)
        // console.log(this.brandAddHotList, 'this')
      })
    })
    console.log('首页mounted',this.cartTotalCount)
    if(this.cartIsNotEmpty === true){
      this.setTabBarBadge()
      console.log("首页mounted后",this.cartTotalCount)
    }
  }
}
</script>

<style lang="scss" scoped>
.x-home{
  width: 100%;
  height: 100%;
  overflow: hidden;
  display: flex;
  flex-direction: column;
  // slide
    .slide{
      width: 100%;
      overflow: auto;
      box-sizing: border-box;
      background: #29292b;
      padding: 1.5vw 0 1.5vw 0;
      height: 13vw;
      position: fixed;
      top: 0;
      z-index: 9999;
      ul{
          height: 10vw;
          overflow:auto;
          display: flex;
          flex-wrap: nowrap;
          // background: #313035;
        .slideLi{
          min-width: 30vw;
          height: 100%;
          display: block;
          text-align: center;
          line-height: 10vw;
          color: #7f7e83;
          background: #313035;
          font-size: 4vw;
          border-right: 0.5vw solid #29292b;
        }
      }
    }
    // main
  .main{
    width: 100%;
    height: 100%;
    margin-top:13vw; 
    overflow-x: hidden;
    background: rgba(204, 204, 204, 0.37);
    flex: 1;
    // banner-------------------上面的轮播
    .banner{
      width: 100%;
      height: 60vw;
      box-sizing: border-box;
      .bannerImg{
        width: 100%;
        height:60vw;
      }
    }
    // brandShrink 品牌缩略
    .brandShrink{
      height:auto;
      width:100%;
      overflow: hidden;
      margin-top:2vw;
      li{
        height:30vw;
        // border:0.1px solid pink;
        width:49%;
        text-align: center;
        line-height: 30vw;
        margin-top:1vw; 
        img{
          width: 100%;
          height: 100%;
        }
      }
      li:nth-child(odd){
        float:left;
      }
      li:nth-child(even){
        float:right;
      }
    }
    // star 明星风范
    .star{
      // border: 1px solid blue;
      height:70vw;
      margin-top:3vw;
      h3{
        // border:0.5px solid #424242;
        text-align: center;
        height: 10vw;
      }
      .bannerWrap{
        .bannerSwiper{
          height:59vw;
        }
        .imageBanner_small {
          height: 100%;
          width: 100%;
          transform: scale(0.9);
          transition: all 0.2s ease-in 0s;
          border-radius: 15rpx;
          bottom: -13rpx;
          margin-left: -10rpx;
          position: absolute;
        }
        img{
          width: 100%;
        }
      }
    }
    // brandAddHot 大图+热销
    .brandAddHot{
      // border: 1vw solid rgba(204, 204, 204, 0.548);
      // border:1px solid salmon;
      width: 100%;
      margin-top: 5vw;
      height: 92vw;
      .brand{
        height:52vw;
        margin-top:1vw;
        width:100%;
        text-align: center;
        img{
          height: 100%;
          width: 100%;
        }
      }
      .hotSwiper{
        height: 40vw;
        box-sizing: border-box;
        // padding: 1vw 0 0 0;
        // border: 1px solid red;
        background: rgba(204, 204, 204, 0.37);
        .swiper-wrapper{
          // border: 1px solid blue;
          height: 40vw;
          .swiper-item{
            // border: 1px solid yellow;
            height: 40vw;
            height: 100%;
             .productImg{
               width: 100%;
                height: 40vw;
              //  border: 1px solid red;
               .wrap{
                //  border: 1px solid pink;
                  height: 40vw;
                  width: 20vw;
                  img{
                    height: 40vw;
                    width: 40vw;
                    transform: scale(0.9);
                    transition: all 0.2s ease-in 0s;
                    border-radius: 15rpx;
                    bottom: -13rpx;
                    margin-left: -10rpx;
                    position: absolute;
                  }                 
               }

            }
          }
        }
      }
    }
  }
}

</style>
