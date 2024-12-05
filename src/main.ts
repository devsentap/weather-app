import { createApp } from 'vue'
import { createRouter, createWebHistory } from 'vue-router'
import './style.css'
import App from './App.vue'

import { Quasar } from 'quasar'
// Import icon libraries
import '@quasar/extras/material-icons/material-icons.css'
// Import Quasar css
import 'quasar/dist/quasar.css'

// import Plugin from 'quasar-ui-q-tel-input'
// import 'quasar-ui-q-tel-input/dist/index.css'

import Vue3QTelInput from 'vue3-q-tel-input'
import 'vue3-q-tel-input/dist/style.css'

// import VuePhoneNumberInput from 'vue-phone-number-input';
// import 'vue-phone-number-input/dist/vue-phone-number-input.css';

import CityList      from './pages/CityList.vue'
import WeatherDetail from './pages/WeatherDetail.vue'
import EditProfile   from './pages/EditProfile.vue'

const routes = [
  { path: '/',              name: 'CityList',      component: CityList },
  { path: '/weatherdetail', name: 'WeatherDetail', component: WeatherDetail },
  { path: '/editprofile',   name: 'EditProfile',   component: EditProfile }
  // TODO: 404 page
]

const router = createRouter({
  history: createWebHistory(),
  routes,
})

createApp(App)
  .use(router)
  .use(Quasar, { plugins: { } })
  // .use(Plugin)
  .use(Vue3QTelInput)
  // .use(VuePhoneNumberInput)
  // .component('vue-phone-number-input', VuePhoneNumberInput)
  .mount('#app')
