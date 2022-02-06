import Vue from 'vue'
import Router from 'vue-router'
import { normalizeURL, decode } from 'ufo'
import { interopDefault } from './utils'
import scrollBehavior from './router.scrollBehavior.js'

const _34d65f36 = () => interopDefault(import('..\\pages\\address\\index.vue' /* webpackChunkName: "pages/address/index" */))
const _0395db32 = () => interopDefault(import('..\\pages\\cart.vue' /* webpackChunkName: "pages/cart" */))
const _57e0e6b2 = () => interopDefault(import('..\\pages\\login.vue' /* webpackChunkName: "pages/login" */))
const _3d281fec = () => interopDefault(import('..\\pages\\orders.vue' /* webpackChunkName: "pages/orders" */))
const _78070a8f = () => interopDefault(import('..\\pages\\payment.vue' /* webpackChunkName: "pages/payment" */))
const _413f372e = () => interopDefault(import('..\\pages\\placeorder.vue' /* webpackChunkName: "pages/placeorder" */))
const _43224e9c = () => interopDefault(import('..\\pages\\profile.vue' /* webpackChunkName: "pages/profile" */))
const _36a3eda2 = () => interopDefault(import('..\\pages\\search.vue' /* webpackChunkName: "pages/search" */))
const _1ed446c2 = () => interopDefault(import('..\\pages\\signup.vue' /* webpackChunkName: "pages/signup" */))
const _5db9e374 = () => interopDefault(import('..\\pages\\address\\add.vue' /* webpackChunkName: "pages/address/add" */))
const _0714afe6 = () => interopDefault(import('..\\pages\\address\\_id.vue' /* webpackChunkName: "pages/address/_id" */))
const _4866c9c2 = () => interopDefault(import('..\\pages\\products\\_id.vue' /* webpackChunkName: "pages/products/_id" */))
const _23908bc6 = () => interopDefault(import('..\\pages\\reviews\\_id.vue' /* webpackChunkName: "pages/reviews/_id" */))
const _e38d78ca = () => interopDefault(import('..\\pages\\index.vue' /* webpackChunkName: "pages/index" */))

const emptyFn = () => {}

Vue.use(Router)

export const routerOptions = {
  mode: 'history',
  base: '/',
  linkActiveClass: 'nuxt-link-active',
  linkExactActiveClass: 'nuxt-link-exact-active',
  scrollBehavior,

  routes: [{
    path: "/address",
    component: _34d65f36,
    name: "address"
  }, {
    path: "/cart",
    component: _0395db32,
    name: "cart"
  }, {
    path: "/login",
    component: _57e0e6b2,
    name: "login"
  }, {
    path: "/orders",
    component: _3d281fec,
    name: "orders"
  }, {
    path: "/payment",
    component: _78070a8f,
    name: "payment"
  }, {
    path: "/placeorder",
    component: _413f372e,
    name: "placeorder"
  }, {
    path: "/profile",
    component: _43224e9c,
    name: "profile"
  }, {
    path: "/search",
    component: _36a3eda2,
    name: "search"
  }, {
    path: "/signup",
    component: _1ed446c2,
    name: "signup"
  }, {
    path: "/address/add",
    component: _5db9e374,
    name: "address-add"
  }, {
    path: "/address/:id",
    component: _0714afe6,
    name: "address-id"
  }, {
    path: "/products/:id?",
    component: _4866c9c2,
    name: "products-id"
  }, {
    path: "/reviews/:id?",
    component: _23908bc6,
    name: "reviews-id"
  }, {
    path: "/",
    component: _e38d78ca,
    name: "index"
  }],

  fallback: false
}

export function createRouter (ssrContext, config) {
  const base = (config._app && config._app.basePath) || routerOptions.base
  const router = new Router({ ...routerOptions, base  })

  // TODO: remove in Nuxt 3
  const originalPush = router.push
  router.push = function push (location, onComplete = emptyFn, onAbort) {
    return originalPush.call(this, location, onComplete, onAbort)
  }

  const resolve = router.resolve.bind(router)
  router.resolve = (to, current, append) => {
    if (typeof to === 'string') {
      to = normalizeURL(to)
    }
    return resolve(to, current, append)
  }

  return router
}
