import { IsEmail, IsString } from 'class-validator';

export default class LoginRequestBody {
  @IsEmail()
  email: string;

  @IsString()
  password: string;
}