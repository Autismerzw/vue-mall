<template>
  <div>
    <breadCrumb>
      <span >goods /</span>
    </breadCrumb>
    <sort v-on:select-price='getPrShow' v-on:sort-price='getPageSort'></sort>
    <div class="goodlist w">
     <transition name="pr">
      <aside :class="{'prshow': prShow}">
        <h3 class="title">
          PRICE
        </h3>
        <ul>
          <li class="p-item" :class="{'active': cur === 'All'}" @click="setPriceAll">All</li>
          <li class="p-item" v-for="(i, index) in priceRange" :key='index' @click="setPriceRange(index)" :class="{'active':cur === index}">
            <span>{{i.priceL}} - {{i.priceH}}</span>
          </li>
        </ul>
      </aside>
     </transition>
      <div class="goods-item">
        <ul>
          <li class="item" v-for="(item, index) in goods" :key='index'>
            <!-- <img alt="" v-lazy="'/static/'+item.productImage"> -->
            <img alt="" :src="'/static/'+item.productImage">
            <div class="main">
              <h1 class="name">{{item.productName}}</h1>
              <p class="price">￥{{item.salePrice}}</p>
            </div>
            <span class="btn-add" @click="addCart(item.productId)">
              加入购物车
            </span>
          </li>
        </ul>
        <div class="loadMore" v-infinite-scroll="loadMore" infinite-scroll-disabled="busy" infinite-scroll-distance="60">
          <img v-show="loadFlog" src="../../assets/loading-cylon-red.svg">
        </div>
      </div>
    </div>
    <div class="shadow" @click="getPrHide" v-show="prHide"></div>
    <molde :mdshow='mdshow' v-on:mdClose="mdClose">
        <p slot="message">
          您还没有登陆，无法添加到购物车中
        </p>
        <div slot="btn-group">
          <span class="btn-close btng" @click="mdClose">关闭</span>
        </div>
    </molde>    
    <molde :mdshow='mdcartshow' v-on:mdClose="mdClose">
        <p slot="message">
          已添加到购物车
        </p>
        <div slot="btn-group">
          <span class="btng btn-close" @click="mdClose">继续购物</span>
          <router-link to="/cart" class="btng">查看购物车</router-link>
        </div>
    </molde>    
  </div>
</template>

<script>
import sort from '../sort/sort'
import axios from 'axios'
import molde from '../molde/molde'
import breadCrumb from '@/components/breadCrumb/breadCrumb'
export default {
  data () {
    return {
      goods: [],
      priceRange: [
        {
          priceL: 0.00,
          priceH: 100.00
        },
        {
          priceL: 100.00,
          priceH: 500.00
        },
        {
          priceL: 500.00,
          priceH: 1000.00
        },
        {
          priceL: 1000.00,
          priceH: 2000.00
        }
      ],
      priceLevel: [],
      cur: 'All',
      prShow: false,
      prHide: false,
      page: 1,
      pageSize: 8,
      sortFlag: true,
      priceL: 0,
      busy: true,
      loadFlog: true,
      mdshow: false,
      mdcartshow: false
      // screenWidth: document.documentElement.clientWidth
    }
  },
  mounted () {
    this.getGoodList()
  },
  methods: {
    getGoodList (flag) {
      let param = {
        page: this.page,
        pageSize: this.pageSize,
        sort: this.sortFlag ? 1 : -1,
        priceL: this.priceLevel[0],
        priceH: this.priceLevel[1]
      }
      this.loadFlog = true
      axios.get('/goods', {
        params: param
      }).then((result) => {
        this.loadFlog = false
        var res = result.data
        if (res.stetus === '0') {
          if (flag) {
            this.goods = this.goods.concat(res.result.list)
            if (res.result.count === 0) {
              this.busy = true
            } else {
              this.busy = false
            }
          } else {
            this.goods = res.result.list
            this.busy = false
          }
        } else {
          this.goods = []
        }
      })
    },
    getPageSort () {
      this.sortFlag = !this.sortFlag
      this.page = 1
      this.getGoodList()
    },
    setPriceRange (index) {
      this.cur = index
      this.priceLevel[0] = this.priceRange[index].priceL
      this.priceLevel[1] = this.priceRange[index].priceH
      this.page = 1
      this.getGoodList()
      this.prHide = false
      this.prShow = false
    },
    setPriceAll () {
      this.cur = 'All'
      this.priceLevel[0] = 'all'
      this.getGoodList()
      this.sortFlag = false
      this.getPageSort()
    },
    getPrShow (target) {
      this.prShow = !this.prShow
      this.prHide = !this.prHide
    },
    getPrHide () {
      this.prHide = !this.prHide
      this.prShow = !this.prShow
    },
    addCart (productId) {
      // axios.defaults.headers['Content-Type'] = 'application/x-www-form-urlencoded;charset=UTF-8'
      axios.post('/goods/addCart', {
        productId: productId
      }).then((res) => {
        res = res.data
        if (res.status === '0') {
          this.mdcartshow = true
        } else {
          // alert('msg：' + res.msg)
          this.mdshow = true
        }
      })
    },
    mdClose () {
      this.mdshow = false
      this.mdcartshow = false
    },
    loadMore () {
      this.busy = true
      setTimeout(() => {
        this.page++
        this.getGoodList(true)
      }, 1000)
    }
  },
  components: {
    sort,
    molde,
    breadCrumb
  }
}
</script>

<style lang='scss'>
.goodlist{
  padding: 0 20px;
  display: flex;
  .short-content{
    width: 100%;
    background: #fff;
    margin: 20px 0;
  }
  aside{
    display: block;
    flex: 0 0 170px;
    padding: 0 20px;
    font-size: 14px;
    .title{
      letter-spacing:2px;
      height: 40px;
      line-height: 40px;
    }
    .p-item{
      color:#aeadad;
      height: 26px;
      line-height: 26px;
      margin: 16px 0;
      cursor: pointer;
      &:hover{
        border-left: 2px solid #ee7a23;
        padding-left: 10px; 
      }
      &.active{
        border-left: 2px solid #ee7a23;
        padding-left: 10px;
      }
    }
  }
  .goods-item{
    flex: 1;
    ul{
      display: flex;
      flex-flow: row wrap;
    }
    .item{
      width: 231px;
      padding: 15px;
      box-sizing: border-box;
      background: #fff;
      border:2px solid #e9e9e9;
      margin-right: 16px;
      margin-bottom: 20px;
      img{
        display: inline-block;
        width: 100%;
      }
      .name{
        margin-top: 20px;
        font-size: 12px; 
      }
      .price{
        margin-top: 20px;
        margin-bottom: 15px; 
        color: #d1434a;
        font-size: 18px;
      }
      .btn-add{
        display: inline-block;
        width: 90%;
        text-align: center;
        cursor: pointer;
        color: #d4314d;
        border: 1px solid #d1434a;
        padding: 5px;
      }
      &:hover{
        box-shadow: 0px 10px 12px  rgba(51,51,51,.4);
        border:2px solid #ee7a23;        
        position: relative;
        top: -6px;
      }
    }
    .loadMore {
      display: inline-block;
      width: 80%;
      text-align: center;
      // padding: 20px;
      color: #d1434a;
      font-size: 16px;
      img{
        display: inline-block;
        width: 50px;
        height: 50px;
      }
    }
  }
}
@media screen and (max-width:760px)  {
  .goodlist{
    display: block;
    aside{
      display: none;
      position: fixed;
      top:0;
      bottom: 0;
      right: 0;
      width: 140px;
      background: #fff;
      transition: all .4s linear;
      z-index: 30;
    }
    .prshow{
      display: block;
    }
    .pr-enter, .pr-leave-to{
      transform: translate3d(100%,0,0);
      opacity: 0;
    }
    .pr-enter-to{
      transform: translate3d(0,0,0);
      opacity: 1;
    }
    .goods-item{
      .item{
        width: 100%;
        height: 120px;
        margin-right: 0; 
        // font-size: 0;
        img{      
          width: 90px;

        }
        .main{
          display: inline-block;
          vertical-align: top;
          margin-bottom: 5px; 
        }
        .btn-add{
          float: right;
          width: 80px;
          margin-top: 55px; 
        }
        &:hover{
        box-shadow:none;
        border:2px solid #e9e9e9;        
        position: inherit;
      }
      }
    }
  }
  .shadow{
    position: fixed;
    top: 0;
    bottom: 0;
    right: 0;
    left: 0;
    background: rgba(51,51,51,.4);
  }
}
</style>