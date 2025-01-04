import { BadRequestException, Injectable, InternalServerErrorException } from '@nestjs/common';
import { CreateUserDto } from './dto/create-user.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { UserEntity } from './entities/user.entity';

@Injectable()
export class UsersService {
  constructor(
    @InjectRepository(UserEntity) private readonly userRepository: Repository<UserEntity>,
  ) { }
  async create(createUserDto: CreateUserDto): Promise<UserEntity> {
    try {
      // Check if email already exists
      const existingUser = await this.userRepository.findOne({
        where: { email: createUserDto.email },
      });

      if (existingUser) {
        throw new BadRequestException('Email already exists');
      }

      // If email does not exist, proceed with creation
      const user = this.userRepository.create(createUserDto);
      return await this.userRepository.save(user);
    } catch (error) {
      if (error instanceof BadRequestException) {
        throw error; // Re-throw known error
      }
      // Log the error for debugging (can use a logging service)
      console.error('Error during user creation:', error);

      // Throw a generic internal server error
      throw new InternalServerErrorException('An unexpected error occurred during user creation');
    }
  }

  async findAll(): Promise<UserEntity[]> {
    try {
      return await this.userRepository.find();
    } catch (error) {
      // Log the error for debugging (can use a logging service)
      console.error('Error fetching users:', error);

      // Throw a generic internal server error
      throw new InternalServerErrorException('An unexpected error occurred while fetching users');
    }

  }

}
