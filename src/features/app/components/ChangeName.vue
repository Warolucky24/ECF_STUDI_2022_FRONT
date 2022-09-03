<script setup lang="ts">

import {useUserStore} from "@/stores/userStore";
import z from "zod";
import {useField, useForm} from "vee-validate";
import {toFormValidator} from "@vee-validate/zod";

const userStore = useUserStore()

const emit = defineEmits<{
  (e: 'goClose'):void
}>()

const validationSchema = z.object({
  name : z.string().min(3)
})

const {handleSubmit} = useForm({
  validationSchema: toFormValidator(validationSchema)
})

const {value, errorMessage} = useField("name")

const tryChangeName = handleSubmit(async(formValue, {resetForm}) => {
  try {
    await userStore.changeName(formValue.name)
    userStore.sendMsg("Nom changé !", "success")
    userStore.currentUser.user_name = formValue.name
    emit("goClose")
    resetForm()
  }catch (e) {
    //@ts-ignore
    userStore.sendMsg(e.error, "warning")
  }
})

</script>

<template>
  <form @submit="tryChangeName" class="d_flex flex_column justify_content_center align_items_center">
    <div>
      <div class="text_center mb_10"> Votre nouveau nom :</div>
      <div><input type="text" v-model="value" :class="{error_input: errorMessage}"></div>
    </div>
    <div class="d_flex m_10">
      <button class="btn_success me_5">Valider</button>
      <button class="btn_warning me_5" @click="emit('goClose')">Retour</button>
    </div>

  </form>
</template>
