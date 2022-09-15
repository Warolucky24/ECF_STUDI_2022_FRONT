<script setup lang="ts">

import {useUserStore} from "@/stores/userStore";
import z from "zod";
import {useField, useForm} from "vee-validate";
import {toFormValidator} from "@vee-validate/zod";

const userStore = useUserStore()

const emit = defineEmits<{
  (e: 'goClose'):void
  (e: 'isSubmit', name:string):void
}>()

const props = defineProps<{
  name : string
  email: string
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

const {value, errorMessage} = useField("name")

const tryChangeName = handleSubmit(async(formValue) => {
  try {
    await userStore.updateName(props.email,formValue.name)
    userStore.sendMsg("Modification pris en compte !", "success")
    emit("isSubmit", formValue.name)
    emit("goClose")
  }catch (e) {
    //@ts-ignore
    userStore.sendMsg(e.error, "warning")
  }
})

</script>

<template>
  <form @submit="tryChangeName" class="d_flex flex_column justify_content_center align_items_center">
    <div>
      <div class="text_center mb_10">Nouveau nom :</div>
      <div><input type="text" v-model="value" :class="{error_input: errorMessage}"></div>
    </div>
    <div class="d_flex m_10">
      <button class="btn_success me_5">Valider</button>
      <button class="btn_warning me_5" @click="emit('goClose')">Retour</button>
    </div>

  </form>
</template>
