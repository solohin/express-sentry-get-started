class CustomError extends Error {
    constructor(message, statusCode, errorCode, customResponseData) {
        super(message);

        this.statusCode = statusCode || 500;
        this.errorCode = errorCode || 'UNKNOWN_ERROR';
        this.customResponseData = customResponseData || {}
    }
}
module.exports = CustomError