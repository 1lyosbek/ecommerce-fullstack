import { ApiPropertyOptional } from '@nestjs/swagger';
import { IsJSON, IsNumber, IsOptional, IsString } from 'class-validator';

export class UpdateProductDto {
    @ApiPropertyOptional({
        type: String
    })
    @IsString()
    @IsOptional()
    title: string;

    @ApiPropertyOptional({
        type: Number
    })
    @IsNumber()
    @IsOptional()
    price: number;

    @ApiPropertyOptional({
        type: Number
    })
    @IsNumber()
    @IsOptional()
    oldPrice: number;

    @ApiPropertyOptional({
        type: String
    })
    @IsString()
    @IsOptional()
    category: string;

    @ApiPropertyOptional({
        type: String
    })
    @IsString()
    @IsOptional()
    units: string;

    @ApiPropertyOptional({
        type: String
    })
    @IsString()
    @IsOptional()
    description: string;

    @ApiPropertyOptional({
        type: JSON
    })
    @IsJSON()
    @IsOptional()
    info: JSON;
}
