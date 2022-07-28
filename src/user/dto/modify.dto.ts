import { ApiProperty } from '@nestjs/swagger'
import { IsBoolean, IsDefined, IsEmail, IsNotEmpty, IsOptional, IsString, MaxLength, MinLength } from 'class-validator'

export class ModifyUserDto {
  id: string

  @ApiProperty({ minLength: 2, maxLength: 100 })
  @IsString()
  @IsNotEmpty()
  @MinLength(2)
  @MaxLength(100)
  name: string;

  @ApiProperty({ minLength: 2, maxLength: 100 })
  @IsString()
  @IsNotEmpty()
  @MinLength(2)
  @MaxLength(100)
  fullName: string;

  @ApiProperty({ minLength: 2, maxLength: 100 })
  @IsString()
  @IsNotEmpty()
  @MinLength(2)
  @MaxLength(100)
  password: string;

  @ApiProperty({ required: false, maxLength: 256 })
  @IsString()
  @IsOptional()
  @MaxLength(256)
  description: string;

  @ApiProperty()
  @IsEmail()
  @IsDefined()
  email: string;

  @ApiProperty({ required: false, default: 'en', example: 'en' })
  @IsString()
  @IsOptional()
  lang: string;

  @ApiProperty({ required: false, default: false })
  @IsBoolean()
  @IsOptional()
  emailNotification: boolean;

  @ApiProperty({ required: false, default: true })
  @IsBoolean()
  @IsOptional()
  active: boolean;
}
