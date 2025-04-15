<template>
    <div class="main-container">
      <el-card class="main-page">
        <el-row :gutter="10" v-if="students && students.length">
            <el-col :span="6" v-for="(student, i) in students" :key="i">
              <RegisterCard :student="student" />
            </el-col>
        </el-row>
        <el-empty v-else description="No data found!" />
      </el-card>
    </div>
</template>

<script setup lang="ts">
import RegisterCard from  "@/components/register/card.vue";
import type { StudentType } from '@/models/types'
const students: Array<StudentType> = JSON.parse(localStorage.getItem('students') || '[]')
</script>

<style scoped>

</style>
