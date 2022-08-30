<script setup lang="ts">
import {useRoute} from "vue-router";
import {useUserStore} from "@/stores/userStore";

const route = useRoute()
const userStore = useUserStore()



</script>

<template>
  <div>
    <h1>Modifier la structure avec pour id : {{route.params.struct_id}}</h1>
  </div>
</template>