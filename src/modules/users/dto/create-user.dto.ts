import { IsEmail, IsInt, IsNotEmpty, IsString, Min } from 'class-validator';

export class CreateUserDto {
    @IsNotEmpty()
    @IsString()
    name: string;

    @IsEmail()
    @IsString()
    @IsNotEmpty()
    email: string;

    @IsInt()
    @IsNotEmpty()
    @Min(0)
    age: number;
}
