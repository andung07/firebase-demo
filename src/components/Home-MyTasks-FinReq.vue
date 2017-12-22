<<template>
  <section>

    <!-- Modal View for Financial Request Details View -->
    <div class="modal fade" id="financialRequestDetail" style="display: none;">
      <div class="modal-dialog" style="width: 80%">
        <div class="modal-content">
          <div class="modal-header">
            <button type="button" class="close" data-dismiss="modal" aria-label="Close">
              <span aria-hidden="true">×</span></button>
            <h4 class="modal-title">Event Request Details</h4>
          </div>
          <div class="modal-body">
            <div class="row">
              <div class="col-md-3">
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
                <p><b>Other Needs:</b>
                <textarea v-model="selectedEventRequest.otherNeeds" class="form-control" rows="3" disabled=""></textarea></p>
              </div>
              <div class="col-md-3">
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
                <p><b>Comments:</b>
                <textarea v-model="selectedEventRequest.comments" class="form-control" rows="3" disabled=""></textarea></p>
              </div>
              <!-- REQUEST VIEW -->
              <div class="col-md-6">
                <div class="box box-info">
                  <div class="box-header with-border">
                    <h3 class="box-title">Financial Request Details</h3>
                  </div>
                  <!-- /.box-header -->
                  <!-- form start -->
                  <form class="form-horizontal">
                    <div class="box-body">
                      <div class="form-group">
                        <label class="col-sm-3 control-label">Amount:</label>
                        <div class="col-sm-9">
                          <input v-model="selectedFinancialRequest.amount" disabled="" type="text" class="form-control">
                        </div>
                      </div>
                      <div class="form-group">
                        <label class="col-sm-3 control-label">Created By:</label>
                        <div class="col-sm-9">
                          <input v-model="selectedFinancialRequest.createdBy.fullName" type="text" disabled="" class="form-control">
                        </div>
                      </div>
                      <div class="form-group">
                        <label class="col-sm-3 control-label">Reason:</label>
                        <div class="col-sm-9">
                          <input v-model="selectedFinancialRequest.reason" type="text" disabled="" class="form-control">
                        </div>
                      </div>
                      <div class="form-group">
                        <label class="col-sm-3 control-label">Status:</label>
                        <div class="col-sm-9">
                          <input v-model="selectedFinancialRequest.status" type="text" disabled="" class="form-control">
                        </div>
                      </div>
                      <div class="form-group">
                        <label class="col-sm-3 control-label">Comments:</label>
                        <div class="col-sm-9">
                          <textarea v-model="selectedFinancialRequest.comments" type="text" class="form-control" rows="4"></textarea>
                        </div>
                      </div>
                      <button v-on:click="saveFinancialRequestChanges('Approved')" data-dismiss="modal" class="btn btn-sm btn-success">Approve</button>
                      <button v-on:click="saveFinancialRequestChanges('Rejected')" data-dismiss="modal" class="btn btn-sm btn-danger">Reject</button>
                    </div>
                    <!-- /.box-body -->
                  </form>
                </div>
              </div>
            </div>

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
          <div class="box-header with-border">
            <h3 class="box-title">Financial Requests - Pending Your Approval</h3>
          </div>
          <!-- /.box-header -->
          <div class="box-body">
            <table class="table table-bordered">
              <tbody><tr>
                <th style="width: 10px">#</th>
                <th>Project Reference Number</th>
                <th>Amount</th>
                <th>Created By</th>
                <th>Reason</th>
                <th>Status</th>
                <th>Comments</th>
                <th>View</th>
              </tr>
              <template v-for="(request, index) in financialRequests">
                <tr>
                  <td>{{ index + 1 }}.</td>
                  <td>{{ request.eventRequestNumber }}</td>
                  <td>{{ request.amount }}</td>
                  <td>{{ request.createdBy.fullName }}</td>
                  <td>{{ request.reason }}</td>
                  <td><span class="badge" v-bind:class="[{'bg-yellow' : request.status == 'Pending FM Approval'},
                                                          {'bg-green' : request.status == 'Approved'},
                                                          {'bg-red' : request.status == 'Rejected'}]">
                      {{ request.status }}</span></td>
                  <td>{{ request.comments }}</td>
                  <td><button class="btn btn-xs btn-info" v-on:click="setSelectedFinancialRequest(request.eventRequestKey, request.key)"
                              data-toggle="modal" data-target="#financialRequestDetail">View</button></td>
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
      selectedEventRequest: {},
      selectedFinancialRequest: {
        createdBy: {}
      },
      financialRequests: []
    }
  },
  methods: {
    setSelectedFinancialRequest: function (eventRequestKey, finReqKey) {
      this.selectedEventRequest = this.myTasksOnEventRequest.find(item => item['.key'] === eventRequestKey)
      this.selectedFinancialRequest = this.financialRequests.find(item => item.key === finReqKey)
    },
    saveFinancialRequestChanges: function (decision) {
      let updatedFields = {
        status: decision,
        comments: this.selectedFinancialRequest.comments
      }
      // console.log(this.selectedFinancialRequest)
      db.ref('/eventRequests/' + this.selectedFinancialRequest.eventRequestKey + '/financialRequests/').child(this.selectedFinancialRequest.key).update(updatedFields).catch(function (error) {
        alert(error.message)
      })
    },
    populateFinancialRequests: function (eventRequestList) {
      this.financialRequests = []
      for (let eventRequestIndex in eventRequestList) {
        let eventRequest = eventRequestList[eventRequestIndex]
        if (eventRequest.financialRequests) {
          for (let financialRequestIndex in eventRequest.financialRequests) {
            let finReq = eventRequest.financialRequests[financialRequestIndex]
            if (finReq.status === 'Pending FM Approval') {
              finReq.eventRequestNumber = eventRequest.requestNumber
              finReq.eventRequestKey = eventRequest['.key']
              finReq.key = financialRequestIndex
              this.financialRequests.push(finReq)
            }
          }
        }
      }
    }
  },
  created: function () {
    // get eventRequests list based on status expected, then get financial request list
    this.$bindAsArray('myTasksOnEventRequest', db.ref('eventRequests').orderByChild('status')
      .equalTo('Approved'), null, function () {
        this.populateFinancialRequests(this.myTasksOnEventRequest)
      }.bind(this))

    db.ref('eventRequests').on('child_changed', function () {
      setTimeout(function () {
        this.populateFinancialRequests(this.myTasksOnEventRequest)
      }.bind(this), 1500)
    }.bind(this))
  }
}
</script>
