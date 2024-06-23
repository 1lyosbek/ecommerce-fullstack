import { HttpException, HttpStatus } from "@nestjs/common";

export class ProductNotFoundException extends HttpException{
    constructor() {
        super("Product not found", HttpStatus.NOT_FOUND);
    }
}