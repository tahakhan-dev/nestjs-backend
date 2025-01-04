import { Controller, Get, Post, Body, Res, Logger } from '@nestjs/common';
import { StatusCodes } from 'src/common/enums/status-codes.enum';
import { ApiResponse } from 'src/common/interface/api-response';
import { Status } from 'src/common/enums/status.enum';
import { CreateUserDto } from './dto/create-user.dto';
import { UserEntity } from './entities/user.entity';
import { UsersService } from './users.service';
import { Throttle } from '@nestjs/throttler';
import { Response } from 'express';

@Controller('users')
export class UsersController {
  private readonly logger = new Logger(UsersController.name);

  constructor(private readonly usersService: UsersService) { }


  /**
 * Create User
 *
 * Handles the creation of a new user. Validates the input using `CreateUserDto`,
 * throttles requests to prevent abuse, and returns a standardized API response.
 *
 * @Throttle - Limits the number of requests based on the configured throttler settings.
 * @Post - Maps this method to the POST /users endpoint.
 *
 * @param {Response} res - The HTTP response object.
 * @param {CreateUserDto} createUserDto - Data Transfer Object containing user creation details.
 * @returns {Promise<ApiResponse<UserEntity>>} - A promise resolving to the API response.
 */

  @Throttle({ default: { limit: +process.env.THROTTLER_USER_LIMIT, ttl: +process.env.THROTTLER_USER_TTL } })
  @Post()
  async create(@Res() res: Response, @Body() createUserDto: CreateUserDto): Promise<ApiResponse<UserEntity>> {

    try {

      let userResult = await this.usersService.create(createUserDto);

      // Prepare a general API response
      const response: ApiResponse<UserEntity> = {
        statusCode: Number(StatusCodes.SUCCESS ?? 500),
        status: Status.SUCCESS,
        result: userResult,
        message: 'User Created Successfully',
      };

      res.status(Number(response.statusCode)).json(response);

      return response
    } catch (error) {
      const response: ApiResponse<null> = {
        statusCode: error.status,
        status: Status.FAILED,
        result: null,
        message: error?.message ?? 'An unknown error occurred',
      };

      // Send the error response back
      res.status(Number(response.statusCode)).json(response);
      return response
    }

  }

  /**
   * Get All Users
   *
   * Fetches the list of all users. Throttles requests to prevent abuse and returns a
   * standardized API response containing the user list.
   *
   * @Throttle - Limits the number of requests based on the configured throttler settings.
   * @Get - Maps this method to the GET /users endpoint.
   *
   * @param {Response} res - The HTTP response object.
   * @returns {Promise<ApiResponse<UserEntity[]>>} - A promise resolving to the API response.
   */
  @Throttle({ default: { limit: +process.env.THROTTLER_USER_LIMIT, ttl: +process.env.THROTTLER_USER_TTL } })
  @Get()
  async findAll(@Res() res: Response): Promise<ApiResponse<UserEntity[]>> {

    try {

      let userResult = await this.usersService.findAll();

      // Prepare a general API response
      const response: ApiResponse<UserEntity[]> = {
        statusCode: Number(StatusCodes.SUCCESS ?? 500),
        status: Status.SUCCESS,
        result: userResult,
        message: 'User List Fetched Successfully',
      };

      res.status(Number(response.statusCode)).json(response);

      return response
    } catch (error) {
      const response: ApiResponse<null> = {
        statusCode: error.status,
        status: Status.FAILED,
        result: null,
        message: error?.message ?? 'An unknown error occurred',
      };

      // Send the error response back
      res.status(Number(response.statusCode)).json(response);
      return response
    }

  }

  /**
  * Get Adult Users Sorted by Name
  *
  * Fetches a list of adult users (age >= 18) sorted by name. Throttles requests to
  * prevent abuse and returns a standardized API response containing the filtered list.
  *
  * @Throttle - Limits the number of requests based on the configured throttler settings.
  * @Get - Maps this method to the GET /users/adults endpoint.
  *
  * @param {Response} res - The HTTP response object.
  * @returns {Promise<ApiResponse<UserEntity[]>>} - A promise resolving to the API response.
  */
  @Throttle({ default: { limit: +process.env.THROTTLER_USER_LIMIT, ttl: +process.env.THROTTLER_USER_TTL } })
  @Get('adults')
  async getAdultUsers(@Res() res: Response) {
    try {

      let userResult = await this.usersService.getAdultUsersSortedByName();

      // Prepare a general API response
      const response: ApiResponse<UserEntity[]> = {
        statusCode: Number(StatusCodes.SUCCESS ?? 500),
        status: Status.SUCCESS,
        result: userResult,
        message: 'User List Fetched Successfully',
      };

      res.status(Number(response.statusCode)).json(response);

      return response
    } catch (error) {
      const response: ApiResponse<null> = {
        statusCode: error.status,
        status: Status.FAILED,
        result: null,
        message: error?.message ?? 'An unknown error occurred',
      };

      // Send the error response back
      res.status(Number(response.statusCode)).json(response);
      return response
    }
  }

}
