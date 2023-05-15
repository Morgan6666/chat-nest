import { HttpStatus } from '@nestjs/common';
export declare class NotFoundError {
    statusCode: HttpStatus;
    message: string;
    timestamp: Date;
    path: string;
}
