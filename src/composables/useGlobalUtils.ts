import { ElNotification } from "element-plus"

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

    const truncateText = (str: string, len: number) => {
      if(str.length <= len) return
      return str.slice(0, len) + ' . . .'
    }

    return {
        successNotification,
        truncateText,
        errorNotification
    }
}
