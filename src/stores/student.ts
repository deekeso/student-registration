import { defineStore } from 'pinia'
import type {StudentType} from '@/models/types'

export const useStudentStore = defineStore('studentStore', {
  state: () => ({
    students: JSON.parse(localStorage.getItem('students') || '[]') as Array<StudentType>[]
  }),
  actions: {
    async addStudents(student: StudentType) {
      if(student){
        this.students.push(student)
        localStorage.setItem('students', JSON.stringify(this.students))
      }
    }
  },
  getters: {
    getAllStudents: async() => {
      const students = JSON.parse(JSON.stringify(await localStorage.getItem('students')))
      return students
    }
  }
})


