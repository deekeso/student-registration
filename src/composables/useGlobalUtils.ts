import { ElNotification } from "element-plus"

export default function useGlobalUtils() {
    const successNotification = (title: string, message: string) => {
        ElNotification.success({
            title: title,
            message: message,
            showClose: true
        })
    }
    const errorNotification = (title: string, message: string) => {
        ElNotification.error({
            title: title,
            message: message,
            showClose: true
        })
    }
    return {
        successNotification,
        errorNotification
    }
}
