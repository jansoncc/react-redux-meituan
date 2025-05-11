import classNames from 'classnames'
import Count from '../Count'
import { useSelector } from 'react-redux'
import { increMentCount, decreMentCount,clearCart } from '../../store/modules/takeaway'
import { useDispatch } from 'react-redux'
import './index.scss'
import { useState } from 'react'

const Cart = () => {
  const dispatch = useDispatch()
  const [ visible, setVisible] = useState(false)
  const { cartList } = useSelector(state => state.foods)
  const onShow = () => {
    if(cartList.length>0) {
      setVisible(true)
    }
  }
  // 计算总价
  const totalPrice = cartList.reduce((a,c) => a + c.price * c.count, 0)

  return (
    <div className="cartContainer">
      {/* 遮罩层 添加visible类名可以显示出来 */}
      <div
        className={classNames('cartOverlay', visible && 'visible')}
        onClick={() => setVisible(false)}
      />
      <div className="cart">
        {/* fill 添加fill类名可以切换购物车状态*/}
        {/* 购物车数量 */}
        <div onClick={() => onShow()} className={classNames('icon', cartList.length >0 ? 'fill' : '')}>
          {cartList.length >0 && <div className="cartCornerMark">{cartList.length}</div>}
        </div>
        {/* 购物车价格 */}
        <div className="main">
          <div className="price">
            <span className="payableAmount">
              <span className="payableAmountUnit">¥</span>
              {totalPrice.toFixed(2) || 0.00}
            </span>
          </div>
          <span className="text">预估另需配送费 ¥5</span>
        </div>
        {/* 结算 or 起送 */}
        {cartList.length > 0 ? (
          <div className="goToPreview">去结算</div>
        ) : (
          <div className="minFee">¥20起送</div>
        )}
      </div>
      {/* 添加visible类名 div会显示出来 */}
      <div className={classNames('cartPanel', visible && 'visible')}>
        <div className="header">
          <span className="text">购物车</span>
          <span className="clearCart" onClick={() => dispatch(clearCart())}>
            清空购物车
          </span>
        </div>

        {/* 购物车列表 */}
        <div className="scrollArea">
          {cartList.map(item => {
            return (
              <div className="cartItem" key={item.id}>
                <img className="shopPic" src={item.picture} alt="" />
                <div className="main">
                  <div className="skuInfo">
                    <div className="name">{item.name}</div>
                  </div>
                  <div className="payableAmount">
                    <span className="yuan">¥</span>
                    <span className="price">{item.price}</span>
                  </div>
                </div>
                <div className="skuBtnWrapper btnGroup">
                  <Count
                    count={item.count}
                    onMinus={() =>dispatch(decreMentCount(item))}
                    onPlus={() =>dispatch(increMentCount(item))}
                  />
                </div>
              </div>
            )
          })}
        </div>
      </div>
    </div>
  )
}

export default Cart
