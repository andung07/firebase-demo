// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import Vue from 'vue'
import VueFire from 'vuefire'
import App from './App'
import router from './router'
import {firebaseApp} from './firebase'

// sub-components
import CreateEventRequestView from './components/Home-CreateEventRequest'
import MyTasksView from './components/Home-MyTasks'
import EventRequestListView from './components/Home-EventRequestList'
import NotFoundView from './components/Home-NotFound'
import DashboardView from './components/Home-Dashboard'
import MyTasksApprovalView from './components/Home-MyTasks-Approval'
import MyTasksAssignmentView from './components/Home-MyTasks-Assignment'
import MyTasksSubTasksView from './components/Home-MyTasks-SubTasks'
import MyTasksFinReqView from './components/Home-MyTasks-FinReq'
import MyTasksRecReqView from './components/Home-MyTasks-RecReq'

// register sub-components
Vue.component('CreateEventRequestView', CreateEventRequestView)
Vue.component('MyTasksView', MyTasksView)
Vue.component('EventRequestListView', EventRequestListView)
Vue.component('NotFoundView', NotFoundView)
Vue.component('DashboardView', DashboardView)
Vue.component('MyTasksApprovalView', MyTasksApprovalView)
Vue.component('MyTasksAssignmentView', MyTasksAssignmentView)
Vue.component('MyTasksSubTasksView', MyTasksSubTasksView)
Vue.component('MyTasksFinReqView', MyTasksFinReqView)
Vue.component('MyTasksRecReqView', MyTasksRecReqView)

// enable VueFire for firebase binding
Vue.use(VueFire)

// other vue config
Vue.config.productionTip = false

/* eslint-disable no-new */
new Vue({
  el: '#app',
  router,
  template: '<App/>',
  components: { App },
  created: function () {
    firebaseApp.auth().onAuthStateChanged(function (user) {
      if (user) {
        this.uid = user.uid
        if (!this.testMode) {
          router.replace('/home/dashboard')
        }
      } else {
        this.uid = null
        if (!this.testMode) {
          router.replace('/login')
        }
      }
    }.bind(this))
  },
  data: {
    uid: null,
    testMode: false
  }
})
