export class DomainException extends Error {
  constructor(message: string) {
    super(message);
  }
  alreadyExist() {
    return {
        success: false,
        content: {},
        message: "UserAlreadExists",
        code: 403
    }   
    
}
}
