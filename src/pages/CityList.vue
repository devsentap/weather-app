<template>
  <q-layout class="q-pa-lg" style="width: 750px;margin: auto;">
    <q-page-container>
      <q-page>
        <div class="row">
          <div class="col">
            <div class="text-h4">Manage Location</div>
          </div>
          <div class="col">
            <div class="text-right q-pa-sm">
              <q-icon class="cursor-pointer" name="manage_accounts" size="32px" @click="$router.push('/editprofile');" />
            </div>
          </div>
        </div>
        <q-input 
          class="q-my-sm" rounded outlined 
          v-model="location" label="Enter location" debounce="500" 
          @update:model-value="searchLocation" @focus="showCities = !showCities" @blur="showCities = !showCities">
          <template v-slot:prepend>
            <q-icon name="search" />
          </template>
          <template v-slot:append>
            <q-icon name="close" @click="location = ''" class="cursor-pointer" />
          </template>        
        </q-input>
        <q-list>
          <q-item clickable v-ripple v-for="item in items">
            <q-item-section>{{ item.message }}</q-item-section>
          </q-item>
        </q-list>

        <q-card
          v-show="!showCities"
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
                <div class="text-h1 text-right">24°</div>
              </div>
            </div>
            <br />
            <div class="row">
              <div class="col">
                <div class="text-subtitle2">Moderate Rain</div>
              </div>
              <div class="col">
                <div class="text-right">H: 29° L: 30°</div>                
              </div>              
            </div>
          </q-card-section>  
          <q-card-section class="q-pt-none">
            TEXT HEREEEEEEEEEEEEEE
          </q-card-section>
        </q-card>
      </q-page>
    </q-page-container>
  </q-layout>
</template>

<script>
import axios from 'axios';
import { onMounted, ref } from 'vue';
import MAPPING_COUNTRYCODE_COUNTRYNAME from '../assets/ISO3166.json';
export default {
  setup() {
    const location = ref('');
    const showCities = ref(false);
    const items = [{message: '1'},{message: '2'}];

    onMounted(async() => { 
      // console.log('mounted CityList', MAPPING_COUNTRYCODE_COUNTRYNAME);      
    });

    function OnFocusInput() {
      console.log('OnFocusInput');
    }

    async function searchLocation(location) {
      console.log('searchLocation', location);
      var axios_url = `http://api.openweathermap.org/geo/1.0/direct?q=${location}&limit=5&appid=6383f466a429e26399e6064e623ddaa2`;
      var res = await axios.get(axios_url);
      var data = res.data.map((obj) => {
        obj.countryName = MAPPING_COUNTRYCODE_COUNTRYNAME[obj.country];
        obj.txtSelect   = `${obj.name}, ${obj.state} ${obj.countryName}`;
        var { name, state, country, countryName, txtSelect } = obj;
        return { name, state, country, countryName, txtSelect };
      });
      console.log('data', data);
    }

    return {
      location, searchLocation, OnFocusInput, showCities, items
    };
  },  
}
</script>

<style>

</style>