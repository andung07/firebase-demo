<template>
<div class="wrapper">
  <!-- Content Wrapper. Contains page content -->
  <div class="content-wrapper">
    <!-- Content Header (Page header) -->
    <section class="content-header">
      <h1>
        Model Testing Page
        <small>Lists of model unit testing done during development</small>
      </h1>
    </section>

    <!-- Main content -->
    <section class="content">
      <!-- Your Page Content Here -->
      <div class="row">
        <div class="col-md-2">
          <button v-on:click="runTests" class="btn btn-primary btn-block btn-flat">Run Tests</button>
        </div>
      </div>
      <div class="row">
        <div class="col-md-8">
          <div class="box">
            <div class="box-body">
              <div class="box-header with-border">
                <h3 class="box-title">Authentication Testing</h3>
              </div>
              <table class="table table-bordered">
                <tbody>
                <tr>
                  <th style="width: 10px">#</th>
                  <th>Test Description</th>
                  <th style="width: 80px">Status</th>
                </tr>
                <tr>
                  <td>1.</td>
                  <td>App should fail to login using incorrect username & password</td>
                  <td>
                    <span class="badge" v-bind:class="[tests1.one.bgClass]">{{tests1.one.status}}</span>
                  </td>
                </tr>
                <tr>
                  <td>2.</td>
                  <td>App should login successfully</td>
                  <td>
                    <span class="badge" v-bind:class="[tests1.two.bgClass]">{{tests1.two.status}}</span>
                  </td>
                </tr>
                </tbody>
              </table>
            </div>
          </div>
        </div>
      </div>
      <div class="row">
        <div class="col-md-8">
          <div class="box">
            <div class="box-body">
              <div class="box-header with-border">
                <h3 class="box-title">Authorization Testing</h3>
              </div>
              <table class="table table-bordered">
                <tbody>
                <tr>
                  <th style="width: 10px">#</th>
                  <th>Test Description</th>
                  <th style="width: 80px">Status</th>
                </tr>
                <tr>
                  <td>1.</td>
                  <td>App should identify user fullName as Mike</td>
                  <td>
                    <span class="badge" v-bind:class="[tests2.one.bgClass]">{{tests2.one.status}}</span>
                  </td>
                </tr>
                <tr>
                  <td>2.</td>
                  <td>App should identify role: Administration Department Manager</td>
                  <td>
                    <span class="badge" v-bind:class="[tests2.two.bgClass]">{{tests2.two.status}}</span>
                  </td>
                </tr>
                </tbody>
              </table>
            </div>
          </div>
        </div>
      </div>
      <div class="row">
        <div class="col-md-8">
          <div class="box">
            <div class="box-body">
              <div class="box-header with-border">
                <h3 class="box-title">Access Level Testing</h3>
              </div>
              <table class="table table-bordered">
                <tbody>
                <tr>
                  <th style="width: 10px">#</th>
                  <th>Test Description</th>
                  <th style="width: 80px">Status</th>
                </tr>
                <tr>
                  <td>1.</td>
                  <td>Sarah as CSO should be able to create new event request</td>
                  <td>
                    <span class="badge" v-bind:class="[tests3.one.bgClass]">{{tests3.one.status}}</span>
                  </td>
                </tr>
                </tbody>
              </table>
            </div>
          </div>
        </div>
      </div>
    </section>
    <!-- /.content -->
  </div>
  <!-- /.content-wrapper -->
</div>
</template>

<script>
import {firebaseApp} from '../firebase'

export default {
  data () {
    return {
      tests1: {
        one: {
          status: 'WAITING',
          bgClass: 'bg-grey'
        },
        two: {
          status: 'WAITING',
          bgClass: 'bg-grey'
        }
      },
      tests2: {
        one: {
          status: 'WAITING',
          bgClass: 'bg-grey'
        },
        two: {
          status: 'WAITING',
          bgClass: 'bg-grey'
        }
      },
      tests3: {
        one: {
          status: 'WAITING',
          bgClass: 'bg-grey'
        }
      }
    }
  },
  methods: {
    runTests: function () {
      // enable test mode
      this.$root.testMode = true

      firebaseApp.auth().signOut()

      let email = 'mike@sep.se'
      let password = '123456!@#'

      // Tests1.one: App should fail to login using incorrect username & password
      firebaseApp.auth().signInWithEmailAndPassword(email, password + '2').then(function (user) {
        if (user) {
          this.tests1.one.status = 'FAILED'
          this.tests1.one.bgClass = 'bg-red'
        }
      }.bind(this)).catch(function (error) {
        if (error) {
          this.tests1.one.status = 'PASSED'
          this.tests1.one.bgClass = 'bg-green'
        }
      }.bind(this))

      // Tests1.two: App should login successfully
      firebaseApp.auth().signInWithEmailAndPassword(email, password).then(function (user) {
        if (user) {
          this.tests1.two.status = 'PASSED'
          this.tests1.two.bgClass = 'bg-green'
        }
      }.bind(this)).catch(function (error) {
        if (error) {
          this.tests1.two.status = 'FAILED'
          this.tests1.two.bgClass = 'bg-red'
        }
      }.bind(this))

      // Test2.one: App should identify user fullName as Mike
      // Test2.two: App should identify role: Administration Department Manager
      setTimeout(function () {
        let uid = firebaseApp.auth().currentUser.uid

        firebaseApp.database().ref('users/' + uid).once('value').then(function (snapshot) {
          if (snapshot.val().fullName === 'Mike') {
            this.tests2.one.status = 'PASSED'
            this.tests2.one.bgClass = 'bg-green'
          } else {
            this.tests2.one.status = 'FAILED'
            this.tests2.one.bgClass = 'bg-red'
          }

          if (snapshot.val().role === 'Administration Department Manager') {
            this.tests2.two.status = 'PASSED'
            this.tests2.two.bgClass = 'bg-green'
          } else {
            this.tests2.two.status = 'FAILED'
            this.tests2.two.bgClass = 'bg-red'
          }
        }.bind(this))
      }.bind(this), 2000)

      // Test3.one: Sarah as CSO should be able to create a new request
      setTimeout(function () {
        let email = 'sarah@sep.se'
        let password = '123456!@#'

        firebaseApp.auth().signOut()
        firebaseApp.auth().signInWithEmailAndPassword(email, password)

        var db = firebaseApp.database()
        var key = db.ref().child('eventRequests').push().key

        db.ref('eventRequests/' + key).set({
          client: 'PwC',
          plannedBudget: '500000',
          expectedAttendees: '2000'
        }).then(function () {
          this.tests3.one.status = 'PASSED'
          this.tests3.one.bgClass = 'bg-green'

          setTimeout(function () {
            // remove entry after created
            db.ref('eventRequests').child(key).remove()
          }, 2000)
        }.bind(this)).catch(function () {
          this.tests3.one.status = 'FAILED'
          this.tests3.one.bgClass = 'bg-red'
        }.bind(this))
      }.bind(this), 2000)
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
    // enable test mode
    this.$root.testMode = true
  },
  beforeDestroy: function () {
    // disable test mode
    this.$root.testMode = false
  }
}
</script>
