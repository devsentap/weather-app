<template>
  <q-layout class="q-pa-lg" style="width: 750px;margin: auto;">
    <q-page-container>
      <q-page>
        <div class="row"></div>
        <div class="text-h3">Edit Profile</div>
        <q-input v-model="text" label="Full Name" stack-label />
        <q-input v-model="text" label="Email" stack-label />
        <!-- <q-input v-model="text" label="Phone Number">
          <template v-slot:prepend>
            <q-icon name="event" />
          </template>
        </q-input> -->
        <!-- <q-tel-input></q-tel-input> -->
        <vue3-q-tel-input v-model="tel" label="Phone Number" stack-label />
        <VuePhoneNumberInput v-model="yourValue" />
      </q-page>
    </q-page-container>
  </q-layout>
  
</template>

<script>
export default {

}
</script>

<style>

</style>