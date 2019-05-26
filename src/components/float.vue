<template>
  <div>
    <ul class="bar">
      <li>
        <contact-button size="30"></contact-button>
        <span>客服</span>
      </li>
      <li @tap="goTop">
        <i class="iconfontGoTop toTop">&#xe637;</i>
        <span>回到顶部</span>
      </li>
      <li class="collection" @click="collection()">
         <i class="iconfontGoTop">&#xe600;</i>
        <span>收藏夹</span>
      </li>
    </ul>
  </div>
</template>

<script>
export default {
  data() {
    return {
      item: 30
    }
  },
  methods: {
    // 跳转收藏页面
    collection() {
      wx.navigateTo({
      url: '../Collection/main'
      })
    },
    // 回到顶部
    goTop(e) {
      console.log(e)
      if (wx.pageScrollTo) {
        wx.pageScrollTo({
          scrollTop: 0
        })
      } else {
        wx.showModal({
          title: '提示',
          content: '当前微信版本过低，无法使用该功能，请升级到最新微信版本后重试。'
        })
      }
    }
  
  }

}
</script>

<style lang="scss">
@font-face {
  font-family: 'iconfont';  /* project id 1025770 */
  src: url('http://at.alicdn.com/t/font_1025770_eogzzva8z0i.eot');
  src: url('http://at.alicdn.com/t/font_1025770_eogzzva8z0i.eot?#iefix') format('embedded-opentype'),
  url('http://at.alicdn.com/t/font_1025770_eogzzva8z0i.woff2') format('woff2'),
  url('http://at.alicdn.com/t/font_1025770_eogzzva8z0i.woff') format('woff'),
  url('http://at.alicdn.com/t/font_1025770_eogzzva8z0i.ttf') format('truetype'),
  url('http://at.alicdn.com/t/font_1025770_eogzzva8z0i.svg#iconfont') format('svg');
}
  .bar{
    // border: 1px solid red;
    display: flex;
    height: 33vw;
    flex-direction: column;
    position: fixed;
    top: 75%;
    z-index: 999999;
    right: 0.5vw;
    width: 8vw;
    li{
      // background: pink;
      display: flex;
      flex-direction: column;
      align-items: center;
      padding: 1vw 0;
      height: 11vw;
      width: 100%;
      background: #7f7e83a6;
      // border: 1px solid blueviolet;
      .iconfontGoTop{
        font-family: "iconfont";
        font-size: 25px;
      }
      span{
        font-size: 2vw;
      }
    }
  }
</style>
