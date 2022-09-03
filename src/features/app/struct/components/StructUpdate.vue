<script setup lang="ts">
import {useUserStore} from "@/stores/userStore";
import {toFormValidator} from "@vee-validate/zod";
import z from "zod";
import {useField, useForm} from "vee-validate";
import {useStructStore} from "@/stores/structStore";

const userStore = useUserStore()
const props = defineProps<{
  struct_id: number,
  struct_name: string
}>()

const emit = defineEmits<{
  (e: "isUpdate"):void
}>()

const initialValues = {
  struct_name: props.struct_name,
}
const validationSchema = toFormValidator(
    z.object({
      struct_name: z.string().min(3)
    })
)

const {handleSubmit } = useForm({
  validationSchema,
  initialValues
})

const {value : value_struct, errorMessage: error_struct} = useField("struct_name")

const tryUpdate = handleSubmit(async(formValues)=>{{
  try {
    const structStore = useStructStore();
    await structStore.updateStruct(props.struct_id, formValues.struct_name);
    userStore.sendMsg("Modification pris en compte", "success");
    emit("isUpdate");
  }catch (e) {
    //@ts-ignore
    userStore.sendMsg(e.error, "warning");
  }
}})
</script>
<template>
  <form @submit="tryUpdate" class="d_flex justify_content_center align_items_center">
      <div>Nom :</div>
      <div class="mx_10"><input type="text" v-model="value_struct" :class="{error_input: error_struct}"></div>
    <button class="btn_success">Modifier</button>
  </form>

</template>