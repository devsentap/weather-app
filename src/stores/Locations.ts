import { defineStore } from "pinia";
import { ref } from "vue";

export const useLocationsStore = defineStore('locations', () => {  
  const locations = ref([]);  
    
  return {
    locations
  };
});