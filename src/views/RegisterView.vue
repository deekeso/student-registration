<template>
  <div class="registration-container">
    <el-button type="primary" @click="openDrawer">Register Student</el-button>

    <el-drawer v-model="drawerVisible" title="Student Registration">
      <StudentForm :studentData="selectedStudent" @save="addStudent" />
    </el-drawer>

    <div class="student-list">
      <StudentList :students="students" />
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref, computed } from 'vue'
import { useStudentStore } from '../stores/student'
import StudentForm from '../components/StudentForm.vue'
import StudentList from '../components/StudentList.vue'
const store = useStudentStore()
const drawerVisible = ref(false)
const selectedStudent = ref(null)
const students = computed(() => store.students)

const openDrawer = () => {
  selectedStudent.value = null // Reset form when opening
  drawerVisible.value = true
}

const addStudent = (student) => {
  store.addStudent(student)
  drawerVisible.value = false
}
</script>

<style scoped>
.registration-container {
  padding: 20px;
}
</style>
