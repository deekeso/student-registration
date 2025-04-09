import { defineStore } from "pinia";
import type { UserType, LoginType } from '@/models/types'
import useGlobalUtils from "@/composables/useGlobalUtils";
import { reactive, ref } from "vue";

const user: UserType = {
    firstName: 'Vinah',
    middleName: 'Saj',
    lastName: 'Fukiko',
    role: 'Admin',
    username: 'root',
    password: 'root'
}

const { successNotification, errorNotification } = useGlobalUtils()

export const useAuthStore = defineStore('auth', {
    state: () => ({
        user
    }),
    actions: {
        async login(creds: LoginType) {
            if(user.username === creds.username && user.password === creds.password) {
                localStorage.setItem('isLoggedIn', JSON.stringify(true))
                successNotification('Success', 'Successfully Logged In!')
            }
            else errorNotification('Error', 'Incorrect Username or Password!')
        },
        logout:() => {
          localStorage.clear()
          location.reload()
        }
    },
    getters: {
        getUser: (state) => state.user,
        checkLoggedIn: async() => {
            const session = await localStorage.getItem('isLoggedIn')
            return session
        }
    }
})
