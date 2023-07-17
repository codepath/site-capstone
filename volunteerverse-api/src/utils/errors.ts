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

