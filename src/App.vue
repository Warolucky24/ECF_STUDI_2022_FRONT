<script setup lang="ts">
import {useUserStore} from "@/stores/userStore";
import PopUp from "@/components/PopUp.vue";
const userStore = useUserStore();

</script>

<template>
  <RouterView></RouterView>
  <pop-up
      v-if="userStore.error"
      :msg="userStore.error"
      :style="'danger'"
  />
</template>

