<template>
    <div>
      <breadCrumb>
        <span >cart </span>
      </breadCrumb>
      <div class="cart-wapper w">
        <h1 class="title">购物车</h1>
        <ul class="cart-cell">
          <li class="tr-head">
            <div class="items">商品名称</div>
            <div class="prices">单价</div>
            <div class="quantity">数量</div>
            <div class="subtotal">总价</div>
            <div class="edit">操作</div>
          </li>
          <li class="item" v-for="(item, index) in cartList" :key="index">
             <div class="items">
               <span class="icon" :class="[item.checked ? 'icon-checkbox-checked' : 'icon-checkbox-unchecked']" @click="etidCart('checked',item)"></span>
               <img  v-lazy="'/static/'+item.productImage" width="70" height="70">
               <span class="pro-title">{{item.productName}}</span>
             </div>
            <div class="prices">
              <span class="prices">{{item.salePrice}}</span>
            </div>
            <div class="quantity">
              <span class="cc-op less" @click="etidCart('less', item)">-</span>
                <span class="count-num">
                  {{item.productNum }}
                </span>
              <span class="cc-op add" @click="etidCart('add', item)">+</span>
            </div>
            <div class="subtotal">
              <span class="totals">{{item.productNum * item.salePrice}}</span>
            </div>
            <div class="edit">
              <span class="del" @click="getShowDelModel(item.productId)">删除</span>  
            </div>
          </li>
        </ul>
        <div class="subcount">
          <div class="l-sel">
            <span class="icon  icon-checkbox-checked" :class="[this.checkAllFlag?'icon-checkbox-checked':'icon-checkbox-unchecked']" @click="checkedAll"></span>
            <span @click="checkedAll">
              全选
            </span>
            <span class="del-all">
              删除选中
            </span>
          </div>
          <div class="r-sub">
            <span class="total">￥{{this.totalPrice}}</span>
            <span class="btn-deal" :class="{'btn-dealTure': this.checkCount}" @click="getAddress">
              确认下单
            </span>
          </div>
        </div>
        <molde :mdshow='delShow' v-on:mdClose='mdHide'>
          <p slot="message">{{this.msg}}</p>
          <div slot="btn-group">
            <span class="btng" @click="getDelCart" v-if="!confirm">确定</span>
            <span class="btng" @click="mdHide" v-if="confirm">确定</span>
            <span class="btng" @click="mdHide" v-if="!confirm">取消</span> 
          </div>  
        </molde>
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
      productId: '',
      msg: '',
      delShow: false,
      confirm: false
    }
  },
  mounted () {
    this.init()
  },
  computed: {
    checkAllFlag () {
      return this.checkCount === this.cartList.length
    },
    checkCount () {
      let i = 0
      this.cartList.forEach((item) => {
        if (item.checked === 1) {
          i++
        }
      })
      return i
    },
    totalPrice () {
      let money = 0
      var oneprice
      this.cartList.forEach((item) => {
        if (item.checked === 1) {
          oneprice = item.productNum * item.salePrice
          money += oneprice
        }
      })
      return money
    }
  },
  methods: {
    init () {
      axios.get('/users/cartList').then((response) => {
        let res = response.data
        if (res.status === '0') {
          this.cartList = res.result
        } else {
          this.msg = '请先登录'
        }
      })
    },
    getShowDelModel (proid) {
      this.delShow = true
      this.productId = proid
      this.msg = '你确定要删除此数据么？'
    },
    getDelCart () {
      axios.post('/users/cartDel', {
        productId: this.productId
      }).then((response) => {
        let res = response.data
        if (res.status === '0') {
          this.msg = '该商品已删除'
          this.confirm = true
          this.init()
        }
      })
    },
    mdHide () {
      this.delShow = false
      this.confirm = false
    },
    etidCart (flag, item) {
      if (flag === 'add') {
        item.productNum++
      } else if (flag === 'less') {
        if (item.productNum <= 1) {
          return
        } else {
          item.productNum--
        }
      } else {
        item.checked = !item.checked ? 1 : 0
      }

      axios.post('/users/cartEdit', {
        productId: item.productId,
        productNum: item.productNum,
        checked: item.checked
      }).then((response) => {
        // console.log(this.checkAllFlag)
      })
    },
    checkedAll () {
      var flag = !this.checkAllFlag
      this.cartList.forEach(item => {
        item.checked = flag ? 1 : 0
      })
      axios.post('/users/editCheckAll', {
        checkedAll: flag
      }).then((response) => {
        var res = response.data
        if (res.status === '0') {
          // console.log('select All')
        }
      })
    },
    getAddress () {
      if (this.checkCount > 0) {
        this.$router.push({
          path: '/address'
        })
      }
    }
  },
  components: {
    breadCrumb,
    molde
  }
}
</script>

<style lang='scss'>
.cart-wapper{
  .title{
    padding: 20px;
    font-size: 24px;
    line-height: 1.5;
  }
  .cart-cell{
    li{
      display: flex;
      background: #fff;
    }
    .tr-head{
      background: #000;
      color: #fff;
      div{
        text-align: center
      }
    }
    .items{
      overflow: hidden;
      flex: 2;
    }
    .item{
      padding: 10px 10px;
      line-height: 90px;    
      border-bottom: 1px solid #ccc;
      .items{
        img{
          vertical-align: middle;
          border: 1px solid #ccc;
        }
        .pro-title{
          margin-left: 5px;
          font-size: 15px;

        }
      }
      .prices{
        text-align: center;
        font-size: 15px; 
        color: #ee4455;
      }
      .quantity{
        text-align: center;
        font-size: 15px;; 
        // position: relative;
        span{
          display: inline-block;
          padding: 0;
          text-align: center;
          width: 40px;
          margin: 0;
        }
        .add, .less{
          cursor: pointer;
          display: inline-block;
          width: 21px;
          height: 21px;
          line-height:21px;
          background: #ccc;
        }
      }
      .subtotal{
        text-align: center;
      }
      .edit{
        text-align: center;
        .del{
          margin-left: 13px;
        }
      }

    }
    .prices{
      flex: 1
    }
    .quantity{
      flex: 1.5
    }
    .subtotal{
      flex: 1
    }
    .edit{
      flex: 1
    }
  }
  .subcount{
    margin-top: 40px;
    height: 50px;
    line-height: 50px;
    background: #fff;
    font-size: 15px;
    .l-sel{
      // padding: 10px;  
      float: left;
      .del-all{
        cursor: pointer;        
        padding: 5px;
      }
    }
    .r-sub{
      float: right;
      .total{
        display: inline-block;
        margin-right: 20px;
        color: #ee4455;
      }
      .btn-deal{
        cursor: no-drop;
        display: inline-block;
        width: 100px;
        height: 50px;
        background: #ccc;
        color: #fff;
        text-align: center;

      }
      .btn-dealTure{
        cursor: pointer;
        color: #fff;
        background: #ee4455;
        &:hover{
        background: rgba(238,68,85,.8);   
        }
      }
    }
  }
  .icon{
    margin: 0 15px 0 10px; 
  }
  .icon-checkbox-checked{
    color: #ee4455;
  }
  .icon-checkbox-unchecked{
    color: #000;
  }
}
</style>