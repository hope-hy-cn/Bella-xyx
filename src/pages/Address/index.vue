<template>
  <div class="address">
    <div class="address-main">
      <div class="manyaddress" v-if="isNotEmpty">
        <div
          class="address-one"
          v-for="add in address"
          :key="add.phone"
        >
          <div class="username-phone">
            <span class="username">{{add.username}}</span>
            <span class="userphone">{{add.phone}}</span>
          </div>
          <div class="addressinfo">
            <p class="isdefault" v-if="add.isDefault">默认</p>
            <p class="detailed-address" @click="goToWhere(add.addID)">
              {{add.region}}{{add.addsite}}
            </p>
            <span
              class="icon"
              v-html="'&#xe616;'"
              @click.stop="handleToEditAddress(add.addID)"
            ></span>
          </div>
        </div>
      </div>
      <div class="nullAddress" v-else>
        <div class="content">
            <span><img src="https://m.youpin.mi.com/youpin/static/m/res/images/std_shop_details_icon_wrong.png" alt=""></span>
            <p>您还没有收货地址，请点击下方新建</p>
        </div>
      </div>
    </div>
    <div class="address-foot" @click="handleToAddAddress">
      <div class="addAddress">+添加地址</div>
    </div>
  </div>
</template>

<script>
import { mapState, mapMutations } from 'vuex'
import * as mutationTypes from '../../store/mutationTypes'

export default {
  name: 'Address',
  data () {
    return {
      path: '',
      addInfo: {},
      prePages: ''
    }
  },
  computed: {
    ...mapState(['address', 'isToOrderDetail', 'toAddressType']),
    isNotEmpty () {
      // 默认地址排序，有默认标志的始终排第一
      this.sortAddressToLocalStorage()
      return Array.isArray(this.address) && this.address.length !== 0
    }
  },
  methods: {
    ...mapMutations([
      mutationTypes.sortAddressToLocalStorage,
      mutationTypes.handleToAddressType
    ]),
    // 点击跳转至添加地址页
    handleToAddAddress () {
      // 点击添加时，将toAddressType 传到添加地址页面
      this.handleToAddressType = this.toAddressType
      wx.navigateTo({
        url: '../AddAddress/main'
      })
    },
    // 点击跳转至编辑地址页
    handleToEditAddress (addID) {
      wx.navigateTo({
        url: `../EditAddress/main?addID=${addID}`
      })
    },
    // 当从未付款订单点击过来，执行该方法，则点击之后，回跳至该订单
    goToWhere (addID) {
      console.log('地址判断',this.isToOrderDetail)
      if (this.isToOrderDetail === true) {
        this.addInfo = this.address.filter(item => item.addID === addID)[0]
        const {username, phone, region, addsite} = this.addInfo
        wx.navigateTo({
          url: `../OrderDetail/main?username=${username}&phone=${phone}&region=${region}&addsite=${addsite}`
        })
      }
      // 100为 可以跳转回结算页面
      if (this.toAddressType === 100) {
        this.addInfo = this.address.filter(item => item.addID === addID)[0]
        const {username, phone, region, addsite} = this.addInfo
        wx.navigateTo({
          url: `../Settlement/main?username=${username}&phone=${phone}&region=${region}&addsite=${addsite}`
        })
      }
    }
  },
  onUnload() {
    wx.reLaunch({
      url: '../Mine/main'
    })
  }
}
</script>

<style lang="scss" scoped>
@font-face {
  font-family: 'iconfont';  /* project id 921051 */
  src: url('//at.alicdn.com/t/font_921051_aoir3ctf5gp.eot');
  src: url('//at.alicdn.com/t/font_921051_aoir3ctf5gp.eot?#iefix') format('embedded-opentype'),
  url('//at.alicdn.com/t/font_921051_aoir3ctf5gp.woff') format('woff'),
  url('//at.alicdn.com/t/font_921051_aoir3ctf5gp.ttf') format('truetype'),
  url('//at.alicdn.com/t/font_921051_aoir3ctf5gp.svg#iconfont') format('svg');
}
.address{
    width: 100%;
    height: 100vh;
    overflow: hidden;
    display: flex;
    flex-direction: column;
    &-main{
      width: 100%;
      height: 100%;
      flex: 1;
      overflow-x: hidden;
      .nullAddress{
         .content{
            height: 70vw;
            width: 70vw;
            position: absolute;
            top: 0;
            left: 0;
            right: 0;
            bottom: 0;
            margin: auto;
            text-align: center;
            span{
              width: 35vw;
              height: 40vw;
              display: inline-block;
              img{
                width: 100%;
                height: 100%;
              }
            }
            p{
              font-size: 4vw;
              color:#ccc;
            }
        }
      }
      .manyaddress{
        width: 100%;
        .address-one{
          width: 100%;
          height: 30vw;
          border-bottom:0.1vw solid #E0E0E0;
          box-sizing: border-box;
          padding: 5vw;
          .username-phone{
            width: 100%;
            height: 8vw;
            line-height:8vw;
            display: flex;
            justify-content: space-between;
            font-size: 4vw;
          }
          .addressinfo{
            width: 100%;
            height: 12vw;
            display: flex;
            font-size: 4vw;
            .isdefault{
              color:#b71c1c;
              background-color: #fce4ec;
              width: 8vw;
              height: 5vw;
              line-height: 5vw;
              text-align: center;
            }
            .detailed-address{
              flex:1;
              margin-left:2vw;
              height: 12vw;
              color: #9E9E9E;
              text-overflow: ellipsis;
            }
            .icon{
              display: inline-block;
              width: 7vw;
              font-family: 'iconfont';
              font-size: 7vw;
            }
          }
        }
      }
    }
    &-foot{
      width: 100%;
      height: 20vw;
      line-height: 10vw;
      text-align: center;
      box-sizing: border-box;
      padding: 5vw;
      font-size: 4vw;
      div{
        width: 100%;
        height: 100%;
        border:0.1vw solid #F48FB1;
      }
    }
  }
</style>
