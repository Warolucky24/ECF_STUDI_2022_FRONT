<script setup lang="ts">
import {useUserStore} from "@/stores/userStore";
import {toFormValidator} from "@vee-validate/zod";
import z from "zod";
import {useField, useForm} from "vee-validate";
import type {StructDetailInterface, StructUpdateInterface} from "@/shared/interfaces";

const userStore = useUserStore()
const {data} = defineProps<{
  data : StructDetailInterface
}>()

const emit = defineEmits<{
  (e: "goUpdate", struct_update: StructUpdateInterface):void
  (e: "goClose"):void
}>()

const initialValues = {
  struct_name: data.struct_name,
  user_name: data.user_name,
  struct_address: data.struct_address,
  struct_city: data.struct_city,
  struct_postal: data.struct_postal
}
const validationSchema = toFormValidator(
    z.object({
      struct_name: z.string().min(3),
      struct_address: z.string().min(3),
      struct_postal: z.number().min(0),
      struct_city: z.string().min(3)
    })
)

const {handleSubmit } = useForm({
  validationSchema,
  initialValues
})

const {value : value_struct, errorMessage: error_struct} = useField("struct_name")
const {value: value_address, errorMessage: error_address} = useField("struct_address")
const {value: value_postal, errorMessage: error_postal} = useField("struct_postal")
const {value: value_city, errorMessage: error_city} = useField("struct_city")

const tryUpdate = handleSubmit(async(formValues)=>{{
  emit("goUpdate", formValues)
  emit("goClose")
}})
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
            <form @submit="tryUpdate" class="d_flex justify_content_between align_items_center w_100">
              <div class="d_flex flex_column justify_content_center align_items_center">
                <div class="text-white">Nom de la structure :</div>
                <input type="text" v-model="value_struct" :class="{error_input: error_struct}">
              </div>
                <div class="flex flex-col m-1">
                  <div class="text-white">Adresse :</div>
                  <div><input type="text" v-model="value_address" :class="{error_input: error_address}"></div>
                </div>
                <div class="flex flex-col m-1">
                  <div class="text-white">Code postal :</div>
                  <div><input type="number" v-model="value_postal" :class="{error_input: error_postal}"></div>
                </div>
                <div class="flex flex-col m-1">
                  <div class="text-white">Ville :</div>
                  <div><input type="text" v-model="value_city" :class="{error_input: error_city}"></div>
                </div>
              <button class="m-3 bg-emerald-600 p-3 rounded-md hover:bg-emerald-500 transition duration-300 text-slate-200">Modifier</button>
            </form>
          </div>
        </div>
      </div>
    </div>
  </Teleport>
</template>