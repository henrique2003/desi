import { toast } from 'react-toastify'

const toastConfig = {
  hideProgressBar: false
}

export function toastError(message: string): void {
  toast.error(message, toastConfig)
}

export function toastSuccess(message: string): void {
  toast.success(message, toastConfig)
}
