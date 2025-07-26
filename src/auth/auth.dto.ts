import { IsEmail, IsOptional, IsString, MinLength } from 'class-validator';
export class AuthDto {
  @IsOptional()
  @IsString()
  name: string;

  @IsString({ message: 'Почта обязательное поле' })
  @IsEmail()
  email: string;

  @MinLength(6, { message: 'Пароль должен содержать не менее 6 символов' })
  @IsString({ message: 'Пароль обязательное поле' })
  password: string;
}
