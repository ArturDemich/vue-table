<script>
import CreateUserDialog from "../components/CreateUserDialog.vue";
import { mapActions, mapGetters } from 'vuex';
import moment from 'moment';

import EasyDataTable from "vue3-easy-data-table"



export default {
  name: "HomeView",

  components: {
    CreateUserDialog,
    EasyDataTable,
  },

  data() {
    return {        
      headers:  [
        { text: "First name", value: "firstName", sortable: true },
        { text: "Last name", value: "lastName", sortable: true },
        { text: "Email", value: "email", sortable: true },
        { text: "Phone Number", value: "phoneNumber", sortable: true },
        { text: "Events Count", value: "events.length", sortable: true },
        { text: "Next Event Date", value: "nextDateEvent", sortable: true }
      ],   
      
    };
  },
  methods: {
    ...mapActions([
      'GET_USERS_FROM_API'
    ]),
    pushRouter(item) {
      this.$router.push(`/user-profile/${item._id}`)
    },

    dateFormat(date) {
      return moment(date).format('YYYY/MM/DD - HH:mm')
    },
  },   

  mounted() {
    this.GET_USERS_FROM_API()        
  },

  computed: {
    ...mapGetters([
      'USERS'
    ])
  }
};
</script>

<template>
<v-container>
  <div v-if="this.USERS?.length === 0">
    <v-card-title class="text-center">No users yet! Please create an user...</v-card-title>
  </div>
  <div v-else>
  <EasyDataTable
    :headers="headers"
    :items="this.USERS"
    @click-row="pushRouter"
    header-text-direction="center"
    body-text-direction="center"
    table-class-name="customize-table"
  >
  <template #item-nextDateEvent="item">
    {{ this.dateFormat(item.nextDateEvent) }}
  </template>
  </EasyDataTable>
   </div>
   
  </v-container>
</template>

<style scoped>
.shadow-bg {
  display: table-row;
}
.shadow-bg:hover {
  box-shadow: 0px 5px 5px 5px rgba(0, 0, 0, 0.5);
}

.v-table {
  text-align: center !important;
}

td {
  cursor: pointer !important;
}

.customize-table {
  cursor: pointer
}
</style>
