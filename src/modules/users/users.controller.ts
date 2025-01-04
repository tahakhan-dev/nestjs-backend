import { Controller, Get, Post, Body, Patch, Param, Delete, Res, Logger } from '@nestjs/common';
import { UsersService } from './users.service';
import { CreateUserDto } from './dto/create-user.dto';
import { ApiResponse } from 'src/common/interface/api-response';
import { StatusCodes } from 'src/common/enums/status-codes.enum';
import { Status } from 'src/common/enums/status.enum';
import { Response } from 'express';
import { UserEntity } from './entities/user.entity';

@Controller('users')
export class UsersController {
  private readonly logger = new Logger(UsersController.name);

  constructor(private readonly usersService: UsersService) { }

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

  @Get()
  async findAll(@Res() res: Response): Promise<ApiResponse<UserEntity[]>> {

    try {

      let userResult = await this.usersService.findAll();

      // Prepare a general API response
      const response: ApiResponse<UserEntity[]> = {
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
}
