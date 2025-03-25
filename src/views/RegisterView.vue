<script setup lang="ts">
import RegistrationForm from '../components/RegistrationForm.vue'

const studentData = [
  {
    id: 1,
    icon: 'src/assets/images/f-icon.png',
    name: 'John Doe',
    birthday: 'Sept, 20, 2001',
    age: 23,
    course: 'Computer Science',
  },
  {
    id: 2,
    name: 'Coleen Garcia',
    birthday: 'Sept, 14, 2001',
    age: 23,
    course: 'Computer Science',
  },
  {
    id: 3,
    name: 'Angeline Kate',
    birthday: 'Nov, 10, 2001',
    age: 23,
    course: 'Bachelor in English Education',
  },
]
</script>

<template>
  <h1>REGISTERED STUDENTS</h1>
  <RegistrationForm></RegistrationForm>

  <div class="card-container" style="padding: 10px">
    <el-card v-for="student in studentData" class="details">
      <img :src="student.icon" alt="" class="card-icon" />
      <div class="student-details">
        <h2>{{ student.name }}</h2>
        <h3>{{ student.course }}</h3>
      </div>
    </el-card>
  </div>
</template>

<style scoped>
.card-container {
  display: grid;
  grid-template-columns: repeat(3, 1fr);
  gap: 10px;
}
.card-icon {
  height: 5em;
}
.details {
  display: flex;
}
</style>
