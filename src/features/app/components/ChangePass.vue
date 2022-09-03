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
    await userStore.changePassword(formValue.password);
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
  <form @submit="tryChangePass">
    <div class="d_flex justify_content_center align_items_center">
      <table>
        <tr>
          <td class="text_end">Nouveau mot de passe :</td>
          <td><input type="password" v-model="pass1_value" :class="{error_input : pass1_error}"></td>
        </tr>
        <tr>
          <td class="text_end">Valider nouveau mot de passe :</td>
          <td><input type="password" v-model="pass2_value" :class="{error_input : pass2_error}"></td>
        </tr>
        <tr>
          <td><button class="btn_success">Valider</button></td>
          <td><button class="btn_warning" @click="emit('goClose')">Retour</button></td>
        </tr>
      </table>
    </div>
  </form>
</template>
