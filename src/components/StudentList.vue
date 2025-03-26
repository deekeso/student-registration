<template>
  <el-button type="primary" @click="openForm">Add Student</el-button>
  <div class="card-container">
    <el-row :gutter="20">
      <el-col
        v-for="(student, index) in store.students"
        :key="index"
        :xs="24"
        :sm="12"
        :md="8"
        :lg="6"
        :xl="4"
      >
        <el-card shadow="hover" class>
          <h3>{{ student.firstName }} {{ student.lastName }}</h3>
          <p><b>Course:</b> {{ student.course }}</p>
          <p><b>Age:</b> {{ student.age }}</p>
          <el-button type="warning" @click="editStudent(student, index)">Edit</el-button>
          <el-button type="danger" @click="store.deleteStudent(index)">Delete</el-button>
        </el-card>
      </el-col>
    </el-row>
  </div>

  <StudentForm ref="formRef" @save="saveStudent" />
</template>

<script setup lang="ts">
import { ref } from 'vue'
import { useStudentStore } from '../stores/student'
import StudentForm from './StudentForm.vue'

const store = useStudentStore()
const formRef = ref()

const openForm = () => {
  formRef.value.openDrawer()
}

const editStudent = (student: any, index: number) => {
  formRef.value.openDrawer({ ...student, index })
}

const saveStudent = (student: any) => {
  if (student.index !== undefined) {
    store.updateStudent(student.index, student)
  } else {
    store.addStudent(student)
  }
}
</script>
