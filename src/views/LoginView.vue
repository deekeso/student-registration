<template>
  <el-row align="middle" justify="center" >
    <el-col :span="6">
      <el-card style="background-color: transparent;">
        <el-row>
            <el-col>
              <el-form ref="form" style="width: 100%;">
                  <el-form-item>
                    <el-input style="width: 100%;" placeholder="Username" />
                  </el-form-item>
                  <el-form-item>
                    <el-input style="width: 100%;" type="password" placeholder="Password" suffix-icon="eye" />
                  </el-form-item>
              </el-form>
            </el-col>
        </el-row>
      </el-card>
    </el-col>
  </el-row>
  <!-- class="background" -->
  <!-- <div > -->
    <!-- <el-form class="form-container">
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
    </el-form> -->
  <!-- </div> -->
  <!-- <Background></Background> -->
</template>

<script lang="ts" setup>
import { ref } from 'vue'
import { reactive } from 'vue'
import { User, Lock } from '@element-plus/icons-vue'
import { useRouter } from 'vue-router'
import Background from '../components/BackgroundImg.vue'

const form = ref()
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
    localStorage.setItem('auth', 'true')
    router.push('/register')
  } else {
    console.error('incorrect username or password')
  }
}
</script>

<style scoped></style>
