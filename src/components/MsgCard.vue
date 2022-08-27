<script setup lang="ts">
defineProps<{
  mode: string
}>()



</script>

<template>
  <Teleport to="body">
    <div id="card" :class="mode">
      <slot name="msg"></slot>
    </div>
  </Teleport>
</template>



<style lang="sass" scoped>
@import "@/assets/main.sass"
#card
  color: $gray
  font-size: 0.9em
  border-radius: 7px
  border: 2px solid $secondary
  padding: 5px 20px
  z-index: 1000
  position: absolute
  top: 40px
  right: 10px
  animation: enterEffect .4s ease
.danger
  background: $danger_1
  &:hover
    background: $danger_2
@keyframes enterEffect
  from
    top: 0px
    opacity: 0
  to
    top: 40px
    opacity: 1
</style>