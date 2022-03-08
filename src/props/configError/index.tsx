import {message} from 'antd'

const allMessage = [
    {
        id: "SERVER_ERROR",
        value: "Server đang bảo trì"
    },
    {
        id: "INVALID_PARAMS",
        value: "Email hoặc mật khẩu không đúng"
    }
]

const handleMessage = (value: string) => {
    let otherError = value || "Lỗi không xác định"
    const newArrMessage = (allMessage || []).filter(e => e.id === value)
    if(newArrMessage.length){
        message.error(newArrMessage[0].value)
    }
    else {
        message.error(otherError)
    }
}

export const configError = (err: any) => {
    const code = err?.status
    const valueMessage = err?.data?.error_code
    console.log('erorr: ',err)
    if(code === 500){
        handleMessage("SERVER_ERROR")
    }
    else if(code === 403){
        handleMessage("SERVER_ERROR")
    }
    else {
        handleMessage(valueMessage)
    }
}