import { defineStore } from "pinia";
import { computed, ref, Ref } from "vue";

export const useProfileStore = defineStore('profile', () => {  
  const name     = ref('Faiz1');
  const email    = ref('sayhellotofaiz@gmail.com');
  const phoneNum = ref('+60132865249');
    
  return {
    name, email, phoneNum
  };
});