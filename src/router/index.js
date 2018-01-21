import Vue from 'vue'
import Router from 'vue-router'
import VueResource from 'vue-resource'
import cart from '../components/cart/cart'
import goods from '../components/goodlist/goodlist.vue'

Vue.use(Router)
Vue.use(VueResource)

export default new Router({
  routes: [
    {
      path: '/',
      components: {
        default: goods
      }
    },
    {
      path: '/cart',
      component: cart
    }
  ],
  linkActiveClass: 'active',
  linkExactActiveClass: 'active'
})
