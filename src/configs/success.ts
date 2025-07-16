import { SuccessResponses } from "../shared/enums/success-responses.enum.ts";

export class BaseSuccess {
  public statusCode: number;
  public successCode: SuccessResponses;
  public message?: string;
  public body?: unknown;

  constructor(
    statusCode: number,
    successCode: SuccessResponses,
    message?: string,
    body?: unknown
  ) {
    this.statusCode = statusCode;
    this.successCode = successCode;
    this.message = message;
    this.body = body;
  }
}

export class Ok extends BaseSuccess {
  constructor(successCode: SuccessResponses, body: unknown, message?: string) {
    super(200, successCode, message, body);
  }
}

export class NoContent extends BaseSuccess {
  constructor(successCode: SuccessResponses, message?: string) {
    super(204, successCode, message);
  }
}

export class Created extends BaseSuccess {
  constructor(successCode: SuccessResponses, message?: string, body?: unknown) {
    super(201, successCode, message, body);
  }
}
