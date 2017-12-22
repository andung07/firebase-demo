<<template>
  <!-- Content Wrapper: dashboard -->
  <div class="content-wrapper">
    <!-- Content Header (Page header) -->
    <section class="content-header">
      <h1>
        Dashboard
        <small>Event Requests Report</small>
      </h1>
      <ol class="breadcrumb">
        <li><a href="/#/"><i class="fa fa-home"></i> Home</a></li>
        <li class="active">Dashboard</li>
      </ol>
    </section>

    <!-- Main content -->
    <section class="content">

      <!-- Your Page Content Here -->
      <div class="row">
        <div class="col-lg-3 col-xs-6">
          <!-- small box -->
          <div class="small-box bg-aqua">
            <div class="inner">
              <h3>{{totalEventRequest}}</h3>

              <p>Total Request</p>
            </div>
            <div class="icon">
              <i class="ion ion-arrow-graph-up-right"></i>
            </div>
            <a href="#/home/eventRequestList" class="small-box-footer">More info <i class="fa fa-arrow-circle-right"></i></a>
          </div>
        </div>
        <!-- ./col -->
        <div class="col-lg-3 col-xs-6">
          <!-- small box -->
          <div class="small-box bg-yellow">
            <div class="inner">
              <h3>{{totalPendingApproval}}</h3>

              <p>Pending Approval</p>
            </div>
            <div class="icon">
              <i class="ion ion-load-b"></i>
            </div>
            <a href="#/home/eventRequestList" class="small-box-footer">More info <i class="fa fa-arrow-circle-right"></i></a>
          </div>
        </div>
        <!-- ./col -->
        <div class="col-lg-3 col-xs-6">
          <!-- small box -->
          <div class="small-box bg-green">
            <div class="inner">
              <h3>{{totalApproved}}</h3>

              <p>Approved</p>
            </div>
            <div class="icon">
              <i class="ion ion-checkmark-circled"></i>
            </div>
            <a href="#/home/eventRequestList" class="small-box-footer">More info <i class="fa fa-arrow-circle-right"></i></a>
          </div>
        </div>
        <!-- ./col -->
        <div class="col-lg-3 col-xs-6">
          <!-- small box -->
          <div class="small-box bg-red">
            <div class="inner">
              <h3>{{totalRejected}}</h3>

              <p>Rejected</p>
            </div>
            <div class="icon">
              <i class="ion ion-close-circled"></i>
            </div>
            <a href="#/home/eventRequestList" class="small-box-footer">More info <i class="fa fa-arrow-circle-right"></i></a>
          </div>
        </div>
        <!-- ./col -->
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
      totalEventRequest: 0,
      totalPendingApproval: 0,
      totalApproved: 0,
      totalRejected: 0
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
    createDashboardData: function (eventRequests) {
      for (let index in eventRequests) {
        let request = eventRequests[index]

        this.totalEventRequest += 1

        if (request.status.includes('Pending')) {
          this.totalPendingApproval += 1
        } else if (request.status === 'Approved') {
          this.totalApproved += 1
        } else if (request.status === 'Rejected') {
          this.totalRejected += 1
        }
      }
    }
  },
  created: function () {
    // get eventRequests list
    this.$bindAsArray('eventRequests', db.ref('eventRequests'), null, function () {
      this.createDashboardData(this.eventRequests)
    }.bind(this))
  }
}
</script>
