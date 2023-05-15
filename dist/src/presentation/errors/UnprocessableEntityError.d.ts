import { HttpStatus } from '@nestjs/common';
export declare class UnprocessableEntityError {
    statusCode: HttpStatus;
    error: [
        {
            property: string;
            errors: string[];
            constraints: {
                [type: string]: string;
            };
        }
    ];
    timestamp: Date;
    path: string;
}
