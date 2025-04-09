<template>
  <el-dialog v-model="props.open" :show-close="false" :width="600" :close-on-click-modal="false">
      <template #header>
        <el-row :gutter="10">
            <el-col :span="12">
              <h3 style="color:#F97316">{{ props.title }}</h3>
            </el-col>
            <el-col :span="12" align="right">
              <el-icon style="color: #F97316; font-size:1.3rem" @click="close()"><Close /></el-icon>
            </el-col>
        </el-row>
      </template>
      <template #footer>
        <el-button type="primary" plain @click="close()">Cancel</el-button>
        <el-button type="primary" @click="confirm()">Confirm</el-button>
      </template>

      <h4>{{ props.message }}</h4>
  </el-dialog>
</template>

<script setup lang="ts">
const $emits = defineEmits(['close', 'confirm'])
const props = defineProps({
  title: {
    type: String,
    default: null
  },
  message: {
    type: String,
    default: null
  },
  open: {
    type: Boolean,
    default: false
  }
})

const close = () => {
  $emits('close')
}

const confirm = () => {
  $emits('confirm')
}
</script>

<style scoped>

</style>
