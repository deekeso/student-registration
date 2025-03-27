<template>
  <el-dialog v-model="visible" title="Confirm Delete">
    <p>Do you want to continue?</p>

    <el-button @click="cancelDelete">Cancel</el-button>
    <el-button type="danger" @click="confirmDelete">Delete</el-button>
  </el-dialog>
</template>

<script setup lang="ts">
import { ref, defineEmits, defineExpose } from 'vue'

const visible = ref(false)
const emit = defineEmits(['confirm', 'cancel'])

const open = () => {
  visible.value = true
}
const cancelDelete = () => {
  visible.value = false
  emit('cancel')
}
const confirmDelete = () => {
  visible.value = false
  emit('confirm')
}

defineExpose({ open })
</script>
