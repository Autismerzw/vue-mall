<template>
  <div class="addres-wrapper">
    <breadCrumb>
      <span>收货地址</span>
    </breadCrumb>
    <div class="content w">
      <div class="check-step">
        <ul>
          <li class="cur"><span>Confirm</span> address</li>
          <li><span>View your</span> order</li>
          <li><span>Make</span> payment</li>
          <li><span>Order</span> confirmation</li>
        </ul>
      </div>
      <div class="addres-model">
        <h1 class="title">收货地址</h1>
        <ul>
          <li class="addres-block" v-for="(item, index) in addressListFilter" :key="index" :class="{'active': cur === index}" @click='choiceAddress(index,item)'>
            <h1 class="name">{{item.userName}}</h1>
            <p class="address">{{item.streetName}} / {{item.postCode}}</p>
            <p class="tel">{{item.tel}}</p>
            <span class="default" v-show="item.isDefault">默认地址</span>
            <span class="not-default" v-show="!item.isDefault" @click="setDefault(item.addressId)">设置为默认地址</span>
            <span class="icon-bin del" @click="delModelShow(item.addressId)"></span>
          </li>
          <li class="addres-add">
            <h1 class="add">
              +
            </h1>
            <span class="default" v-show="!def">添加地址</span>
          </li>
        </ul>
        <p class="more" @click="getMore">显示更多</p>
      </div>
      <div class="method-model">
        <h1 class="title">配送方式</h1>
        <ul>
          <li class="addres-block">
            <h1 class="name">张伟</h1>
            <p class="address">山西省太原市万柏林区前北屯10号楼#3110</p>
            <p class="tel">18103413327</p>
            <span class="default">默认地址</span>
            <span class="icon-bin del"></span>
          </li>
        </ul>
      </div>
      <div class="btn-box">
        <span class="next-btn" @click="getOrder">
          下一步
        </span>
      </div>
    </div>
    <molde :mdshow='delModel' v-on:mdClose="mdClose">
      <p slot="message">确定要删除此地址么？</p>
      <div slot="btn-group">
        <span class="btng" @click="delAddress">确定</span>
        <span class="btng" @click="mdClose">取消</span>
      </div>
    </molde>
  </div>
</template>

<script>
import breadCrumb from '@/components/breadCrumb/breadCrumb'
import molde from '@/components/molde/molde'
import axios from 'axios'
export default {
  data () {
    return {
      def: false,
      addressList: [],
      limit: 3,
      selectIndex: '',
      cur: 0,
      delModel: false,
      addressId: ''
    }
  },
  computed: {
    addressListFilter () {
      return this.addressList.slice(0, this.limit)
    }
    // selectIndex () {
    //   var defaultId = ''
    //   this.addressList.forEach(item => {
    //     if (item.isDefault) {
    //       defaultId = item.addressId
    //     }
    //   })
    //   return defaultId
    // }
  },
  mounted () {
    this.getAddressList()
  },
  methods: {
    getAddressList () {
      axios.get('/users/addressList').then((response) => {
        var res = response.data
        this.addressList = res.result
      })
    },
    getMore () {
      if (this.limit === 3) {
        this.limit = this.addressList.length
        console.log(this.limit)
      } else {
        this.limit = 3
      }
    },
    choiceAddress (index, item) {
      this.cur = index
      this.selectIndex = item.addressId
    },
    setDefault (addressId) {
      axios.post('/users/isDefault', {
        addressId: addressId
      }).then((response) => {
        var res = response.data
        if (res.status === '0') {
          console.log('set default')
          this.getAddressList()
        }
      })
    },
    delModelShow (addId) {
      this.delModel = true
      this.addressId = addId
    },
    mdClose () {
      this.delModel = false
    },
    delAddress () {
      axios.post('/users/delAddress', {
        addressId: this.addressId
      }).then((response) => {
        let res = response.data
        if (res.status === '0') {
          this.delModel = false
          this.getAddressList()
        }
      })
    },
    getOrder () {
      if (this.selectIndex) {
        this.$router.push({
          path: '/orderConfirm',
          query: {
            addressId: this.selectIndex
          }
        })
      } else {
        this.addressList.forEach(item => {
          if (item.isDefault) {
            this.selectIndex = item.addressId
          }
        })
        this.$router.push({
          path: '/orderConfirm',
          query: {
            addressId: this.selectIndex
          }
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
.addres-wrapper { 
  .content{
    overflow: hidden;
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
    .addres-model,.method-model {
      padding: 10px 0;
      .title {
        font-size: 20px;
        padding: 10px;
      }
      ul{
        width: 100%;
        overflow: hidden;
        display: flex;
        flex-flow: row wrap;
        transition: all .4s ease-in;
        .active{
          border-color: #ee4445;
        }
        li{
          cursor: pointer;
          width: 236px;
          color:rgb(83, 81, 81);
          font-size: 12px;
          line-height: 2; 
          margin: 10px;
          border: 2px solid rgb(235, 233, 233);
          padding: 20px;
          position: relative;
          &:hover{
            box-shadow: 5px 3px 10px rgba(54, 54, 54, .3)
          }
          &.addres-add{
            text-align: center;
            line-height: 1;
            color: #ccc;
            .add{
              font-size: 80px;
              font-weight: 100;
            }
          }
            .default{
              font-size: 14px;
              color: #ee4445;
            }
            .not-default{
              cursor: pointer;              
              font-size: 14px;
              &:hover{
                color: #ee4445;
              }
            }
          .del{
            cursor: pointer;
            position: absolute;
            padding: 10px;
            right: 10px;
            bottom: 17px;
            &:hover{
              color: #ee4445;
            }
          }
        }
      }
      .more{
        cursor: pointer;
        margin-top: 20px;
        width: 100%;
        padding: 10px;
        color: #ccc;
        text-align: center;
        &:hover{
          color: #ee4445
        }
      }
    }
    .btn-box{
      float: right;
      clear: both;
      margin-right: 20px; 
      .next-btn{
        display: inline-block;
        width: 100px;
        height: 30px;
        line-height: 30px;
        background: #ee4445;
        color: #fff;
        text-align: center;
      }
    }
  }
}
</style>