<template>
  <div class="success">
    <breadCrumb>
      <span>支付成功</span>
    </breadCrumb>
    <div class="success-cont w">
      <div class="check-step">
        <ul>
          <li class="cur"><span>Confirm</span> address</li>
          <li class="cur"><span>View your</span> order</li>
          <li class="cur"><span>Make</span> payment</li>
          <li class="cur"><span>Order</span> confirmation</li>
        </ul>
      </div>
      <div class="order-create">
          <div class="order-create-pic"><img src="static/ok-2.png" alt="" width="200"></div>
          <div class="order-create-main">
            <h3>Congratulations! <br>Your order is under processing!</h3>
            <p>
              <span>Order ID：￥{{orderId}}</span>
              <span>Order total：￥{{orderTotal}}</span>
            </p>
            <div class="order-create-btn-wrap">
              <router-link class="btn btn--m" to="/cart">Cart List</router-link>
              <router-link class="btn btn--m" to="/">Goods List</router-link>
            </div>
          </div>
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
      orderId: '',
      orderTotal: 0
    }
  },
  mounted () {
    let orderId = this.$route.query.orderId
    console.log(orderId)
    if (!orderId) {
      return
    }
    axios.get('/users/orderConfirm', {
      params: {
        orderId: orderId
      }
    }).then((response) => {
      let res = response.data
      if (res.status === '0') {
        this.orderId = orderId
        this.orderTotal = res.result.orderTotal
      }
    })
  },
  components: {
    breadCrumb,
    molde
  }
}
</script>

<style lang='scss'>
.success-cont{
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
  .order-create{
    width: 80%;
    font-size: 15px;
    line-height: 2;
    margin: 20px auto;
    text-align: center;
    color: #ccc;
    .btn{
      width: 180px;
      margin:0 20px; 
      display: inline-block;
      border: 1px solid #ee4445;
      color: #ee4445;
      background: #fff;
      text-decoration: none;
      &:hover{
        color: #fff;
        background: #ee4445;

      }
    }
  }
}
</style>