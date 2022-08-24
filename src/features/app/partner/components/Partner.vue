<script setup lang="ts">
import type {PartnerInterface} from "@/shared/interfaces/PartnerInterface";

const props = defineProps<{
  data : PartnerInterface
}>()

</script>

<template>
    <td>{{props.data.partner_name}}</td>
    <td>{{ props.data.partner_active ? "Actif" : "Non-Actif"}}</td>
    <td><div class="btn_warning">Modifer</div></td>
</template>

<style scoped lang="sass">

</style>