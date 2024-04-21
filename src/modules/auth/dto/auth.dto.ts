import { ApiProperty } from "@nestjs/swagger";
import { IsArray, IsBoolean, IsEnum, IsNotEmpty, IsString } from "class-validator";
import { RoleEnum } from "src/common/enums/enums";
import { ArrayContains } from "typeorm";

export class RegisterDto {
  @ApiProperty({
    type: String,
  })
  @IsNotEmpty()
  @IsString()
  FirstName: string;

  @ApiProperty({
    type: String,
  })
  @IsNotEmpty()
  @IsString()
  LastName: string;

  @ApiProperty({
    type: Array,
    example: ["+998335701001", "+998946198877"],
    description: "Array of phone numbers",
  })
  @IsNotEmpty()
  @IsArray()
  phones: Array<string>;

  @ApiProperty({
    type: String,
  })
  @IsNotEmpty()
  @IsEnum(RoleEnum)
  role: RoleEnum;

  @ApiProperty({
    type: String,
  })
  @IsNotEmpty()
  @IsString()
  UserName: string;

  @ApiProperty({
    type: String,
  })
  @IsNotEmpty()
  @IsString()
  password: string;

  @ApiProperty({
    type: Boolean,
  })
  @IsNotEmpty()
  @IsBoolean()
  isActive: boolean;
}

export class LoginDto {
  @ApiProperty({
    type: String,
  })
  @IsString()
  @IsNotEmpty()
  UserName: string;

  @ApiProperty({
    type: String,
  })
  @IsString()
  @IsNotEmpty()
  password: string;
}
