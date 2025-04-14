import { ElNotification } from "element-plus"
import type { FormRules } from 'element-plus';
import type { StudentType } from '@/models/types'

export default function useGlobalUtils() {
    const successNotification = (title: string, message: string) => {
        ElNotification.success({
            title: title,
            message: message,
            showClose: true,
            position: 'bottom-right'
        })
    }
    const errorNotification = (title: string, message: string) => {
        ElNotification.error({
            title: title,
            message: message,
            showClose: true,
            position: 'bottom-right'
        })
    }

    const setRules = (rules: any) => {
        let _rules = {}
        if(!rules && rules.length === 0) errorNotification('Error', 'Please set your form rules!')
        rules.forEach((rule: any) => {
            Object.assign(_rules, {
                [rule.key]: [{
                    type: rule.type,
                    required: true,
                    message: rule.message,
                    trigger: rule.trigger
                }]
            })
        })
        return _rules
    }

    const truncateText = (str: string, len: number) => {
      if(str.length <= len) return
      return str.slice(0, len) + ' . . .'
    }

    const getStudentName = (stud: StudentType) => {
        if(!stud) return
        return `${(stud.lastName?.charAt(0).toUpperCase() || '') + (stud.lastName?.slice(1) || '')}, ${(stud.firstName?.charAt(0).toUpperCase() || '') + (stud.firstName?.slice(1) || '')} ${stud.middleName ? `${stud.middleName?.charAt(0).toUpperCase()}.` : ''}`
    }

    return {
        successNotification,
        truncateText,
        getStudentName,
        setRules,
        errorNotification
    }
}
