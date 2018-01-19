<template>
  <div id="app">
    <v-header></v-header>
    <breadCrumb>
      <span >goods /</span>
    </breadCrumb>
    <goodlist></goodlist>
    <v-footer></v-footer>
  </div>
</template>

<script>
import header from '@/components/header/v-header'
import footer from '@/components/footer/v-footer'
import breadCrumb from '@/components/breadCrumb/breadCrumb'
import goodlist from '@/components/goodlist/goodlist'
export default {
  name: 'app',
  components: {
    'v-header': header,
    'v-footer': footer,
    breadCrumb,
    goodlist
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
  }
}
</style>
