

export class UserExceptions extends Error {
     alreadyExist() {
        return {
            success: false,
            content: {},
            message: "Пользователь уже существует",
            code: 403
        }   
        
    }
    userNotFound() {
        return {
            success: false,
            content: {},
            message: "Пользователь не найден"
        }
    }
    
}