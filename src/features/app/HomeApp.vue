<script setup lang="ts">
import Header from "@/features/app/components/Header.vue";
</script>

<template>
  <Header/>
  <router-view v-slot="{ Component, route }">
    <Transition name="page" mode="out-in" appear>
      <div  :key="route.path">
        <component :is="Component"/>
      </div>
    </Transition>
  </router-view>
</template>
<style scoped lang="sass">


.page-enter-active
  transition: all 0.3s
  transition-delay: .2s
.page-leave-active
  transition: all 0.3s
.page-enter-from
  transform: translateX(0px)
  opacity: 0
.page-leave-to
  transform: translateX(40px)
  opacity: 0
</style>