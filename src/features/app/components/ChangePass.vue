<script setup lang="ts">
import z from "zod";
import {useField, useForm} from "vee-validate";
import {toFormValidator} from "@vee-validate/zod";
import {useUserStore} from "@/stores/userStore";

const userStore = useUserStore()


const emit = defineEmits<{
  (e: "goClose"):void
}>()

const validationSchema = z.object({
  password : z.string().min(3),
  password2: z.string().min(3)
}).refine((data) => data.password === data.password2, {
  path: ['password'],
  message: "erreur",
});


const { handleSubmit} = useForm({
  validationSchema: toFormValidator(validationSchema)
})

const {value : pass1_value, errorMessage : pass1_error} = useField("password")
const {value : pass2_value, errorMessage : pass2_error} = useField("password2")

const tryChangePass = handleSubmit(async (formValue, {resetForm}) => {
  try {
    await userStore.updatePassword(formValue.password);
    userStore.sendMsg("Mot de passe changé !", "success");
    emit("goClose");
    resetForm()
  }catch (e){
    //@ts-ignore
    userStore.sendMsg(e.error, "warning");
  }
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
            <form @submit="tryChangePass">
              <div class="m-3">
                <table class="table-auto m-auto">
                  <tr>
                    <td class="text-end text-white">Nouveau mot de passe :</td>
                    <td><input type="password" v-model="pass1_value" :class="{error_input : pass1_error}" class="m-1 p-1"></td>
                  </tr>
                  <tr>
                    <td class="text-end text-white">Confirmer nouveau mot de passe :</td>
                    <td><input type="password" v-model="pass2_value" :class="{error_input : pass2_error}" class="m-1 p-1"></td>
                  </tr>
                  <tr>
                    <td><button id="btn_submit" class="p-3 m-2 rounded-md transition duration-300">Valider</button></td>
                    <td><button class="bg-red-600 hover:bg-red-500 p-3 m-2 rounded-md transition duration-300" @click="emit('goClose')">Retour</button></td>
                  </tr>
                </table>
              </div>
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