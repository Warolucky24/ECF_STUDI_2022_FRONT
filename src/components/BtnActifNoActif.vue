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
  <div class="body-button bg-sky-900" @click="state.open = true" type="button" data-modal-toggle="popup-modal">
    <div class="button" :class="{'bg-emerald-500': props.state === 1 , buttonValid : props.state === 1, 'bg-red-600' :props.state === 0}"></div>
  </div>


  <Teleport to="body">
    <div v-if="state.open" class=" bg-gray-600 bg-opacity-30 overflow-x-hidden fixed top-0 right-0 z-50 w-full h-full justify-center items-center">
      <div class="relative p-4  m-auto ms:w-3/4 md:w-3/5 lg:w-1/2">
        <div class="relative bg-sky-800 rounded-lg shadow">
          <button @click="state.open = false" class="absolute top-3 right-2.5 text-white bg-transparent hover:bg-gray-200 hover:text-gray-900 rounded-lg text-sm p-1.5 ml-auto inline-flex items-center dark:hover:bg-gray-800 dark:hover:text-white" data-modal-toggle="popup-modal">
            <svg aria-hidden="true" class="w-5 h-5" fill="currentColor" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg"><path fill-rule="evenodd" d="M4.293 4.293a1 1 0 011.414 0L10 8.586l4.293-4.293a1 1 0 111.414 1.414L11.414 10l4.293 4.293a1 1 0 01-1.414 1.414L10 11.414l-4.293 4.293a1 1 0 01-1.414-1.414L8.586 10 4.293 5.707a1 1 0 010-1.414z" clip-rule="evenodd"></path></svg>
            <span class="sr-only">Close modal</span>
          </button>
          <div class="p-6 text-center">
            <svg aria-hidden="true" class="mx-auto mb-4 w-14 h-14 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 8v4m0 4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z"></path></svg>
            <h3 class="mb-5 text-lg font-normal text-white">Veuillez confirmer l'opération :</h3>
            <div class="m-2 text-white">{{props.name}} de {{props.state !== 1 ? "Actif" : "Non-Actif"}} à {{props.state === 1 ? "Actif" : "Non-Actif"}}</div>
            <div></div>
            <button @click="goActif" class=" m-2 p-4 transition rounded-md text-white bg-emerald-600 hover:bg-emerald-500">
              Oui
            </button>
            <button @click="state.open = false" class="m-2 p-4 transition rounded-md text-white bg-red-700 hover:bg-red-600">Non</button>
          </div>
        </div>
      </div>
    </div>


  </Teleport>

</template>


<style scoped lang="sass">
@import "../assets/main"

$largeur: 60px
$hauteur: 25px
$largeur_btn: calc($largeur/1.8)

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
  width : $largeur
  height : $hauteur
  border-radius :  $hauteur
  border : 2px solid black
  .button
    position : absolute
    top: 0px
    right: calc($largeur - $largeur_btn - 4px)
    width : $largeur_btn
    height: calc($hauteur - 4px)
    border-radius : $hauteur
    transition : all .3s ease-out
  .buttonValid
    right : 0px

</style>