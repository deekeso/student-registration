<template>
  <el-row align="middle" justify="center" >
    <el-col :span="6">
      <el-card style="background-color: transparent;" v-loading="loading">
        <el-row>
            <el-col :span="24">
              <el-icon :size="32" style="color:"><DataBoard /></el-icon>
            </el-col>
            <el-col :span="24">
              <h2>Student Registration</h2>
            </el-col>
            <el-col :span="24">
              <el-form ref="form" :model="userLogin" :rules="rules" style="width: 100%;">
                  <el-form-item prop="username">
                    <el-input v-model.value="userLogin.username" style="width: 100%;" placeholder="Username" />
                  </el-form-item>
                  <el-form-item prop="password">
                    <el-input v-model.value="userLogin.password" style="width: 100%;" type="password" placeholder="Password" suffix-icon="eye" />
                  </el-form-item>
              </el-form>
            </el-col>
            <el-col align="right" style="padding-right: 1rem;">
              <el-button type="primary" plain>Cancel</el-button>
              <el-button type="primary" @click="handleLogin()">Login</el-button>
            </el-col>
        </el-row>
      </el-card>
    </el-col>
  </el-row>
</template>

<script lang="ts" setup>
import { ref } from 'vue'
import { reactive } from 'vue'
import { useRouter } from 'vue-router'
import { useAuthStore } from '@/stores/auth'
import type { LoginType } from '@/models/types'
import useGlobalUtils from '@/composables/useGlobalUtils'


const form = ref()
const loading = ref(false)
// const {login, getUser, checkLoggedIn} = useAuthStore()
const auth = useAuthStore()
const {errorNotification} = useGlobalUtils()
const router = useRouter()
const userLogin = reactive<LoginType>({})
const rules = {
  username: [{required: true, message: 'Invalid username!', trigger: 'blur'}],
  password: [{required: true, message: 'Invalid password!', trigger: 'blur'}],
}

const handleLogin = async() => {
  try {
    loading.value = true
    await form.value.validate()
    await auth.login(userLogin)
    let checkLogin = await auth.checkLoggedIn
    console.log("checkLogin :>> ", checkLogin)
    if(checkLogin === 'true') router.push({name: 'Students'})
    loading.value = false
  } catch (error) {
    console.error(error)
  }
  
}
</script>

<style scoped></style>
