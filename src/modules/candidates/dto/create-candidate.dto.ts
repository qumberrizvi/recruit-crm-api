import { ApiProperty } from '@nestjs/swagger';
import {
  IsDate,
  IsEmail,
  IsEnum,
  IsNotEmpty,
  IsNumber,
  IsOptional,
  IsPhoneNumber,
  IsString,
  MaxDate,
} from 'class-validator';
import { Gender } from '../../../enums/gender.enum';
import { Transform } from 'class-transformer';
import { HasMimeType, IsFile, MaxFileSize } from 'nestjs-form-data';

export class CreateCandidateDto {
  @ApiProperty({ example: 'John', required: true })
  @IsNotEmpty()
  firstName: string;

  @ApiProperty({ required: false, example: 'Doe' })
  @IsOptional()
  @IsString()
  lastName?: string;

  @ApiProperty({ required: false, example: 'john@example.com' })
  @IsOptional()
  @IsEmail()
  email?: string;

  @ApiProperty({ required: false, example: '+919876543210' })
  @IsOptional()
  @IsPhoneNumber()
  contact?: string;

  @ApiProperty({ required: false, example: 1 })
  @IsOptional()
  @Transform(({ value }) => value && Number(value))
  @IsNumber()
  @IsEnum(Gender)
  gender?: number;

  // TODO: Break graduations into parts
  @ApiProperty({ required: false, example: 'Post Graduate' })
  @IsOptional()
  @IsString()
  qualification?: string;

  @ApiProperty({ required: false, example: '1990/12/31' })
  @IsOptional()
  @Transform(({ value }) => value && new Date(value))
  @IsDate()
  @MaxDate(new Date())
  dob?: Date;

  @ApiProperty({ required: false, example: 'Mall Avenue, Lucknow, India' })
  @IsOptional()
  @IsString()
  address?: string;

  @ApiProperty({ required: false, type: 'string', format: 'binary' })
  @IsOptional()
  @IsNotEmpty()
  @IsFile()
  @MaxFileSize(1e6)
  @HasMimeType(['image/jpeg', 'image/png', 'document/pdf'])
  resume: Express.Multer.File;
}
