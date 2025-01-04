import { Module } from '@nestjs/common';
import { UsersService } from './users.service';
import { UsersController } from './users.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { UserEntity } from './entities/user.entity';
import { ActivityLogEventHandler } from './event.handler';

@Module({
  imports: [
    TypeOrmModule.forFeature([
      UserEntity
    ]),
  ],
  controllers: [UsersController],
  providers: [
    UsersService,
    ActivityLogEventHandler
  ],
})
export class UsersModule { }
