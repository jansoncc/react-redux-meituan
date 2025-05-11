import { createSlice } from '@reduxjs/toolkit';
import axios from 'axios';
const foodsStore = createSlice({
  name: "foods",
  // 初始化数据
  initialState: {
    foodsList: [], 
    activeIndex: 0,
    cartList: [] // 购物车列表
  },
  // 修改数据的同步方法
  reducers: {
   setFoodsList(state,action) {
    state.foodsList = action.payload
   },
   changeActiveIndex(state,action) {
    state.activeIndex = action.payload
   },
  //  添加购物车
   addCart(state,action) {
    const item = state.cartList.find(item => item.id === action.payload.id)
    if(item) {
      item.count++
    }else {
      action.payload.count = 1
      state.cartList.push(action.payload)
    }
   },
  //  count 增
   increMentCount(state,action) {
    const item = state.cartList.find(item => item.id === action.payload.id)
    item.count ++
   },
   decreMentCount(state,action) {
    const item = state.cartList.find(item => item.id === action.payload.id)
    if(item.count === 0) {
      return
    }
    item.count --
   },
   clearCart(state) {
    state.cartList = []
   }
  },
});

// 异步获取部分
const { setFoodsList, changeActiveIndex, addCart, increMentCount,decreMentCount, clearCart } = foodsStore.actions;
const fetchFoodsList = () => {
    return async (dispatch) => {
      const res = await axios.get('http://localhost:3004/takeaway')
      dispatch(setFoodsList(res.data))
    }
}
// 获取reducer 函数
const foodsReducer = foodsStore.reducer;
export { fetchFoodsList, changeActiveIndex, addCart,increMentCount, decreMentCount, clearCart};
export default foodsReducer;
