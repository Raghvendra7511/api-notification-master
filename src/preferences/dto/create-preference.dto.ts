import { ApiProperty } from '@nestjs/swagger';
import { IsEmail, IsString, IsObject, IsBoolean, IsEnum, ValidateNested } from 'class-validator';
import { Type } from 'class-transformer';

export class ChannelsDto {
  @ApiProperty()
  @IsBoolean()
  email: boolean;

  @ApiProperty()
  @IsBoolean()
  sms: boolean;

  @ApiProperty()
  @IsBoolean()
  push: boolean;
}

export class PreferencesDto {
  @ApiProperty()
  @IsBoolean()
  marketing: boolean;

  @ApiProperty()
  @IsBoolean()
  newsletter: boolean;

  @ApiProperty()
  @IsBoolean()
  updates: boolean;

  @ApiProperty({ enum: ['daily', 'weekly', 'monthly', 'never'] })
  @IsEnum(['daily', 'weekly', 'monthly', 'never'])
  frequency: string;

  @ApiProperty({ type: ChannelsDto })
  @IsObject()
  @ValidateNested()
  @Type(() => ChannelsDto)
  channels: ChannelsDto;
}

export class CreatePreferenceDto {
  @ApiProperty()
  @IsString()
  userId: string;

  @ApiProperty()
  @IsEmail()
  email: string;

  @ApiProperty({ type: PreferencesDto })
  @IsObject()
  @ValidateNested()
  @Type(() => PreferencesDto)
  preferences: PreferencesDto;

  @ApiProperty()
  @IsString()
  timezone: string;
}