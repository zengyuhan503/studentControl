import Vue from 'vue'
import Router from 'vue-router'
import studentControl from '@/components/studentControl'
import teacherContorl from '@/components/teacherContorl'
import studentstatistics from '@/components/studentstatistics'
import teacherstatistics from '@/components/teacherstatistics'
import paytable from '@/components/paytable'
Vue.use(Router)

export default new Router({
  routes: [
    {
      path: '/',
      name: '/',
      component: studentControl
    }
    ,
    {
      path: '/teacherContorl',
      name: 'teacherContorl',
      component: teacherContorl
    },
    {
      path: '/studentstatistics',
      name: 'studentstatistics',
      component: studentstatistics
    },
    {
      path: '/teacherstatistics',
      name: 'teacherstatistics',
      component: teacherstatistics
    },
    {
      path: '/paytable',
      name: 'paytable',
      component: paytable
    }
  ]
})
