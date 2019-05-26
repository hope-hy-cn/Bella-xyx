<template>
<!-- 积分详情页 -->
  <div class="list-detail">
    <!-- 积分商品详情轮播图 -->
    <swiper
      class="swiper"
      :indicator-dots="true"
      :autoplay="true"
      :interval="2000"
      :duration="1000"
      :circular="circular"
    >
      <block v-for="detailSwiper in DetailList.swiper" :key="detailSwiper.id">
        <swiper-item>
          <image :src="detailSwiper.img" class="slide-image" width="750rpx" height="360px" />
        </swiper-item>
      </block>
    </swiper>
    <!-- 积分商品详情（商品名称/积分兑换/商品简介/选择尺码/选择颜色） -->
     <div class="desc">
        <p style="margin:5px"> <span>商品名称：</span>{{DetailList.productDetailName}}</p>
        <p style="margin:5px; color:red;"><span>积分兑换: </span>{{DetailList.scorePrice}}</p>
        <p style="margin:5px"><span>商品简介: </span>{{DetailList.desc}}</p>
      </div>
    <!-- <p class="desc-Size">尺码： <span style="">XL</span><span>L</span><span>M</span><span>S</span></p>   
    <p class="desc-Color">颜色： <span>白色</span><span>蓝色</span><span>红色</span>
    <span>绿色</span>
    </p> -->
    <!-- 商品详情描述图片 -->
    <div>
      <div class="product-descImg" v-for="descSwip in DetailList.descSwiper" :key="descSwip.id">
        <image :src="descSwip.images" />
      </div>
    </div>
    <div class="detail-footer">
      <!-- 立即兑换按钮 -->
      <ul>
        <li class="big" @click="immediatelyChange">
          <span class="gotobuy">立即兑换</span>
        </li>
      </ul>
    </div> 
  </div>
</template>

<script>
import { mapMutations } from "vuex";
import * as mutationTypes from '../../store/mutationTypes';
export default {
  data() {
    return {
      ScoreID: "",
      title: "hello ,Virgo",
      DetailList: {}
    };
  },
  mounted() {
    // console.log(this)
    // 根据积分商品兑换区传过来的id，去请求数据
    const ScoreID = this.$mp.query.ScoreID;
    this.$httpWX.get({
        url: `http://rap2api.taobao.org/app/mock/121839/api/v1/user/scoreProductDetail/${ScoreID}`,
        data: {}
      })
      .then(res => {
        console.log(res.data);
        this.DetailList = res.data
      });
  },
  methods: {
    // 积分兑换
    ...mapMutations([
      mutationTypes.cartToSettInfoHandle
    ]),
    //积分商品详情的‘立即兑换’按钮
    immediatelyChange () {
      const that = this;
      wx.showModal({
      title: '确认要兑换该商品吗？',
      // content: '积分商品',
      showCancel: true,
      cancelText: '取消',
      cancelColor: '#f00',
      confirmText: '确定',
      confirmColor: '#0f0',
      success: function(res) {
         // 模态框的‘确认’按钮
       if(res.confirm === true) {
         //跳转到结算页
        that.gotoScoreSettlement()
          // console.log("兑换成功！")
          // wx.showToast({
          //   title: '兑换成功！',
          //   icon: 'success',
          //   duration: 1000
          // })
        }else{
         console.log("你取消了该商品的兑换")
       }
      },
      complete: function(res) {
         console.log(res)
      },
    })
    },
    gotoScoreSettlement() {
      // console.log(this)
      this.cartToSettInfoHandle({vm: this, settInfo: '', ScoreInfo: this.DetailList})
    }
  }
};
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
.desc-Size{
  margin: 5px;
  >span{
    width:30px;
    height:30px;
    text-align:center;
    border:1px solid #FF8A65;
    font-size:15px;
    padding: 4px 10px;
    margin-right: 20px;
    color:#666;
  }
}
.desc-Color{
  margin: 15px 5px;
  >span{
    width:50px;
    height:50px;
    text-align:center;
    border:1px solid #FF8A65;
    font-size:18px;
    padding: 4px 10px;
    margin-right: 10px;
    color:#666;
  }
}
.detail-footer{
    height: 15vw;
    background: #dedede;
    width: 750rpx;
    position: fixed;
    bottom: 0;
    left: 0;
    ul{
      // display: flex;
      //   justify-content: space-between;
      li{
        width: 21.7%;
        height: 15vw;
        display: flex;
        flex-direction: column;
        position: absolute;
        bottom: 0;
        right: 0;
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
        .badge {
          width: 4vw;
          height: 4vw;
          line-height: 4vw;
          font-size: 2vw;
          // position: absolute;
          top: -2vw;
          left:5vw;
          z-index: 9999;
          text-align: center;
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
</style>
