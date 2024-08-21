export class InternalServerErrorException extends Error {
  status: number;
  constructor(message?: string, status?: number) {
    super(message || 'Internal Exception');
    this.status = status || 500;
  }
}

export class BadRequestException extends InternalServerErrorException {
  constructor(message?: string, status?: number) {
    super(message || 'Bad Request');
    this.status = status || 400;
  }
}

export class UnauthorizedException extends InternalServerErrorException {
  constructor(message?: string, status?: number) {
    super(message || 'Unauthorized');
    this.status = status || 401;
  }
}


export class ForbiddenException extends InternalServerErrorException {
  constructor(message?: string, status?: number) {
    super(message || 'Forbidden');
    this.status = status || 403;
  }
}


export class NotFoundException extends InternalServerErrorException {
  constructor(message?: string, status?: number) {
    super(message || 'Not Found');
    this.status = status || 404;
  }
}


export class ConflictException extends InternalServerErrorException {
  constructor(message?: string, status?: number) {
    super(message || 'Conflict');
    this.status = status || 409;
  }
}

export class PayloadTooLargeException extends InternalServerErrorException {
  constructor(message?: string, status?: number) {
    super(message || 'Payload Too Large');
    this.status = status || 413;
  }
}

export class UnprocessableEntityException extends InternalServerErrorException {
  constructor(message?: string, status?: number) {
    super(message || 'Unprocessable Entity');
    this.status = status || 422;
  }
}