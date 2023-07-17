export class ExpressError extends Error {
  public message: string;
  public status: number;

  constructor(message: string, status: number) {
    super();
    this.message = message;
    this.status = status;
  }
}


/** 422 Unprocessable Entity error */

export class UnprocessableEntityError extends ExpressError {
    constructor(message = "Unprocessable Entity") {
      super(message, 422)
    }
  }


/** 400 BAD REQUEST error. */

export class BadRequestError extends ExpressError {
  constructor(message = "Bad Request") {
    super(message, 400)
  }
}

/** 401 UNAUTHORIZED error. */

export class UnauthorizedError extends ExpressError {
  constructor(message = "Unauthorized") {
    super(message, 401)
  }
}

