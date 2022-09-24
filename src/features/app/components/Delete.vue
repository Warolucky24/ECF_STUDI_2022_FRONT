<script setup lang="ts">

import {useUserStore} from "@/stores/userStore";

const userStore = useUserStore();
const props = defineProps<{
  id: number,
  name: string,
  type: string
}>()

const emit = defineEmits<{
  (e: "goClose"):void
}>()

async function goDelete(){
  try {
    await userStore.deletePartnerOrStruct(props.id, props.type);
    userStore.sendMsg(`Partenaire ${props.name} supprimé`,"success")
    emit('goClose');
  }catch (e)
  {
    //@ts-ignore
    userStore.sendMsg(e.error, "danger")
  }
}
</script>


<template>
  <Teleport to="body">
    <div class=" bg-gray-600 bg-opacity-30 overflow-x-hidden fixed top-0 right-0 z-50 w-full h-full justify-center items-center">
      <div class="relative p-4  m-auto ms:w-3/4 md:w-3/5 lg:w-1/2">
        <div class="relative bg-sky-800 rounded-lg shadow">
          <button @click="emit('goClose')" class="absolute top-3 right-2.5 text-white bg-transparent hover:bg-gray-200 hover:text-gray-900 rounded-lg text-sm p-1.5 ml-auto inline-flex items-center dark:hover:bg-gray-800 dark:hover:text-white" data-modal-toggle="popup-modal">
            <svg aria-hidden="true" class="w-5 h-5" fill="currentColor" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg"><path fill-rule="evenodd" d="M4.293 4.293a1 1 0 011.414 0L10 8.586l4.293-4.293a1 1 0 111.414 1.414L11.414 10l4.293 4.293a1 1 0 01-1.414 1.414L10 11.414l-4.293 4.293a1 1 0 01-1.414-1.414L8.586 10 4.293 5.707a1 1 0 010-1.414z" clip-rule="evenodd"></path></svg>
            <span class="sr-only">Close modal</span>
          </button>
          <div class="p-6 text-center">
            <div class="flex flex-col content-center items-center">
              <h1 class="text-red-500 text-2xl font-bold" >Zone de danger !</h1>
              <h3 class="text-white text-2xl m-3">Etes-vous sur de supprimer {{props.type=== "partner"? "le partenaire" : "la structure"}} : {{props.name}}</h3>
              <div class="flex m-2">
                <div class="p-3 rounded-md bg-red-600 hover:bg-red-500 transition duration-300 cursor-pointer m-2" @click="goDelete">Confirmer</div>
                <div class="p-3 rounded-md bg-emerald-600 hover:bg-emerald-500 transition duration-300 cursor-pointer m-2" @click="emit('goClose')">Surtout pas !</div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  </Teleport>
</template>