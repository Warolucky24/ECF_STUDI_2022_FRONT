<script setup lang="ts">
import {useUserStore} from "@/stores/userStore";


defineProps<{
  msg: string
  style: string
}>()


const close = ()=> {
  const userStore = useUserStore()
  userStore.error = ""
}
</script>


<template>

  <Teleport to="body">
    <div id="popup" :class="style">
      <h3>{{msg}}</h3>
      <div @click="close" id="btn_close_popup">x</div>
    </div>
  </Teleport>

</template>

<style scoped lang="sass">
@import "@/assets/main.sass"
#popup
  color: $gray
  width: 70vw
  text-align: center
  font-size: 0.9em
  border-radius: 4px
  padding: 15px 10px
  z-index: 1000
  position: absolute
  left: 15vw
  bottom: 40px
  animation: enterEffect .4s ease
.danger
  background: $danger_1
.success
  background: $success_1
.warning
  background: $warning_1

#btn_close_popup
  position: absolute
  top: 4px
  right: 8px
  cursor: pointer
  font-weight: bold
  font-size: 1.2em

@keyframes enterEffect
  from
    bottom: 0
    opacity: 0
  to
    bottom: 40px
    opacity: 1
</style>