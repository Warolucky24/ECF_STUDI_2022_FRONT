<script setup lang="ts">
import {toFormValidator} from "@vee-validate/zod";
import z from "zod";
import {useField, useForm} from "vee-validate";
import {usePartnerStore} from "@/stores/partnerStore";
import {useUserStore} from "@/stores/userStore";
import type {PartnerDetailInterface, PartnerInterface} from "@/shared/interfaces";

const userStore = useUserStore()
const {data} = defineProps<{
  data: PartnerDetailInterface
}>()

const emit = defineEmits<{
  (e: "goClose"):void,
  (e: "isSubmit", partner_name: string, logo_url: string, user_name: string):void
}>()

const initialValues = {
  partner_name: data.partner_name,
  logo_url: data.logo_url,
  user_name: data.user_name
}
const validationSchema = toFormValidator(
    z.object({
      partner_name: z.string().min(3),
      logo_url: z.string().min(3),
      user_name: z.string().min(3)
    })
)

const {handleSubmit } = useForm({
  validationSchema,
  initialValues
})

const {value : value_name, errorMessage: error_name} = useField("partner_name")
const {value : value_logo, errorMessage: error_logo} = useField("logo_url")
const {value : value_name_user, errorMessage: error_name_user} = useField("user_name")

const tryUpdate = handleSubmit(async(formValues)=>{{
  try {
    const partnerStore = usePartnerStore();
    await partnerStore.updatePartner(data.partner_id, formValues.partner_name, formValues.logo_url, data.user_email, formValues.user_name);
    userStore.sendMsg("Modification pris en compte", "success")
    emit("isSubmit", formValues.partner_name, formValues.logo_url, formValues.user_name)
    emit('goClose')
  }catch (e) {
    //@ts-ignore
    userStore.sendMsg(e.error, "warning")
  }
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
            <form @submit="tryUpdate" class="flex flex-col">
              <div class="flex flex-col m-1">
                <div class="text-white">Nom du partenaire :</div>
                <div><input type="text" v-model="value_name" :class="{error_input : error_name}"></div>
              </div>
              <div class="flex flex-col m-1">
                <div class="text-white">Logo URL :</div>
                <div><input type="text" v-model="value_logo" :class="{error_input : error_logo}"></div>
              </div>
              <div class="flex flex-col m-1">
                <div class="text-white">Nom du gérant :</div>
                <div><input type="text" v-model="value_name_user" :class="{error_input : error_name_user}"></div>
              </div>
              <div class="m-3">
                <button type="submit" class="m-3 bg-emerald-600 p-3 rounded-md hover:bg-emerald-500 transition duration-300">Modifer</button>
              </div>
            </form>
          </div>
        </div>
      </div>
    </div>
  </Teleport>
</template>
