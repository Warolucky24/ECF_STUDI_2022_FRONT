<script setup lang="ts">
import type {PartnerInterface} from "@/shared/interfaces/PartnerInterface";

const props = defineProps<{
  data : PartnerInterface
}>()

</script>

<template>
  <div class="d_flex justify_content_center align_items_center">
    <div>{{props.data.name}}</div>
    <div>{{props.data.active}}</div>
    <button>Modifer</button>
  </div>
</template>