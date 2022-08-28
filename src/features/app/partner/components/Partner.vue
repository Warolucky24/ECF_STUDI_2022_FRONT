<script setup lang="ts">
import type {PartnerInterface} from "@/shared/interfaces/PartnerInterface";

const props = defineProps<{
  data : PartnerInterface,
  admin: boolean
}>()

</script>

<template>
    <td><router-link :to="'/app/partner/detail/'+props.data.id">{{props.data.partner_name}}</router-link></td>
    <td>{{ props.data.partner_active ? "Actif" : "Non-Actif"}}</td>
    <td v-if="admin"><div class="btn_warning">Modifer</div></td>
</template>

<style scoped lang="sass">

</style>