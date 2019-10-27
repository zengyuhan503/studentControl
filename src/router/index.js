import Vue from 'vue'
import Router from 'vue-router'
import dayflow from '@/components/dayflow'
import mousflow from '@/components/mousflow'
import yearflow from '@/components/yearflow'
import daydownload from '@/components/daydownload'
import monthdownload from '@/components/monthdownload'
import weekflow from '@/components/weekflow'
import weekdownload from '@/components/weekdownload'
import downloadinfo from '@/components/downloadinfo'
import yeardownload from '@/components/yeardownload'
import daychannel from '@/components/daychannel'
import mouschanel from '@/components/mouschanel'
import weekchannel from '@/components/weekchannel'
import yearchanels from '@/components/yearchanels'
import channelinfo from '@/components/channelinfo'
import downloadchannes from '@/components/downloadchannes'
import channestable from '@/components/channestable'
import channeslist from '@/components/channeslist'
import channetableinfo from '@/components/channetableinfo'
import business from '@/components/business'
import errorlist from '@/components/errorlist'
import cleardatas from '@/components/cleardatas'
import serachlist from '@/components/serachlist'
import serechload from '@/components/serechload'
import serachchanl from '@/components/serachchanl'
import list from '@/components/list'
import loginpage from '@/components/login-page'
import nexttable from '@/components/nexttable'
import nexttableinfo from '@/components/nexttableinfo'
// login-page
Vue.use(Router)

export default new Router({
  routes: [
    {
      path: '/',
      name: '/',
      component: dayflow
    }, {
      path: '/dayflow',
      name: 'dayflow',
      component: dayflow
    }, {
      path: '/mousflow',
      name: 'mousflow',
      component: mousflow
    }, {
      path: '/weekflow',
      name: 'weekflow',
      component: weekflow
    }, {
      path: '/yearflow',
      name: 'yearflow',
      component: yearflow
    }, {
      path: '/daydownload',
      name: 'daydownload',
      component: daydownload
    }, {
      path: '/monthdownload',
      name: 'monthdownload',
      component: monthdownload
    }, {
      path: '/weekdownload',
      name: 'weekdownload',
      component: weekdownload
    }, {
      path: '/yeardownload',
      name: 'yeardownload',
      component: yeardownload
    }, {
      path: '/downloadinfo',
      name: 'downloadinfo',
      component: downloadinfo
    }, {
      path: '/daychannel',
      name: 'daychannel',
      component: daychannel
    }, {
      path: '/mouschanel',
      name: 'mouschanel',
      component: mouschanel
    }, {
      path: '/weekchannel',
      name: 'weekchannel',
      component: weekchannel
    }, {
      path: '/yearchanels',
      name: 'yearchanels',
      component: yearchanels
    }, {
      path: '/channelinfo',
      name: 'channelinfo',
      component: channelinfo
    }, {
      path: '/downloadchannes',
      name: 'downloadchannes',
      component: downloadchannes
    }, {
      path: '/channestable',
      name: 'channestable',
      component: channestable
    }, {
      path: '/channeslist',
      name: 'channeslist',
      component: channeslist
    }, {
      path: '/channetableinfo',
      name: 'channetableinfo',
      component: channetableinfo
    }, {
      path: '/business',
      name: 'business',
      component: business
    }, {
      path: '/errorlist',
      name: 'errorlist',
      component: errorlist
    }, {
      path: '/cleardatas',
      name: 'cleardatas',
      component: cleardatas
    },
    {
      path: '/serachlist',
      name: 'serachlist',
      component: serachlist
    },
    {
      path: '/serechload',
      name: 'serechload',
      component: serechload
    },
    {
      path: '/serachchanl',
      name: 'serachchanl',
      component: serachchanl
    },
    {
      path: '/list',
      name: 'list',
      component: list
    },
    {
      path: '/loginpage',
      name: 'loginpage',
      component: loginpage
    },
    {
      path: '/nexttable',
      name: 'nexttable',
      component: nexttable
    },
    {
      path: '/nexttableinfo',
      name: 'nexttableinfo',
      component: nexttableinfo
    },

  ]
})
