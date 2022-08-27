<script setup lang="ts">
import {useUserStore} from "@/stores/userStore";
const userStore = useUserStore()



</script>


<template>
  <div>
    <h4>Bienvenue {{userStore.currentUser.user_name}}</h4>
    <div>
      email : {{userStore.currentUser.email}}
    </div>
    <div>
      Admin : {{userStore.currentUser.is_admin ? "Oui" : "Non"}}
    </div>
  </div>

</template>