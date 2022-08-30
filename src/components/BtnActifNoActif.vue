<script setup lang="ts">

import {reactive} from "vue";

const props = defineProps<{
  state : number,
  name : string
}>()

const state = reactive<{open: boolean}>({open:false})

const emit = defineEmits<{
  (e: "changeactive", active_state: number, name: string) : number
}>()

function goActif(){
  state.open = !state.open;
  const active_state: number = props.state === 1 ? 0 : 1
  emit("changeactive", active_state , props.name);
}
</script>

<template>
  <div class="body-button" @click="state.open = true">
    <div class="button" :class="{buttonValid : props.state === 1}"></div>
  </div>
  <Teleport to="body">
    <div id="calc" v-if="state.open" @click="state.open = false"></div>
    <div v-if="state.open" class="popupConfirm">
      <div class="title">Veuillez confirmer l'opération :</div>
      <div class=" mt_10 d_flex justify_content_arround align_items_center">
        <div class="btn_success" @click="goActif">Oui</div>
        <div class="btn_warning" @click="state.open = false">Non</div>
      </div>
    </div>
  </Teleport>
</template>


<style scoped lang="sass">
@import "../assets/main"

$largeur: 60px
$hauteur: 25px
$largeur_btn: calc($largeur/1.8)

.popupConfirm
  color: $gray
  width: 50vw
  text-align: center
  border-radius: 4px
  padding: 15px 10px
  z-index: 1000
  position: absolute
  left: 25vw
  top: 50px
  border: 2px solid $secondary
  animation: enterEffect .4s ease
  background: $primary
  .title
    font-size: 1.3em
#calc
  position: absolute
  z-index: 20
  background: rgba(128, 128, 128, 0.6)
  width: 100vw
  height: 100vh
  top: 0px
  left: 0px



@keyframes enterEffect
  from
    top: 0
    opacity: 0
  to
    top: 50px
    opacity: 1

.body-button
  cursor: pointer
  position : relative
  background : $gray
  width : $largeur
  height : $hauteur
  border-radius :  $hauteur
  border : 2px solid black
  .button
    position : absolute
    top: 0px
    right: calc($largeur - $largeur_btn - 4px)
    background : red
    width : $largeur_btn
    height: calc($hauteur - 4px)
    border-radius : $hauteur
    transition : all .3s ease-out
  .buttonValid
    right : 0px
    background : $success_1

</style>