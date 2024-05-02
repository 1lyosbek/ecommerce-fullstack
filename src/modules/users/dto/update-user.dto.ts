import { ApiPropertyOptional } from '@nestjs/swagger';
import { IsArray, IsBoolean, IsEnum, IsOptional, IsString } from 'class-validator';
import { RoleEnum } from 'src/common/enums/enums';

export class UpdateUserDto {
    @ApiPropertyOptional({
        type: String,
    })
    @IsOptional()
    @IsString()
    FirstName: string;

    @ApiPropertyOptional({
        type: String,
    })
    @IsOptional()
    @IsString()
    LastName: string;

    @ApiPropertyOptional({
        type: Array,
    })
    @IsOptional() 
    @IsArray()
    phones: Array<string>;

    @ApiPropertyOptional({
        type: String,
    })
    @IsOptional()
    @IsEnum(RoleEnum)
    role: RoleEnum;

    @ApiPropertyOptional({
        type: String,
    })
    @IsOptional()
    @IsString()
    UserName: string;

    @ApiPropertyOptional({
        type: String,
    })
    @IsOptional()
    @IsString()
    password: string;

    @ApiPropertyOptional({
        type: Boolean,
    })
    @IsOptional()
    @IsBoolean()
    isActive: boolean;
}
