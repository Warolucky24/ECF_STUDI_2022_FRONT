<script setup lang="ts">
import type {FilterInterface, FilterUpdate} from "@/shared/interfaces";

defineProps<{
  filters : FilterInterface
}>()

const emit = defineEmits<{
  (e: "updateFilter", filterUpdate: FilterUpdate):void
}>()

</script>

<template>
  <div>
    <input
        type="text"
        :value="filters.search"
        @input="emit('updateFilter', {search: ($event.target as HTMLInputElement).value})"
        placeholder="rechercher"
        class="input_search"
    />
  </div>
</template>

<style scoped lang="sass">
</style>