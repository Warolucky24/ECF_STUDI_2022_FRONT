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

async function changeActivePartner(partner_id: number, active_state: number){
  try {
    await partnerStore.changeActive(partner_id, active_state);
    const partnerIndex = partnerStore.partner.findIndex((e) => e.id === partner_id);
    const name_partner = partnerStore.partner[partnerIndex].partner_name
    const etat = active_state === 1 ? "Actif" : "Non-Actif";
    userStore.sendMsg(`${name_partner} est maintenant ${etat}`, "success");
  }catch (e){
    //@ts-ignore
    userStore.sendMsg(e.error, "danger");
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
      <thead>
        <th>Nom</th>
        <th>Activé ?</th>
        <th>Nom gérant</th>
        <th>mail gérant</th>
        <th></th>
        <th></th>
      </thead>
        <tr
            v-for="partner in partnerStore.filteredPartner"
            class="card m_10"
            :key="partner.id"
        >
          <Partner
              v-if="userStore.currentUser.is_admin || userStore.currentUser.id === partner.id"
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