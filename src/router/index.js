import Vue from 'vue'
import Router from 'vue-router'
import VueResource from 'vue-resource'
import cart from '../components/cart/cart'
import goods from '../components/goodlist/goodlist'
import addresss from '../components/address/address'
import orderConfirm from '../components/orderConfirm/orderConfirm'

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
    },
    {
      path: '/address',
      component: addresss
    },
    {
      path: '/orderConfirm',
      component: orderConfirm

    }
  ],
  linkActiveClass: 'active',
  linkExactActiveClass: 'active'
})
