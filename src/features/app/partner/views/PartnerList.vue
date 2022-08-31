<script setup lang="ts">
import Partner from "@/features/app/partner/components/Partner.vue";
import {usePartnerStore} from "@/stores/partnerStore";
import {useUserStore} from "@/stores/userStore";
import {useRouter} from "vue-router";
import type {FilterUpdate} from "@/shared/interfaces";
import Filters from "@/features/app/components/Filters.vue";


const partnerStore = usePartnerStore();
const userStore = useUserStore();
const router = useRouter()


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

function UpdateFilter(updateFilter : FilterUpdate){
  partnerStore.updateFilter(updateFilter);
}

</script>

<template>
  <div class="container">
    <div class="d_flex justify_content_between align_items_center" id="container_sub_head">
      <Filters
          :filters="partnerStore.filters"
          @update-filter="UpdateFilter"
      />
      <router-link v-if="userStore.currentUser.is_admin" to="/app/partner/add" id="addPartner" class="btn_primary">Ajouter</router-link>
    </div>
    <div class="separator_secondary"></div>
    <table class="table">
      <tr>
        <th>Logo</th>
        <th>Nom</th>
        <th>Activé ?</th>
        <th>Nom gérant</th>
        <th>mail gérant</th>
      </tr>
        <tr
            v-for="partner in partnerStore.filteredPartner"
            class="m_10"
            :key="partner.id"
        >
          <Partner
              v-if="userStore.currentUser.is_admin || userStore.currentUser.id === partner.user_id"
              :data="partner" :key="partner.partner_name"
              @go-change-active-partner="changeActivePartner"
          />
        </tr>
    </table>
  </div>

</template>
<style scoped lang="sass">
@import "@/assets/main.sass"
#addPartner
  +lg_max
    margin-top: 5px
#container_sub_head
  +lg_min
    flex-direction: row
  +lg_max
    flex-direction: column

</style>