import Vue from 'vue'
import Router from 'vue-router'
import Board from '@/components/board/BoardList'
import BoardDetail from '@/components/board/BoardDetail'
import BoardRegist from '@/components/board/BoardRegist'
Vue.use(Router)

export default new Router({
  mode : 'history',
  routes: [
    {
      path: '/',
      name: 'Board',
      component: Board
    },
    {
      path: '/boardDetail/:id',
      name: 'BoardDetail',
      component: BoardDetail
    },
    {
      path : '/boardRegist',
      name : 'BoardRegist',
      component : BoardRegist
    }
  ]
})
