



class ApiErrorResponse extends Error{

  constructor(statusCode, message="Somthing went wrong!", errors = [], stack = ""){
    super(message)
    this.statusCode = statusCode;
    this.message= message;
    this.errors = errors;
    this.success = false;

    if(stack){
      this.stack = stack
    }
    else{
      Error.captureStackTrace(this, this.constructor)
    }

  }
}


export {ApiErrorResponse}