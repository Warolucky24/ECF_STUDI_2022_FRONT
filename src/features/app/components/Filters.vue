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
  <div class="d_flex justify_content_center align_items_center" id="container_filter">
    <div>
      <input
          type="text"
          :value="filters.search"
          @input="emit('updateFilter',{search: ($event.target as HTMLInputElement).value})"
          placeholder="Rechercher"
          class="input_search"
      />
    </div>
    <div class="d_flex" id="container_etat">
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
  background: $primary
  border-radius: 5px 10px
  overflow: hidden
  border: 1px solid $secondary
.etat_filter
  transition: all 0.4s
  color: $secondary
  text-align: center
  min-width: 60px
  padding: 9px
  cursor: pointer
.selected
  background: $secondary
  color: white
</style>