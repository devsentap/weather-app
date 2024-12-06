<template>
  <q-layout class="q-pa-lg" style="width: 750px;margin: auto;">
    <q-page-container>
      <q-page>        
        <div class="text-h4">Edit Profile</div>
        <div class="text-center">          
          <q-icon name="person" size="64px"  />
        </div>        
        <div class="text-center text-h5">{{ txtFullName }}</div>
        <div class="row">
          <div class="col text-right">
            {{ txtEmail }} |&nbsp;
          </div>
          <div class="col">
            {{ txtPhoneNum }}
          </div>
        </div>
        <q-input v-model="txtFullName" label="Full Name" stack-label :rules="[val => !!val || 'Field is required']" />
        <q-input v-model="txtEmail" label="Email" stack-label :rules="[(val) => validateEmail(val) || 'Must be a valid email.']"/>        
        <vue3-q-tel-input v-model="txtPhoneNum" type="number" label="Phone Number" stack-label />

        <div class="text-center">
          <q-btn class="q-ma-md" color="white" text-color="black" label="Cancel" @click="cancelEditProfile" />
          <q-btn class="q-ma-md" color="white" text-color="black" label="Save" to="/" />
        </div>
      </q-page>
    </q-page-container>
  </q-layout>
  
</template>
<script lang="ts">  
  import { storeToRefs } from 'pinia';
  import { useProfileStore } from '../stores/Profile'; 
  import { useRouter } from 'vue-router';  
  
  export default {
    setup() {
      const router = useRouter();
      const profileStore = useProfileStore();
      const txtFullName = storeToRefs(profileStore).name;
      const txtEmail    = storeToRefs(profileStore).email;
      const txtPhoneNum = storeToRefs(profileStore).phoneNum;
      
      const txtFullNameOri = txtFullName.value;
      const txtEmailOri    = txtEmail.value;
      const txtPhoneNumOri = txtPhoneNum.value;

      function validateEmail(email: string): boolean {
        return /[a-z0-9]+@[a-z]+\.[a-z]{2,3}/.test(email);
      }

      function cancelEditProfile() {
        // restore original values        
        txtFullName.value = txtFullNameOri;
        txtEmail.value    = txtEmailOri;
        txtPhoneNum.value = txtPhoneNumOri;
        router.push({ path: '/' });
      }
      
      return {
        txtFullName, txtEmail, txtPhoneNum, 
        validateEmail, cancelEditProfile
      };      
    }    
  }
</script>

<style>

</style>