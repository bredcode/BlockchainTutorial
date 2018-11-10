import Vue from 'vue'
import Router from 'vue-router'
import LoginPage from '@/components/LoginPage'
import MainPage from '@/components/MainPage'
import WalletPage from '@/components/WalletPage'
import TransactionPage from '@/components/TransactionPage'
import MiningPage from '@/components/MiningPage'
import MempoolPage from '@/components/MempoolPage'
import HistoryPage from '@/components/HistoryPage'

Vue.use(Router)

export default new Router({
  mode: 'history',
  routes: [
    {
      path: '/',
      name: 'LoginPage',
      component: LoginPage
    },
    {
      path: '/mainPage/:id',
      name: 'MainPage',
      component: MainPage,
      props: true
    },
    {
      path: '/WalletPage/:id',
      name: 'WalletPage',
      component: WalletPage,
      props: true
    },
    {
      path: '/TransactionPage/:id',
      name: 'TransactionPage',
      component: TransactionPage,
      props: true
    },
    {
      path: '/MiningPage/:id',
      name: 'MiningPage',
      component: MiningPage,
      props: true
    },
    {
      path: '/MempoolPage/:id',
      name: 'MempoolPage',
      component: MempoolPage,
      props: true
    },
    {
      path: '/HistoryPage/:id',
      name: 'HistoryPage',
      component: HistoryPage,
      props: true
    }
  ]
})
