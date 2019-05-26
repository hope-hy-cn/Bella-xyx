export default {
  // 添加商品至购物车
  //wx.getStorageSync('bella-cart') ? JSON.parse(wx.getStorageSync('bella-cart')):[],
  cart: wx.getStorageSync('bella-cart') ? JSON.parse(wx.getStorageSync('bella-cart')):[],
  // 添加商品至收藏页
  collections: wx.getStorageSync('bella-collection') ? JSON.parse(wx.getStorageSync('bella-collection')):[],
  // 收藏页删除按钮切换状态
  isCollectionsDelete: false,
  // 添加地址页的存储
  address: wx.getStorageSync('bella-address') ? JSON.parse(wx.getStorageSync('bella-address')):[],
  // 购物车结算商品信息
  cartToSettInfo: [],
  // 退货订单商品信息
  orderSalesReturnInfo:{},
  // 传递toAddressType
  toAddressType: Number,
  // 订单ID信息
  orderIdStorage:wx.getStorageSync('bella-orderId') ? JSON.parse(wx.getStorageSync('bella-orderId')):'',
  // 是否从地址页点击跳转至未付款订单详情
  isToOrderDetail: false,
  // 积分商品结算信息
  cartToScoreSettInfo: []
}
