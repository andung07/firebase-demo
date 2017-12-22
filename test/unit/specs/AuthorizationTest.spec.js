const assert = require('chai').assert
const firebaseApp = require('@/firebase').firebaseApp

describe('Firebase Authorization Testing', function () {
  it('app should identify user fullName as Mike', function () {
    this.timeout(4000)
    let email = 'mike@sep.se'
    let password = '123456!@#'

    return firebaseApp.auth().signInWithEmailAndPassword(email, password).then(function (res) {
      return firebaseApp.database().ref('users/' + res.uid).once('value').then(function (snapshot) {
        assert.equal(snapshot.val().fullName, 'Mike')
      })
    })
  })

  it('app should identify role: Administration Department Manager', function () {
    this.timeout(4000)
    let uid = firebaseApp.auth().currentUser.uid
    return firebaseApp.database().ref('users/' + uid).once('value').then(function (snapshot) {
      assert.equal(snapshot.val().role, 'Administration Department Manager')
    })
  })

  it('')
})
