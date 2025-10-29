import { HttpException } from '@nestjs/common';
import { ErrorsEnum } from './errors.enum';

class BaseError extends HttpException {
  constructor(message: ErrorsEnum, statusCode: number) {
    super({ message, statusCode, success: false }, statusCode);
  }
}

export class Forbidden extends BaseError {
  constructor(message: ErrorsEnum) {
    super(message, 403);
  }
}

export class Unauthorized extends BaseError {
  constructor(message: ErrorsEnum) {
    super(message, 401);
  }
}

export class NotFound extends BaseError {
  constructor(message: ErrorsEnum) {
    super(message, 404);
  }
}

export class Conflict extends BaseError {
  constructor(message: ErrorsEnum) {
    super(message, 409);
  }
}

export class InternalServerError extends HttpException {
  constructor(message: ErrorsEnum) {
    super({ message }, 500);
  }
}

export class UnprocessableEntity extends HttpException {
  constructor(message: ErrorsEnum) {
    super({ message }, 422);
  }
}
