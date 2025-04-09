<template>
    <div>
      <el-menu :default-active="activeIndex" mode="horizontal" @select="menuSelect" :ellipsis="false">
        <el-row :gutter="10">
            <el-col :span="20">
              <el-menu-item index="0" disabled>
                <el-icon :size="32" style="color: white"><DataBoard /></el-icon>
                <h2 style="color: white; margin-left:.5rem">Student List</h2>
              </el-menu-item>
            </el-col>
            <el-col :span="2" align="center">
              <el-menu-item index="1" @click="create()">
                <h3 style="color: white">Create</h3>
                <el-icon style="color: white"><Plus /></el-icon>
              </el-menu-item>
            </el-col>
            <el-col :span="2" align="center">
              <el-menu-item index="2">
                <h3 style="color: white">Logout</h3>
                <el-icon style="color: white"><Right /></el-icon>
              </el-menu-item>
            </el-col>
        </el-row>
      </el-menu>
      <CommonModal :open="open" :title="title" @close="open = false" :message="message" @confirm="logout" />
      <router-view/>
    </div>
</template>

<script setup lang="ts">
import CommonModal from '@/components/common/modal.vue'
import {ref} from 'vue'
import { useAuthStore } from '../stores/auth';
import { useEventBus } from '../composables/useEventBust';
const activeIndex = ref('0')
const auth = useAuthStore()
const open = ref(false)
const title = ref('')
const message = ref('')

const menuSelect = (key:string) => {
  switch (key){
    case '2':
      open.value = true
      title.value = 'Logout Confirmation'
      message.value = 'Are you sure you want to logout?'
    break;
  }
}

const logout = () => {
  auth.logout()
}

const create = () => {
  useEventBus.emit('create-student')
}
</script>

<style scoped>

</style>
