<template>
<!-- Content Wrapper: myTasks -->
  <div class="content-wrapper">
    <!-- Content Header (Page header) -->
    <section class="content-header">
      <h1>
        Event Request List
        <small></small>
      </h1>
      <ol class="breadcrumb">
        <li><a href="/#/"><i class="fa fa-home"></i> Home</a></li>
        <li class="active">Event Request List</li>
      </ol>
    </section>
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
            <textarea v-model="selectedEventRequest.comments" class="form-control" rows="3" disabled=""></textarea></p>
          </div>
          <div class="modal-footer">
            <button type="button" class="btn btn-default pull-left" data-dismiss="modal">Close</button>
          </div>
        </div>
        <!-- /.modal-content -->
      </div>
      <!-- /.modal-dialog -->
    </div>

    <div class="col-md-12">
      <div class="box box-info">
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
              <template v-for="(eventRequest, index) in eventRequests">
                <tr>
                  <td>{{ index + 1 }}.</td>
                  <td>{{ eventRequest.requestNumber }}</td>
                  <td>{{ eventRequest.clientName }}</td>
                  <td>{{ eventRequest.eventType }}</td>
                  <td>{{ eventRequest.expectedAttendees }}</td>
                  <td>{{ eventRequest.plannedBudget }}</td>
                  <td>{{ eventRequest.startDate }}</td>
                  <td>{{ eventRequest.endDate }}</td>
                  <td><span class="badge" v-bind:class="[{'bg-yellow' : eventRequest.status.includes('Pending')},
                                                          {'bg-green' : eventRequest.status == 'Approved'},
                                                          {'bg-red' : eventRequest.status == 'Rejected'}]">
                      {{ eventRequest.status }}</span></td>
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

  </div>
  <!-- /.content-wrapper -->
</template>

<script>
import {firebaseApp} from '../firebase'

let db = firebaseApp.database()

export default {
  data: function () {
    return {
      selectedEventRequest: {}
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
  methods: {
    setSelectedEventRequest: function (key) {
      this.selectedEventRequest = this.eventRequests.find(item => item['.key'] === key)
    }
  },
  created: function () {
    // get eventRequests list based on status expected
    this.$bindAsArray('eventRequests', db.ref('eventRequests'))
  }
}
</script>
