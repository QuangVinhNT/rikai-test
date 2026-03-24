import { IsEmail, IsNotEmpty } from 'class-validator';
export class RegisterAuthDto {
  @IsNotEmpty()
  username!: string;

  @IsEmail()
  @IsNotEmpty()
  email!: string;

  @IsNotEmpty()
  password!: string;

  fullName?: string;
}
