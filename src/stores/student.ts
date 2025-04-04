import { defineStore } from 'pinia'
import type {StudentType} from '@/models/types'

export const useStudentStore = defineStore('studentStore', {
  state: () => ({
    students: JSON.parse(localStorage.getItem('students') || '[]') as Array<StudentType>[],
  }),
  getters:{
    getAllStudent: (state) => state.students
  },
  actions: {
    // addStudent(student: Student) {
    //   this.students.push(student)
    //   this.saveToLocalStorage()
    // },
    // updateStudent(index: number, updatedStudent: Student) {
    //   this.students[index] = updatedStudent
    //   this.saveToLocalStorage()
    // },
    // deleteStudent(index: number) {
    //   this.students.splice(index, 1)
    //   this.saveToLocalStorage()
    // },
    // saveToLocalStorage() {
    //   localStorage.setItem('students', JSON.stringify(this.students))
    // },
  },
})

interface Student {
  firstName: string
  middleInitial: string
  lastName: string
  birthDate: string
  age: number
  address: string
  course: string
}
