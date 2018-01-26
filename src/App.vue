<template>
  <div id="app">
    <v-header></v-header>
    <router-view></router-view>
    <v-footer></v-footer>
  </div>
</template>

<script>
import header from '@/components/header/v-header'
import footer from '@/components/footer/v-footer'
export default {
  name: 'app',
  components: {
    'v-header': header,
    'v-footer': footer
  }
}
</script>

<style lang="scss">
$red: #ee455e;
#app{
  user-select:none;
  font-family: 'Avenir', Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  .w{
    max-width: 1200px;
    margin: 0 auto;
    // overflow: hidden;
  }
}
</style>
