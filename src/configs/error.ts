import { ErrorEnum } from "../shared/enums/error-responses.enum.ts";

export class BaseError extends Error {
  public statusCode: number;
  public errorCode: ErrorEnum;

  constructor(statusCode: number, errorCode: ErrorEnum, message?: string) {
    super(message);

    this.statusCode = statusCode;
    this.errorCode = errorCode;
  }
}

export class NotFound extends BaseError {
  constructor(errorCode: ErrorEnum, message?: string) {
    super(404, errorCode, message || "Resource not found");
  }
}

export class BadRequest extends BaseError {
  constructor(errorCode: ErrorEnum, message?: string) {
    super(400, errorCode, message || "Bad request");
  }
}

export class Conflict extends BaseError {
  constructor(errorCode: ErrorEnum, message?: string) {
    super(409, errorCode, message || "Conflict");
  }
}

export class Unauthorized extends BaseError {
  constructor(errorCode: ErrorEnum, message?: string) {
    super(401, errorCode, message || "Unauthorized");
  }
}

export class Forbidden extends BaseError {
  constructor(errorCode: ErrorEnum, message?: string) {
    super(403, errorCode, message || "Forbidden");
  }
}

export class InternalServerError extends BaseError {
  constructor(errorCode: ErrorEnum, message?: string) {
    super(500, errorCode, message || "Internal server error");
  }
}
