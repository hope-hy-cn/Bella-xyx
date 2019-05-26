import * as mutationTypes from './mutationTypes'
export default {
  // 添加商品至购物车,传过来一个对象
  [mutationTypes.addProductToCart] (state, cartInfo) {
    console.log("加入购物车",cartInfo)
    const isInCart = state.cart.some(i => {
      if (!i) {
        return false
      } else {
        return i.id === cartInfo.id
      }
    })
    if (!isInCart) {
      // 不在时,push进state.cart中，并同步本地存储
      state.cart.push({
        ...cartInfo,
        count: 1,
        isChecked: false
      })
    } else {
      // 在时，改商品数量加1
      this.commit('addCartItemCount', cartInfo.id)
    }
  },
  // 购物车商品 数量+
  [mutationTypes.addCartItemCount] (state, id) {
    state.cart = state.cart.map(item => {
      if (item.id === id) {
        item.count++
      }
      return item
    })
  },
  // 购物车商品 数量-
  [mutationTypes.reduceCartItemCount] (state, id) {
    state.cart = state.cart.map(i => {
      if (i.id === id) {
        if (i.count > 1) {
          i.count--
        } else {
          // Toast('至少购买一件哦！')
        }
      }
      return i
    })
  },
  // 购物车商品删除
  [mutationTypes.isCartRequiredItemDelete] (state) {
    state.cart = state.cart.filter(item => item.isChecked !== true)
  },
  // 购物车是否选择，状态改变
  [mutationTypes.toggleCartItemChecked] (state, id) {
    state.cart = state.cart.map(i => {
      if (i.id === id) {
        i.isChecked = !i.isChecked
      }
      return i
    })
  },
  // 购物车全选
  [mutationTypes.toggleCartAllChecked] (state,e) {
    // console.log("abc")
    console.log("全选",e.target.checked)
    state.cart = state.cart.map(item => {
      if (e.target.checked === true) {
        item.isChecked = true
      } else {
        item.isChecked = false
      }
      return item
    })
  },
  // 购物车选择商品去结算页,传过来一个对象
  [mutationTypes.cartToSettInfoHandle] (state, {vm, settInfo,ScoreInfo}) {
    state.cartToSettInfo = settInfo
    state.cartToScoreSettInfo = ScoreInfo
    console.log("vuex结算页赋值后",state.cartToSettInfo)
     console.log("vuex结算页赋值后1",state.cartToScoreSettInfo)
    //跳转至结算页
    setTimeout(() => {
      wx.navigateTo({
        url: '../Settlement/main'
      })  
    }, 300)
  },

  // 添加商品至收藏页
  [mutationTypes.addProductToCollection] (state, collecInfo) {
    console.log("加入收藏的全部数据",collecInfo)
    const {info, isActive} = collecInfo
    const { id } = info
    const isInCollection = state.collections.some(item => {
      if (!item) {
        return false
      } else {
        return item.id === id
      }
    })
    if (!isInCollection) {
      // 不在里面，不在时isActive一般为true
      state.collections.push({
        ...info,
        isChecked: isActive
      })
      console.log("push之后collections",state.collections)
    } else {
      // 在里面，则删除收藏里面的数据
      state.collections = state.collections.filter(item => item.id !== id)
    }
  },
  // 收藏页商品状态切换
  [mutationTypes.checkedItemChange] (state, id) {
    state.collections = state.collections.map(item => {
      if (item.id === id) {
        item.isChecked = !item.isChecked
      }
      return item
    })
  },
  // 收藏页全选按钮
  [mutationTypes.allCheckedChange] (state,e) {
    console.log("abc")
    console.log(e)
    state.collections = state.collections.map(item => {
      if (e.target.checked === true) {
        item.isChecked = true
      } else {
        item.isChecked = false
      }
      return item
    })
  },
  // 收藏页商品删除
  [mutationTypes.isRequiredItemDelete] (state) {
    // item.isChecked===true时代表一勾选上，要删除
    state.collections = state.collections.filter(item => item.isChecked === false)
  },

  // 添加地址到地址页，存储在localStorage
  [mutationTypes.addAddressToLocalStorage] (state, item) {
    // 默认地址始终只有一个
    state.address.map(curr => {
      if(item.isDefault === true) {
        curr.isDefault = false
      }
    })
    const isKong = Object.values(item).some(i => i === '')
    if (!isKong) {
      state.address.push({
        ...item,
        addID:Math.random()
      })
      wx.showToast({
        title: '保存成功',
        icon: 'none',
        duration: 300
      })
      setTimeout(() => {
        wx.navigateTo({
          url: '../Address/main'
        })
      }, 500)
    } else {
      wx.showToast({
        title: '请先填写地址信息',
        icon: 'none',
        duration: 2000
      })
    }
  },
  // 地址默认排序，有默认标志的始终排第一
  [mutationTypes.sortAddressToLocalStorage] (state) {
    state.address.sort((a,b) => {
      return b.isDefault - a.isDefault
    })
  },
  // 修改地址到地址页，存储在localStorage
  [mutationTypes.reviseAddressToLocalStorage] (state, addinfo) {
    // 默认地址始终只有一个
    state.address.map(curr => {
      if(addinfo.isDefault === true) {
        curr.isDefault = false
      }
    })
    state.address = state.address.map(i => {
      if (i.addID === addinfo.addID) {
        i = addinfo
      }
      wx.showToast({
        title: '修改地址成功',
        icon: 'success',
        duration: 300
      })
      setTimeout(() => {
        wx.navigateTo({
          url: '../Address/main'
        })
      }, 300)
      return i
    })
  },
  // 删除地址，从localStorage删除
  [mutationTypes.deleteAddressToLocalStorage] (state, {vm, addID}) {
    state.address = state.address.filter(item => item.addID !== addID)
    setTimeout(() => {
      wx.navigateTo({
        url: '../Address/main'
      })
    }, 300)
  },
  // 已完成订单传输商品信息至退货申请界面
  [mutationTypes.orderSalesReturnInfo] (state, orderReturnInfo) {
    state.orderSalesReturnInfo = orderReturnInfo
  },
  // 
  [mutationTypes.handleToAddressType] (state, typeInfo) {
    state.toAddressType = typeInfo
  },
  // 保存订单ID在本地
  [mutationTypes.orderIdSaveToStorage] (state, saveOrderStatus) {
    console.log(111111,saveOrderStatus)
    state.orderIdStorage = saveOrderStatus
  },
  // 点击地址是否跳转至订单详情页
  [mutationTypes.isToOrderDetail] (state) {
    state.isToOrderDetail = true
  }
}
