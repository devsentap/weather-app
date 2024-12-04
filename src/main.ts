import { createApp } from 'vue'
// import { Quasar } from 'quasar'
import { createRouter, createWebHistory } from 'vue-router'
import './style.css'
import App from './App.vue'

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
  .mount('#app')
