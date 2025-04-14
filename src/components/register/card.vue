import useGlobalUtils from '../../composables/useGlobalUtils';
<template>
  <el-card>
    <el-row :gutter="10" align="middle">
        <el-col :span="20" align="left">
          <!-- <h2>Mark Dunstan D. Nellas</h2> -->
          <h2>{{ getStudentName(props.student || {}) || '' }}</h2>
          <span style="font-size:13px; color:grey">
            {{ props.student?.course || '' }}
          </span>
        </el-col>
        <el-col :span="4">
          <el-avatar icon="el-icon-user-solid" :size="50" shape="circle" src='https://cube.elemecdn.com/3/7c/3ea6beec64369c2642b92c6726f1epng.png' fit="fill" />
        </el-col>
        <el-col :span="24">
          <el-descriptions :column="1">
            <el-descriptions-item label="Address"  label-align="right" content-align="center" :label-width="75" class-name="text-content">
              <!-- {{ truncateText('B9 L5 151 Malipaka Street Maligaya Park Subdivision Novaliches Quezon City', 39) }} -->
                {{ truncateText(props.student?.address || '', 41) || '' }}
            </el-descriptions-item>
            <el-descriptions-item label="Birth Date" label-align="right" :label-width="75">
              <!-- March 06, 1995 -->
               {{ props.student?.birthDate || ''}}
            </el-descriptions-item>
            <el-descriptions-item label="Age"  label-align="right" :label-width="75">
              30
            </el-descriptions-item>
          </el-descriptions>
        </el-col>
    </el-row>
  </el-card>
</template>

<script setup lang="ts">
import useGlobalUtils from "@/composables/useGlobalUtils";
import type { StudentType } from '@/models/types'
import type { PropType } from "vue";

const props = defineProps({
  student: {
    type: Object as PropType<StudentType>
  }
})

const { truncateText, getStudentName } = useGlobalUtils()
</script>

<style scoped>
:deep(.text-content) {
  text-overflow: ellipsis;
}
</style>
