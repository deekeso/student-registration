<template>
  <el-button @click="visible = true">Register a student</el-button>

  <el-drawer v-model="visible" :show-close="false" size="70%" class="drawer">
    <h2>Registration</h2>
    <el-form>
      <el-form-item label="First Name" required>
        <el-input v-model="form.fname"></el-input>
      </el-form-item>
      <el-form-item label="Middle Initial" required>
        <el-input v-model="form.minitial"></el-input>
      </el-form-item>
      <el-form-item label="Last Name" required>
        <el-input v-model="form.lname"></el-input>
      </el-form-item>
    </el-form>
    <el-form-item label="Birthday" required>
      <el-date-picker v-model="date" type="date" format="MM/DD/YYYY" placeholder="Pick a day" />
    </el-form-item>
    <el-form-item label="Age" required>
      <el-input v-model="form.age" type="number"></el-input>
    </el-form-item>

    <el-form-item label="Course" required>
      <el-select v-model="value" placeholder="Select" size="large" style="width: 240px">
        <el-option
          v-for="item in courses"
          :key="item.value"
          :label="item.label"
          :value="item.value"
        />
      </el-select>
      <el-button @click="showModal = true">Submit</el-button>
    </el-form-item>

    <div v-if="showModal">
      <Modal @close="showModal = false" @submit="addStudentData">
        <el-text tag="p">
          <el-text tag="b">Full Name: </el-text>
          {{ form.fname }} {{ form.minitial }}.
          {{ form.lname }}
        </el-text>

        <el-text tag="p">
          <el-text tag="b">Birthday: </el-text>
          {{ form.birthday }}
        </el-text>

        <el-text tag="p">
          <el-text tag="b">Age: </el-text>
          {{ form.age }}
        </el-text>

        <el-text tag="p">
          <el-text tag="b">Course: </el-text>
          {{ form.course }}
        </el-text>
      </Modal>
    </div>
  </el-drawer>
</template>

<script setup lang="ts">
import { ref } from 'vue'
import { reactive } from 'vue'
import Modal from './Modal.vue'

const visible = ref(false)
const value = ref('') // selected course
const date = ref('')
const showModal = ref(false)
let studentId = 1

const form = reactive({
  id: studentId,
  fname: '',
  minitial: '',
  lname: '',
  birthday: date,
  age: '',
  course: value,
})

function addStudentData() {
  localStorage.setItem('student', JSON.stringify(form))
  studentId++
  showModal.value = false

  this.$emit('studentData', form.value)
  //   console.log(localStorage.getItem('student'))
}

// const storedStudentData = localStorage.getItem('student')

const courses = [
  {
    value: 'Accountancy',
    label: 'Accountancy',
  },
  {
    value: 'Agricultural Engineering',
    label: 'Agricultural Engineering',
  },
  {
    value: 'Architecture',
    label: 'Architecture',
  },
  {
    value: 'Aerospace Engineering',
    label: 'Aerospace Engineering',
  },
  {
    value: 'Applied Mathematics',
    label: 'Applied Mathematics',
  },
  {
    value: 'Art Management',
    label: 'Art Management',
  },
  {
    value: 'Biology',
    label: 'Biology',
  },
  {
    value: 'Business Administration',
    label: 'Business Administration',
  },
  {
    value: 'Chemical Engineering',
    label: 'Chemical Engineering',
  },
  {
    value: 'Civil Engineering',
    label: 'Civil Engineering',
  },
  {
    value: 'Communication',
    label: 'Communication',
  },
  {
    value: 'Computer Engineering',
    label: 'Computer Engineering',
  },
  {
    value: 'Computer Science',
    label: 'Computer Science',
  },
  {
    value: 'Criminology',
    label: 'Criminology',
  },
  {
    value: 'Dentistry',
    label: 'Dentistry',
  },
  {
    value: 'Education',
    label: 'Education',
  },
  {
    value: 'Electrical Engineering',
    label: 'Electrical Engineering',
  },
  {
    value: 'Environmental Science',
    label: 'Environmental Science',
  },
  {
    value: 'Fashion Design',
    label: 'Fashion Design',
  },
  {
    value: 'Finance',
    label: 'Finance',
  },
  {
    value: 'Food Technology',
    label: 'Food Technology',
  },
  {
    value: 'Health Sciences',
    label: 'Health Sciences',
  },
  {
    value: 'Hospitality Management',
    label: 'Hospitality Management',
  },
  {
    value: 'Human Resource Management',
    label: 'Human Resource Management',
  },
  {
    value: 'Industrial Engineering',
    label: 'Industrial Engineering',
  },
  {
    value: 'Information Technology',
    label: 'Information Technology',
  },
  {
    value: 'International Studies',
    label: 'International Studies',
  },
  {
    value: 'Journalism',
    label: 'Journalism',
  },
  {
    value: 'Law',
    label: 'Law',
  },
  {
    value: 'Liberal Arts',
    label: 'Liberal Arts',
  },
  {
    value: 'Mass Communication',
    label: 'Mass Communication',
  },
  {
    value: 'Mathematics',
    label: 'Mathematics',
  },
  {
    value: 'Mechanical Engineering',
    label: 'Mechanical Engineering',
  },
  {
    value: 'Medicine',
    label: 'Medicine',
  },
  {
    value: 'Nursing',
    label: 'Nursing',
  },
  {
    value: 'Pharmacy',
    label: 'Pharmacy',
  },
  {
    value: 'Philosophy',
    label: 'Philosophy',
  },
  {
    value: 'Physical Therapy',
    label: 'Physical Therapy',
  },
  {
    value: 'Physics',
    label: 'Physics',
  },
  {
    value: 'Political Science',
    label: 'Political Science',
  },
  {
    value: 'Public Administration',
    label: 'Public Administration',
  },
  {
    value: 'Real Estate Management',
    label: 'Real Estate Management',
  },
  {
    value: 'Social Work',
    label: 'Social Work',
  },
  {
    value: 'Sociology',
    label: 'Sociology',
  },
  {
    value: 'Theology',
    label: 'Theology',
  },
  {
    value: 'Tourism Management',
    label: 'Tourism Management',
  },
  {
    value: 'Veterinary Medicine',
    label: 'Veterinary Medicine',
  },
  {
    value: 'Web Development',
    label: 'Web Development',
  },
  {
    value: 'Humanities',
    label: 'Humanities',
  },
  {
    value: 'Digital Marketing',
    label: 'Digital Marketing',
  },
  {
    value: 'Sports Management',
    label: 'Sports Management',
  },
  {
    value: 'Marine Engineering',
    label: 'Marine Engineering',
  },
  {
    value: 'Film Production',
    label: 'Film Production',
  },
  {
    value: 'Public Health',
    label: 'Public Health',
  },
  {
    value: 'Nutrition and Dietetics',
    label: 'Nutrition and Dietetics',
  },
  {
    value: 'Agriculture',
    label: 'Agriculture',
  },
  {
    value: 'Education Management',
    label: 'Education Management',
  },
  {
    value: 'Forensic Science',
    label: 'Forensic Science',
  },
  {
    value: 'Creative Writing',
    label: 'Creative Writing',
  },
  {
    value: 'Fashion Marketing',
    label: 'Fashion Marketing',
  },
  {
    value: 'Digital Arts',
    label: 'Digital Arts',
  },
  {
    value: 'Graphic Design',
    label: 'Graphic Design',
  },
  {
    value: 'Library Science',
    label: 'Library Science',
  },
  {
    value: 'Occupational Therapy',
    label: 'Occupational Therapy',
  },
  {
    value: 'Recreation and Wellness',
    label: 'Recreation and Wellness',
  },
  {
    value: 'Supply Chain Management',
    label: 'Supply Chain Management',
  },
  {
    value: 'Real Estate Development',
    label: 'Real Estate Development',
  },
  {
    value: 'Public Relations',
    label: 'Public Relations',
  },
  {
    value: 'Tourism Planning and Development',
    label: 'Tourism Planning and Development',
  },
]
</script>

<style></style>
