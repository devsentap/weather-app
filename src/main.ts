import { createApp } from 'vue'
import { createRouter, createWebHistory } from 'vue-router'
import './style.css'
import App from './App.vue'

// import { Quasar } from 'quasar'
import { Quasar, Loading, Dialog } from 'quasar'
// Import icon libraries
import '@quasar/extras/material-icons/material-icons.css'
// Import Quasar css
import 'quasar/dist/quasar.css'

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
  .mount('#app')
