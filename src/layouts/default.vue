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
              <el-menu-item index="1">
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
      <router-view/>
      <CommonModal :open="openConfirmation" :title="title" @close="openConfirmation = false" :message="message" @confirm="logout" />
      <RegisterDrawer :open="openDrawer" @close="openDrawer=false" @submit="submit" :loading="loading" />
    </div>
</template>

<script setup lang="ts">
import CommonModal from '@/components/common/modal.vue'
import RegisterDrawer from '@/components/register/drawer.vue'
import {ref} from 'vue'
import { useAuthStore } from '../stores/auth';
import { useEventBus } from '../composables/useEventBust';
import type { StudentType } from '@/models/types'
import useGlobalUtils from '@/composables/useGlobalUtils';
import { useStudentStore } from '@/stores/student';

const activeIndex = ref('0')
const auth = useAuthStore()
const openConfirmation = ref(false)
const openDrawer = ref(false)
const title = ref('')
const message = ref('')
let student = ref<StudentType>({})
const { errorNotification, successNotification } = useGlobalUtils()
const loading = ref(false)
const useStudents = useStudentStore()

const menuSelect = (key:string) => {
  switch (key){
    case '1':
      create()
      break;
    case '2':
      openConfirmation.value = true
      title.value = 'Logout Confirmation'
      message.value = 'Are you sure you want to logout?'
      break;
  }
}

const logout = () => {
  auth.logout()
}

const create = () => {
  openDrawer.value = true
  // useEventBus.emit('create-student')
}

const submit = async(data: StudentType) => {
  try {
    loading.value = true
    if(data && !data.id) {
        await useStudents.addStudents(data)
    }
    successNotification('Success!', 'Student records has been successfully updated!')
    loading.value = false
  } catch (error) {
    errorNotification('Error!', 'Unable to update student records! Please contact your system administrator.')
  }
}
</script>

<style scoped>

</style>
