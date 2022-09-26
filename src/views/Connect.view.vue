<script setup lang="ts">
import z from 'zod';
import {useField, useForm} from "vee-validate";
import {toFormValidator} from "@vee-validate/zod";
import {useUserStore} from "@/stores/userStore";
import type {UserConnectInterface} from "@/shared/interfaces/UserInterface";
import {useRouter} from "vue-router";

const router = useRouter()
const userStore = useUserStore()

const initialValues = {
  user_email: "",
  user_password: ""
}

const required_error = {required_error : "Veuillez renseigner ce champ"}
const validationSchema = toFormValidator(
    z.object({
      user_email : z.string(required_error).email({message: "Email non valide"}),
      user_password : z.string(required_error)
    })
)
const {handleSubmit} = useForm({
  validationSchema,
  initialValues
})

const {value : value_email, errorMessage : error_email} = useField("user_email")
const {value : value_password, errorMessage : error_password} = useField("user_password")

const tryConnect = handleSubmit( async (formValues) => {
  try {
    await userStore.goConnect(formValues as UserConnectInterface);
    await router.push("/app");
  }catch (e){
    console.log(e)
  }
})

</script>


<template>
  <form
      class="z-50 fixed top-auto left-auto flex flex-col content-between h-full w-full"
      @submit="tryConnect"
  >
    <div class="flex flex-col content-between items-center w-full h-full relative p-4 m-auto md:w-1/2 md:h-2/5 bg-sky-800 rounded-md border-indigo-400 border-2">
      <h1 class="font-bold text-3xl m-6 text-sky-900 text-center h-1/6 text-indigo-400">Page de connection</h1>
      <table class="h-3/6">
        <tr>
          <td class="text-end font-bold text-white">Email :</td>
          <td>
            <input
                type="email"
                v-model="value_email"
                id="email_user"
                :class="{ error_input : error_email}"
                class="input_text"
            ></td>
        </tr>
        <tr>
          <td class="text-end font-bold text-white">Mot de passe :</td>
          <td>
            <input
                type="password"
                v-model="value_password"
                id="password_user"
                :class="{error_input : error_password}"
                class="input_text"
            >
          </td>
        </tr>
      </table>
      <button
          type="submit"
          class="h-2/6 btn_effect m-4"
        >
        <div class="font bg-slate-200"></div>
        <div class="text text-indigo-400"><span>Se connecter</span></div>
      </button>
    </div>
  </form>
  <div id="bg"></div>
</template>

<style lang="sass" scoped>
@import "@/assets/main.sass"

#bg
  position: absolute
  top: 0
  left: 0
  width: 100vw
  height: 100vh
  background-image: url("@/../public/img/bg_connect.jpg")
  background-repeat: no-repeat
  background-size: cover
  z-index: 1

</style>