import { IsEmail, IsInt, IsNotEmpty, IsString, Min } from 'class-validator';

/**
 * CreateUserDto
 *
 * This Data Transfer Object (DTO) is used to define the structure and validation rules
 * for creating a new user. The `class-validator` decorators ensure that the input
 * conforms to the specified requirements before being processed by the application.
 */
export class CreateUserDto {
    /**
     * User Name
     *
     * Represents the name of the user. This field is mandatory, must be a string,
     * and cannot be empty.
     *
     * @example "John Doe"
     */
    @IsNotEmpty() // Ensures the value is not empty
    @IsString()   // Ensures the value is a string
    name: string;

    /**
     * User Email
     *
     * Represents the email address of the user. This field is mandatory, must be a valid
     * email address, and cannot be empty. The value is also validated to be a string.
     *
     * @example "johndoe@example.com"
     */
    @IsEmail()    // Ensures the value is a valid email address
    @IsString()   // Ensures the value is a string
    @IsNotEmpty() // Ensures the value is not empty
    email: string;

    /**
     * User Age
     *
     * Represents the age of the user. This field is mandatory, must be an integer,
     * cannot be empty, and must have a minimum value of 0.
     *
     * @example 25
     */
    @IsInt()      // Ensures the value is an integer
    @IsNotEmpty() // Ensures the value is not empty
    @Min(0)       // Ensures the value is at least 0
    age: number;
}
