import { HttpException, HttpStatus } from '@nestjs/common';

export class UserNameOrPasswordWrongException extends HttpException {
  constructor() {
    super('User Login or Password Wrong!', HttpStatus.BAD_REQUEST);
  }
}
export class UserNameAlreadyExist extends HttpException {
  constructor() {
    super('This username already exist, Please choose another one!', HttpStatus.BAD_REQUEST);
  }
}
