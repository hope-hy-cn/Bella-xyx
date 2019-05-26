<template>
  <div class="list">
    <div class="rightheader">
      <span
        v-for="item in rightHead"
        :key="item"
        :class="item === active ? 'active' : ''"
        @click="clickSortHandle(item)"
      >{{item}}</span>
    </div>
    <div class="list-main">
      <div 
      class="product"
      v-for="item in list"
      :key="item.id"
      @click="handleToDetail(item.id)"
      >
      <img :src="item.img" :alt="item.title">
      <h3>{{item.title}}</h3>
      <p class="desc">{{item.desc}}</p>
      <p class="prices">￥{{item.prices}}<span>销量:{{item.Sales}}</span></p>
      </div>
    </div>
  </div>
  
</template>

<script>
export default {
  data() {
    return {
      Brandid:Number,
      Categoryid:Number,
      list: [],
      rightHead: ['全部', '销量', '价格'],
      active: '全部'
    }
  },
  mounted(){
    // 获取Mall页面传过来的Brandid与Categoryid,用来在mounted做request请求
    console.log(this)
    this.Brandid = this.$mp.query.Brandid
    this.Categoryid =this.$mp.query.Categoryid
    // //请求List页面数据
    this.$httpWX.get({
      url: `http://rap2api.taobao.org/app/mock/121708/api/v1/list?categoryID=${this.Brandid}&listID=${this.Categoryid}`,
      data: {}
    }).then(res => {
      // console.log(res.res_body.data)
      this.list=res.res_body.data
    })
  },
  // onLoad(options){
  //   // 获取Mall页面传过来的Brandid与Categoryid,用来在mounted做request请求
  //   console.log(options)
  //     // 小程序中在这里获取url参数，mpvue这里获取不到，在this.$mp.query中
  // },
   methods: {
    clickSortHandle (item) {
      this.active = item
      switch (item) {
        case '全部':
          this.list = this.list.sort((a, b) => {
            return a.id - b.id
          })
          break
        case '销量':
          this.list = this.list.sort((a, b) => {
            return b.Sales - a.Sales
          })
          break
        case '价格':
          this.list = this.list.sort((a, b) => {
            return b.prices - a.prices
          })
          break
      }
    },
    handleToDetail(id){
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
.list{
  width: 100%;
  height: 100vh;
  display: flex;
  flex-direction: column;
   .rightheader{
      width: 100%;
      height: 11.5vw;
      border-bottom: 1px solid #dedede;
      span{
        display: inline-block;
        width: 31%;
        height: 11.5vw;
        line-height: 11.5vw;
        text-align: center;
      }
      span:nth-child(2){
        border-left:1px solid #dedede;
        border-right:1px solid #dedede;
      }
      .active{
        color:#F48FB1;
        font-weight: 600;
      }
    }
   .list-main{
     flex: 1;
     overflow-x: hidden;
     .product{
       width: 49%;
       height: 60vw;
      //  border-right: 1px solid #dedede;
      //  border-bottom: 1px solid #dedede;
       float: left;
       background-color: white;
       margin-bottom: 2vw;
       img{
         display: block;
         width: 100%;
         height: 40vw;
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
         font-size: 4.5vw;
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
     .product:nth-child(2n){
       border-right:0px;
       float: right;
      //  border-left: 1px solid #dedede;
     }
   }
  }
</style>
