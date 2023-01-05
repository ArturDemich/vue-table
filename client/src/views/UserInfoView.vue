<script>
import {mapActions, mapGetters} from "vuex"
import moment from "moment"
import EasyDataTable from "vue3-easy-data-table"

export default {
  name: "UserInfoView",

  components: {   
    EasyDataTable,
  },

  data() {
    return {      
      headers: [
        { text: "Title", value: "title", sortable: true },
        { text: "Description", value: "description", sortable: true },
        { text: "Start Date Event", value: "startDate", sortable: true },
        { text: "End Date Event", value: "endDate", sortable: true },
      ], 
    };
  },
  methods: {   
    ...mapActions([
      'GET_USER_ID_FROM_API'
    ]),

    dateFormat(date) {
      return moment(date).format('YYYY/MM/DD - HH:mm')
    },    
  },  
  
  mounted() {
    this.GET_USER_ID_FROM_API(this.$route.params.id)
     
  },

  computed: {
    ...mapGetters([
      'USERBYID',
      'USEREVENTS'
    ]),
   
  }
};

</script>
<template>
<v-container>
  
  <v-card
    class="mx-auto"
    width="auto"
    prepend-icon="mdi-home"
  >
    <template v-slot:title>
      {{this.USERBYID.firstName}} {{this.USERBYID.lastName}}
    </template>

    <v-row class="pb-3">
    <v-card-text>
      Emai: {{this.USERBYID.email}}
    </v-card-text>
    <v-card-text>
     Phone Number: {{this.USERBYID.phoneNumber}}
    </v-card-text>
    <v-card-text>
     Events Count: {{this.USERBYID.events?.length}}
    </v-card-text>
    </v-row>
  </v-card>

  <div v-if="this.USERBYID.events?.length === 0">
    <v-card-title class="text-center">No events yet! Please create an event...</v-card-title>
  </div>
  <div v-else>
  <EasyDataTable
  :headers="headers"
  :items="this.USEREVENTS"
  >
    <template #item-startDate="item">
      {{ this.dateFormat(item.startDate) }}
    </template>
    <template #item-endDate="item">
      {{ this.dateFormat(item.endDate) }}
    </template>
  </EasyDataTable>
  </div>
  
  </v-container>
</template>

<style>
.v-table {
  text-align: center !important;
}
.v-card-text {
  text-align: center;
}
</style>
