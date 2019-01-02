import Vue from 'vue'
import Router from 'vue-router'

Vue.use(Router)

export default new Router({
  mode: 'history',
  base: '/init/',
  routes: [
    {
      path: '/',
      redirect: '/index'
    },
    {
      path: '/index',
      name: 'index',
      component: () => import(/* webpackChunkName: 'index' */ '@/page/index'),
      meta: {
        title: '项目开发基础设置1.0'
      }
    },
    {
      path: '/404',
      name: '404',
      component: () => import(/* webpackChunkName: 'error' */ '@/page/error/404')
    },
    /* 静态路径 */
    {
      path: '*',
      redirect: '/404'
    }
  ]
})
