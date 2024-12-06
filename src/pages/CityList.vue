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
          @update:model-value="searchLocation" @focus="toggleShowCities" @blur="toggleShowCities">
          <template v-slot:prepend>
            <q-icon name="search" />
          </template>
          <template v-slot:append>
            <q-icon name="close" @click="location = ''" class="cursor-pointer" />
          </template>        
        </q-input>
        <q-list separator>
          <q-item clickable v-ripple v-for="location in locationResults" :key="location.index" @click="viewWeatherDetails(location)">
            <q-item-section>{{ location.txtSelect }}</q-item-section>
          </q-item>
        </q-list>

        <q-card
          v-show="!showCities"
          v-for="res in locations" :key="res.name"
          class="q-my-md text-white"
          style="background: radial-gradient(circle, #35a2ff 0%, #014a88 100%); border-radius: 20px;"
        >
          <q-card-section>
            <div class="row flex-center">
              <div class="col">
                <div class="text-h4">{{ res.name }}</div>
              </div>
              <div class="col">
                <div class="text-h1 text-right">{{ res.temp_F }}</div>
              </div>
            </div>
            <br />
            <div class="row flex-center">
              <div class="col">
                <div class="text-h6">{{ res.description }}</div>
              </div>
              <div class="col">
                <div class="text-right">{{ res.temp_min_max_F }}</div>                
              </div>              
            </div>
          </q-card-section>
        </q-card>        
      </q-page>
    </q-page-container>
  </q-layout>
</template>

<script>
import { useQuasar } from 'quasar';
import axios from 'axios';
import { useRouter } from 'vue-router';
import { storeToRefs } from 'pinia';
import { useLocationsStore } from '../stores/Locations';

import { onMounted, ref } from 'vue';
import MAPPING_COUNTRYCODE_COUNTRYNAME from '../assets/ISO3166.json';
export default {
  setup() {
    const $q = useQuasar();
    const router = useRouter();
    var location        = ref('');
    var showCities      = ref(false);
    var locationResults = ref([]);

    var locationsStore = useLocationsStore();
    var locations = storeToRefs(locationsStore).locations;    

    function toggleShowCities(evt) {      
      if (evt.relatedTarget?.role) { return; } // if got role, meaning we're clicking on location search result, so stop processing
      showCities.value = !showCities.value;
      locationResults.value.splice(0);
      location.value = '';
    }

    function viewWeatherDetails(obj) {      
      var { lat, lon, name } = obj;
      router.push({ path: '/weatherdetail', query: { lat, lon, name } });      
    }

    async function searchLocation(q) {      
      var axios_url = `https://api.openweathermap.org/geo/1.0/direct?q=${q}&limit=5&appid=6383f466a429e26399e6064e623ddaa2`;
      var res;
      try {
        res = await axios.get(axios_url);
      } catch (err) {
        console.error('ERROR searchLocation()', err, $q);
        $q.dialog({
          title: 'ERROR',
          message: 'Something wrong with search location.<br>Please try again after some time.',
          html: true,
          position: 'bottom'
        });
        return;
      }
      var data = res.data.map((obj, index) => {
        obj.index       = index;
        obj.countryName = MAPPING_COUNTRYCODE_COUNTRYNAME[obj.country];
        obj.txtSelect   = `${obj.name}, ${obj.state} ${obj.countryName}`;
        return obj;
      });
      locationResults.value.splice(0);
      locationResults.value = locationResults.value.concat(data);      
    }

    return {
      location, showCities, locationResults, locations,
      searchLocation, toggleShowCities, viewWeatherDetails
    };
  }
}
</script>

<style>

</style>