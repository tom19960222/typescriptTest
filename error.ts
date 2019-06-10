import _ from 'lodash';

export class CustomError extends Error {
  public readonly code: number;
  public readonly message: string;

  constructor(message: any, code: number) {
    super(message);

    if (message instanceof CustomError) {
      this.message = message.message;
      this.code = message.code;
      return;
    }

    this.message = _.toString(message);
    this.code = code;
  }

  toJSON() {
    return {
      message: this.message,
      name: this.name,
    };
  }
}

export class ValidationError extends CustomError {
  constructor(message) {
    super(message, 400);
  }
}

export class NotFoundError extends CustomError {
  constructor(message) {
    super(message, 404);
  }
}

export class GeneralError extends CustomError {
  constructor(message) {
    super(message, 500);
  }
}
