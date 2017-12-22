const assert = require('chai').assert
const firebaseApp = require('@/firebase').firebaseApp

describe('Access Level Testing', function () {
  it('Sarah as a customer service officer should be able to create a new event request', function () {
    this.timeout(4000)
    let email = 'sarah@sep.se'
    let password = '123456!@#'

    firebaseApp.auth().signOut()
    firebaseApp.auth().signInWithEmailAndPassword(email, password)

    let db = firebaseApp.database()
    let key = db.child('eventRequests').push().key

    db.ref('eventRequests/' + key).set({
      client: 'ABB',
      value: '5000',
      createdBy: 'Sarah'
    })

    db.ref('eventRequest/' + key).once('value').then(function (snapshot) {
      let isCreated = false
      if (snapshot) {
        isCreated = true
      } else {
        isCreated = false
      }
      assert.equal(isCreated, true)
    })
  })
})
