<script setup lang="ts">

import {useUserStore} from "@/stores/userStore";

const userStore = useUserStore()


</script>

<template>
  <Teleport to="body">
    <TransitionGroup tag="div" name="list" id="popup_list">
      <template v-for="msg in userStore.list_pop">
        <div v-if="msg.text" :key="msg.text" :class="msg.style" class="popup">
          <b>{{msg.text}}</b>
        </div>
      </template>
    </TransitionGroup>
  </Teleport>
</template>

<style scoped lang="sass">
@import "@/assets/main.sass"
#popup_list
  position: absolute
  z-index: 10000
  bottom: 10px
  display: flex
  flex-direction: column
  margin: 0
  +lg_max
    left: 2.5vw
    width: 95vw
  +lg_min
    width: 50%
    right: 25%


.list-enter-active,
.list-leave-active
  transition: all .5s ease

.list-enter-from
  transform: translateY(10px)
  opacity: 0

.list-leave-to
  opacity: 0
  transform: translateY(-20px)

.popup
  margin: 10px
  position: relative
  font-size: 1.1em
  color: $gray
  text-align: center
  border-radius: 4px
  padding: 25px 10px

.danger
  background: $danger_1
.success
  background: $success_1
.warning
  background: $warning_1

</style>