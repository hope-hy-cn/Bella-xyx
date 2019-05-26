<template>
  <div>
    <div>
      <span>商户地址:</span>
      <map
        id="map"
        longitude="104.0763200000"
        latitude="30.6233500000"
        scale="14"
        markers="markers"
        @markertap="markertap"
        style="width: 100%; height: 300px;"
      >
      </map>
    </div>
  </div>
</template>

<script>

export default {
  components: {

  },

  data () {
    return {
        markers: [{
          // iconPath: '/assets/images/location.png',
          id: 0,
          latitude: 30.6233500000,
          longitude: 104.0763200000,
          width: 22,
          height: 40
        }]
    }
  },

  created () {
  
  },
  methods: {
      // 点击地图上的定位点
  markertap(e) {
    const marker = this.data.markers.filter(m => m.id === e.markerId)[0]
    console.log(marker)
    const {
      latitude,
      longitude
    } = marker;

    wx.openLocation({
      latitude,
      longitude,
      scale: '14',
      name: 'GTX',
      address: '力宝大厦18楼',
      success: function(res) {},
      fail: function(res) {},
      complete: function(res) {},
    })
  },
  }
}
</script>

<style>

</style>
