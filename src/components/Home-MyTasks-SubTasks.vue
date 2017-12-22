<<template>
  <section>

    <!-- Modal View for Task Details View -->
    <div class="modal fade" id="taskDetail" style="display: none;">
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
              <!-- TASK VIEW -->
              <div class="col-md-6">
                <div class="box box-info">
                  <div class="box-header with-border">
                    <h3 class="box-title">Task Details</h3>
                  </div>
                  <!-- /.box-header -->
                  <!-- form start -->
                  <form class="form-horizontal">
                    <div class="box-body">
                      <div class="form-group">
                        <label class="col-sm-3 control-label">Description:</label>
                        <div class="col-sm-9">
                          <input v-model="selectedTask.description" disabled="" type="text" class="form-control">
                        </div>
                      </div>
                      <div class="form-group">
                        <label class="col-sm-3 control-label">Created By:</label>
                        <div class="col-sm-9">
                          <input v-model="selectedTask.createdBy.fullName" type="text" disabled="" class="form-control">
                        </div>
                      </div>
                      <div class="form-group">
                        <label class="col-sm-3 control-label">Assigned To:</label>
                        <div class="col-sm-9">
                          <input v-model="selectedTask.assignedTo.fullName" type="text" disabled="" class="form-control">
                        </div>
                      </div>
                      <div class="form-group">
                        <label class="col-sm-3 control-label">Priority:</label>
                        <div class="col-sm-9">
                          <input v-model="selectedTask.priority" disabled="" type="text" class="form-control">
                        </div>
                      </div>
                      <div class="form-group">
                        <label class="col-sm-3 control-label">Status:</label>
                        <div class="col-sm-9">
                          <select v-model="selectedTask.status" class="form-control">
                              <option>Assigned</option>
                              <option>In Progress</option>
                              <option>Closed</option>
                            </select>
                        </div>
                      </div>
                      <div class="form-group">
                        <label class="col-sm-3 control-label">Comments:</label>
                        <div class="col-sm-9">
                          <textarea v-model="selectedTask.comments" type="text" class="form-control" rows="4"></textarea>
                        </div>
                      </div>
                      <button v-on:click="saveTaskChanges" class="btn btn-sm btn-info pull-right">Save Changes</button>
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
            <h3 class="box-title">Tasks Assigned to You</h3>
          </div>
          <!-- /.box-header -->
          <div class="box-body">
            <table class="table table-bordered">
              <tbody><tr>
                <th style="width: 10px">#</th>
                <th>Project Reference Number</th>
                <th>Description</th>
                <th>Assigned To</th>
                <th>Created By</th>
                <th>Status</th>
                <th>Comments</th>
                <th>View</th>
              </tr>
              <template v-for="(task, index) in myTasks">
                <tr>
                  <td>{{ index + 1 }}.</td>
                  <td>{{ task.eventRequestNumber }}</td>
                  <td>{{ task.description }}</td>
                  <td>{{ task.assignedTo.fullName }}</td>
                  <td>{{ task.createdBy.fullName }}</td>
                  <td><span class="badge" v-bind:class="[{'bg-yellow' : task.status == 'Assigned'},
                                                          {'bg-blue' : task.status == 'In Progress'},
                                                          {'bg-green' : task.status == 'Closed'}]">
                      {{ task.status }}</span></td>
                  <td>{{ task.comments }}</td>
                  <td><button class="btn btn-xs btn-info" v-on:click="setSelectedTask(task.eventRequestKey, task.key)"
                              data-toggle="modal" data-target="#taskDetail">View</button></td>
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
      selectedTask: {
        assignedTo: {},
        createdBy: {}
      },
      myTasks: []
    }
  },
  methods: {
    setSelectedTask: function (eventRequestKey, taskKey) {
      this.selectedEventRequest = this.myTasksOnEventRequest.find(item => item['.key'] === eventRequestKey)
      this.selectedTask = this.myTasks.find(item => item.key === taskKey)
    },
    saveTaskChanges: function () {
      let updatedFields = {
        status: this.selectedTask.status,
        comments: this.selectedTask.comments
      }

      db.ref('/eventRequests/' + this.selectedTask.eventRequestKey + '/tasks/').child(this.selectedTask.key).update(updatedFields).then(function () {
        alert('Task details has been successfully changed!')
      }).catch(function (error) {
        alert(error.message)
      })
    },
    populateMyTasks: function (eventRequestList) {
      this.myTasks = []
      for (let eventRequestIndex in eventRequestList) {
        let eventRequest = eventRequestList[eventRequestIndex]
        if (eventRequest.tasks) {
          for (let taskIndex in eventRequest.tasks) {
            let task = eventRequest.tasks[taskIndex]
            if (task.assignedTo.uid === this.$root.uid) {
              task.eventRequestNumber = eventRequest.requestNumber
              task.eventRequestKey = eventRequest['.key']
              task.key = taskIndex
              this.myTasks.push(task)
            }
          }
        }
      }
    }
  },
  created: function () {
    // get eventRequests list based on status expected, then get task list
    this.$bindAsArray('myTasksOnEventRequest', db.ref('eventRequests').orderByChild('status')
      .equalTo(this.expectedStatus), null, function () {
        this.populateMyTasks(this.myTasksOnEventRequest)
      }.bind(this))

    db.ref('eventRequests').on('child_changed', function () {
      setTimeout(function () {
        this.populateMyTasks(this.myTasksOnEventRequest)
      }.bind(this), 1500)
    }.bind(this))
  }
}
</script>
