import { IsNotEmpty, IsString, Matches, MaxLength } from 'class-validator';

export class UpdateUserDto {
  @IsNotEmpty()
  @IsString()
  firstName: string;

  @IsNotEmpty()
  @IsString()
  lastName: string;

  @IsNotEmpty()
  @IsString()
  city: string;

  @IsNotEmpty()
  @Matches(/^[0-9]{5}$/, { message: 'Zip code must be exactly 5 digits.' })
  zipCode: string;

  @IsNotEmpty()
  @IsString()
  state: string;

  @IsNotEmpty()
  @IsString()
  stateName: string;

  @IsNotEmpty()
  @IsString()
  @MaxLength(20)
  documentNumber: string;
}
