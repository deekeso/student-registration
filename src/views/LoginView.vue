<template>
  <div class="background">
    <el-form class="form-container">
      <el-form-item :model="loginForm">
        <el-input
          v-model="loginForm.username"
          type="input"
          placeholder="USERNAME"
          class="user-input"
          :prefix-icon="User"
        ></el-input>
      </el-form-item>
      <el-form-item>
        <el-input
          v-model="loginForm.passInput"
          type="password"
          show-password
          class="user-input"
          placeholder="PASSWORD"
          :prefix-icon="Lock"
        ></el-input>
      </el-form-item>

      <el-button type="plain" width="100%" @click="onSubmit" class="login-btn">LOGIN</el-button>
      <el-form-item>
        <el-text class="mx-1">Forgot Password?</el-text>
      </el-form-item>
    </el-form>
  </div>

  <img src="../assets/images/Vector.svg" aria-disabled="true" class="bg-1 bg" />
  <img src="../assets/images/Ellipse.svg" aria-disabled="true" class="ellipse bg" />
  <img src="../assets/images/Ellipse-1.svg" aria-disabled="true" class="ellipse bg" />
  <img src="../assets/images/Ellipse-2.svg" aria-disabled="true" class="ellipse bg" />
</template>

<script lang="ts" setup>
// import { ref } from 'vue'
import { reactive } from 'vue'
import { User, Lock } from '@element-plus/icons-vue'
import { useRouter } from 'vue-router'

const router = useRouter()
const loginForm = reactive({
  username: '',
  passInput: '',
})

const loginData: {
  username: string
  password: string
} = {
  username: 'root',
  password: 'root',
}

function onSubmit() {
  if (loginForm.username === loginData.username && loginForm.passInput === loginData.password) {
    router.push('/register')
  } else {
    console.error('incorrect username or password')
  }
}
</script>

<style scoped></style>
