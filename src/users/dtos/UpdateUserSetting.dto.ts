import { IsBoolean, IsNumber, IsOptional } from 'class-validator';

export class UpdateUserSettingDto {
  @IsBoolean()
  @IsOptional()
  notifiacationOn: boolean;
  @IsBoolean()
  @IsOptional()
  smsEnabled: boolean;
}
