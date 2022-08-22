<script setup lang="ts">
import PartnerFilters from "@/features/app/partner/components/PartnerFilters.vue"
import Partner from "@/features/app/partner/components/Partner.vue";
import {tablePartner} from "@/data/user";



</script>



<template>
  <h1>Liste des partenaires</h1>
  <router-link to="/app/partner/add">Ajoutez</router-link>
  <PartnerFilters />
  <Partner v-for="partner in tablePartner" :data="partner" :key="partner.name"/>
</template>
