<template>
  <el-header>
    <h1>Registered Students</h1>
    <el-button @click="logout" class="logout-btn">Log Out</el-button>
  </el-header>
  <div class="registration-container">
    <el-drawer v-model="drawerVisible" title="Student Registration">
      <!-- <StudentForm :studentData="selectedStudent" @save="addStudent" /> -->
    </el-drawer>

    <!-- <div class="student-list">
      <StudentList :students="students" />
    </div> -->
    <el-row :gutter="20">
      <el-col :span="6" v-for="(student, i) in students" :key="i">
        <StudentList :student="(student as StudentType)" />
      </el-col>
    </el-row>
  </div>
</template>

<script setup lang="ts">
import { ref, computed } from 'vue'
import { useStudentStore } from '../stores/student'
import StudentForm from '../components/StudentForm.vue'
import StudentList from '../components/StudentList.vue'
import { useRouter } from 'vue-router'
import type { StudentType } from '@/models/types'

const {getAllStudent} = useStudentStore()
const router = useRouter()
const store = useStudentStore()
const drawerVisible = ref(false)
const selectedStudent = ref(null)
// const students = computed(() => store.students)

// const openDrawer = () => {
//   selectedStudent.value = null // Reset form when opening
//   drawerVisible.value = true
// }

const students = useStudentStore().getAllStudent
// const addStudent = (student) => {
//   store.addStudent(student)
//   drawerVisible.value = false
// }

const logout = () => {
  localStorage.removeItem('auth') // Remove authentication
  router.push('/') // Redirect to login
}
</script>

<style scoped>
.registration-container {
  padding: 20px;
}
</style>
