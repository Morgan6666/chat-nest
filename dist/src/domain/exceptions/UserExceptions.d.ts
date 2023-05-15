export declare class UserExceptions extends Error {
    alreadyExist(): {
        success: boolean;
        content: {};
        message: string;
        code: number;
    };
    userNotFound(): {
        success: boolean;
        content: {};
        message: string;
    };
}
