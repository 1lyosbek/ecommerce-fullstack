import { ApiProperty } from "@nestjs/swagger";
import { IsArray, IsNotEmpty , IsString } from "class-validator";

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
  @IsString()
  UserName: string;

  @ApiProperty({
    type: String,
  })
  @IsNotEmpty()
  @IsString()
  password: string;
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
