<template>
  <div id="app">
    <v-header></v-header>
    <breadCrumb>
      <span >goods /</span>
    </breadCrumb>
    <goodlist :goods='goods'></goodlist>
    <v-footer></v-footer>
  </div>
</template>

<script>
import header from '@/components/header/v-header'
import footer from '@/components/footer/v-footer'
import breadCrumb from '@/components/breadCrumb/breadCrumb'
import goodlist from '@/components/goodlist/goodlist'
import axios from 'axios'
export default {
  name: 'app',
  data () {
    return {
      goods: []
    }
  },
  methods: {
    getGoodList () {
      axios.get('/api/goods').then((result) => {
        var res = result.data
        this.goods = res.data
      })
    }
  },
  mounted () {
    this.getGoodList()
  },
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
