<template>
  <el-card>
    <el-row :gutter="10" align="middle">
        <el-col :span="18" align="left">
          <h2>Mark Dunstan D. Nellas</h2>
        </el-col>
        <el-col :span="6">
          <el-avatar icon="el-icon-user-solid" :size="50" shape="circle" src='https://cube.elemecdn.com/3/7c/3ea6beec64369c2642b92c6726f1epng.png' fit="fill" />
        </el-col>
        <el-descriptions horizontal :column="2">
          <el-descriptions-item label="Address" label-class-name="text-label"  label-align="left" >
            <div class="text-content">
              B9 L5 151 Malipaka St. Maligaya Park Subd. Novaliches Quezon City
            </div>
          </el-descriptions-item>
        </el-descriptions>
        <!-- <el-col :span="24" style="height:3rem">
          <el-row :gutter="10" style="height:1rem">
              <el-col :span="6" align="left">
                <span>Address</span>
              </el-col>
              <el-col :span="18" style="width:100%; text-overflow: ellipsis; white-space: nowrap; overflow: hidden;">
                B9 L5 151 Malipaka St. Maligaya Park Subd. Novaliches Quezon City
              </el-col>
          </el-row>
        </el-col>
        <el-col :span="24" style="height:3rem">
          <el-row :gutter="10" style="height:1rem">
              <el-col :span="6" align="left">
                <span>Birth Date</span>
              </el-col>
              <el-col :span="18" style="width:100%; text-overflow: ellipsis; white-space: nowrap; overflow: hidden;">
                B9 L5 151 Malipaka St. Maligaya Park Subd. Novaliches Quezon City
              </el-col>
          </el-row>
        </el-col> -->
    </el-row>
  </el-card>
</template>

<script setup lang="ts">

</script>

<style scoped>
:dep(.text-label){
  width: 1rem;
  max-width: 1rem;
}
.text-content {
  width: 27rem;
  max-width: 27rem;
  text-overflow: ellipsis;
  white-space: nowrap;
  overflow: hidden;
}
</style>
