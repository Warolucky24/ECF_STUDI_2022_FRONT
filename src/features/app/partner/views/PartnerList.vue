<script setup lang="ts">
import Partner from "@/features/app/partner/components/Partner.vue";
import {usePartner} from "@/stores/partnerStore";
import PartnerFilters from "@/features/app/partner/components/PartnerFilters.vue";
import type {FilterUpdate} from "@/shared/interfaces/filters";


const partnerStore = usePartner()

function updateFilter(filterUpdate: FilterUpdate){
  partnerStore.updateFilter(filterUpdate)
}


</script>

<template>
  <div class="d_flex flex_column">
    <PartnerFilters
      :filters="partnerStore.filters"
      @update-filter="updateFilter"
    />
    <div class="separator_secondary"></div>
    <div class="container">
      <table class="table">
        <tr
            v-for="partner in partnerStore.filteredPartner"
        >
          <Partner
              :data="partner" :key="partner.partner_name"
          />
        </tr>
      </table>
    </div>
  </div>

</template>
