const assert = require('chai').assert
const firebaseApp = require('@/firebase').firebaseApp

describe('Firebase Authentication Testing', function () {
  it('app should fail to login', function () {
    let email = 'kate@sep.se'
    let password = '123456#$&'

    firebaseApp.auth().signOut()
    firebaseApp.auth().signInWithEmailAndPassword(email, password).catch(function (error) {
      let loginSuccess
      if (error) {
        loginSuccess = false
      } else {
        loginSuccess = true
      }
      assert.equal(loginSuccess, false)
    })
  })

  it('app should login successfully', function () {
    let email = 'mike@sep.se'
    let password = '123456!@#'

    firebaseApp.auth().signInWithEmailAndPassword(email, password).then(function (res) {
      let loginSuccess
      if (res) {
        loginSuccess = true
      } else {
        loginSuccess = false
      }
      assert.equal(loginSuccess, true)
    })
  })
})
