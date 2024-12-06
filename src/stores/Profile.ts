import { defineStore } from "pinia";
import { ref } from "vue";

export const useProfileStore = defineStore('profile', () => {  
  const name     = ref('');
  const email    = ref('');
  const phoneNum = ref('');
    
  return {
    name, email, phoneNum
  };
});