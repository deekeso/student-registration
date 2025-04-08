<template>
    <el-row style="padding: 1rem;">
        <el-col :span="24" align="right">
            <el-button type="primary" @click="handleLogout()">Logout</el-button>
        </el-col>
    </el-row>
</template>

<script setup lang="ts">
import router from '@/router';
import { useAuthStore } from '@/stores/auth';

const { logout } = useAuthStore()
const handleLogout = () => {
    logout()
    router.push({name: 'Login'})
}
</script>

<style scoped>

</style>