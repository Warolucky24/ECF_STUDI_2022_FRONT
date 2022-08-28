<script setup lang="ts">
import type {PartnerInterface} from "@/shared/interfaces/PartnerInterface";

const props = defineProps<{
  data : PartnerInterface,
  admin: boolean
}>()


const emit = defineEmits<{
  (e: "goChangeActivePartner", partner_id: number, active :number ):void
}>()

</script>

<template>
    <td> <router-link :to="'/app/partner/detail/'+props.data.id">{{props.data.partner_name}}</router-link></td>
    <td v-if="admin">
      <form>
        <select @change="emit('goChangeActivePartner', props.data.id, parseInt($event.target.value) as number)">
          <optgroup label="Actif ?">
            <option value="1" :selected="props.data.partner_active">Actif</option>
            <option value="0" :selected="!props.data.partner_active">Non-Actif</option>
          </optgroup>
        </select>
      </form>
    </td>
    <td v-else>
      <div>{{props.data.partner_active? "Actif" : "Non-Actif"}}</div>
    </td>
    <td v-if="admin" class="d_flex">
      <div class="btn_warning">Modifer</div>
      <div class="btn_danger">Supprimer</div>
    </td>

</template>

<style scoped lang="sass">
</style>