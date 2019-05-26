<template>
  <div class="aboutus">
    <div class="aboutus-main">
      <div class="logo">
        <img src="https://ss1.bdstatic.com/70cFuXSh_Q1YnxGkpoWK1HF6hhy/it/u=1419849990,826730177&fm=26&gp=0.jpg" alt="">
      </div>
      <div class="companyprofile">
        从今天起，做一个简单的人。<br>
        不沉溺幻想，不庸人自扰，不浪费时间，<br>
        不沉迷过去，不恐惧将来。<br>
        趁阳光正好，趁现在还年轻，<br>
        去做的你想做的，去追逐你的梦想。
      </div>
      <div class="companyTel">
        <span class="title">联系方式:</span>
        <span class="num">400-666-5338</span>
      </div>
      <div class="companyAddress">
        <span class="title">商铺地址：</span>
        <span class="add">成都市高新区天府大道605号</span>
      </div>
      <div class="erweim">
        <img src="" alt="">
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: 'aboutus'
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
 .aboutus{
    width: 100%;
    height: 100%;
    display: flex;
    flex-direction: column;
    &-main{
      width: 100%;
      flex:1;
      display: flex;
      flex-direction: column;
      overflow-x: hidden;
      .logo{
        width: 100%;
        height: 30%;
        box-sizing: border-box;
        padding: 6vw 15vw;
        img{
          width: 100%;
        }
      }
      .companyprofile{
        box-sizing: border-box;
        padding: 0 10vw;
        font-size: 4vw;
        text-align: center;
        margin-bottom: 10vw;
      }
      .companyTel, .companyAddress{
        width: 100%;
        height: 8vw;
        box-sizing: border-box;
        text-align: center;
        line-height: 8vw;
        font-size: 4vw;
        .title{
          color:#757575;
        }
      }
      .erweim{
        width: 100%;
        margin-top:10vw;
        box-sizing: border-box;
        padding: 0 35vw;
        img{
          width: 100%;
        }
      }
    }
 }
</style>
