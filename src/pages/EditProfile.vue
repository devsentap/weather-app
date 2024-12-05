<template>
  <q-layout class="q-pa-lg" style="width: 750px;margin: auto;">
    <q-page-container>
      <q-page>        
        <div class="text-h4">Edit Profile</div>
        <div class="text-center">
          <q-avatar size="200px">
            <img src="https://cdn.quasar.dev/img/avatar.png">
          </q-avatar>
        </div>        
        <div class="text-center">Jane Doe</div>
        <div class="row">
          <div class="col text-right">
            jane@gmail.com |&nbsp;
          </div>
          <div class="col">
            +60132865249
          </div>
        </div>
        <q-input v-model="txtFullName" label="Full Name" stack-label :rules="[val => !!val || 'Field is required']" />
        <q-input v-model="txtEmail" label="Email" stack-label />        
        <vue3-q-tel-input v-model="txtPhoneNum" label="Phone Number" stack-label @update:model-value="logName" />

        <div class="text-center">
          <q-btn color="white" text-color="black" label="Edit" />
        </div>
      </q-page>
    </q-page-container>
  </q-layout>
  
</template>
<script lang="ts">
  import { ref, onMounted, onUpdated } from 'vue'
  import { storeToRefs } from 'pinia';
  import { useProfileStore } from '../stores/Profile'; 
  
  export default {
    setup() {
      const profileStore = useProfileStore();
      const txtFullName = storeToRefs(profileStore).name;
      const txtEmail    = storeToRefs(profileStore).email;
      const txtPhoneNum = storeToRefs(profileStore).phoneNum;

      onMounted(() => { console.log('line 46 mounted EditProfile.vue'); });
      onUpdated(() => {
        console.log('Component is updated');
      });

      function logName() {
        console.log('line 50 logName');
      }

      // expose to template and other options API hooks
      return {
        txtFullName, txtEmail, txtPhoneNum, logName
      };      
    },

    methods: {
      logName() {
        console.log('line 57 logName');
      }
    }
  }


  // txtFullName = profileStore.name
</script>
<!-- <script lang="ts">
const profileStore = useProfileStore();
export default {
  data() {
    return {
      txtFullName: '',
      txtEmail: '',
      txtPhoneNum: ''
    };
  },

  mounted() {
    
    profileStore.$patch({ name: 'Faiz2' })
    // console.log('profileStore', profileStore, storeToRefs(profileStore));
    console.log('storeToRefs(profileStore).name', storeToRefs(profileStore).name);
    // const { name, doubleCount } = storeToRefs(profileStore)
  }
}
</script> -->

<style>

</style>