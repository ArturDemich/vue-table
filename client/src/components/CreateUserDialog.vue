<template>
  <v-dialog persistent>
    <v-container>
    <v-card>
      <v-card-title>
        <span class="text-h5"> Create User Profile</span>
      </v-card-title>
      <v-card-text>
        <v-container>
          <v-row>
            <v-col cols="12" sm="6" md="6">
              <v-text-field 
                label="First name*" 
                v-model="form.firstName"                
                required
                ></v-text-field>
            </v-col>
            <v-col cols="12" sm="6" md="6">
              <v-text-field
                label="Last name*"                
                v-model="form.lastName"
                required
              ></v-text-field>
            </v-col>

            <v-col cols="12" sm="6" md="6">
              <v-text-field label="Email*" v-model="form.email" required></v-text-field>
            </v-col>

            <v-col cols="12" sm="6" md="6">
              <v-text-field label="Phone number*" v-model="form.phoneNumber" type="phone" required></v-text-field>
            </v-col>
          </v-row>
        </v-container>
        <small>*indicates required field</small>
      </v-card-text>
      <v-card-actions>
        <v-spacer></v-spacer>
        <v-btn color="blue-darken-1" variant="text" @click="hideDialog"> Close </v-btn>
        <v-btn color="blue-darken-1" variant="text" @click="createUsers(this.form)"> Save </v-btn>
      </v-card-actions>
    </v-card>
    </v-container>
  </v-dialog>
</template>
<script>
import axios from "axios"
import { mapActions } from 'vuex'



export default {
  name: "CreateUserDialog",

  data() {
    return {
      dialog: false,
      form: {
        firstName: '',
        lastName: '',
        email: '',
        phoneNumber: ''
      }
    }
  },

  methods: {
    hideDialog() {
      this.$emit("hideDialog", false);
    },

    ...mapActions([
      'GET_USERS_FROM_API'
    ]),

    async createUsers(data) {
      try {
        await axios.post('http://localhost:3020/api/users/', {data})        
        
      } catch(e) {
        console.log('Error!!!', e)
      }
      this.GET_USERS_FROM_API()
      this.hideDialog()
    }
  },
  
};
</script>
