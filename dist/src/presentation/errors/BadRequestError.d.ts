import { HttpStatus } from '@nestjs/common';
export declare class BadRequestError {
    statusCode: HttpStatus;
    message: string;
    timestamp: Date;
    path: string;
}
