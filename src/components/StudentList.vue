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
        :xl="1"
      >
        <el-card shadow="hover" class>
          <div class="student-container">
            <div class="details">
              <img src="../assets/images/icon.jpg" alt="student-icon" class="icon" />
              <h2>{{ student.firstName }} {{ student.lastName }}</h2>
              <h3>{{ student.course }}</h3>
              <p>{{ student.age }} years old</p>
              <p class="address">
                <Location style="width: 1em; height: 1em; margin-right: 0.2em" />
                {{ student.address }}
              </p>
            </div>
          </div>
          <div class="btn-container">
            <el-button @click="editStudent(student, index)">
              <el-icon><Edit class="edit-icon icon-btn" /></el-icon>
            </el-button>
            <el-button type="danger" @click="store.deleteStudent(index)">
              <el-icon class="edit-icon icon-btn"><Delete /></el-icon>
            </el-button>
          </div>
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
