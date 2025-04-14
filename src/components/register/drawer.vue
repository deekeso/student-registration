<template>
    <div>
        <el-drawer v-model="props.open" direction="rtl" :close-on-click-modal="false" :close-on-press-escape="false" :show-close="false">
            <template #header>
                <el-row  align="middle">
                    <el-col :span="20">
                        <span style="color: #F97316; font-size:1.3rem; font-weight: 600;">Create Student Profile</span>
                    </el-col>
                    <el-col :span="4" align="right">
                        <el-icon style="color: #F97316; font-size:1.3rem" @click="close()"><Close /></el-icon>
                    </el-col>
                </el-row>
            </template>
            <el-row>
                <el-col :span="24">
                    <el-form ref="form" :rules="rules" :model="student" label-width="auto" label-position="left">
                        <el-form-item label="Last Name" prop="lastName">
                            <el-input v-model="student.lastName" placeholder="Input student last name here..." />
                        </el-form-item>
                        <el-form-item label="Middle Name">
                            <el-input v-model="student.middleName" placeholder="Input student middle name here..." />
                        </el-form-item>
                        <el-form-item label="First Name" prop="firstName">
                            <el-input v-model="student.firstName" placeholder="Input student first name here..." />
                        </el-form-item>
                        <el-form-item label="Course" prop="course">
                            <el-select v-model="student.course" placeholder="Select student course here...">
                                <el-option v-for="course in Courses" :key="course.code" :label="course.name" :value="course.name" />
                            </el-select>
                        </el-form-item>
                        <el-row :gutter="10">
                            <el-col :span="12">
                                <el-form-item label="Birth Date" prop="birthDate">
                                    <el-date-picker v-model="student.birthDate" type="date" placeholder="Select birth date here..." style="width:100%" />
                                </el-form-item>
                            </el-col>
                            <el-col :span="12">
                                <el-form-item label="Age">
                                    <el-input v-model="student.age" disabled="true" placeholder="--" />
                                </el-form-item>
                            </el-col>
                        </el-row>
                        <el-form-item label="Address" prop="address">
                            <el-input v-model="student.address" :autosize="{ minRows: 3 }" placeholder="Input student address here..." type="textarea" />
                        </el-form-item>
                    </el-form>
                </el-col>
            </el-row>
            <template #footer>
                <el-button type="primary" plain @click="close()">
                    Cancel
                </el-button>
                <el-button type="primary" @click="submit(student)" v-loading="props.loading">
                    Submit
                </el-button>
            </template>
        </el-drawer>
        <CommonModal :open="openConfirmation" :title="title" @close="openConfirmation = false" :message="message" @confirm="confirmClose()" />
    </div>
</template>

<script setup lang="ts">
import CommonModal from '../common/modal.vue'
import type {StudentType} from '@/models/types'
import type { PropType } from 'vue';
import { ref, reactive, onMounted } from 'vue'
import { Courses } from '@/models/constants'
import type { FormRules } from 'element-plus';
import useGlobalUtils from '@/composables/useGlobalUtils';
import { useStudentStore } from '@/stores/student';

const props = defineProps({
    open: {
        type: Boolean,
        default: false
    },
    data: {
        type: Object as PropType<StudentType>,
        defaultValue: {}    
    },
    loading: {
        type: Boolean,
        default: false
    }
})
const $emits = defineEmits(['close', 'submit'])

const form = ref()
let student = reactive<StudentType>({})
const openConfirmation = ref(false)
const title = ref('Confirm Close')
const message = ref('Are you sure you want to close this? New Updates will not be changed.')
const { setRules, errorNotification, successNotification } = useGlobalUtils()


const keys = setRules([
    { key: 'firstName', type: 'string', message: 'First name is required.', trigger: 'blur' },
    { key: 'lastName', type: 'string', message: 'Last name is required.', trigger: 'blur' },
    { key: 'course', type: 'string', message: 'Course is required.', trigger: 'change' },
    { key: 'birthDate', type: 'date', message: 'Birth date is required.', trigger: 'change' },
    { key: 'address', type: 'string', message: 'Address is required.', trigger: 'blur' },
])

const rules = reactive<FormRules<StudentType>>(keys)
const close = () => {
    openConfirmation.value = true
}

const confirmClose = () => {
    student = {}
    openConfirmation.value = false
    $emits('close')
}

const submit = async(data: StudentType) => {
    try {
        await form.value.validate()
        $emits('submit', data)
        // if(data) {
        //     await useStudents.addStudents(data)
        //     // const students = await useStudents.getAllStudents
        //     // console.log('Students :>> ', students)
        // }
        // successNotification('Success!', 'Student records has been successfully updated!')
        // loading.value = false
    } catch (error) {
        errorNotification('Error!', 'Unable to update records. Please contact your administrator')
    }
}
</script>

<style scoped>

</style>