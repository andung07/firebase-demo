<template>
<div class="login-box">
  <div class="login-logo">
    <b>SEP</b> Event Organizer</b>
  </div>
  <!-- /.login-logo -->
  <div class="login-box-body">
    <p class="login-box-msg">Sign in here!</p>

    <form>
      <div class="form-group has-feedback">
        <input v-model="loginProp.email" type="text" class="form-control" placeholder="Email">
        <span class="glyphicon glyphicon-user form-control-feedback"></span>
      </div>
      <div class="form-group has-feedback">
        <input v-model="loginProp.password" type="password" class="form-control" placeholder="Password">
        <span class="glyphicon glyphicon-lock form-control-feedback"></span>
      </div>
      <div class="row">

        <!-- /.col -->
        <div class="col-xs-4">
          <button v-on:click="login" class="btn btn-primary btn-block btn-flat">Sign In</button>
        </div>
        <!-- /.col -->
      </div>
    </form>

  </div>
  <!-- /.login-box-body -->
</div>
<!-- /.login-box -->
</template>

<<script>
import {firebaseApp} from '../firebase'

export default {
  data: function () {
    return {
      loginProp: {
        email: '',
        password: ''
      }
    }
  },
  methods: {
    login: function () {
      firebaseApp.auth().signInWithEmailAndPassword(this.loginProp.email, this.loginProp.password)
        .catch(function (error) {
          alert(error.message)
        })
    }
  },
  beforeRouteEnter (to, from, next) {
    if (firebaseApp.auth().currentUser) {
      next('/home/dashboard')
    } else {
      next()
    }
  }
}
</script>
