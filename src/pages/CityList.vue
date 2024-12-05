<template>
  <q-layout class="q-pa-lg" style="width: 750px;margin: auto;">
    <q-page-container>
      <q-page>
        <h4>Manage Location</h4>
        <q-input rounded outlined v-model="text" label="Enter location">
          <template v-slot:prepend>
            <q-icon name="search" />
          </template>
          <template v-slot:append>
            <q-icon name="close" @click="text = ''" class="cursor-pointer" />
          </template>        
        </q-input>

        <q-card
          class="q-my-md text-white"
          style="background: radial-gradient(circle, #35a2ff 0%, #014a88 100%); border-radius: 20px;"
        >
          <q-card-section>
            <div class="row">
              <div class="col">
                <div class="text-h6">My Location</div>
                <!-- <br> -->
                <div class="text-subtitle2">Bangsar South</div>
              </div>
              <div class="col">
                <div class="text-h1 text-right">24 d</div>
              </div>
            </div>
            <br />
            <div class="row">
              <div class="col">
                <div class="text-subtitle2">Moderate Rain</div>
              </div>
              <div class="col">
                <div class="text-right">H: 29 deg L: 30 deg</div>                
              </div>              
            </div>
            
            
            
          </q-card-section>
  
          <q-card-section class="q-pt-none">
            {{ lorem }}
          </q-card-section>
        </q-card>
      </q-page>
    </q-page-container>
  </q-layout>
</template>

<script>
import axios from 'axios';
import { ref } from 'vue';
export default {
  setup() {
    return {
      text: ref('')
    }
  },
  async mounted() {
    console.log('mounted CityList');
    var axios_url = 'http://api.openweathermap.org/geo/1.0/direct?q=Kajang&limit=5&appid=6383f466a429e26399e6064e623ddaa2';
    var res = await axios.get(axios_url);
    console.log('res', res.data);
  }
}
</script>

<style>

</style>