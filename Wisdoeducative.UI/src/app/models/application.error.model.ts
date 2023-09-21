export class ApplicationErrorModel {
    public message: string;
    public status: number;
    public errorCode : string;

    constructor(message: string, status: number, errorCode : string) {
        this.message = message;
        this.status = status;
        this.errorCode = errorCode;
    }
}