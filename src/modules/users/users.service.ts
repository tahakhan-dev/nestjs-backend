import { BadRequestException, Injectable, InternalServerErrorException, Logger } from '@nestjs/common';
import { BullQueueService } from '../bull-queue/bull-queue.service';
import { CreateUserDto } from './dto/create-user.dto';
import { UserEntity } from './entities/user.entity';
import { InjectRepository } from '@nestjs/typeorm';
import { MoreThan, Repository } from 'typeorm';


/**
 * UsersService
 *
 * This service provides business logic for user-related operations, such as creating users,
 * fetching all users, and retrieving adult users. It interacts with the database through
 * TypeORM's repository and leverages a BullMQ queue for background job processing.
 */

@Injectable()
export class UsersService {
  private readonly logger = new Logger(UsersService.name);

  constructor(
    @InjectRepository(UserEntity) private readonly userRepository: Repository<UserEntity>,
    private readonly bullQueueService: BullQueueService,
  ) { }


    /**
   * Create User
   *
   * Handles the creation of a new user. Checks if the email already exists, creates
   * a new user if it does not, and adds a job to a BullMQ queue to process welcome messages.
   *
   * @param {CreateUserDto} createUserDto - Data Transfer Object containing user creation details.
   * @returns {Promise<UserEntity>} - The newly created user entity.
   *
   * @throws {BadRequestException} - If the email already exists in the database.
   * @throws {InternalServerErrorException} - For unexpected errors during user creation.
   */

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
      await this.userRepository.save(user);

      const jobId = await this.bullQueueService.addToQueue('process-welecome-user', {
        metadata: { user },
      });

      this.logger.log(`Job added with ID: ${jobId}`);

      return user
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


    /**
   * Find All Users
   *
   * Retrieves a list of all users from the database.
   *
   * @returns {Promise<UserEntity[]>} - A promise resolving to an array of user entities.
   *
   * @throws {InternalServerErrorException} - For unexpected errors during the operation.
   */

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


   /**
   * Get Adult Users Sorted by Name
   *
   * Retrieves a list of adult users (age >= 18) sorted alphabetically by name.
   *
   * @returns {Promise<UserEntity[]>} - A promise resolving to an array of adult user entities.
   *
   * @throws {InternalServerErrorException} - For unexpected errors during the operation.
   */
  async getAdultUsersSortedByName(): Promise<UserEntity[]> {
    try {
      return await this.userRepository.find({
        where: { age: MoreThan(18) },
        order: { name: 'ASC' },
      });
    } catch (error) {
      // Log the error for debugging (can use a logging service)
      console.error('Error fetching users:', error);

      // Throw a generic internal server error
      throw new InternalServerErrorException('An unexpected error occurred while fetching users');
    }
  }



}
