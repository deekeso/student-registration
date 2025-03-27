<template>
  <el-button type="primary" @click="openForm">Add Student</el-button>
  <div class="card-container">
    <el-row :gutter="20" v-infinite-scroll="load" class="infinite-list" style="overflow: auto">
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
              <!-- <img src="../assets/images/icon.jpg" alt="student-icon" class="icon" /> -->
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
            <el-button type="danger" @click="confirmDelete">
              <el-icon class="edit-icon icon-btn"><Delete /></el-icon>
            </el-button>
          </div>
        </el-card>
      </el-col>
    </el-row>
  </div>
  <!-- store.deleteStudent(index) -->
  <StudentForm ref="formRef" @save="saveStudent" />
  <ConfirmDelete ref="deleteModal" @confirm="deleteStudent" />
</template>

<script setup lang="ts">
import { ref } from 'vue'
import { useStudentStore } from '../stores/student'
import StudentForm from './StudentForm.vue'
import ConfirmDelete from './ConfirmDelete.vue'

const store = useStudentStore()
const formRef = ref()
const deleteModal = ref(false)
const studentToDelete = ref<number | null>(null)
const count = ref(0)
const load = () => {
  count.value += 2
}

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

const confirmDelete = (index: number) => {
  studentToDelete.value = index
  deleteModal.value.open()
}

const deleteStudent = () => {
  if (studentToDelete.value !== null) {
    store.deleteStudent(studentToDelete.value)
  }
}
</script>

<style>
.infinite-list {
  height: 80vh;
  padding: 0;
  margin: 0;
  list-style: none;
}
.infinite-list .infinite-list-item {
  display: flex;
  align-items: center;
  justify-content: center;
  height: 50px;
  background: var(--el-color-primary-light-9);
  margin: 10px;
  color: var(--el-color-primary);
}
.infinite-list .infinite-list-item + .list-item {
  margin-top: 10px;
}

/* width */
::-webkit-scrollbar {
  width: 5px;
}

/* Track */
::-webkit-scrollbar-track {
  background: var(--white);
  border-radius: 5px;
}

/* Handle */
::-webkit-scrollbar-thumb {
  background: #4f78ff;
  border-radius: 5px;
}

/* Handle on hover */
::-webkit-scrollbar-thumb:hover {
  background: #7d9cff;
}
</style>
