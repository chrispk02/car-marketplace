import { IsString, IsNumber, IsArray, IsOptional, IsBoolean, Min, Max, IsEnum } from 'class-validator';

export enum FuelType {
  GASOLINE = 'GASOLINE',
  DIESEL = 'DIESEL',
  ELECTRIC = 'ELECTRIC',
  HYBRID = 'HYBRID',
}

export enum Transmission {
  AUTOMATIC = 'AUTOMATIC',
  MANUAL = 'MANUAL',
  CVT = 'CVT',
}

export enum Condition {
  EXCELLENT = 'EXCELLENT',
  GOOD = 'GOOD',
  FAIR = 'FAIR',
  POOR = 'POOR',
}

export enum DriveType {
  FWD = 'FWD',
  RWD = 'RWD',
  AWD = 'AWD',
}

export enum Owner {
  PRIVATE = 'PRIVATE',
  DEALER = 'DEALER',
}

export class CreateListingDto {
  @IsString()
  title!: string;

  @IsNumber()
  @Min(0)
  price!: number;

  @IsString()
  brand!: string;

  @IsString()
  model!: string;

  @IsNumber()
  @Min(1900)
  @Max(new Date().getFullYear() + 1)
  year!: number;

  @IsString()
  bodyType!: string;

  @IsString()
  color!: string;

  @IsNumber()
  @Min(0)
  mileage!: number;

  @IsEnum(FuelType)
  fuelType!: FuelType;

  @IsEnum(Transmission)
  transmission!: Transmission;

  @IsEnum(Condition)
  condition!: Condition;

  @IsOptional()
  @IsString()
  engineSize?: string;

  @IsOptional()
  @IsNumber()
  @Min(0)
  horsepower?: number;

  @IsOptional()
  @IsEnum(DriveType)
  driveType?: DriveType;

  @IsOptional()
  @IsString()
  interior?: string;

  @IsOptional()
  @IsArray()
  @IsString({ each: true })
  features?: string[];

  @IsOptional()
  @IsString()
  description?: string;

  @IsOptional()
  @IsString()
  exteriorColor?: string;

  @IsOptional()
  @IsString()
  interiorColor?: string;

  @IsEnum(Owner)
  owner!: Owner;

  @IsArray()
  @IsString({ each: true })
  images!: string[];

  @IsOptional()
  @IsBoolean()
  isActive?: boolean;
}