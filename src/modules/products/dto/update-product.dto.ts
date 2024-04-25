import { ApiPropertyOptional } from '@nestjs/swagger';
import { IsJSON, IsNumber, IsObject, IsOptional, IsString } from 'class-validator';

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
        type: Object,
        properties: {
            type: { type: "string" },
            color: { type: "string" },
        }
    })
    @IsObject()
    @IsOptional()
    info: JSON;
}
