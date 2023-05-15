export declare class DomainException extends Error {
    constructor(message: string);
    alreadyExist(): {
        success: boolean;
        content: {};
        message: string;
        code: number;
    };
}
