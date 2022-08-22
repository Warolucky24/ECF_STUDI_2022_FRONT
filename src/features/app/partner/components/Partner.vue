<script setup lang="ts">
import type {PartnerInterface} from "@/shared/interfaces/PartnerInterface";

const props = defineProps<{
  data : PartnerInterface
}>()

</script>

<template>
  <div id="partner">
    <div>{{props.data.partner_name}}</div>
    <div>{{ props.data.partner_active ? "Actif" : "Non-Actif"}}</div>
    <button>Modifer</button>
  </div>
</template>

<style scoped lang="sass">
#partner
  padding: 5px
  margin: 5px
  display: flex
  justify-content: space-around
  border: 1px solid gray
  border-radius: 5px
  align-items: center
  button
    padding: 5px
    background: orange

</style>