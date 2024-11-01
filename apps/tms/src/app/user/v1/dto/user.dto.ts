import {
  IsDefined,
  IsEmail,
  IsNotEmpty,
  IsString,
  ValidateIf,
} from 'class-validator';

export class UserLoginDto {
  @ValidateIf((o) => !o.email) // Validasi ini hanya aktif jika `email` tidak diisi
  @IsNotEmpty()
  @IsString()
  public username?: string;

  @ValidateIf((o) => !o.username) // Validasi ini hanya aktif jika `username` tidak diisi
  @IsNotEmpty()
  @IsEmail()
  public email?: string;

  @IsDefined()
  @IsNotEmpty()
  @IsString()
  public password: string;
}
