<script setup lang="ts">
import type {PartnerInterface} from "@/shared/interfaces/PartnerInterface";
import {ref} from "vue";

const props = defineProps<{
  data : PartnerInterface,
  admin: boolean
}>()


const emit = defineEmits<{
  (e: "goChangeActivePartner", partner_id: number, active :number ):void
}>()

function goChangeActive(){
  emit('goChangeActivePartner', props.data.id, active.value)
}

const active = ref<number>(props.data.partner_active)

</script>

<template>
    <td> <router-link :to="'/app/partner/detail/'+props.data.id">{{props.data.partner_name}}</router-link></td>
    <td v-if="admin">
      <form>
        <select @change="goChangeActive" v-model="active">
          <optgroup label="Actif ?">
            <option value="1">Actif</option>
            <option value="0">Non-Actif</option>
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