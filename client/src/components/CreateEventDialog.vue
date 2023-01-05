<template>
  <v-dialog persistent>
    <v-container>
      <v-form
      ref="form"
      v-model="valid"
      lazy-validation
      >
        <v-card>
          <v-card-title>
            <span class="text-h5">Create Event</span>
          </v-card-title>
          <v-card-text>
            <v-container>          
              <v-row>
                <v-col cols="12" sm="6" md="6">
                  <v-text-field 
                  v-model="form.title"                   
                  :rules="titleRules"
                  label="Title*" 
                  type="text" 
                  required
                  ></v-text-field>
                </v-col>
                <v-col cols="12" sm="12" md="12">
                  <v-text-field
                    v-model="form.description"
                    label="Description*"
                    :rules="descriptionRules"
                    type="text"                    
                    required
                  ></v-text-field>
                </v-col>

                <v-col cols="12" sm="6" md="6">
                  <v-text-field 
                  v-model="form.startDate" 
                  :rules="eventDateStartRules"
                  label="Start Date*" 
                  type="datetime-local"               
                  required
                  ></v-text-field>
                </v-col>

                <v-col cols="12" sm="6" md="6">
                  <v-text-field 
                  v-model="form.endDate" 
                  :rules="eventDateEndRules"
                  label="End Date*" 
                  type="datetime-local" 
                  required
                  ></v-text-field>
                </v-col>
              </v-row>
            </v-container>
            <small>*indicates required field</small>
          </v-card-text>
          <v-card-actions>
            <v-spacer></v-spacer>
            <v-btn color="blue-darken-1" variant="text" @click="hideDialog"> Close </v-btn>
            <v-btn color="blue-darken-1" variant="text" @click="validate"> Save </v-btn>
          </v-card-actions>
        </v-card>
      </v-form>
    </v-container>
  </v-dialog>
</template>
<script>
import axios from "axios"
import { mapActions, mapGetters } from 'vuex'
import moment from 'moment'


export default {
  name: "CreateEventDialog",

  data() {
    return {
      dialog: false,
      valid: true,
      formValidStart: true,
      formValidEnd: true,
      form: {
        title: '',
        description: '',
        startDate: null,
        endDate: null
      },
      startDate: '',
      endDate: '',

      titleRules: [v => !!v || 'Title is required',],
      descriptionRules: [v => !!v || 'Description is required',],
      eventDateStartRules: [
        v => !!v || 'Start Dete events is required',
        v => (v && this.formValidStart) || 'You cant create event for this time',
      ],
      eventDateEndRules: [
        v => !!v || 'Start Dete events is required',
        v => (v && this.formValidEnd) || 'You cant create event for this time',
      ]
    };
  },

  watch: {
    form:{
      handler(newValue) {   
        this.checkDateEvents(newValue)       
      },
      deep: true
    }    
  },

  computed: {
    ...mapGetters([
      'USERBYID'
    ]),    
  },

  methods: {    
    async createUsersEvent(data) {     
      try {
        await axios.put(`http://localhost:3020/api/users/${this.$route.params.id}`, {
          data
          })        
        
      } catch(error) {
        console.log('Error!!!', error)
      }
      this.GET_USER_ID_FROM_API(this.$route.params.id)
      this.hideDialog()
    },

    ...mapActions([
      'GET_USER_ID_FROM_API'
    ]),
    
    hideDialog() {
      this.$emit("hideDialog", false);                
    },

    async validate () {      
        const { valid } = await this.$refs.form.validate()
        if (valid) {
          this.createUsersEvent(this.form)
           this.$refs.form.reset()
          }
      },

    checkDateEvents(data) {
     
      let formStartDate = data.startDate      
      let formEndDate = data.endDate
      let nowDate = moment().format('YYYY-MM-DDTHH:mm')

      if(this.USERBYID.events) {
        for(let i = 0; i < this.USERBYID.events.length; i++) {        
        let event = this.USERBYID.events[i]

        if(formStartDate && !formEndDate){          
            if(formStartDate >= event.startDate && formStartDate <= event.endDate || formStartDate < nowDate) {              
              return this.formValidStart = false  
              } else {                
                this.formValidStart = true
              }             
          } else if(formEndDate && !formStartDate) {
            if(formEndDate >= event.startDate && formEndDate <= event.endDate || formEndDate < nowDate) {
              return this.formValidEnd = false  
              } else {
                this.formValidEnd = true
              }
          } else if(formEndDate && formStartDate) {
            if(formStartDate > formEndDate || formStartDate <= event.startDate && formEndDate >= event.endDate ||
              formEndDate >= event.startDate && formEndDate <= event.endDate || formEndDate < nowDate ||
              formStartDate >= event.startDate && formStartDate <= event.endDate || formStartDate < nowDate
            ) {              
              this.formValidStart = false
              this.formValidEnd = false
              return
            } else {              
              this.formValidStart = true
              this.formValidEnd = true              
            }
          }
      }
      } else {         
        this.formValidStart = true 
        this.formValidEnd = true
        return
      }      
    },   

  },
};
</script>
