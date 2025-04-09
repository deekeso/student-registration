import useGlobalUtils from '../../composables/useGlobalUtils';
<template>
  <el-card>
    <el-row :gutter="10" align="middle">
        <el-col :span="20" align="left">
          <h2>Mark Dunstan D. Nellas</h2>
          <span style="font-size:13px; color:grey">
            Bachelor of Science in Information and Technology
          </span>
        </el-col>
        <el-col :span="4">
          <el-avatar icon="el-icon-user-solid" :size="50" shape="circle" src='https://cube.elemecdn.com/3/7c/3ea6beec64369c2642b92c6726f1epng.png' fit="fill" />
        </el-col>
        <el-col :span="24">
          <el-descriptions :column="1">
            <el-descriptions-item label="Address"  label-align="right" content-align="center" :label-width="75" class-name="text-content">
              {{ truncateText('B9 L5 151 Malipaka Street Maligaya Park Subdivision Novaliches Quezon City', 39) }}
            </el-descriptions-item>
            <el-descriptions-item label="Birth Date" label-align="right" :label-width="75">
              March 06, 1995
            </el-descriptions-item>
            <el-descriptions-item label="Age"  label-align="right" :label-width="75">
              30
            </el-descriptions-item>
          </el-descriptions>
        </el-col>
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
import useGlobalUtils from "@/composables/useGlobalUtils";
const {truncateText} = useGlobalUtils()
</script>

<style scoped>
:deep(.text-content) {
  text-overflow: ellipsis;
}

</style>
