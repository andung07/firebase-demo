<template>
<!-- Content Wrapper: createNewEventRequest -->
  <div class="content-wrapper">
    <!-- Content Header (Page header) -->
    <section class="content-header">
      <h1>
        Create Event Request
        <small></small>
      </h1>
      <ol class="breadcrumb">
        <li><a href="/#/"><i class="fa fa-home"></i> Home</a></li>
        <li class="active">Create Event Request</li>
      </ol>
    </section>

    <!-- Main content -->
    <section class="content">

      <!-- Horizontal Form -->
      <div class="box box-info">
        <div class="box-header with-border">
          <h3 class="box-title">Client Request Details</h3>
        </div>
        <!-- /.box-header -->
        <!-- form start -->
        <form class="form-horizontal">
          <div class="box-body">
            <div class="col-md-6">
              <div class="form-group">
                <label class="col-sm-4 control-label">Request Number:</label>
                <div class="col-sm-8">
                  <input v-model="newEventRequestDetails.requestNumber" disabled="" type="text" class="form-control">
                </div>
              </div>
              <div class="form-group">
                <label class="col-sm-4 control-label">Client Name:</label>
                <div class="col-sm-8">
                  <input v-model="newEventRequestDetails.clientName" type="text" class="form-control">
                </div>
              </div>
              <div class="form-group">
                <label class="col-sm-4 control-label">Event Type:</label>
                <div class="col-sm-8">
                  <input v-model="newEventRequestDetails.eventType" type="text" class="form-control">
                </div>
              </div>
              <div class="form-group">
                <label class="col-sm-4 control-label">Description:</label>
                <div class="col-sm-8">
                  <input v-model="newEventRequestDetails.description" type="text" class="form-control">
                </div>
              </div>
              <div class="form-group">
                  <label class="col-sm-4 control-label">Decoration:</label>
                  <div class="col-sm-8">
                    <textarea v-model="newEventRequestDetails.decoration" type="text" class="form-control" rows="3"></textarea>
                  </div>
              </div>
              <div class="form-group">
                  <label class="col-sm-4 control-label">Filming / Photos:</label>
                  <div class="col-sm-8">
                    <textarea v-model="newEventRequestDetails.filmingPhotos" type="text" class="form-control" rows="3"></textarea>
                  </div>
              </div>
              <div class="form-group">
                  <label class="col-sm-4 control-label">Posters / Artwork:</label>
                  <div class="col-sm-8">
                    <textarea v-model="newEventRequestDetails.postersArtwork" type="text" class="form-control" rows="3"></textarea>
                  </div>
              </div>
            </div>
            <div class="col-md-6">
              <div class="form-group">
                <label class="col-sm-4 control-label">Expected Attendees:</label>
                <div class="col-sm-8">
                  <input v-model="newEventRequestDetails.expectedAttendees" type="number" class="form-control">
                </div>
              </div>
              <div class="form-group">
                <label class="col-sm-4 control-label">Planned Budget (SEK):</label>
                <div class="col-sm-8">
                  <input v-model="newEventRequestDetails.plannedBudget" type="number" class="form-control">
                </div>
              </div>
              <div class="form-group">
                <label class="col-sm-4 control-label">Start Date:</label>
                <div class="col-sm-8">
                  <div class="input-group date">
                    <div class="input-group-addon">
                      <i class="fa fa-calendar"></i>
                    </div>
                    <input v-model="newEventRequestDetails.startDate" type="date" class="form-control">
                  </div>
                </div>
              </div>
              <div class="form-group">
                <label class="col-sm-4 control-label">End Date:</label>
                <div class="col-sm-8">
                  <div class="input-group date">
                    <div class="input-group-addon">
                      <i class="fa fa-calendar"></i>
                    </div>
                    <input v-model="newEventRequestDetails.endDate" type="date" class="form-control">
                  </div>
                </div>
              </div>
              <div class="form-group">
                  <label class="col-sm-4 control-label">Food / Drinks:</label>
                  <div class="col-sm-8">
                    <textarea v-model="newEventRequestDetails.foodDrinks" type="text" class="form-control" rows="3"></textarea>
                  </div>
              </div>
              <div class="form-group">
                  <label class="col-sm-4 control-label">Music:</label>
                  <div class="col-sm-8">
                    <textarea v-model="newEventRequestDetails.musics" type="text" class="form-control" rows="3"></textarea>
                  </div>
              </div>
              <div class="form-group">
                  <label class="col-sm-4 control-label">Computer-Related Issues:</label>
                  <div class="col-sm-8">
                    <textarea v-model="newEventRequestDetails.computerRelatedIssues" type="text" class="form-control" rows="3"></textarea>
                  </div>
              </div>
              <div class="form-group">
                  <label class="col-sm-4 control-label">Other Needs:</label>
                  <div class="col-sm-8">
                    <textarea v-model="newEventRequestDetails.otherNeeds" type="text" class="form-control" rows="3"></textarea>
                  </div>
              </div>
              <div class="form-group">
                  <label class="col-sm-4 control-label"></label>
                  <div class="col-sm-8">
                    <button v-on:click="submitNewEventRequest" class="btn btn-info">Submit</button>
                  </div>
              </div>
            </div>
          </div>
          <!-- /.box-body -->
          <!-- /.box-footer -->
        </form>
      </div>

    </section>
    <!-- /.content -->
  </div>
  <!-- /.content-wrapper -->
</template>

<script>
import {firebaseApp} from '../firebase'

let db = firebaseApp.database()

export default {
  data: function () {
    return {
      newEventRequestDetails: {
        clientName: '',
        comments: '',
        computerRelatedIssues: '',
        decoration: '',
        description: '',
        endDate: '',
        eventType: '',
        expectedAttendees: '',
        filmingPhotos: '',
        foodDrinks: '',
        musics: '',
        otherNeeds: '',
        plannedBudget: '',
        postersArtwork: '',
        requestNumber: '',
        startDate: '',
        status: ''
      }
    }
  },
  methods: {
    submitNewEventRequest: function () {
      // Set initial status of new event request
      this.newEventRequestDetails.status = 'Pending SCS Approval'

      db.ref().child('eventRequests').push(this.newEventRequestDetails).then(function () {
        alert('New event request has been created!')
        let d = new Date()
        this.newEventRequestDetails = { requestNumber: 'SEP' + d.getTime() }
      }.bind(this)).catch(function (error) {
        alert(error.message)
      })
    }
  },
  created: function () {
    // set request number
    let d = new Date()
    this.newEventRequestDetails.requestNumber = 'SEP' + d.getTime()
  }
}
</script>
