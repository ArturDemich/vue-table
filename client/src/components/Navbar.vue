<style scoped>
.v-toolbar {
 position: relative !important;
}

</style>


<template>
  <v-container>
    <v-app-bar :elevation="11" rounded  class="mt-1 pr-5">
      <v-app-bar-title> {{this.$route.name}} </v-app-bar-title>
      <v-card >   
        <div v-if="this.$route.name === 'All Users'">
          <v-btn variant="outlined" @click="createUserDialog"> Create user </v-btn>
        </div>
        <div v-else-if="this.$route.name === 'User Profile'">
          <v-btn variant="outlined" @click="createEventDialog"> Create event </v-btn>
        </div>    
      
      </v-card>
    </v-app-bar>
    <CreateUserDialog v-model="createUserVisible" @hideDialog="hideCreateUserDialog" />
    <CreateEventDialog v-model="createEventVisible" @hideDialog="hideCreateEventDialog" />
  </v-container>
</template>
<script>
import CreateUserDialog from "./CreateUserDialog.vue";
import CreateEventDialog from "./CreateEventDialog.vue";

export default {
  name: "Navbar",
  components: {
    CreateUserDialog,
    CreateEventDialog,
  },

  methods: {
    createUserDialog() {
      this.createUserVisible = true;
    },
    hideCreateUserDialog(val) {
      this.createUserVisible = val;
    },
    createEventDialog() {
      this.createEventVisible = true;
    },
    hideCreateEventDialog(val) {
      this.createEventVisible = val;
    },
  },

  data() {
    return {
      createUserVisible: false,
      createEventVisible: false,
    };
  },

};
</script>

