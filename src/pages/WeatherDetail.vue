<template>
  <q-layout class="q-pa-lg" style="width: 750px;margin: auto;">
    <q-page-container>
      <q-page>
        <div class="row flex-center">
          <div class="col">
            <q-btn label="Cancel" to="/" />
          </div>
          <div class="col-8">
            <div class="text-h4 text-center">{{ locationSelected }}</div>
          </div>
          <div class="col text-right"><q-btn color="primary" label="Add" @click="addToLocationList" /></div>
        </div>
        <br><br>
        <div class="text-center text-h6">{{ dateToday }}</div>
        <div class="text-center q-pa-md"><q-icon name="thunderstorm" size="128px" /></div>
        <div class="text-center text-h5">{{ currWeatherObj.temp_F }}</div>
        <div class="text-center text-h5">{{ currWeatherObj.description }}</div>
        <br>
        <div>3 Hourly Forecast</div>
        <div class="row">          
          <div class="col q-pa-md" v-for="res in resMapped_hourly_entries" :key="res.index">
            <q-card>
              <q-card-section>
                <div class="text-center q-pa-md"><q-icon name="thunderstorm" size="48px" /></div>                
                <div class="text-center">{{ res.temp_F }}</div>
                <div class="text-center">{{ res.dt_txt_F2 }}</div>
                <div class="text-center">{{ res.dt_txt_F3 }}</div>
              </q-card-section>
            </q-card>
          </div>
        </div>
        <br>
        <div>5 Day Forecast</div>
        <div class="col q-pa-md">          
          <q-card class="q-my-md" v-for="res in resMapped_daily_entries" :key="res.index">
            <q-card-section>
              <div class="row flex-center">
                <div class="col q-px-md"><q-icon name="thunderstorm" size="48px" /></div>
                <div class="col-8 text-h6">{{ res.dt_txt_F3 }}<br>{{ res.weather }}</div>
                <div class="col text-right text-h6 q-px-md">{{ res.temp_F }}C</div>
              </div>
            </q-card-section>
          </q-card>
        </div>
      </q-page>
    </q-page-container>
  </q-layout>
</template>

<script>
import axios from 'axios';
import dayjs from 'dayjs';
import { onMounted, ref } from 'vue';
import { useRoute, useRouter } from 'vue-router';
import { useQuasar } from 'quasar';
import { storeToRefs } from 'pinia';
import { useLocationsStore } from '../stores/Locations'; 

export default {
  setup() {
    const $q = useQuasar();
    const route = useRoute();
    const router = useRouter();

    var locationsStore = useLocationsStore();
    var locations = storeToRefs(locationsStore).locations;    

    var locationSelected = ref('');
    var dateToday = ref(dayjs().format('dddd, DD MMMM YYYY'));
    var currWeatherObj = ref({});    
    var resMapped_hourly_entries = ref([]);
    var resMapped_daily_entries  = ref([]);

    onMounted(async () => {
      var { lat, lon, name } = route.query;
      locationSelected.value = name;
      await getWeather(lat, lon);
      await getForecast(lat, lon);
    });

    async function getWeather(lat, lon) {
      var axios_url = `https://api.openweathermap.org/data/2.5/weather?appid=6383f466a429e26399e6064e623ddaa2&units=metric&lat=${lat}&lon=${lon}`;
      var res;
      try {
        res = await axios.get(axios_url);
      } catch (err) {
        console.error('ERROR getWeather()', err);
        $q.dialog({
          title: 'ERROR',
          message: 'Something wrong with getWeather.<br>Please try again after some time.',
          html: true,
          position: 'bottom'
        });
        return;
      }
      var resMapped = {
        name: res.data.name,
        temp: res.data.main.temp,
        temp_F: Math.round(res.data.main.temp) + '°C',
        temp_min: res.data.main.temp_min,
        temp_max: res.data.main.temp_max,
        temp_min_max_F: `H: ${res.data.main.temp_max}°C L: ${res.data.main.temp_min}°C`,
        description: res.data.weather[0].description
      };      
      currWeatherObj.value = resMapped;
    }

    async function getForecast(lat, lon) {
      var axios_url = `https://api.openweathermap.org/data/2.5/forecast?appid=6383f466a429e26399e6064e623ddaa2&units=metric&lat=${lat}&lon=${lon}`;
      var res;
      try {
        res = await axios.get(axios_url);
      } catch (err) {
        console.error('ERROR getForecast()', err);
        $q.dialog({
          title: 'ERROR',
          message: 'Something wrong with getForecast.<br>Please try again after some time.',
          html: true,
          position: 'bottom'
        });
        return;
      }
      var resMapped = res.data.list.map((obj, index) => {        
        return { 
          index,
          dt: obj.dt,
          dt_txt: obj.dt_txt,
          dt_txt_F: dayjs(obj.dt_txt).format('dddd, DD MMMM YYYY h:mm A'),
          dt_txt_F2: dayjs(obj.dt_txt).format('h:mm A'),
          dt_txt_F3: dayjs(obj.dt_txt).format('dddd, DD MMM'),          
          temp: obj.main.temp,
          temp_F: Math.round(obj.main.temp) + '°',
          temp_min: obj.main.temp_min,
          temp_max: obj.main.temp_max,
          temp_min_max_F: `H: ${obj.main.temp_max}°C L: ${obj.main.temp_min}°C`,
          weather: obj.weather[0].description
        };
      });      
      resMapped_hourly_entries.value = resMapped.slice(0,4);

      // we choose to show the first 3-hour entry forecast for that day
      // multiples of 8, 24 / 3 = 8
      resMapped_daily_entries.value.push(resMapped[0]);
      resMapped_daily_entries.value.push(resMapped[8]);
      resMapped_daily_entries.value.push(resMapped[16]);
      resMapped_daily_entries.value.push(resMapped[24]);
      resMapped_daily_entries.value.push(resMapped[32]);
    }

    function addToLocationList() {
      locations.value.push(currWeatherObj.value);      
      router.push({ path: '/' });
    }

    return {
      locationSelected, dateToday, resMapped_hourly_entries, resMapped_daily_entries, locations, currWeatherObj,     
      getWeather, getForecast, addToLocationList
    };
  }
}
</script>

<style>

</style>