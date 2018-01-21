<template>
    <div>
        <div class="model-log" v-show="mdshow">
            <div class="model-con">
                <div class="msgtip">
                    <slot name='message' ></slot>    
                </div>    
                <div class="btn-wrap">
                    <slot name='btn-group' ></slot>    
                </div>    
            </div>
        </div>
        <div class="shadow" @click="mdClose()" v-show="mdshow"></div>
    </div>
</template>

<script>
export default {
  props: {
    mdshow: {
      type: Boolean
    }
  },
  methods: {
    mdClose () {
      this.$emit('mdClose')
    }
  }
}
</script>

<style lang='scss'>
 .model-log {
    background: #fff;
    position: fixed;
    top: 50%;
    margin-top: -150px;
    left: 50%;
    margin-left: -250px;
    width: 500px;
    height: 300px;
    z-index: 90;
    .model-con {
      padding: 30px;
      text-align: center;
      .msgtip {
        font-size: 18px;
        text-align: center;
        line-height: 1.5;
        color: #ee4555;
        margin-top: 15%;
      }
      .btn-wrap{
        margin-top: 15%;        
        .btng {
          display: inline-block;
          width: 30%;
          text-align: center;
          cursor: pointer;
          color: #d4314d;
          border: 1px solid #d1434a;
          line-height: 2;
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
</style>