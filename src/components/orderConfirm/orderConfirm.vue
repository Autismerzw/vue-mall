<template>
  <div class="order-warrper">
    <breadCrumb>
      <span>确认订单</span>
    </breadCrumb>
    <div class="order-content w">
      <div class="check-step">
        <ul>
          <li class="cur"><span>Confirm</span> address</li>
          <li class="cur"><span>View your</span> order</li>
          <li><span>Make</span> payment</li>
          <li><span>Order</span> confirmation</li>
        </ul>
      </div>
      <h1 class="title">订单</h1>
      <ul class="cart-cell">
        <li class="tr-head">
            <div class="items">商品名称</div>
            <div class="prices">单价</div>
            <div class="quantity">数量</div>
            <div class="subtotal">总价</div>
        </li>
          <li class="item" v-for="(item, index) in cartList" :key="index" v-if="item.checked === 1">
             <div class="items">
               <img  v-lazy="'static'+item.productImage" width="70" height="70">
               <span class="pro-title">{{item.productName}}</span>
             </div>
            <div class="prices">
              <span class="prices">{{item.salePrice}}</span>
            </div>
            <div class="quantity">
                <span class="count-num">
                  {{item.productNum }}
                </span>
            </div>
            <div class="subtotal">
              <span class="totals">{{item.productNum * item.salePrice}}</span>
            </div>
          </li>
      </ul>
      <div class="bill">
        <div class="bill-item">
          <span class="order-title">商品总价：</span>
          <span>{{this.subtotal}}</span>
        </div>
        <div class="bill-item">
          <span class="order-title">运费：</span>
          <span>{{this.shipping}}</span>
        </div>
        <div class="bill-item">
          <span class="order-title">折扣：</span>
          <span>{{this.discount}}</span>
        </div>
        <div class="bill-item">
          <span class="order-title">商品税：</span>
          <span>{{this.tax}}</span>
        </div>
        <div class="bill-item">
          <span class="order-title">订单价格：</span>
          <span class="order-total">{{this.orderTotal}}</span>
        </div>
      </div>
      <div class="btn-cont">
        <router-link to="/addressList" class="btn-back">返回地址管理</router-link>
        <span class="pay-order" @click="payment">去支付</span>
      </div>
    </div>
  </div>
</template>

<script>
import breadCrumb from '@/components/breadCrumb/breadCrumb'
import molde from '@/components/molde/molde'
import axios from 'axios'
export default {
  data () {
    return {
      cartList: [],
      shipping: 100,
      discount: 200,
      tax: 400,
      subtotal: 0,
      orderTotal: 0
    }
  },
  mounted () {
    this.init()
  },
  methods: {
    init () {
      axios.get('/users/cartList').then((response) => {
        let res = response.data
        this.cartList = res.result

        this.cartList.forEach(item => {
          if (item.checked === 1) {
            this.subtotal += item.productNum * item.salePrice
            this.orderTotal = this.subtotal + this.shipping - this.discount + this.tax
          }
        })
      })
    },
    payment () {
      let addressId = this.$route.query.addressId
      axios.post('/users/payMent', {
        addressId: addressId,
        orderTotal: this.orderTotal
      }).then((response) => {
        var res = response.data
        if (res.status === '0') {
          this.$router.push({
            path: '/orderSuccess',
            query: {
              orderId: res.result.orderId
            }
          })
        }
      })
    }
  },
  components: {
    breadCrumb,
    molde
  }
}
</script>

<style lang='scss'>
.order-warrper {
  .check-step {
    width: 100%;
    ul {
      width: 100%;
      display: flex;
      text-align: center;
      li {
        position: relative;
        flex: 1;
        width: 200px;
        padding: 20px;
        border-bottom: 4px solid #ccc;
        text-align: center;
        margin: 20px 0;
        &.cur {
          border-color: #ee4445;
          span::after {
            background-color: #ee4445;
          }
        }
        span::after {
          content: "";
          position: absolute;
          width: 16px;
          height: 16px;
          background-color: #ccc;
          bottom: -10px;
          left: 50%;
          margin-left: -10px;
          border-radius: 50%;
          display: inline-block;
        }
      }
    }
  }
  .title {
    padding: 20px;
    font-size: 24px;
    line-height: 1.5;
  }
  .cart-cell {
    li {
      display: flex;
      background: #fff;
    }
    .tr-head {
      padding: 10px 10px;      
      background: #000;
      color: #fff;
      div {
        text-align: center;
      }
    }
    .items {
      overflow: hidden;
      flex: 2;
    }
    .item {
      padding: 10px 10px;
      line-height: 90px;
      border-bottom: 1px solid #ccc;
      .items {
        img {
          vertical-align: middle;
          border: 1px solid #ccc;
        }
        .pro-title {
          margin-left: 15px;
          font-size: 15px;
        }
      }
      .prices {
        text-align: center;
        font-size: 15px;
        color: #ee4455;
      }
      .quantity {
        text-align: center;
        font-size: 15px;
        // position: relative;
        span {
          display: inline-block;
          padding: 0;
          text-align: center;
          width: 40px;
          margin: 0;
        }
      }
      .subtotal {
        text-align: center;
      }
    }
    .prices {
      flex: 1;
    }
    .quantity {
      flex: 1.5;
    }
    .subtotal {
      flex: 1;
    }
  }
  .bill{
    margin-top: 20px; 
    font-size: 14px;
    line-height: 3;
    text-align: right;
    color: rgb(77, 76, 76);
    .order-title{
      color: rgb(155, 154, 154)
    }
    .order-total{
      line-height: 2;
      font-size: 16px;
      font-weight: bolder;
      color: rgba(237, 68, 68, 0.829)
    }
  }
  .btn-cont{
    width: 100%;
    overflow: hidden;
    .btn-back{
      cursor: pointer;
      float: left;
      text-decoration: none;
      padding: 10px;
      color: #ee4445;
      background: #fff;
      border: 1px solid #ee4445;
      &:hover{
        background: #ee4445;
        color:#fff;
      }
    }
    .pay-order{
      cursor: pointer;
      float: right;
      width: 94px;
      text-align: center;
      text-decoration: none;
      padding: 10px;
      color: #fff;
      background: #ee4445;
      &:hover{
        background: rgba(237, 68, 68, 0.671);
      }
    }
  }
}
</style>