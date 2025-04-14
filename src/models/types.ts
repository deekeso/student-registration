// export interface EnrollmentType extends commonType {

//     date?: Date
//     year?: number
// }

// export interface CourseType extends commonType {
//     name?: string
//     description?: string
// }

export interface CouseType {
    code?: string
    name?: string
}
export interface StudentType extends commonType {
    firstName?: string
    middleName?: string
    lastName?: string
    birthDate?: Date
    age?: number
    address?: string
    course?: string
}

export interface commonType {
    id?: number
}
export interface LoginType {
    username?: string
    password?: string
}

export interface UserType extends LoginType {
    firstName?: string
    middleName?: string
    lastName?: string
    role?: string
}