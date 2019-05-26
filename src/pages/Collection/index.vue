<template>
  <div class="collection">
    <div class="collection-ad">
      <img src="https://shop.io.mi-img.com/app/shop/img?id=shop_7e204436623ea7722997b81cc1a55709.jpeg&w=786&h=395&t=webp" alt="">
    </div>
    <div class="collection-main" v-if="isNotEmpty">
      <!-- 数据渲染 -->
      <div class="collection-head">
        <span class="edit" @click="isCollectionsItemDetlete">{{isDelete ?'完成': '管理'}}</span>
      </div>
      <div class="main-collect" v-if="isNotEmpty">
        <div
          class="collection-one"
          v-for="item in collections"
          :key="item.id"
        >
          <div class="checked" v-if="isDelete">
            <input
              type="checkbox"
              :checked='item.isChecked'
              @click="checkedItemChange(item.id)"
            >
          </div>
          <div class="img">
            <img :src="item.imgs[0].img" alt="">
          </div>
          <div
            class="info"
            @click="gotodetail(item.id)">
            <div class="desc">{{item.desc}}</div>
            <div class="price">￥{{item.prices}}</div>
          </div>
        </div>
      </div>
      <!-- 数据处理 -->
      <div
          class="collection-foot"
          v-if="isDelete"
        >
          <span>
            <!-- <radio-group class="radio-group" @blur="radioChange">
                <radio :checked="isAllItemChecked"/>全选
            </radio-group> -->
            <input
              type="checkbox"
              :checked='isAllItemChecked'
              @click="handleallCheckedChange"
            >全选
          </span>
          <span
            :class="isActive ? 'delete active':'delete'"
            @click="isRequiredDelete"
          >删除
          </span>
      </div>
    </div>
    <!-- 收藏为空时，跳去首页 -->
    <div class="collection-empty" v-else>
        <div class="img">
          <img src="https://m.youpin.mi.com/youpin/static/m/res/images/cart_grey.png" />
        </div>
        <p>亲您还没有收藏商品哦~</p>
        <div class="tohome" @click="handelToHome"><span>去逛逛</span></div>
      </div>
  </div>
</template>

<script>
import { mapState, mapMutations, mapGetters } from 'vuex'
import * as mutationTypes from '../../store/mutationTypes'
export default {
  name: 'collection',
  data () {
    return {
      isDelete: false,
      currentChecked:true
    }
  },
  computed: {
    ...mapState(['collections']),
    ...mapGetters(['isAllItemChecked', 'isActive']),
    // 收藏页是否有数据
    isNotEmpty () {
      return Array.isArray(this.collections) && this.collections.length !== 0
    }
  },
  // created(){
  //   this.currentChecked = currentChecked || false
  // },
  // mounted() {
  //   console.log("收藏页中",this.collections)
  // },
  methods: {
    ...mapMutations([
      // 切换状态
      mutationTypes.checkedItemChange,
      // 全选
      mutationTypes.allCheckedChange,
      // 删除收藏
      mutationTypes.isRequiredItemDelete
    ]),
    // 当购物车商品为空，点击跳转至首页
    handelToHome() {
        wx.switchTab({
          url: '../index/main'
        })  
    },
    // 全选按钮
    handleallCheckedChange(e){
      console.log("abc")
      console.log(e)
      // console.log(e.currentTarget.dataset)
      // console.log("类型",typeof(this.isAllItemChecked))
      // this.currentChecked = !this.currentChecked
    },
    // 切换管理与删除界面
    isCollectionsItemDetlete () {
      this.isDelete = !this.isDelete
    },
    // 删除按钮激活状态与未激活状态提示
    isRequiredDelete () {
      if (!this.isActive) {
        wx.showToast({
          icon:'none',
          title: '亲请选择商品哦 !',
          duration: 2000
        })
      } else {
        this.isRequiredItemDelete()
         wx.showToast({
          icon:'none',
          title: '删除商品成功 !',
          duration: 1000
        })
      }
    },
    // 跳转去详情页面
    gotodetail(id){
      // console.log(id)
      //通过商品id，跳转去详情页
      wx.navigateTo({
      url: `../Detail/main?Productid=${id}`,
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
  .collection{
    width: 100%;
    height: 100vh;
    display: flex;
    flex-direction: column;
    &-ad{
        width: 100%;
        height: 0;
        padding-bottom: percentage(80/300);
        box-sizing: border-box;
        border-radius: 4vw;
        border-bottom:0.1vw solid #e7e7e7;
        overflow: hidden;
        img{
          width: 100%;
          border-radius: 4vw;
        }
      }
    &-head{
      width: 100%;
      height: 10vw;
      line-height: 12vw;
      .edit{
        text-align: center;
        height: 10vw;
        line-height: 10vw;
        font-size: 4vw;
        float: right;
        margin-right: 3vw;
        padding: 0 2vw;
      }
    }
    &-main{
      width: 100%;
      flex:1;
      display: flex;
      flex-direction: column;
      .main-collect{
        width: 100%;
        box-sizing: border-box;
        padding: 0 3vw;
        overflow-x: hidden;
        flex: 1;
        .collection-one{
          width: 100%;
          height: 30vw;
          display: flex;
          background-color: #f3f4f5;
          margin-bottom: 5vw;
          border-radius: 3vw;
          .checked{
            width: 10%;
            text-align: center;
            line-height: 35vw;
          }
          .img{
            width: 30%;
            border-radius: 3vw;
            height: 100%;
            box-sizing: border-box;
            padding: 2vw;
            overflow: hidden;
            display: table-cell;
            vertical-align: middle;
            text-align: center;
            img{
              width: 100%;
              height: 100%;
            }
          }
          .info{
              flex:1;
              display: flex;
              flex-direction: column;
              font-size: 4vw;
              box-sizing: border-box;
              padding: 5vw 2vw;
              .desc{
                height:20vw;
                margin-bottom: 2vw;
                overflow: hidden;
                text-overflow:ellipsis;
                line-height: 6vw;

              }
            div{
              width: 100%;
              height: 50%;
              word-wrap:break-word;
            }
            .price{
                color:#f00;
            }
          }
        }
      }
      .collection-foot{
          box-sizing: border-box;
          padding: 3vw;
          width: 100%;
          height: 15vw;
          line-height: 9vw;
          border-top:0.1vw solid #e7e7e7;
          background-color: #e5e5e5;
          font-size: 4vw;
          display: flex;
          justify-content: space-between;
          .delete{
            width: 20vw;
            height: 9vw;
            line-height: 9vw;
            text-align: center;
            background-color: #757575;
            color:#fff;
            border-radius: 3vw;
          }
          .active{
            background-color: #FF8A65;
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
          height: 18vh;
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
