<template>
  <!-- Main content: APROVAL -->
  <section>

    <!-- Modal View for Event Request Details View -->
    <div class="modal fade" id="eventRequestDetail" style="display: none;">
      <div class="modal-dialog">
        <div class="modal-content">
          <div class="modal-header">
            <button type="button" class="close" data-dismiss="modal" aria-label="Close">
              <span aria-hidden="true">×</span></button>
            <h4 class="modal-title">Event Request Details</h4>
          </div>
          <div class="modal-body">
            <div class="row">
              <div class="col-md-6">
                <p><b>Request Number:</b> {{ selectedEventRequest.requestNumber }}</p>
                <p><b>Client Name:</b> {{ selectedEventRequest.clientName }}</p>
                <p><b>Event Type:</b> {{ selectedEventRequest.eventType }}</p>
                <p><b>Description:</b> {{ selectedEventRequest.description }}</p>
                <p><b>Decoration:</b>
                <textarea v-model="selectedEventRequest.decoration" class="form-control" rows="2" disabled=""></textarea></p>
                <p><b>Filming / Photos:</b>
                <textarea v-model="selectedEventRequest.filmingPhotos" class="form-control" rows="2" disabled=""></textarea></p>
                <p><b>Posters / Artwork:</b>
                <textarea v-model="selectedEventRequest.postersArtwork" class="form-control" rows="2" disabled=""></textarea></p>
              </div>
              <div class="col-md-6">
                <p><b>Expected Attendees:</b> {{ selectedEventRequest.expectedAttendees }}</p>
                <p><b>Planned Budget (SEK):</b> {{ selectedEventRequest.plannedBudget }}</p>
                <p><b>Start Date:</b> {{ selectedEventRequest.startDate }}</p>
                <p><b>End Date:</b> {{ selectedEventRequest.endDate }}</p>
                <p><b>Food / Drinks:</b>
                <textarea v-model="selectedEventRequest.foodDrinks" class="form-control" rows="2" disabled=""></textarea></p>
                <p><b>Music:</b>
                <textarea v-model="selectedEventRequest.musics" class="form-control" rows="2" disabled=""></textarea></p>
                <p><b>Computer-Related Issues:</b>
                <textarea v-model="selectedEventRequest.computerRelatedIssues" class="form-control" rows="2" disabled=""></textarea></p>
              </div>
            </div>
            <p><b>Other Needs:</b>
            <textarea v-model="selectedEventRequest.otherNeeds" class="form-control" rows="2" disabled=""></textarea></p>
            <p><b>Comments:</b>
            <textarea v-model="selectedEventRequest.comments" class="form-control" rows="3"></textarea></p>
          </div>
          <div class="modal-footer">
            <button type="button" class="btn btn-default pull-left" data-dismiss="modal">Close</button>
            <template v-if="selectedEventRequest.status == 'Pending FM Review'">
              <button v-on:click="saveChanges('Reviewed')" type="button" class="btn btn-success" data-dismiss="modal">Save changes and Proceed</button>
            </template>
            <template v-else>
              <button v-on:click="saveChanges('Approved')" type="button" class="btn btn-success" data-dismiss="modal">Approve</button>
              <button v-on:click="saveChanges('Rejected')" type="button" class="btn btn-danger" data-dismiss="modal">Reject</button>
            </template>
          </div>
        </div>
        <!-- /.modal-content -->
      </div>
      <!-- /.modal-dialog -->
    </div>

    <div class="col-md-12">
      <div class="box box-info">
          <div class="box-header with-border">
            <h3 v-if="userRole == 'Financial Manager'" class="box-title">Event Requests - Pending Your Review</h3>
            <h3 v-else class="box-title">Event Requests - Pending Your Approval</h3>
          </div>
          <!-- /.box-header -->
          <div class="box-body">
            <table class="table table-bordered">
              <tbody><tr>
                <th style="width: 10px">#</th>
                <th>Request Number</th>
                <th>Client Name</th>
                <th>Event Type</th>
                <th>Expected Attendees</th>
                <th>Planned Budget</th>
                <th>Start Date</th>
                <th>End Date</th>
                <th>Status</th>
                <th>View</th>
              </tr>
              <template v-for="(eventRequest, index) in myTasksOnEventRequest">
                <tr>
                  <td>{{ index + 1 }}.</td>
                  <td>{{ eventRequest.requestNumber }}</td>
                  <td>{{ eventRequest.clientName }}</td>
                  <td>{{ eventRequest.eventType }}</td>
                  <td>{{ eventRequest.expectedAttendees }}</td>
                  <td>{{ eventRequest.plannedBudget }}</td>
                  <td>{{ eventRequest.startDate }}</td>
                  <td>{{ eventRequest.endDate }}</td>
                  <td><span class="badge bg-yellow">{{ eventRequest.status }}</span></td>
                  <td><button class="btn btn-xs btn-info" v-on:click="setSelectedEventRequest(eventRequest['.key'])"
                              data-toggle="modal" data-target="#eventRequestDetail">View</button></td>
                </tr>
              </template>
            </tbody></table>
          </div>
          <!-- /.box-body -->
        </div>
    </div>

  </section>
  <!-- /.content -->
</template>

<<script>
import {firebaseApp} from '../firebase'

let db = firebaseApp.database()

export default {
  props: ['userRole', 'userFullName', 'expectedStatus'],
  data: function () {
    return {
      selectedEventRequest: {}
    }
  },
  methods: {
    setSelectedEventRequest: function (key) {
      this.selectedEventRequest = this.myTasksOnEventRequest.find(item => item['.key'] === key)
    },
    saveChanges: function (decision) {
      switch (decision) {
        case 'Reviewed':
          this.selectedEventRequest.status = 'Pending AM Approval'
          break
        case 'Approved':
          if (this.selectedEventRequest.status === 'Pending SCS Approval') {
            this.selectedEventRequest.status = 'Pending FM Review'
          } else if (this.selectedEventRequest.status === 'Pending AM Approval') {
            this.selectedEventRequest.status = 'Approved'
          }
          break
        case 'Rejected':
          this.selectedEventRequest.status = 'Rejected'
          break
      }

      let key = this.selectedEventRequest['.key']
      delete this.selectedEventRequest['.key']

      db.ref('eventRequests').child(key).update(this.selectedEventRequest).then(function () {
        this.$bindAsArray('myTasksOnEventRequest', db.ref('eventRequests').orderByChild('status')
          .equalTo(this.expectedStatus))
      }.bind(this)).catch(function (error) {
        alert(error.message)
      })
    }
  },
  created: function () {
    // get eventRequests list based on status expected
    this.$bindAsArray('myTasksOnEventRequest', db.ref('eventRequests').orderByChild('status')
      .equalTo(this.expectedStatus))
  }
}
</script>
