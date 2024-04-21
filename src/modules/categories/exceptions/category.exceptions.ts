import { HttpException, HttpStatus } from "@nestjs/common";

export class CategoryNotFoundException extends HttpException{
    constructor() {
        super("category not found", HttpStatus.NOT_FOUND)
    }
}
export class CategoryAlreadyExist extends HttpException{
    constructor() {
        super("this category already exist", HttpStatus.BAD_REQUEST)
    }
}