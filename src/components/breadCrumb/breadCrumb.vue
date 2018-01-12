<template>
    <div class="bread-crumb">
      <div class="bread-content w">
          <nav class="nav-bread">
            <a href="/">Home /</a>
            <slot></slot>
          </nav>
      </div>
    </div>
</template>

<script>
    export default {}
</script>

<style lang='scss'>
$red: #ee445e;
.bread-crumb{
    background: #f0f0f0;
}
.bread-content{
    height: 45px;
    padding: 0 20px;
    font-size: 14px;
    line-height: 45px;
    a{
        text-decoration: none;
        color: #a1a1a1;
    }
    span{
        color: #d1434a;
    }
}
</style>