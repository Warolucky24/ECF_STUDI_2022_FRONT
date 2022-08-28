<script setup lang="ts">
import Partner from "@/features/app/partner/components/Partner.vue";
import {usePartnerStore} from "@/stores/partnerStore";
import PartnerFilters from "@/features/app/partner/components/PartnerFilters.vue";
import type {FilterUpdate} from "@/shared/interfaces/filters";
import {useUserStore} from "@/stores/userStore";


const partnerStore = usePartnerStore();
const userStore = useUserStore();

function updateFilter(filterUpdate: FilterUpdate){
  partnerStore.updateFilter(filterUpdate);
}


</script>

<template>
  <div class="container">
    <div id="panelList" class="d_flex justify_content_between">
      <PartnerFilters
          :filters="partnerStore.filters"
          @update-filter="updateFilter"
      />
      <router-link to="/app/partner/add" id="addPartner">Ajouter un partenaire</router-link>
    </div>
    <div class="separator_secondary"></div>
    <div class="container">
      <table class="table">
        <tr
            v-for="partner in partnerStore.filteredPartner"
        >
          <Partner
              v-if="userStore.currentUser.is_admin || userStore.currentUser.id === partner.id"
              :admin="userStore.currentUser.is_admin"
              :data="partner" :key="partner.partner_name"
          />
        </tr>
      </table>
    </div>
  </div>

</template>
<style scoped lang="sass">
#panelList
  width: 90vw
  margin: auto
#addPartner
  text-decoration: none
</style>