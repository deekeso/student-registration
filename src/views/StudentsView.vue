<template>
    <div class="main-container">
      <el-card class="main-page">
        <el-row :gutter="10">
            <el-col :span="6">
              <RegisterCard />
            </el-col>
            <el-col :span="6">
              <RegisterCard />
            </el-col>
            <el-col :span="6">
              <RegisterCard />
            </el-col>
            <el-col :span="6">
              <RegisterCard />
            </el-col>
        </el-row>
      </el-card>
    </div>
</template>

<script setup lang="ts">
import RegisterCard from  "@/components/register/card.vue";
</script>

<style scoped>

</style>
