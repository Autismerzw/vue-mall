<template>
  <footer class="w">
    <div class="footer-content">
      <div class="footer-region">
        <span>Region</span>
        <select class="footer__region__select">
          <option value="en-US">USA</option>
          <option value="zh-CN">China</option>
        </select>
      </div>
      <div class="footer-secondary-nav">
        <span>Copyright © 2017 IMooc All Rights Reserved.</span>
        <a href="#">
              About Us
        </a>
        <a href="#">
              Terms &amp; Conditions
        </a>
        <a href="#">
              Privacy Policy
        </a>
      </div>
    </div>
  </footer>
</template>

<script>
export default {}
</script>

<style lang='scss'>
.footer-content{
  padding: 30px;
  margin: 10px 20px 40px 20px; 
  border-top:1px solid #ccc;
  .footer-region{
    // display: inline-block;
    float: left;
  }
  .footer-secondary-nav{
    float: right;
    span{
      color: #ccc;
    }
    a{
      text-decoration: none;
      color: #959595;
      margin-left: 20px; 
    }
  }
}
</style>