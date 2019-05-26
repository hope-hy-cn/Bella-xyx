<template>
  <div class="addaddress">
    <div class="addaddress-main">
      <form class="form-address">
        <div class="section">
          <span class="section__title username">收货人姓名</span>
          <input
            name="username"
            @change="bindUserNameChange"
            @blur="usernameChange"
            :value="username" />
        </div>
        <div class="section">
          <span class="section__title phone">联系方式</span>
          <input
            name="phone"
            @change="bindPhoneChange"
            @blur="phoneChange"
            :value="phone" />
        </div>
        <picker
          mode="region"
          @change="bindRegionChange"
          :value="region"
          :customItem ="customItem"
        >
          <div class="picker section">
             <span class="section__title ">选择地址</span>
             <div class="addressinfo">{{region}}</div>
          </div>
        </picker>
        <div class="section">
          <span class="section__title addsite">详细地址</span>
          <input
            name="addsite"
            @change="bindAddSiteChange"
            @blur="addsiteChange"
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
            :checked="isDefault" />
        </div>
        <div class="btn-area">
          <button form-type="text" @click="deleteAddress">删除</button>
          <button form-type="text" @click="reviseAddress(addID)">保存</button>
        </div>
      </form>
    </div>
  </div>
</template>

<script>
import { mapMutations } from 'vuex'
import * as mutationTypes from '../../store/mutationTypes'
export default {
  name: 'editaddress',
  data () {
    return {
      addInfo: [],
      username: '',
      phone: '',
      region: [],
      customItem:'',
      addsite: '',
      zipcode: '',
      isDefault:Boolean,
      addID: Number
    }
  },
  onLoad(options) {
    this.addID = options.addID
    var storage = wx.getStorageSync("bella-address")?JSON.parse(wx.getStorageSync("bella-address")):[]
    this.addInfo = storage.filter((item) => item.addID.toString() === this.addID)
    const {username,phone,region,addsite,zipcode,isDefault,addID} = this.addInfo[0]
      this.username = username,
      this.phone = phone,
      this.region = region,
      this.addsite = addsite,
      this.zipcode = zipcode,
      this.isDefault = isDefault,
      this.addID = addID
  },
  methods: {
    ...mapMutations([
      mutationTypes.reviseAddressToLocalStorage,
      mutationTypes.deleteAddressToLocalStorage
    ]),
    // 收货人姓名判断
    usernameChange () {
      if (this.username === '') {
         wx.showToast({
          title: '请填写收货人姓名',
          icon: 'none',
          duration: 2000
        })
      }
    },
    // 电话号码判断
    phoneChange () {
      if (this.phone === '') {
         wx.showToast({
          title: '请填写联系方式',
          icon: 'none',
          duration: 2000
        })
      } else {
        if(!(/^1[34578]\d{9}$/.test(this.phone))){
          this.phone = ''; 
          wx.showToast({
            title: '电话号码有误',
            image: '../../static/Icons/wrong.png',
            duration: 2000
          }) 
        }
      }
    },
    // 详细地址判断
    addsiteChange () {
      if (this.addsite === '') {
         wx.showToast({
          title: '请填写详细地址，至少5个字符',
          icon: 'none',
          duration: 2000
        })
      }
    },
    // 修改地址保存
    reviseAddress (addID) {
        if (this.username === '' || this.phone === '' || this.addsite === '') {
          wx.showToast({
            title: '请完善地址信息',
            icon: 'none',
            duration: 2000
          })
        } else {
          this.reviseAddressToLocalStorage({
            username: this.username,
            phone: this.phone,
            region: this.region,
            addsite: this.addsite,
            zipcode: this.zipcode,
            isDefault:this.isDefault,
            addID: addID
          })
        }       
    },
    // 删除地址
    deleteAddress () {
      this.deleteAddressToLocalStorage({vm: this, addID: this.addID})
    },
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
      this.phone = e.mp.detail.value
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
