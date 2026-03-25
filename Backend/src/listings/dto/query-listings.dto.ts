import { IsOptional, IsString, IsNumber, IsArray, IsEnum, Min, Max } from 'class-validator';
import { Type } from 'class-transformer';
import { FuelType, Transmission, Condition, DriveType, Owner } from './create-listing.dto';

export class QueryListingsDto {
  @IsOptional()
  @IsString()
  search?: string;

  @IsOptional()
  @IsString()
  brand?: string;

  @IsOptional()
  @IsString()
  model?: string;

  @IsOptional()
  @Type(() => Number)
  @IsNumber()
  @Min(1900)
  @Max(new Date().getFullYear() + 1)
  minYear?: number;

  @IsOptional()
  @Type(() => Number)
  @IsNumber()
  @Min(1900)
  @Max(new Date().getFullYear() + 1)
  maxYear?: number;

  @IsOptional()
  @Type(() => Number)
  @IsNumber()
  @Min(0)
  minPrice?: number;

  @IsOptional()
  @Type(() => Number)
  @IsNumber()
  @Min(0)
  maxPrice?: number;

  @IsOptional()
  @Type(() => Number)
  @IsNumber()
  @Min(0)
  minMileage?: number;

  @IsOptional()
  @Type(() => Number)
  @IsNumber()
  @Min(0)
  maxMileage?: number;

  @IsOptional()
  @IsString()
  bodyType?: string;

  @IsOptional()
  @IsEnum(FuelType)
  fuelType?: FuelType;

  @IsOptional()
  @IsEnum(Transmission)
  transmission?: Transmission;

  @IsOptional()
  @IsEnum(Condition)
  condition?: Condition;

  @IsOptional()
  @IsEnum(DriveType)
  driveType?: DriveType;

  @IsOptional()
  @IsEnum(Owner)
  owner?: Owner;

  @IsOptional()
  @IsString()
  sortBy?: string; // price, year, mileage, createdAt

  @IsOptional()
  @IsString()
  sortOrder?: 'asc' | 'desc';

  @IsOptional()
  @Type(() => Number)
  @IsNumber()
  @Min(1)
  page?: number = 1;

  @IsOptional()
  @Type(() => Number)
  @IsNumber()
  @Min(1)
  @Max(100)
  limit?: number = 20;
}