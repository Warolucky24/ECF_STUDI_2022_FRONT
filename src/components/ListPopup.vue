<script setup lang="ts">

import {useUserStore} from "@/stores/userStore";

const userStore = useUserStore()


</script>

<template>
  <Teleport to="body">
    <TransitionGroup tag="div" name="list" id="popup_list">
      <template v-for="msg in userStore.list_pop">
        <div v-if="msg.text" :key="msg.text" :class="msg.style" class="popup flex items-center m-auto text-center">
          <div v-if="msg.style === 'success'">
            <svg class="mr-3" width="32" height="32" viewBox="0 0 24 24"><path fill="#888888" d="M11 17h2v-6h-2Zm1-8q.425 0 .713-.288Q13 8.425 13 8t-.287-.713Q12.425 7 12 7t-.712.287Q11 7.575 11 8t.288.712Q11.575 9 12 9Zm0 13q-2.075 0-3.9-.788q-1.825-.787-3.175-2.137q-1.35-1.35-2.137-3.175Q2 14.075 2 12t.788-3.9q.787-1.825 2.137-3.175q1.35-1.35 3.175-2.138Q9.925 2 12 2t3.9.787q1.825.788 3.175 2.138q1.35 1.35 2.137 3.175Q22 9.925 22 12t-.788 3.9q-.787 1.825-2.137 3.175q-1.35 1.35-3.175 2.137Q14.075 22 12 22Zm0-2q3.35 0 5.675-2.325Q20 15.35 20 12q0-3.35-2.325-5.675Q15.35 4 12 4Q8.65 4 6.325 6.325Q4 8.65 4 12q0 3.35 2.325 5.675Q8.65 20 12 20Zm0-8Z"/></svg>
          </div>
          <div v-if="msg.style === 'danger' || msg.style === 'warning'">
            <svg class="mr-3" width="32" height="32" viewBox="-2 -3 24 24"><path fill="#888888" d="m12.8 1.613l6.701 11.161c.963 1.603.49 3.712-1.057 4.71a3.213 3.213 0 0 1-1.743.516H3.298C1.477 18 0 16.47 0 14.581c0-.639.173-1.264.498-1.807L7.2 1.613C8.162.01 10.196-.481 11.743.517c.428.276.79.651 1.057 1.096zm-2.22.839a1.077 1.077 0 0 0-1.514.365L2.365 13.98a1.17 1.17 0 0 0-.166.602c0 .63.492 1.14 1.1 1.14H16.7c.206 0 .407-.06.581-.172a1.164 1.164 0 0 0 .353-1.57L10.933 2.817a1.12 1.12 0 0 0-.352-.365zM10 14a1 1 0 1 1 0-2a1 1 0 0 1 0 2zm0-9a1 1 0 0 1 1 1v4a1 1 0 0 1-2 0V6a1 1 0 0 1 1-1z"/></svg>
          </div>
          <span class="font-bold">{{msg.text}}</span>
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
  width: 100%


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
  margin-bottom: 5px
  position: relative
  font-size: 1.1em
  background: white
  backdrop-filter: blur(10px)
  +lg_max
    width: 94%
    margin-right: 3%
  +lg_min
    width: 45%
    margin-right: 10px
  color: black
  justify-content: center
  text-align: center
  border-radius: 4px
  padding: 25px 10px
  border: 1px solid gray
  box-shadow: 0px 4px 7px #818cf8

</style>