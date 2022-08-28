<script setup lang="ts">

import {useRoute} from "vue-router";
import type {PartnerDetailInterface} from "@/shared/interfaces";
import {dataPartnerById} from "@/shared/services";
import {ref} from "vue";


const route = useRoute()
const partner = ref<PartnerDetailInterface | null>(null)

//if(route.params.partner_id){
  //partner.value = await dataPartnerById(parseInt(route.params.partner_id as string))
//}


</script>
<template>
  <div class="container">
    <div>
      <router-link to="/app/partner">Retour</router-link>
    </div>
    <div class="separator_secondary"></div>
    Partner : {{route.params.partner_id}} demandé
  </div>

</template>