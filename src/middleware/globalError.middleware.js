import { ApiErrorResponse } from "../utlis/ApiErrorResponse";

const errorHandler = (err, req, res, next)=>{

    let error = err;
    
    if(!(error instanceof ApiErrorResponse)){

        const statusCode = error.statusCode || 500;
        const message = error.message || "Something went wrong!";
        error = new ApiErrorResponse(statusCode, message, error?.errors || [], err.stack);
    }

    const response = {
        ...error,
        message: error.message
    }

    return res.status(200).json(response)
}

export {errorHandler};