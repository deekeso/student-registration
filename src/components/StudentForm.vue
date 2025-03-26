<template>
  <el-drawer v-model="visible" :title="isEditing ? 'Edit Student' : 'Add Student'" size="50%">
    <el-form ref="formRef" :model="student" :rules="rules" label-width="120px">
      <el-form-item label="First Name" prop="firstName">
        <el-input v-model="student.firstName" />
      </el-form-item>

      <el-form-item label="Middle Initial" prop="middleInitial">
        <el-input v-model="student.middleInitial" maxlength="1" />
      </el-form-item>

      <el-form-item label="Last Name" prop="lastName">
        <el-input v-model="student.lastName" />
      </el-form-item>

      <el-form-item
        label="Birth Date"
        prop="birthDate"
        :rules="[{ validator: validateBirthDate, trigger: 'change' }]"
      >
        <el-date-picker v-model="student.birthDate" type="date" @change="calculateAge" />
      </el-form-item>

      <el-form-item label="Age">
        <el-input v-model="student.age" disabled />
      </el-form-item>

      <el-form-item label="Address">
        <el-input v-model="student.address" />
      </el-form-item>

      <el-form-item label="Course">
        <el-select v-model="student.course">
          <el-option label="BS Tourism" value="BS Tourism" />
          <el-option label="BS HRM" value="BS HRM" />
        </el-select>
      </el-form-item>

      <el-button type="primary" @click="confirmSubmit">Save</el-button>
    </el-form>
  </el-drawer>

  <!-- Confirmation Modal -->
  <el-dialog v-model="confirmVisible" title="Confirm Submission">
    <el-descriptions :column="1" border>
      <el-descriptions-item label="First Name">{{ student.firstName }}</el-descriptions-item>
      <el-descriptions-item label="Middle Initial">{{
        student.middleInitial || 'N/A'
      }}</el-descriptions-item>
      <el-descriptions-item label="Last Name">{{ student.lastName }}</el-descriptions-item>
      <el-descriptions-item label="Birth Date">{{ student.birthDate }}</el-descriptions-item>
      <el-descriptions-item label="Age">{{ student.age }}</el-descriptions-item>
      <el-descriptions-item label="Address">{{ student.address }}</el-descriptions-item>
      <el-descriptions-item label="Course">{{ student.course }}</el-descriptions-item>
    </el-descriptions>
    <div style="margin-top: 20px; text-align: right">
      <el-button type="danger" @click="confirmVisible = false">Cancel</el-button>
      <el-button type="primary" @click="submitForm">Confirm</el-button>
    </div>
  </el-dialog>
</template>

<script setup lang="ts">
import { ref, defineProps, defineEmits } from 'vue'

const props = defineProps<{ studentData?: any }>()
const emit = defineEmits(['save'])
const visible = ref(false)
const confirmVisible = ref(false)
const isEditing = ref(false)

const student = ref({
  firstName: '',
  middleInitial: '',
  lastName: '',
  birthDate: '',
  age: 0,
  address: '',
  course: '',
})

// **Validation Rules**
const rules = {
  firstName: [{ required: true, message: 'First name is required', trigger: 'blur' }],
  lastName: [{ required: true, message: 'Last name is required', trigger: 'blur' }],
  birthDate: [{ required: true, message: 'Birth date is required', trigger: 'change' }],
  age: [{ validator: validateAge, trigger: 'blur' }],
}

function validateAge(rule: any, value: any, callback: any) {
  if (value < 16) {
    callback(new Error('Student must be at least 16 years old'))
  } else {
    callback()
  }
}

const validateBirthDate = (rule: any, value: any, callback: any) => {
  if (!value) {
    callback(new Error('Birth Date is required'))
  } else if (new Date(value) > new Date()) {
    callback(new Error('Birth Date cannot be in the future'))
  } else {
    callback()
  }
}

const calculateAge = () => {
  if (!student.value.birthDate) return

  const birthDate = new Date(student.value.birthDate)
  if (isNaN(birthDate.getTime())) {
    console.warn('Invalid birthDate format:', student.value.birthDate)
    return
  }

  const today = new Date()
  let age = today.getFullYear() - birthDate.getFullYear()

  const hasBirthdayPassed =
    today.getMonth() > birthDate.getMonth() ||
    (today.getMonth() === birthDate.getMonth() && today.getDate() >= birthDate.getDate())

  if (!hasBirthdayPassed) {
    age--
  }

  student.value.age = age
}

const formatDate = (date: string | Date) => {
  if (!date) return ''
  const parsedDate = new Date(date)
  if (isNaN(parsedDate.getTime())) return ''
  return parsedDate.toISOString().split('T')[0] // Convert to YYYY-MM-DD
}

// **Reset Form on Open**
const openDrawer = (data?: any) => {
  isEditing.value = !!data
  student.value = data
    ? {
        ...data,
        birthDate: data.birthDate ? formatDate(data.birthDate) : '',
      }
    : {
        firstName: '',
        middleInitial: '',
        lastName: '',
        birthDate: '',
        age: 0,
        address: '',
        course: '',
      }

  if (student.value.birthDate) {
    setTimeout(() => calculateAge(), 0)
  }

  visible.value = true
}

// **Confirm Before Submission**
const confirmSubmit = () => {
  confirmVisible.value = true
  console.log('Submitted Student Data:', {
    ...student.value,
    birthDate: formatDate(student.value.birthDate),
  })
}

// **Submit Form**
const submitForm = () => {
  emit('save', { ...student.value })
  confirmVisible.value = false
  visible.value = false
}

defineExpose({ openDrawer })
</script>
