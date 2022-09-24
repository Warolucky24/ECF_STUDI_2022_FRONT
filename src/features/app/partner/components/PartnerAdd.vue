<script setup lang="ts">
import {useField, useForm} from "vee-validate";
import {usePartnerStore} from "@/stores/partnerStore";
import {toFormValidator} from "@vee-validate/zod";
import z from "zod";
import {useUserStore} from "@/stores/userStore";

const partnerStore = usePartnerStore();
const useStore = useUserStore()

const initialValues = {
  partner_name: "",
  partner_active: "1",
  user_email: "",
  user_name: ""
}

const emit = defineEmits<{
  (e: "closeModal"):void
}>()

const required_error = {required_error: "Veuillez renseigner ce champ"}
const validationSchema = toFormValidator(
    z.object({
      partner_name: z.string(required_error).min(3),
      partner_active: z.string(required_error),
      user_email: z.string(required_error).email(),
      user_name: z.string(required_error).min(3)
    })
)
const {handleSubmit} = useForm({
  validationSchema,
  initialValues
})

const {value : partner_name , errorMessage : partner_error } = useField("partner_name");
const {value : partner_active, errorMessage : partner_active_error} = useField('partner_active')
const {value : user_email, errorMessage : user_email_error } = useField("user_email")
const {value : user_name, errorMessage : user_name_error} = useField("user_name");

const tryCreatePartner = handleSubmit(async (formValues) => {
  try {
      await partnerStore.addPartner(formValues);
      useStore.sendMsg("Nouveau partenaire crée !", "success");
      emit("closeModal");
  }catch (e){
    // @ts-ignore
    useStore.sendMsg(e.error, "warning")
  }
})
</script>

<template>
  <Teleport to="body">
    <div class=" bg-gray-600 bg-opacity-30 overflow-x-hidden fixed top-0 right-0 z-50 w-full h-full justify-center items-center">
      <div class="relative p-4  m-auto ms:w-3/4 md:w-3/5 lg:w-1/2">
        <div class="relative bg-sky-800 rounded-lg shadow">
          <button @click="emit('closeModal')" class="absolute top-3 right-2.5 text-white bg-transparent hover:bg-gray-200 hover:text-gray-900 rounded-lg text-sm p-1.5 ml-auto inline-flex items-center dark:hover:bg-gray-800 dark:hover:text-white" data-modal-toggle="popup-modal">
            <svg aria-hidden="true" class="w-5 h-5" fill="currentColor" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg"><path fill-rule="evenodd" d="M4.293 4.293a1 1 0 011.414 0L10 8.586l4.293-4.293a1 1 0 111.414 1.414L11.414 10l4.293 4.293a1 1 0 01-1.414 1.414L10 11.414l-4.293 4.293a1 1 0 01-1.414-1.414L8.586 10 4.293 5.707a1 1 0 010-1.414z" clip-rule="evenodd"></path></svg>
            <span class="sr-only">Close modal</span>
          </button>
          <div class="p-6 text-center">
            <div>
              <form @submit="tryCreatePartner" class="flex flex-col content-center items-center">
                <table>
                  <tr>
                    <td colspan="2" class="font-bold text-2xl text-white p-3">Partenaire : </td>
                  </tr>
                  <tr>
                    <td class="text-end text-white">Nom :</td>
                    <td><input type="text" v-model="partner_name" :class="{error_input : partner_error}"></td>
                  </tr>
                  <tr>
                    <td colspan="2">
                      <select v-model="partner_active"  class="w-full text-center" :class="{error_input : partner_active_error}">
                        <option value="0">Inactif</option>
                        <option value="1">Actif</option>
                      </select>
                    </td>
                  </tr>
                  <tr>
                    <td colspan="2" class="text-2xl font-bold p-4 text-white">Gérant :</td>
                  </tr>
                  <tr>
                    <td class="text-end text-white">Mail :</td>
                    <td><input type="email" v-model="user_email" :class="{error_input : user_email_error}"></td>
                  </tr>
                  <tr>
                    <td class="text-end text-white">Nom :</td>
                    <td><input type="text" v-model="user_name" :class="{error_input : user_name_error}"></td>
                  </tr>
                </table>
                <button class="btn_effect m-4" type="submit">
                  <div class="font bg-slate-200"></div>
                  <div class="text text-indigo-400"><span>Se connecter</span></div>
                </button>
              </form>
            </div>
          </div>
        </div>
      </div>
    </div>
  </Teleport>
</template>

<style scoped lang="sass">

</style>