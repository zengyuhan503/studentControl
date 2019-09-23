import Vue from 'vue'
import Router from 'vue-router'
import studentControl from '@/components/studentControl'
import teacherContorl from '@/components/teacherContorl'
import studentstatistics from '@/components/studentstatistics'
import teacherstatistics from '@/components/teacherstatistics'
import paytable from '@/components/paytable'
import teacherinfo from '@/components/teacherinfo'
import school_management from '@/components/school_management'
import practiceClassManagement from '@/components/practiceClassManagement'
import remindlist from '@/components/remindlist'
import loginpage from '@/components/login-page'
Vue.use(Router)

export default new Router({
  routes: [
    {
      path: '/',
      name: '/',
      component: studentControl
    }
    ,{
      path: '/studentControl',
      name: 'studentControl',
      component: studentControl
    },{
      path: '/loginpage',
      name: 'loginpage',
      component: loginpage
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
    },
    {
      path: '/teacherinfo',
      name: 'teacherinfo',
      component: teacherinfo
    },
    {
      path: '/school_management',
      name: 'school_management',
      component: school_management
    }
    ,
    {
      path: '/practiceClassManagement',
      name: 'practiceClassManagement',
      component: practiceClassManagement
    },
    {
      path: '/remindlist',
      name: 'remindlist',
      component: remindlist
    }
  ]
})
