<template>
  <div class="mall">
    <div class="left">
      <ul class="mall-ul">
        <li
          class="brand-item"
          v-for="item in brand"
          :key="item.id"
          :class="{'Checked':item.isChecked}"
          @click="handleToCategory(item.id)"
        >{{item.title}}
        </li>
          <!-- <router-link
          v-for="item in categories"
          tag="li"
          :key="item.id"
          :to="{
            name: 'category',
            //将品牌id即CategoryID,传到右边商品分类category页
            params: {
              categoryID: item.id
            }
          }"
        >{{item.title}}</router-link> -->
        </ul>
    </div>
    <div class="right">
      <div class="category">
        <div class="brandlogo">
          <img :src="categorys.brandlogo" :alt="categorys.id">
        </div>
        <ul class="category">
           <li
          v-for="item in categorys.classify"
          :key="item.id"
          @click="handleToList(item.id)"
        > <img :src="item.img" :alt="item.title">
          <p>{{item.title}}</p>
        </li>
        </ul>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  data() {
    return {
      brand:[],
      categorys:[],
      // isCheck这个状态写在假数据中
      //品牌的id,存起来，通过data-brandid传到categorys里面去
      curBrandid:Number
    }
  },
  mounted(){
    // 渲染侧边栏品牌列表
    this.$httpWX.get({
      url: 'http://rap2api.taobao.org/app/mock/121708/api/v1/mallNav',
      data: {}
    }).then(res => {
      this.brand=res.res_body.data
      console.log(res.res_body.data)
      console.log(this.brand)
      this.brand[0].isChecked=true
      // console.log(this.brand[0].id)
      this.handleToCategory(this.brand[0].id)
    })
  },
  methods: {
    //渲染分类列表
    handleToCategory(id=this.brand[0].id){
      // console.log(id)
      // 将品牌id保存起来
      this.curBrandid = id
       //选中变小红点
      this.brand=this.brand.map((item)=>{
        if(item.id===id){
          item.isChecked=true
        }
        if(item.id!==id){
          item.isChecked=false
        }
        return item
      })
      // console.log(e)
      // 不用做页面跳转，紧做请求，把数据到存在categorys渲染出来
      this.$httpWX.get({
      url: `http://rap2api.taobao.org/app/mock/121708/api/v1/mallCategory/${id}`,
      data: {}
    }).then(res => {
      // console.log(res.res_body)
      this.categorys=res.res_body.data[0]
    })
    },

    //跳转去List页面
    handleToList(id){
      console.log(id)
      wx.navigateTo({
      url: `../List/main?Categoryid=${id}&Brandid=${this.curBrandid}`,
      })
    }
  }
}
</script>


<style lang="scss">
page{
  height: 100vh;
  .mall{
  width: 100%;
  height: 100%;
  display: flex;
  // overflow: hidden;
  background-color: #F5F5F5;
  .left{
    width: 20%;
    overflow-x: hidden;
    border-right:1px solid #B0BEC5;
    padding-top: 1vw;
    .mall-ul{
      .brand-item{
       padding: 2.5vw;
       padding-top: 3vw;
       padding-bottom: 3vw;
       padding-right: 1vw;
       border-bottom: 1px solid #dedede;
       color: black;
       border-left: 5px solid #F5F5F5;
       font-size: 3.5vw;
      }
      .Checked{
        border-left-color:#F48FB1;
      }
    }
  }
  .right{
    flex: 1;
    overflow-x: hidden;
    .category{
    .brandlogo{
      width: 100%;
      height: 0;
      padding-top: percentage( 540 / 1080 );
      position: relative;
      img{
        position: absolute;
        top: 0;
        left: 0;
        height: 100%;
        max-width: 100%;
      }
    }
    .category{
      margin-top: 2vw;
      display: flex;
      flex-wrap: wrap;
      li{
        margin-right:5%;
        // background: blue;
        width: 30%;
        margin-bottom: 4vw;
        border-bottom: 1px solid #dedede;
        img{
        display: block;
        width: 100%;
        height: 25vw;
        // background-color: orangered;
        }
        p{
          padding: 1.5vw;
          text-align: center;
        }
      }
      li:nth-child(3n){
        margin-right:0 !important;
      }
    }
}
  }
}
}
</style>