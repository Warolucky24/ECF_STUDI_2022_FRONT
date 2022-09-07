<script setup lang="ts">
import {useUserStore} from "@/stores/userStore";
import {toFormValidator} from "@vee-validate/zod";
import z from "zod";
import {useField, useForm} from "vee-validate";
import {useStructStore} from "@/stores/structStore";
import type {StructInterface} from "@/shared/interfaces";

const userStore = useUserStore()
const {struct} = defineProps<{
  struct : StructInterface
}>()

const emit = defineEmits<{
  (e: "isUpdate"):void
}>()

const initialValues = {
  struct_name: struct.struct_name,
  user_name: struct.user_name
}
const validationSchema = toFormValidator(
    z.object({
      struct_name: z.string().min(3),
      user_name: z.string().min(3)
    })
)

const {handleSubmit } = useForm({
  validationSchema,
  initialValues
})

const {value : value_struct, errorMessage: error_struct} = useField("struct_name")
const {value : value_name_user, errorMessage: error_name_user} = useField("user_name")

const tryUpdate = handleSubmit(async(formValues)=>{{
  try {
    const structStore = useStructStore();
    await structStore.updateStruct(struct.id, formValues.struct_name, struct.email, formValues.user_name);
    userStore.sendMsg("Modification pris en compte", "success");
    emit("isUpdate");
  }catch (e) {
    //@ts-ignore
    userStore.sendMsg(e.error, "warning");
  }
}})
</script>
<template>
  <form @submit="tryUpdate" class="d_flex justify_content_between align_items_center w_100">
    <div class="d_flex flex_column justify_content_center align_items_center">
      <div>Nom de la structure :</div>
      <input type="text" v-model="value_struct" :class="{error_input: error_struct}">
    </div>
      <div>
        <div>Nom du gérant :</div>
        <input type="text" v-model="value_name_user" :class="{error_input: error_name_user}">
      </div>
    <button class="btn_success">Modifier</button>
  </form>

</template>