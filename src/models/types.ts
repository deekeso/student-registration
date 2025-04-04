export interface EnrollmentType extends commonType {

    date?: Date
    year?: number
}

export interface CourseType extends commonType {
    name?: string
    description?: string
}

export interface StudentType extends commonType {
    firstName?: string
    middleInitial?: string
    lastName?: string
    birthDate?: string
    age?: number
    address?: string
    course?: CourseType
    enrollments?: Array<EnrollmentType>
}

export interface commonType {
    id?: number
}