<script setup lang="ts">

import {useUserStore} from "@/stores/userStore";
import z from "zod";
import {useField, useForm} from "vee-validate";
import {toFormValidator} from "@vee-validate/zod";

const userStore = useUserStore()

const emit = defineEmits<{
  (e: "goClose"):void
  (e: 'goSubmit', name:string):void
}>()

const props = defineProps<{
  name : string
}>()


const initialValues = {
  name: props.name
}

const validationSchema = z.object({
  name : z.string().min(3)
})

const {handleSubmit} = useForm({
  validationSchema: toFormValidator(validationSchema),
  initialValues
})

const {value, errorMessage: error_name} = useField("name")

const tryChangeName = handleSubmit(async(formValue) => {
  emit("goSubmit", formValue.name)
})

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
            <form @submit="tryChangeName" class="flex flex-col content-center items-center">
              <div>
                <div class="text-center text-white text-2xl mb-4">Votre nom :</div>
                <div><input class="text-black p-2" type="text" v-model="value" :class="{error_input: error_name}"></div>
              </div>
              <button id="btn_submit" class="p-3 rounded-md m-3 transition duration-500 text-white">Confirmer</button>
            </form>
          </div>
        </div>
      </div>
    </div>
  </Teleport>
</template>

<style scoped lang="sass">
#btn_submit
  background: #059669
  &:hover
    background: #10b981
</style>