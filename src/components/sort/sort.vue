<template>
  <div class="sort-content">
    <div class="sort w">
      <div class="sort-p">
        <span class="title">Sort By:</span>
        <span class="default active">Dafult</span>
        <span class="price" @click="sortPrice">Price</span>
      </div>
      <div class="sort-pr">
        <span class="select-price" @click="selectPrice">
          &
        </span>
      </div>
    </div>
  </div>
</template>

<script>
  export default {
    methods: {
      selectPrice () {
        this.$emit('select-price', event.target)
        console.log(1)
      },
      sortPrice () {
        this.$emit('sort-price', event.target)
        console.log(1)
      }
    }
  }
</script>

<style lang='scss'>
.sort-content{
  background: #fff;
  margin: 20px;
  height: 50px;
  line-height: 50px;
  font-size: 15px;
  text-align: right;
  color:#605f5f;
  .sort{
    .active{
      color: #ee7a23;
    }
    span{
      margin-right: 20px;
      cursor: pointer;
    }
    .sort-pr{
      display: none;
    }
  }
}
@media screen and (max-width:760px)  {
  .sort-content{
    .sort{
      .sort-p{
        float: left;
        span{
          margin-left: 20px;
          margin-right: 0;        
        }
      }
      .sort-pr{
        display: block;
        float: right;
        margin-right: 20px;                
      }
    }
  }
}
</style>