<template>
  <q-layout>
    <q-page-container>
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
        class="my-card text-white"
        style="background: radial-gradient(circle, #35a2ff 0%, #014a88 100%)"
      >
        <q-card-section>
          <div class="text-h6">Our Changing Planet</div>
          <div class="text-subtitle2">by John Doe</div>
        </q-card-section>

        <q-card-section class="q-pt-none">
          {{ lorem }}
        </q-card-section>
      </q-card>
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