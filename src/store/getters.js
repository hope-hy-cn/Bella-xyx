export default {
  // 购物车全选
  isAllCartItemChecked (state) {
    return state.cart.every(item => item.isChecked === true)
  },
  // 购物车数量
  cartCheckedCount (state) {
    return state.cart.reduce((total, item) => {
      if (item.isChecked === true) {
        total += item.count
      }
      return total
    }, 0)
  },
  // 购物车总价
  cartCheckedPrice (state) {
    return state.cart.reduce((total, item) => {
      if (item.isChecked === true) {
        total += item.count * item.price
      }
      return total
    }, 0)
  },
  // 购物车徽标显示商品数量
  cartTotalCount (state) {
    return state.cart.reduce((total, item) => {
      total += item.count
      return total
    }, 0)
  },
  // 购物车是否为空
  cartIsNotEmpty (state) {
    return Array.isArray(state.cart) && state.cart.length !== 0
  },
  // 购物车是否有商品选中
  hasItemCheckedProduct (state) {
    return state.cart.some(item => item.isChecked === true)
  },
  // 收藏页底部删除按钮颜色切换
  isCartActive (state) {
    return state.cart.some(item => item.ischecked === true)
  },
  // 收藏页全选
  isAllItemChecked (state) {
    return state.collections.every(item => item.isChecked === true)
  },
  // 收藏页底部删除按钮颜色切换
  isActive (state) {
    return state.collections.some(item => item.isChecked === true)
  }
}
