<script setup lang="ts">
import type {FilterInterface, Etat, FilterUpdate} from "@/shared/interfaces";

defineProps<{
  filters : FilterInterface
}>()


const emit = defineEmits<{
  (e: "updateFilter", filterUpdate: FilterUpdate):void
}>()

</script>

<template>
  <div class="flex content-center items-center " id="container_filter">
    <div>
      <input
          type="text"
          :value="filters.search"
          @input="emit('updateFilter',{search: ($event.target as HTMLInputElement).value})"
          placeholder="Rechercher"
          class="border-sky-900 mx-1"
      />
    </div>
    <div class="flex" id="container_etat">
      <p
          class="etat_filter"
          :class="{selected : filters.etat === filter}"
          v-for="filter in (['all','Actif','Non-actif'] as Etat[])"
          @click="emit('updateFilter', {etat: filter})"
      >
        {{filter}}
      </p>
    </div>
  </div>
</template>

<style scoped lang="sass">
@import "@/assets/main.sass"
#container_filter
  +lg_max
    flex-direction: column
  +lg_min
    flex-direction: row
#container_etat
  background: white
  border-radius: 5px 10px
  overflow: hidden
  border: 1px solid #0c4a6e
.etat_filter
  transition: all 0.4s
  color: #0c4a6e
  text-align: center
  min-width: 60px
  padding: 9px
  cursor: pointer
.selected
  background: #0c4a6e
  color: white
</style>