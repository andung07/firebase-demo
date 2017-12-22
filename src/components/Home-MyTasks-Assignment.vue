<<template>
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

    <!-- Modal View for: OPTIONS -->
    <div class="modal fade" id="tasksWindow" style="display: none;">
      <div class="modal-dialog" style="width: 60%">
        <div class="modal-content">
          <div class="modal-header">
            <button type="button" class="close" data-dismiss="modal" aria-label="Close">
              <span aria-hidden="true">×</span></button>
            <h4 class="modal-title">Options</h4>
          </div>
          <div class="modal-body">
            <div class="row">
              <div class="col-md-6">
                <p><b>Request Number:</b> {{ selectedEventRequest.requestNumber }}</p>
                <p><b>Client Name:</b> {{ selectedEventRequest.clientName }}</p>
                <p><b>Event Type:</b> {{ selectedEventRequest.eventType }}</p>
                <p><b>Description:</b> {{ selectedEventRequest.description }}</p>
                <p><b>Expected Attendees:</b> {{ selectedEventRequest.expectedAttendees }}</p>
                <p><b>Planned Budget (SEK):</b> {{ selectedEventRequest.plannedBudget }}</p>
                <p>
                  <b>Start Date:</b> {{ selectedEventRequest.startDate }}
                  <b> | End Date:</b> {{ selectedEventRequest.endDate }}
                </p>
                <p><button v-on:click="setModalState('Task')" class="btn btn-sm btn-info" style="width: 20%">Task</button>
                <button v-on:click="setModalState('Financial Request')" class="btn btn-sm btn-info" style="width: 35%">Financial Request</button>
                <button v-on:click="setModalState('Recruitment Request')" class="btn btn-sm btn-info" style="width: 35%">Recruitment Request</button></p>
              </div>

              <!-- TASK VIEW -->
              <div v-if="modalState == 'Task'" class="col-md-6">
                <div class="box box-info">
                  <div class="box-header with-border">
                    <h3 class="box-title">New Task</h3>
                  </div>
                  <!-- /.box-header -->
                  <!-- form start -->
                  <form class="form-horizontal">
                    <div class="box-body">
                      <div class="form-group">
                        <label class="col-sm-3 control-label">Description:</label>
                        <div class="col-sm-9">
                          <input v-model="newTask.description" type="text" class="form-control">
                        </div>
                      </div>
                      <div class="form-group">
                        <label class="col-sm-3 control-label">Assign To:</label>
                        <div class="col-sm-9">
                            <select v-model="newTask.assignedTo" class="form-control">
                              <option v-for="user in taskAssignee" v-bind:value="{uid: user['.key'], fullName: user.fullName}">
                                {{user.fullName}}</option>
                            </select>
                        </div>
                      </div>
                      <div class="form-group">
                        <label class="col-sm-3 control-label">Priority:</label>
                        <div class="col-sm-9">
                            <select v-model="newTask.priority" class="form-control">
                              <option>Low</option>
                              <option>Medium</option>
                              <option>High</option>
                            </select>
                        </div>
                      </div>
                      <button v-on:click="saveNewTask" class="btn btn-sm btn-info pull-right">Save</button>
                    </div>
                    <!-- /.box-body -->
                  </form>
                </div>
              </div>

              <!-- FINANCIAL REQUEST VIEW -->
              <div v-else-if="modalState == 'Financial Request'" class="col-md-6">
                <div class="box box-info">
                  <div class="box-header with-border">
                    <h3 class="box-title">Create Financial Request</h3>
                  </div>
                  <!-- /.box-header -->
                  <!-- form start -->
                  <form class="form-horizontal">
                    <div class="box-body">
                      <div class="form-group">
                        <label class="col-sm-3 control-label">Amount (SEK):</label>
                        <div class="col-sm-9">
                          <input v-model="newFinancialRequest.amount" type="text" class="form-control">
                        </div>
                      </div>
                      <div class="form-group">
                        <label class="col-sm-3 control-label">Reason:</label>
                        <div class="col-sm-9">
                            <textarea v-model="newFinancialRequest.reason" type="text" class="form-control" rows="3"></textarea>
                        </div>
                      </div>
                      <button v-on:click="saveNewFinancialRequest" class="btn btn-sm btn-info pull-right">Save</button>
                    </div>
                    <!-- /.box-body -->
                  </form>
                </div>
              </div>

              <!-- RECRUITMENT REQUEST VIEW -->
              <div v-else-if="modalState == 'Recruitment Request'" class="col-md-6">
                <div class="box box-info">
                  <div class="box-header with-border">
                    <h3 class="box-title">Create Recruitment Request</h3>
                  </div>
                  <!-- /.box-header -->
                  <!-- form start -->
                  <form class="form-horizontal">
                    <div class="box-body">
                      <div class="form-group">
                        <label class="col-sm-3 control-label">Number:</label>
                        <div class="col-sm-9">
                          <input v-model="newRecruitmentRequest.number" type="number" class="form-control">
                        </div>
                      </div>
                      <div class="form-group">
                        <label class="col-sm-3 control-label">Position:</label>
                        <div class="col-sm-9">
                            <select v-model="newRecruitmentRequest.position" class="form-control">
                              <option>Chef</option>
                              <option>Photographer</option>
                              <option>Audio Specialist</option>
                              <option>Graphic Designer</option>
                              <option>Waitress</option>
                            </select>
                        </div>
                      </div>
                      <div class="form-group">
                        <label class="col-sm-3 control-label">Reason:</label>
                        <div class="col-sm-9">
                            <textarea v-model="newRecruitmentRequest.reason" type="text" class="form-control" rows="3"></textarea>
                        </div>
                      </div>
                      <button v-on:click="saveNewRecruitmentRequest" class="btn btn-sm btn-info pull-right">Save</button>
                    </div>
                    <!-- /.box-body -->
                  </form>
                </div>
              </div>

            </div>

            <!-- TASK VIEW -->
            <div v-if="modalState == 'Task'" class="box box-info">
              <div class="box-header with-border">
                <h3 class="box-title">Tasks</h3>
              </div>
              <!-- /.box-header -->
              <div class="box-body">
                <table class="table table-bordered">
                  <tbody><tr>
                    <th>Description</th>
                    <th>Assigned To</th>
                    <th>Created By</th>
                    <th>Priority</th>
                    <th>Comments</th>
                    <th style="width: 30px">Status</th>
                  </tr>
                  <template v-for="task in selectedEventRequest.tasks">
                    <tr>
                      <td>{{ task.description }}</td>
                      <td>{{ task.assignedTo.fullName }}</td>
                      <td>{{ task.createdBy.fullName }}</td>
                      <td>{{ task.priority }}</td>
                      <td>{{ task.comments }}</td>
                      <td><span class="badge" v-bind:class="[{'bg-yellow' : task.status == 'Assigned'},
                                                          {'bg-blue' : task.status == 'In Progress'},
                                                          {'bg-green' : task.status == 'Closed'}]">
                      {{ task.status }}</span></td>
                    </tr>
                  </template>
                </tbody></table>
              </div>
              <!-- /.box-body -->
            </div>

            <!-- FINANCIAL REQUEST VIEW -->
            <div v-else-if="modalState == 'Financial Request'" class="box box-info">
              <div class="box-header with-border">
                <h3 class="box-title">Financial Requests</h3>
              </div>
              <!-- /.box-header -->
              <div class="box-body">
                <table class="table table-bordered">
                  <tbody><tr>
                    <th>Amount</th>
                    <th>Reason</th>
                    <th>Created By</th>
                    <th>Comments</th>
                    <th style="width: 30px">Status</th>
                  </tr>
                  <template v-for="request in selectedEventRequest.financialRequests">
                    <tr>
                      <td>{{ request.amount }}</td>
                      <td>{{ request.reason }}</td>
                      <td>{{ request.createdBy.fullName }}</td>
                      <td>{{ request.comments }}</td>
                      <td><span class="badge" v-bind:class="[{'bg-yellow' : request.status == 'Pending FM Approval'},
                                                          {'bg-green' : request.status == 'Approved'},
                                                          {'bg-red' : request.status == 'Rejected'}]">
                      {{ request.status }}</span></td>
                    </tr>
                  </template>
                </tbody></table>
              </div>
              <!-- /.box-body -->
            </div>

            <!-- RECRUITMENT REQUEST VIEW -->
            <div v-if="modalState == 'Recruitment Request'" class="box box-info">
              <div class="box-header with-border">
                <h3 class="box-title">Recruitment Request</h3>
              </div>
              <!-- /.box-header -->
              <div class="box-body">
                <table class="table table-bordered">
                  <tbody><tr>
                    <th>Number</th>
                    <th>Position</th>
                    <th>Reason</th>
                    <th>Created By</th>
                    <th>Comments</th>
                    <th style="width: 30px">Status</th>
                  </tr>
                  <template v-for="request in selectedEventRequest.recruitmentRequests">
                    <tr>
                      <td>{{ request.number }}</td>
                      <td>{{ request.position }}</td>
                      <td>{{ request.reason }}</td>
                      <td>{{ request.createdBy.fullName }}</td>
                      <td>{{ request.comments }}</td>
                      <td><span class="badge" v-bind:class="[{'bg-yellow' : request.status == 'Pending HR Approval'},
                                                          {'bg-green' : request.status == 'Approved'},
                                                          {'bg-red' : request.status == 'Rejected'}]">
                      {{ request.status }}</span></td>
                    </tr>
                  </template>
                </tbody></table>
              </div>
              <!-- /.box-body -->
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
          <h3 class="box-title">Approved Event Requests</h3>
        </div>
        <!-- /.box-header -->
        <div class="box-body">
          <table class="table table-bordered">
            <tbody><tr>
              <th style="width: 10px">#</th>
              <th>Client Record Number</th>
              <th>Client Name</th>
              <th>Event Type</th>
              <th>Expected Attendees</th>
              <th>Planned Budget</th>
              <th>Start Date</th>
              <th>End Date</th>
              <th>Status</th>
              <th>View</th>
              <th>Options</th>
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
                <td><span class="badge bg-green">{{ eventRequest.status }}</span></td>
                <td><button class="btn btn-xs btn-info" v-on:click="setSelectedEventRequest(eventRequest['.key'])"
                            data-toggle="modal" data-target="#eventRequestDetail">View</button></td>
                <td><button class="btn btn-xs btn-info" v-on:click="setSelectedEventRequest(eventRequest['.key'])"
                            data-toggle="modal" data-target="#tasksWindow">Options</button></td>
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
      taskAssignee: [],
      newTask: {
        assignedTo: {
          fullName: '',
          uid: ''
        },
        createdBy: {
          fullName: '',
          uid: ''
        },
        comments: '',
        description: '',
        priority: '',
        status: ''
      },
      newFinancialRequest: {
        amount: '',
        comments: '',
        createdBy: {
          fullName: '',
          uid: ''
        },
        reason: '',
        status: ''
      },
      newRecruitmentRequest: {
        createdBy: {
          fullName: '',
          uid: ''
        },
        number: '',
        position: '',
        reason: '',
        status: '',
        comments: ''
      },
      modalState: 'Task'
    }
  },
  methods: {
    saveNewFinancialRequest: function () {
      if (this.newFinancialRequest.amount && this.newFinancialRequest.reason) {
        this.newFinancialRequest.status = 'Pending FM Approval'
        this.newFinancialRequest.createdBy = {
          uid: this.$root.uid,
          fullName: this.userFullName
        }

        let key = this.selectedEventRequest['.key']

        db.ref('/eventRequests/' + key).child('financialRequests').push(this.newFinancialRequest).then(function () {
          this.newFinancialRequest = {}
          this.setSelectedEventRequest(key)
        }.bind(this)).catch(function (error) {
          alert(error.message)
        })
      } else {
        alert('Please complete all required fields!')
      }
    },
    saveNewRecruitmentRequest: function () {
      if (this.newRecruitmentRequest.number && this.newRecruitmentRequest.position && this.newRecruitmentRequest.reason) {
        this.newRecruitmentRequest.status = 'Pending HR Approval'
        this.newRecruitmentRequest.createdBy = {
          uid: this.$root.uid,
          fullName: this.userFullName
        }

        let key = this.selectedEventRequest['.key']

        db.ref('/eventRequests/' + key).child('recruitmentRequests').push(this.newRecruitmentRequest).then(function () {
          this.newRecruitmentRequest = {}
          this.setSelectedEventRequest(key)
        }.bind(this)).catch(function (error) {
          alert(error.message)
        })
      } else {
        alert('Please complete all required fields!')
      }
    },
    setModalState: function (state) {
      this.modalState = state
    },
    setSelectedEventRequest: function (key) {
      this.selectedEventRequest = this.myTasksOnEventRequest.find(item => item['.key'] === key)
    },
    saveNewTask: function () {
      if (this.newTask.description && this.newTask.assignedTo && this.newTask.priority) {
        this.newTask.status = 'Assigned'
        this.newTask.createdBy = {
          uid: this.$root.uid,
          fullName: this.userFullName
        }
        let key = this.selectedEventRequest['.key']

        db.ref('/eventRequests/' + key).child('tasks').push(this.newTask).then(function () {
          this.newTask = {}
          this.setSelectedEventRequest(key)
        }.bind(this)).catch(function (error) {
          alert(error.message)
        })
      } else {
        alert('Please complete all required fields!')
      }
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

      db.ref('eventRequests').child(key).set(this.selectedEventRequest).catch(function (error) {
        alert(error.message)
      })
    }
  },
  created: function () {
    // get eventRequests list based on status expected
    this.$bindAsArray('myTasksOnEventRequest', db.ref('eventRequests').orderByChild('status')
      .equalTo(this.expectedStatus))

    // get task assignee list
    this.$bindAsArray('users', db.ref('users'), null, function () {
      this.taskAssignee = this.users.filter(function (user) {
        return user.role.includes('Production Department - ') || user.role.includes('Service Department - ')
      })
    }.bind(this))
  }
}
</script>
