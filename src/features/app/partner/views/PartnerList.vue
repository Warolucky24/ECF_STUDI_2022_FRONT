<script setup lang="ts">
import Partner from "@/features/app/partner/components/Partner.vue";
import {usePartnerStore} from "@/stores/partnerStore";
import PartnerFilters from "@/features/app/partner/components/PartnerFilters.vue";
import type {FilterUpdate} from "@/shared/interfaces/filters";
import {useUserStore} from "@/stores/userStore";
import {useRouter} from "vue-router";


const partnerStore = usePartnerStore();
const userStore = useUserStore();
const router = useRouter()

function updateFilter(filterUpdate: FilterUpdate){
  try {
    partnerStore.updateFilter(filterUpdate);
  }catch (e){
    console.log(e)
  }
}

async function changeActivePartner(partner_id: number, active:number){
  try {
    await partnerStore.changeActive(partner_id, active)
  }catch (e){
    userStore.sendMsg("Erreur lors de la modification", "danger")
  }


}


</script>

<template>
  <div class="container">
    <div id="panelList" class="d_flex justify_content_between align_items_center flex_row">
      <PartnerFilters
          :filters="partnerStore.filters"
          @update-filter="updateFilter"
      />
      <router-link to="/app/partner/add" id="addPartner" class="btn_primary">Ajouter</router-link>
    </div>
    <div class="separator_secondary"></div>
    <table>
        <tr
            v-for="partner in partnerStore.filteredPartner"
            class="card m_10"
            :key="partner.id"
        >
          <Partner
              v-if="userStore.currentUser.is_admin || userStore.currentUser.id === partner.id"
              :admin="userStore.currentUser.is_admin"
              :data="partner" :key="partner.partner_name"
              @go-change-active-partner="changeActivePartner"
          />
        </tr>
    </table>
  </div>

</template>
<style scoped lang="sass">
@import "@/assets/main.sass"
#panelList
  width: 90vw
  margin: auto
#addPartner
  text-decoration: none



</style>