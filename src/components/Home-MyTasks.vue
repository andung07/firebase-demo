<template>
<!-- Content Wrapper: myTasks -->
  <div class="content-wrapper">
    <!-- Content Header (Page header) -->
    <section class="content-header">
      <h1>
        My Tasks
        <small></small>
      </h1>
      <ol class="breadcrumb">
        <li><a href="/#/"><i class="fa fa-home"></i> Home</a></li>
        <li class="active">My Tasks</li>
      </ol>
    </section>

    <!-- Main content: APROVAL -->
    <MyTasksApprovalView v-bind:userRole="userRole" v-bind:userFullName="userFullName" v-bind:expectedStatus="expectedStatus"
            v-if="userRole == 'Senior Customer Service Officer' ||
                  userRole == 'Financial Manager' ||
                  userRole == 'Administration Department Manager'"
                  class="content"></MyTasksApprovalView>

    <!-- Main content: PRODUCTION / Service TASK ASSIGNMENT -->
    <MyTasksAssignmentView v-bind:userRole="userRole" v-bind:userFullName="userFullName" v-bind:expectedStatus="expectedStatus"
            v-else-if="userRole == 'Production Department Manager' ||
                  userRole == 'Service Department Manager'"
                  class="content"></MyTasksAssignmentView>

    <!-- Main content: PRODUCTION / SERVICE TASKS -->
    <MyTasksSubTasksView v-bind:userRole="userRole" v-bind:userFullName="userFullName" v-bind:expectedStatus="expectedStatus"
            v-else-if="userRole.includes('Production Department - ') ||
                  userRole.includes('Service Department - ')"
                  class="content"></MyTasksSubTasksView>

    <!-- Main content: FINANCIAL REQUESTS -->
    <MyTasksFinReqView v-bind:userRole="userRole" v-bind:userFullName="userFullName" v-bind:expectedStatus="expectedStatus"
            v-if="userRole == 'Financial Manager'" class="content"></MyTasksFinReqView>

    <!-- Main content: FINANCIAL REQUESTS -->
    <MyTasksRecReqView v-bind:userRole="userRole" v-bind:userFullName="userFullName" v-bind:expectedStatus="expectedStatus"
            v-else-if="userRole == 'Human Resource Manager'" class="content"></MyTasksRecReqView>

  </div>
  <!-- /.content-wrapper -->
</template>

<script>
export default {
  data: function () {
    return {
      expectedStatus: ''
    }
  },
  props: ['userRole', 'userFullName'],
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
  created: function () {
    if (this.userRole === 'Senior Customer Service Officer') {
      this.expectedStatus = 'Pending SCS Approval'
    } else if (this.userRole === 'Financial Manager') {
      this.expectedStatus = 'Pending FM Review'
    } else if (this.userRole === 'Administration Department Manager') {
      this.expectedStatus = 'Pending AM Approval'
    } else {
      this.expectedStatus = 'Approved'
    }
  }
}
</script>