<template>
  <el-drawer v-model="visible" :title="isEditing ? 'Edit Student' : 'Add Student'" size="50%">
    <el-form ref="formRef" :model="student" :rules="rules" label-width="120px">
      <el-row :gutter="10" class="row-height">
        <el-col :xs:="24" :md="9">
          <el-form-item label="First Name" prop="firstName">
            <el-input v-model="student.firstName" />
          </el-form-item>
        </el-col>

        <el-col :xs="24" :md="6">
          <el-form-item label="Middle Initial" prop="middleInitial">
            <el-input v-model="student.middleInitial" maxlength="1" class="form-input" />
          </el-form-item>
        </el-col>

        <el-col :xs:="24" :md="9">
          <el-form-item label="Last Name" prop="lastName">
            <el-input v-model="student.lastName" class="form-input" />
          </el-form-item>
        </el-col>

        <el-col :xs="24" :sm="12">
          <el-form-item
            label="Birth Date"
            prop="birthDate"
            :rules="[{ validator: validateBirthDate, trigger: 'change' }]"
          >
            <el-date-picker
              v-model="student.birthDate"
              format="MM-DD-YYYY"
              value-format="MM-DD-YYYY"
              type="date"
              @change="calculateAge"
            />
          </el-form-item>
        </el-col>

        <el-col :xs="24" :sm="12">
          <el-form-item label="Age">
            <el-input v-model="student.age" disabled />
          </el-form-item>
        </el-col>
      </el-row>

      <el-form-item label="Address">
        <el-input v-model="student.address" class="form-input" />
      </el-form-item>

      <el-form-item label="Course">
        <el-select v-model="student.course" class="form-input">
          <el-option
            v-for="item in courses"
            :key="item.value"
            :label="item.label"
            :value="item.value"
          />
          <el-option label="BS HRM" value="BS HRM" />
        </el-select>
      </el-form-item>

      <el-button type="primary" @click="confirmSubmit" class="save-btn">Save</el-button>
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
import { ref, defineEmits } from 'vue'
import { dayjs } from 'element-plus'
// const props = defineProps<{ studentData?: any }>()
const emit = defineEmits(['save'])
const visible = ref(false)
const confirmVisible = ref(false)
const isEditing = ref(false)
const formRef = ref(null)
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

function validateAge(rule: string, value: number, callback: any) {
  if (value < 16) {
    callback(new Error('Student must be at least 16 years old'))
  } else {
    callback()
  }
}

const validateBirthDate = (rule: string, value: string, callback: any) => {
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
  return dayjs(date).format('MM-DD-YYYY')
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
  formRef.value.validate((valid) => {
    if (valid) {
      confirmVisible.value = true
    } else {
      alert('Form validation failed')
      return
    }
  })

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
