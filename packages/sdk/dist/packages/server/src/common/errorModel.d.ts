export declare class CustomError {
    message: string;
    status: number;
    /**
     * Creates a CustomError with status code , message and additionalInfo(optional)
     * @param {string} Message - The error message.
     * @param {number} status - The error status code.
     */
    constructor(Message: string, status: number);
    /**
     * Create error with status 400 and add message.
     * @param {string} msg - The error message.
     */
    static badRequest(msg?: string): CustomError;
    /**
     * Create error with status 401 and add message.
     * @param {string} msg - The error message.
     */
    static unauthorized(msg: string): CustomError;
    /**
     * Create error with status 403 and add message.
     * @param {string} msg - The error message.
     */
    static forbidden(msg: string): CustomError;
    /**
     * Create error with status 404 and add message.
     * @param {string} msg - The error message.
     */
    static notFound(msg: string): CustomError;
    /**
     * Create error with status 409 and add message.
     * @param {string} msg - The error message.
     */
    static conflict(msg: string): CustomError;
    /**
     * Create error with status 500 and add message.
     * @param {string} msg - The error message.
     */
    static internal(msg: string): CustomError;
}
