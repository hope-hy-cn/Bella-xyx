<template>
  <div class="addaddress">
    <div class="addaddress-main">
      <form class="form-address">
        <div class="section">
          <span class="section__title username">收货人姓名</span>
          <input
            type="text"
            name="username"
            @change="bindUserNameChange"
            :value="username" />
        </div>
        <div class="section">
          <span class="section__title phone">联系方式</span>
          <input
            type="tel"
            name="phone"
            @change="bindPhoneChange"
            :value="phone"/>
        </div>
        <picker
          mode="region"
          @change="bindRegionChange"
          :value="region"
          :customItem ="customItem"
        >
          <div class="picker section">
             <span class="section__title ">选择地址</span>
             <div class="addressinfo">{{region[0]}}，{{region[1]}}，{{region[2]}}</div>
          </div>
        </picker>
        <div class="section">
          <span class="section__title addsite">详细地址</span>
          <input
            name="addsite"
            @change="bindAddSiteChange"
            :value="addsite"
          />
        </div>
        <div class="section">
          <span class="section__title zipcode">邮政编码(选填)</span>
          <input
            name="zipcode"
            @change="bindZipcodeChange"
            :value="zipcode"
          />
        </div>
        <div class="section_gap">
          <span class="section__title isDefaultAddress">设为默认地址</span>
          <switch
            class="default-switch"
            name="isDefault"
            @change="bindIsDefaultChange"
            :value="isDefault" />
        </div>
        <div class="btn-area">
          <button form-type="reset" @click="addAddress()">保存</button>
          <button form-type="reset">重置</button>
        </div>
      </form>
    </div>
  </div>
</template>

<script>
import { mapState, mapMutations } from 'vuex'
import * as mutationTypes from '../../store/mutationTypes'
export default {
  name: 'addAddress',
  data () {
    return {
      region: ['四川省', '成都市', '青羊区'],
      customItem: '',
      username: '', // 收货人姓名
      phone: null, // 联系方式
      addsite: '', // 详细地址
      zipcode: '000000', // 邮编（选填）
      isDefault: false
    }
  },
  computed: {
    ...mapState(['address','toAddressType'])
  },
  methods: {
    ...mapMutations([
      mutationTypes.addAddressToLocalStorage,
      mutationTypes.handleToAddressType
      ]),
    // 同步改变地址
    bindRegionChange (e) {
      this.region = e.mp.detail.value
    },
    // 同步改变用户名
    bindUserNameChange(e){
      this.username = e.mp.detail.value
    },
    // 同步改变联系方式
    bindPhoneChange(e){
      if(!(/^1[34578]\d{9}$/.test(e.mp.detail.value))){
        this.phone = null;  // 电话号码有误，则清空input框的值,此时无效
         wx.showToast({
          title: '电话号码有误',
          image: '../../static/Icons/wrong.png',
          duration: 2000
        }) 
      } else {
        this.phone = e.mp.detail.value
      }
    },
    // 同步改变详细地址
    bindAddSiteChange(e){
      this.addsite = e.mp.detail.value
    },
    // 同步改变邮政编码
    bindZipcodeChange(e){
      this.zipcode = e.mp.detail.value
    },
    // 同步改变是否设为默认地址
    bindIsDefaultChange(e){
      this.isDefault = e.mp.detail.value
    },
    // 添加地址至本地存储
    addAddress () {
      // 将toAddressType 传回地址页
      this.handleToAddressType = this.toAddressType
      // vuex 将地址存到本地
      this.addAddressToLocalStorage(
        {
          username: this.username,
          phone: this.phone,
          region: this.region,
          addsite:this.addsite,
          zipcode: this.zipcode,
          isDefault:this.isDefault
        }
      )
      // 保存之后，将表单的值清空
      this.username = '',
      this.phone = null,
      this.region = ['四川省', '成都市', '青羊区'],
      this.addsite = '',
      this.zipcode = '000000',
      this.isDefault = false
    }
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
.addaddress{
    width: 100%;
    height: 100vh;
    background-color: #f5f5f5;
    &-main{
      form{
        .section{
          display: flex;
          font-size: 4vw;
          box-sizing: border-box;
          padding: 2vw;
          background-color: #fff;
          width: 100%;
          height: 12vw;
          line-height: 8vw;
          margin-bottom: 2vw;
        }
        input{
          width: 70%;
          height: 8vw;
          margin-left: 2vw;
          color:#9e9e9e;
        }
        .addressinfo{
          height: 8vw;
          margin-left: 2vw;
          color:#9e9e9e;
        }
        .section_gap{
          background-color: #fff;
          margin-top: 5vw;
          height: 15vw;
          line-height: 15vw;
          display: flex;
          justify-content: space-between;
          font-size: 4vw;
        }
        .btn-area{
          width: 100%;
          background-color: #f5f5f5;
          margin-top:10vw;
          overflow: hidden;
          button:first-child{
            background-color: #fff;
            width: 80%;
            margin-top: 10vw;
            color:#FF8A65;
          }
          button:last-child{
            background-color: #fff;
            width: 80%;
            margin-top: 5vw;
          }
        }
      }
    }
  }
</style>
