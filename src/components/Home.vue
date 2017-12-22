<template>
<div class="wrapper">

  <!-- Main Header -->
  <header class="main-header">

    <!-- Logo -->
    <a href="#/home/dashboard" class="logo">
      <!-- mini logo for sidebar mini 50x50 pixels -->
      <span class="logo-mini"><b>S</b>EP</span>
      <!-- logo for regular state and mobile devices -->
      <span class="logo-lg"><b>SEP</b> Event Organizer</span>
    </a>

    <!-- Header Navbar -->
    <nav class="navbar navbar-static-top" role="navigation">
      <!-- Sidebar toggle button-->
      <a href="#" class="sidebar-toggle" data-toggle="offcanvas" role="button">
        <span class="sr-only">Toggle navigation</span>
      </a>
      <!-- Navbar Right Menu -->
      <div class="navbar-custom-menu">
        <ul class="nav navbar-nav">

          <!-- User Account Menu -->
          <li class="dropdown user user-menu">
            <!-- Menu Toggle Button -->
            <a href="#" class="dropdown-toggle" data-toggle="dropdown">
              <!-- The user image in the navbar-->
              <img v-bind:src="userAvatar" class="user-image" alt="avatar">
              <!-- hidden-xs hides the username on small devices so only the image appears. -->
              <span class="hidden-xs">{{userProfile.fullName}}</span>
            </a>
            <ul class="dropdown-menu">
              <!-- The user image in the menu -->
              <li class="user-header">
                <img v-bind:src="userAvatar" class="img-circle" alt="avatar">

                <p>
                  {{userProfile.fullName}}
                  <small>{{userProfile.role}}</small>
                </p>
              </li>

              <!-- Menu Footer-->
              <li class="user-footer">
                <div class="pull-left">
                  <a class="btn btn-default btn-flat">Profile</a>
                </div>
                <div class="pull-right">
                  <a v-on:click="logout" href="#" class="btn btn-default btn-flat">Log out</a>
                </div>
              </li>
            </ul>
          </li>

        </ul>
      </div>
    </nav>
  </header>
  <!-- Left side column. contains the logo and sidebar -->
  <aside class="main-sidebar">

    <!-- sidebar: style can be found in sidebar.less -->
    <section class="sidebar">

      <!-- Sidebar user panel (optional) -->
      <div class="user-panel">
        <div class="pull-left image">
          <img v-bind:src="userAvatar" class="img-circle" alt="avatar">
        </div>
        <div class="pull-left info">
          <p>{{userProfile.fullName}}</p>
          <!-- Status -->
          <a><i class="fa fa-circle text-success"></i> Online</a>
        </div>
      </div>
      <!-- Sidebar Menu -->
      <ul class="sidebar-menu">
        <li class="header">MAIN MENU</li>
        <!-- Optionally, you can add icons to the links. set li class to active to mark selected -->
        <li v-bind:class="[{active : $route.params.menu == 'dashboard'}]">
          <a href="#/home/dashboard">
            <i class="fa fa-dashboard"></i>
            <span>Dashboard</span>
          </a>
        </li>
        <li v-if="userProfile.role && userProfile.role.includes('Customer Service')"
            v-bind:class="[{active : $route.params.menu == 'createEventRequest'}]">
          <a href="#/home/createEventRequest">
            <i class="fa fa-plus-circle"></i>
            <span>Create Event Request</span>
          </a>
        </li>
        <li v-bind:class="[{active : $route.params.menu == 'eventRequestList'}]">
          <a href="#/home/eventRequestList">
            <i class="fa fa-th-list"></i>
            <span>Event Request List</span>
          </a>
        </li>
        <li v-if="userProfile && userProfile.role != 'Customer Service Officer'"
            v-bind:class="[{active : $route.params.menu == 'myTasks'}]">
          <a href="#/home/myTasks">
            <i class="fa fa-tasks"></i>
            <span>My Tasks</span>
          </a>
        </li>
        </li>
        <li class="header">CORPORATE</li>
        <!-- Optionally, you can add icons to the links. set li class to active to mark selected -->
        <li v-bind:class="[{active : $route.params.menu == 'clientDB'}]">
          <a href="#/home/clientDB">
            <i class="fa fa-address-book"></i>
            <span>Client Database</span>
          </a>
        </li>
        <li v-bind:class="[{active : $route.params.menu == 'employeeDB'}]">
          <a href="#/home/employeeDB">
            <i class="fa fa-users"></i>
            <span>Employee Database</span>
          </a>
        </li>
        <li v-bind:class="[{active : $route.params.menu == 'employeeSchedule'}]">
          <a href="#/home/employeeSchedule">
            <i class="fa fa-calendar"></i>
            <span>Employee Schedule</span>
          </a>
        </li>
        </li>
      </ul>
      <!-- /.sidebar-menu -->
    </section>
    <!-- /.sidebar -->
  </aside>

  <DashboardView v-if="$route.params.menu == 'dashboard'"></DashboardView>
  <CreateEventRequestView v-else-if="$route.params.menu == 'createEventRequest'"></CreateEventRequestView>
  <EventRequestListView v-else-if="$route.params.menu == 'eventRequestList'"></EventRequestListView>
  <MyTasksView v-bind:userRole="userProfile.role" v-bind:userFullName="userProfile.fullName" v-else-if="$route.params.menu == 'myTasks'"></MyTasksView>
  <NotFoundView v-else></NotFoundView>

  <!-- Main Footer -->
  <footer class="main-footer">
    <!-- To the right -->
    <div class="pull-right hidden-xs">
      <!-- Anything you want -->
    </div>
    <!-- Default to the left -->
    <strong>Copyright &copy; 2017 <a href="#/home/dashboard">SEP</a>.</strong> All rights reserved.
  </footer>
  <!-- /.control-sidebar -->
  <!-- Add the sidebar's background. This div must be placed
       immediately after the control sidebar -->
  <div class="control-sidebar-bg"></div>
</div>
<!-- ./wrapper -->
</template>

<script>
import {firebaseApp} from '../firebase'

let usersDB = firebaseApp.database().ref('users')
let avatars = firebaseApp.storage().ref('userAvatar')

export default {
  data: function () {
    return {
      userAvatar: '/static/AdminLTE/img/loading.png'
    }
  },
  methods: {
    logout: function () {
      firebaseApp.auth().signOut().catch(function (error) {
        alert(error.message)
      })
    }
  },
  updated: function () {
    // fix body height
    if ($.AdminLTE.layout) {
      $.AdminLTE.layout.fix()
    }
  },
  mounted: function () {
    // fix body height
    if ($.AdminLTE.layout) {
      $.AdminLTE.layout.fix()
    }
  },
  created: function () {
    // get user details
    this.$bindAsObject('userProfile', usersDB.child(this.$root.uid))

    // get user avatar
    avatars.child(this.$root.uid + '.png').getDownloadURL().then(function (url) {
      this.userAvatar = url
    }.bind(this))
  },
  beforeRouteEnter (to, from, next) {
    if (firebaseApp.auth().currentUser) {
      next()
    } else {
      next('/login')
    }
  }
}
</script>
