<script setup lang="ts">

defineProps<{
  msg: string
  style: string
}>()

</script>


<template>

  <Teleport to="body">
    <div id="popup" :class="style">
      <h3>{{msg}}</h3>
    </div>
  </Teleport>

</template>

<style scoped lang="sass">
@import "@/assets/main.sass"
#popup
  color: $gray
  font-size: 0.9em
  border-radius: 3px 5px
  padding: 5px 20px
  z-index: 1000
  position: absolute
  top: 70px
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
    top: 70px
    opacity: 1
</style>